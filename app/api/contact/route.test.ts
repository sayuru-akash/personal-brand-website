/** @jest-environment node */

import { NextRequest } from "next/server";

const mockResendSend = jest.fn();

jest.mock("resend", () => ({
  Resend: jest.fn().mockImplementation(() => ({
    emails: { send: mockResendSend },
  })),
}));

import { POST } from "@/app/api/contact/route";

const validBody = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  topic: "Software / product",
  message: "I would like to discuss a useful product system.",
  turnstileToken: "verified-token",
  submissionId: "b5f67c25-e7c3-4b4c-9bbc-94e61fc2dce9",
  website: "",
};

function request(body: unknown) {
  return new NextRequest("https://sayuru.me/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    process.env.RESEND_API_KEY = "re_test";
    process.env.CONTACT_FROM_EMAIL = "Sayuru Website <notify@site.sayuru.me>";
    process.env.CONTACT_TO_EMAIL = "contact@sayuru.me";
    process.env.TURNSTILE_SECRET_KEY = "turnstile_test";
    process.env.TURNSTILE_ALLOWED_HOSTNAMES = "sayuru.me,www.sayuru.me";
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("rejects invalid form data before external calls", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    const response = await POST(request({ ...validBody, message: "short" }));

    expect(response.status).toBe(422);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it("silently accepts the honeypot without sending", async () => {
    const fetchSpy = jest.spyOn(global, "fetch");
    const response = await POST(request({ ...validBody, website: "spam.example" }));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body.ok).toBe(true);
    expect(fetchSpy).not.toHaveBeenCalled();
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it("requires a valid Turnstile action and hostname", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, action: "other", hostname: "sayuru.me" }),
    } as Response);

    const response = await POST(request(validBody));
    const body = await response.json();

    expect(response.status).toBe(403);
    expect(body.code).toBe("verification_failed");
    expect(mockResendSend).not.toHaveBeenCalled();
  });

  it("sends a verified inquiry once with reply-to and a stable idempotency key", async () => {
    jest.spyOn(global, "fetch").mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, action: "contact", hostname: "sayuru.me" }),
    } as Response);
    mockResendSend.mockResolvedValue({ data: { id: "email-id" }, error: null });

    const response = await POST(request(validBody));
    const body = await response.json();

    expect(response.status).toBe(200);
    expect(body).toEqual({
      ok: true,
      message: "Your message has been sent. I will reply by email.",
      reference: "B5F67C25",
    });
    expect(mockResendSend).toHaveBeenCalledWith(
      expect.objectContaining({
        from: "Sayuru Website <notify@site.sayuru.me>",
        to: "contact@sayuru.me",
        replyTo: "ada@example.com",
        subject: "[sayuru.me] Software / product from Ada Lovelace",
      }),
      { idempotencyKey: "contact/b5f67c25-e7c3-4b4c-9bbc-94e61fc2dce9" },
    );
  });
});
