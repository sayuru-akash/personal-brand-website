import {
  contactSubmissionSchema,
  renderContactEmailHtml,
  renderContactEmailText,
} from "@/lib/contact";

const validSubmission = {
  name: "Ada Lovelace",
  email: "ada@example.com",
  topic: "Software / product" as const,
  message: "I would like to discuss a useful product system.",
  turnstileToken: "verified-token",
  submissionId: "b5f67c25-e7c3-4b4c-9bbc-94e61fc2dce9",
  website: "",
};

describe("contact submissions", () => {
  it("accepts a bounded, known contact topic", () => {
    expect(contactSubmissionSchema.safeParse(validSubmission).success).toBe(true);
  });

  it("rejects unknown fields, topics, and short messages", () => {
    expect(
      contactSubmissionSchema.safeParse({
        ...validSubmission,
        topic: "Unknown",
        message: "Short",
        admin: true,
      }).success,
    ).toBe(false);
  });

  it("escapes untrusted values in the HTML email and keeps a plain-text alternative", () => {
    const input = {
      ...validSubmission,
      name: "<script>alert('x')</script>",
      message: "First line\n<img src=x onerror=alert(1)>",
      reference: "B5F67C25",
      submittedAt: new Date("2026-08-15T10:00:00.000Z"),
    };

    const html = renderContactEmailHtml(input);
    const text = renderContactEmailText(input);

    expect(html).not.toContain("<script>alert");
    expect(html).not.toContain("<img src=x");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("First line<br />&lt;img");
    expect(text).toContain("<script>alert('x')</script>");
    expect(text).toContain("Reference: B5F67C25");
  });
});
