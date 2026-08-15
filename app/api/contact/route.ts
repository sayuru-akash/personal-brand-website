import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { z } from "zod";
import {
  CONTACT_FORM_ACTION,
  CONTACT_MAX_BODY_BYTES,
  type ContactApiResponse,
  contactSubmissionSchema,
  renderContactEmailHtml,
  renderContactEmailText,
} from "@/lib/contact";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const turnstileResponseSchema = z
  .object({
    success: z.boolean(),
    hostname: z.string().optional(),
    action: z.string().optional(),
    "error-codes": z.array(z.string()).optional(),
  })
  .passthrough();

function json(body: ContactApiResponse, status = 200) {
  return NextResponse.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
    },
  });
}

function getConfiguration() {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const turnstileSecret = process.env.TURNSTILE_SECRET_KEY?.trim();
  const allowedHostnames = new Set(
    (process.env.TURNSTILE_ALLOWED_HOSTNAMES ?? "sayuru.me,www.sayuru.me")
      .split(",")
      .map((hostname) => hostname.trim().toLowerCase())
      .filter(Boolean),
  );

  if (!apiKey || !from || !to || !turnstileSecret || allowedHostnames.size === 0) {
    return null;
  }

  return { apiKey, from, to, turnstileSecret, allowedHostnames };
}

function getRemoteIp(request: Request) {
  return (
    request.headers.get("cf-connecting-ip") ??
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    undefined
  );
}

async function verifyTurnstile(
  token: string,
  secret: string,
  allowedHostnames: Set<string>,
  remoteIp?: string,
) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8_000);

  try {
    const payload = new FormData();
    payload.set("secret", secret);
    payload.set("response", token);
    payload.set("idempotency_key", randomUUID());
    if (remoteIp) {
      payload.set("remoteip", remoteIp);
    }

    const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      body: payload,
      cache: "no-store",
      signal: controller.signal,
    });

    if (!response.ok) {
      return false;
    }

    const parsed = turnstileResponseSchema.safeParse(await response.json());
    if (!parsed.success || !parsed.data.success) {
      return false;
    }

    const hostname = parsed.data.hostname?.toLowerCase();
    return (
      parsed.data.action === CONTACT_FORM_ACTION &&
      Boolean(hostname && allowedHostnames.has(hostname))
    );
  } catch {
    return false;
  } finally {
    clearTimeout(timeout);
  }
}

export async function POST(request: Request) {
  const configuration = getConfiguration();
  if (!configuration) {
    console.error("Contact form configuration is incomplete.");
    return json(
      {
        ok: false,
        code: "unavailable",
        message: "Message delivery is temporarily unavailable. Please use the direct email address.",
      },
      503,
    );
  }

  const contentType = request.headers.get("content-type") ?? "";
  const contentLength = Number(request.headers.get("content-length") ?? 0);
  if (
    !contentType.toLowerCase().startsWith("application/json") ||
    (Number.isFinite(contentLength) && contentLength > CONTACT_MAX_BODY_BYTES)
  ) {
    return json(
      { ok: false, code: "invalid_request", message: "Please check the form and try again." },
      400,
    );
  }

  let input: unknown;
  try {
    const rawBody = await request.text();
    if (new TextEncoder().encode(rawBody).byteLength > CONTACT_MAX_BODY_BYTES) {
      throw new Error("Request body is too large.");
    }
    input = JSON.parse(rawBody);
  } catch {
    return json(
      { ok: false, code: "invalid_request", message: "Please check the form and try again." },
      400,
    );
  }

  const parsed = contactSubmissionSchema.safeParse(input);
  if (!parsed.success) {
    const fields = [...new Set(parsed.error.issues.map((issue) => String(issue.path[0] ?? "form")))];
    return json(
      {
        ok: false,
        code: "invalid_request",
        message: "Please complete every field and check the message length.",
        fields,
      },
      422,
    );
  }

  const submission = parsed.data;
  if (submission.website) {
    return json({
      ok: true,
      message: "Your message has been sent.",
      reference: submission.submissionId.slice(0, 8).toUpperCase(),
    });
  }

  const verified = await verifyTurnstile(
    submission.turnstileToken,
    configuration.turnstileSecret,
    configuration.allowedHostnames,
    getRemoteIp(request),
  );

  if (!verified) {
    return json(
      {
        ok: false,
        code: "verification_failed",
        message: "Verification expired or could not be completed. Please try again.",
      },
      403,
    );
  }

  const reference = submission.submissionId.slice(0, 8).toUpperCase();
  const submittedAt = new Date();
  const resend = new Resend(configuration.apiKey);

  try {
    const { error } = await resend.emails.send(
      {
        from: configuration.from,
        to: configuration.to,
        replyTo: submission.email,
        subject: `[sayuru.me] ${submission.topic} from ${submission.name}`,
        html: renderContactEmailHtml({ ...submission, reference, submittedAt }),
        text: renderContactEmailText({ ...submission, reference, submittedAt }),
        tags: [{ name: "source", value: "website-contact" }],
      },
      { idempotencyKey: `contact/${submission.submissionId}` },
    );

    if (error) {
      console.error("Resend rejected a contact message.", {
        reference,
        name: error.name,
      });
      return json(
        {
          ok: false,
          code: "delivery_failed",
          message: "The message could not be delivered. Please try again or use the direct email address.",
        },
        502,
      );
    }

    return json({
      ok: true,
      message: "Your message has been sent. I will reply by email.",
      reference,
    });
  } catch (error) {
    console.error("Contact email delivery failed.", {
      reference,
      name: error instanceof Error ? error.name : "UnknownError",
    });
    return json(
      {
        ok: false,
        code: "delivery_failed",
        message: "The message could not be delivered. Please try again or use the direct email address.",
      },
      502,
    );
  }
}
