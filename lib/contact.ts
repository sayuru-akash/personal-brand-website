import { z } from "zod";
import { contactTopics } from "@/data/portfolio";

export const CONTACT_FORM_ACTION = "contact";
export const CONTACT_MAX_BODY_BYTES = 16_384;

export const contactSubmissionSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    email: z.string().trim().email().max(254),
    topic: z.enum(contactTopics),
    message: z.string().trim().min(10).max(5_000),
    turnstileToken: z.string().min(1).max(2_048),
    submissionId: z.string().uuid(),
    website: z.string().max(200).optional().default(""),
  })
  .strict();

export type ContactSubmission = z.infer<typeof contactSubmissionSchema>;

export type ContactApiResponse =
  | {
      ok: true;
      message: string;
      reference: string;
    }
  | {
      ok: false;
      message: string;
      code: "invalid_request" | "verification_failed" | "delivery_failed" | "unavailable";
      fields?: string[];
    };

type ContactEmailInput = Pick<ContactSubmission, "name" | "email" | "topic" | "message"> & {
  reference: string;
  submittedAt: Date;
};

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        "'": "&#39;",
        '"': "&quot;",
      })[character] ?? character,
  );
}

export function renderContactEmailHtml(input: ContactEmailInput) {
  const name = escapeHtml(input.name);
  const email = escapeHtml(input.email);
  const topic = escapeHtml(input.topic);
  const message = escapeHtml(input.message).replace(/\r?\n/g, "<br />");
  const reference = escapeHtml(input.reference);
  const submittedAt = escapeHtml(input.submittedAt.toISOString());

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>New website inquiry</title>
  </head>
  <body style="margin:0;background:#f4f3ef;color:#171613;font-family:Arial,Helvetica,sans-serif;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f3ef;padding:32px 16px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:680px;border:1px solid #d8d5cc;background:#ffffff;">
            <tr>
              <td style="border-top:6px solid #d63a2f;padding:34px 38px 24px;">
                <p style="margin:0 0 12px;color:#d63a2f;font-family:monospace;font-size:12px;letter-spacing:0;text-transform:uppercase;">sayuru.me / new inquiry</p>
                <h1 style="margin:0;font-size:34px;line-height:1.14;letter-spacing:0;">${name} sent a message.</h1>
              </td>
            </tr>
            <tr>
              <td style="padding:0 38px 30px;">
                <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #171613;border-bottom:1px solid #d8d5cc;">
                  <tr>
                    <td style="padding:18px 0 8px;color:#77736b;font-family:monospace;font-size:11px;text-transform:uppercase;">Topic</td>
                    <td style="padding:18px 0 8px;text-align:right;font-size:15px;font-weight:700;">${topic}</td>
                  </tr>
                  <tr>
                    <td style="padding:8px 0 18px;color:#77736b;font-family:monospace;font-size:11px;text-transform:uppercase;">Reply to</td>
                    <td style="padding:8px 0 18px;text-align:right;font-size:15px;font-weight:700;"><a href="mailto:${email}" style="color:#2858d8;text-decoration:none;">${email}</a></td>
                  </tr>
                </table>
                <div style="padding:30px 0 8px;font-size:17px;line-height:1.75;">${message}</div>
                <p style="margin:28px 0 0;">
                  <a href="mailto:${email}" style="display:inline-block;border-radius:999px;background:#171613;color:#ffffff;font-size:14px;font-weight:700;padding:14px 22px;text-decoration:none;">Reply to ${name}</a>
                </p>
              </td>
            </tr>
            <tr>
              <td style="border-top:1px solid #d8d5cc;padding:20px 38px;color:#77736b;font-family:monospace;font-size:11px;line-height:1.7;">
                Reference ${reference}<br />Received ${submittedAt}
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export function renderContactEmailText(input: ContactEmailInput) {
  return [
    "NEW SAYURU.ME INQUIRY",
    "",
    `Name: ${input.name}`,
    `Email: ${input.email}`,
    `Topic: ${input.topic}`,
    "",
    input.message,
    "",
    `Reference: ${input.reference}`,
    `Received: ${input.submittedAt.toISOString()}`,
  ].join("\n");
}
