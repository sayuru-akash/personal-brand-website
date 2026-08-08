"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  PaperPlaneTilt,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { type FormEvent, useState } from "react";
import { contactContent, contactTopics } from "@/data/portfolio";

const fieldClassName =
  "mt-3 w-full border-0 border-b border-[var(--line)] bg-transparent px-0 pb-4 text-lg font-bold text-[var(--ink)] outline-none transition-colors placeholder:text-[var(--faint)] focus:border-[var(--aka)] focus:ring-0";

export default function ContactComposer() {
  const [isCopied, setIsCopied] = useState(false);
  const [isOpening, setIsOpening] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(false);
    }
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    const topic = String(form.get("topic") ?? "General inquiry");
    const message = String(form.get("message") ?? "").trim();
    const subject = `${topic} inquiry from ${name}`;
    const body = [`Name: ${name}`, `Email: ${email}`, "", message].join("\n");

    setIsOpening(true);
    window.location.href = `mailto:${contactContent.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
    window.setTimeout(() => setIsOpening(false), 1600);
  };

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

      <form className="mt-12 space-y-10" onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2">
          <label className="font-code text-xs uppercase text-[var(--muted)]">
            Name
            <input
              className={fieldClassName}
              type="text"
              name="name"
              autoComplete="name"
              placeholder="Your name"
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
            required
          />
        </label>

        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-md text-sm leading-6 text-[var(--muted)]">
            This opens a prepared message in your email app. Nothing is stored on this website.
          </p>
          <button
            type="submit"
            className="ink-button group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-sm font-bold"
          >
            {isOpening ? "Opening email" : "Prepare email"}
            {isOpening ? (
              <ArrowUpRight className="h-5 w-5" />
            ) : (
              <PaperPlaneTilt className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
