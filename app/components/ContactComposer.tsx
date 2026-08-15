"use client";

import { Check, CheckCircle, Copy, PaperPlaneTilt, SpinnerGap, WarningCircle } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useRef, useState } from "react";
import TurnstileWidget, { type TurnstileHandle } from "@/app/components/TurnstileWidget";
import { contactContent, contactTopics } from "@/data/portfolio";
import type { ContactApiResponse } from "@/types/contact";

const fieldClassName =
  "mt-3 w-full border-0 border-b border-[var(--line)] bg-transparent px-0 pb-4 text-lg font-bold text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--aka)] focus:ring-0 disabled:cursor-wait disabled:opacity-60";

const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

type SubmissionStatus = "idle" | "submitting" | "success" | "error";

export default function ContactComposer() {
  const [isCopied, setIsCopied] = useState(false);
  const [status, setStatus] = useState<SubmissionStatus>("idle");
  const [feedback, setFeedback] = useState("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef<TurnstileHandle>(null);
  const submissionIdRef = useRef<string | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(false);
    }
  };

  const handleFormInput = () => {
    if (status === "submitting") {
      return;
    }

    submissionIdRef.current = null;
    if (status !== "idle") {
      setStatus("idle");
      setFeedback("");
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!turnstileToken || status === "submitting") {
      setStatus("error");
      setFeedback("Please wait for the security check to finish, then send again.");
      return;
    }

    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    const submissionId = submissionIdRef.current ?? window.crypto.randomUUID();
    submissionIdRef.current = submissionId;
    setStatus("submitting");
    setFeedback("Sending your message securely.");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          topic: String(form.get("topic") ?? ""),
          message: String(form.get("message") ?? ""),
          website: String(form.get("website") ?? ""),
          turnstileToken,
          submissionId,
        }),
      });

      const result = (await response.json().catch(() => null)) as ContactApiResponse | null;
      if (!response.ok || !result?.ok) {
        throw new Error(
          result && !result.ok
            ? result.message
            : "The message could not be delivered. Please try again.",
        );
      }

      formElement.reset();
      submissionIdRef.current = null;
      setStatus("success");
      setFeedback(`${result.message} Reference ${result.reference}.`);
    } catch (error) {
      setStatus("error");
      setFeedback(
        error instanceof Error
          ? error.message
          : "The message could not be delivered. Please try again.",
      );
    } finally {
      setTurnstileToken("");
      turnstileRef.current?.reset();
    }
  };

  const isSubmitting = status === "submitting";
  const isReady = Boolean(turnstileSiteKey && turnstileToken) && !isSubmitting;

  return (
    <div className="border-t border-[var(--ink)] pt-8 sm:pt-10">
      <div className="flex flex-col gap-5 border-b border-[var(--line)] pb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-code text-xs uppercase text-[var(--faint)]">Direct email</p>
          <a
            href={`mailto:${contactContent.email}`}
            className="mt-3 block break-words text-[clamp(1.55rem,4vw,2.65rem)] font-black leading-tight text-[var(--ink)] transition-colors duration-300 hover:text-[var(--aka)]"
          >
            {contactContent.email}
          </a>
        </div>
        <button
          type="button"
          onClick={handleCopyEmail}
          className="paper-button inline-flex min-h-12 shrink-0 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isCopied ? "copied" : "copy"}
              className="inline-flex items-center gap-2"
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.18 }}
            >
              {isCopied ? (
                <Check className="h-5 w-5 text-[var(--matcha)]" />
              ) : (
                <Copy className="h-5 w-5" />
              )}
              {isCopied ? "Copied" : "Copy email"}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>

      <form className="mt-12" onSubmit={handleSubmit} onInput={handleFormInput}>
        <fieldset className="space-y-10" disabled={isSubmitting}>
          <legend className="sr-only">Send a message to Sayuru</legend>
          <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
            <label className="font-code text-xs uppercase text-[var(--muted)]">
              Name
              <input
                className={fieldClassName}
                type="text"
                name="name"
                autoComplete="name"
                placeholder="Your name"
                maxLength={100}
                required
              />
            </label>
            <label className="font-code text-xs uppercase text-[var(--muted)]">
              Email
              <input
                className={fieldClassName}
                type="email"
                name="email"
                autoComplete="email"
                placeholder="you@example.com"
                maxLength={254}
                required
              />
            </label>
          </div>

          <label className="block font-code text-xs uppercase text-[var(--muted)]">
            Topic
            <select className={fieldClassName} name="topic" defaultValue={contactTopics[0]}>
              {contactTopics.map((topic) => (
                <option key={topic} value={topic}>
                  {topic}
                </option>
              ))}
            </select>
          </label>

          <label className="block font-code text-xs uppercase text-[var(--muted)]">
            Message
            <textarea
              className={`${fieldClassName} min-h-36 resize-y leading-8`}
              name="message"
              placeholder="What are you making, and where can I help?"
              minLength={10}
              maxLength={5000}
              required
            />
          </label>

          <label className="sr-only" aria-hidden="true">
            Website
            <input name="website" type="text" tabIndex={-1} autoComplete="off" />
          </label>

          <div className="grid gap-7 border-t border-[var(--line)] pt-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <div className="min-w-0">
              <TurnstileWidget
                ref={turnstileRef}
                siteKey={turnstileSiteKey}
                onVerify={(token) => {
                  setTurnstileToken(token);
                  if (status === "error") {
                    setStatus("idle");
                    setFeedback("");
                  }
                }}
                onExpire={() => setTurnstileToken("")}
                onError={() => {
                  setTurnstileToken("");
                  setStatus("error");
                  setFeedback("Security verification is unavailable. Please try again or use direct email.");
                }}
              />
              <p className="mt-2 max-w-lg text-sm leading-6 text-[var(--muted)]">
                Your message goes directly to {contactContent.email}. See the{" "}
                <a className="fine-link font-bold" href="/privacy-policy">
                  privacy policy
                </a>
                .
              </p>
              <div
                id="contact-form-status"
                className={`mt-4 flex min-h-7 items-start gap-2 text-sm font-bold leading-6 ${
                  status === "success"
                    ? "text-[var(--matcha)]"
                    : status === "error"
                      ? "text-[var(--aka)]"
                      : "text-[var(--muted)]"
                }`}
                role={status === "error" ? "alert" : "status"}
                aria-live="polite"
              >
                {status === "success" ? <CheckCircle className="mt-0.5 h-5 w-5 shrink-0" /> : null}
                {status === "error" ? <WarningCircle className="mt-0.5 h-5 w-5 shrink-0" /> : null}
                {feedback ? <span>{feedback}</span> : null}
              </div>
            </div>

            <button
              type="submit"
              disabled={!isReady}
              aria-describedby="contact-form-status"
              className="ink-button group inline-flex min-h-14 w-full items-center justify-center gap-3 rounded-full px-7 text-sm font-bold disabled:cursor-not-allowed disabled:opacity-45 lg:w-auto"
            >
              {isSubmitting ? "Sending message" : turnstileToken ? "Send message" : "Verifying"}
              {isSubmitting ? (
                <SpinnerGap className="h-5 w-5 animate-spin" />
              ) : (
                <PaperPlaneTilt className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              )}
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
}
