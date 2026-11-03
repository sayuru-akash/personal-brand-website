"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import BrandIcon from "@/app/components/BrandIcon";
import InteractiveSiteFooter from "@/app/components/InteractiveSiteFooter";
import Reveal from "@/app/components/Reveal";
import { contactContent } from "@/data/portfolio";

export default function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (timer.current) clearTimeout(timer.current);
    },
    [],
  );
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setIsCopied(true);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(false);
    }
  };
  return (
    <>
      <section
        id="contact"
        className="journal-wrap journal-section contact-note"
        aria-labelledby="contact-heading"
      >
        <Reveal>
          <div className="section-heading">
            <span className="micro-label">03 / Contact</span>
            <EnvelopeSimple size={18} />
          </div>
          <h2 id="contact-heading">Send the rough idea.</h2>
          <p className="section-deck">{contactContent.ctaText}</p>
          <div className="email-line">
            <a href={`mailto:${contactContent.email}`}>
              {contactContent.email}
            </a>
            <button
              type="button"
              onClick={copy}
              aria-label={isCopied ? "Email copied" : "Copy email"}
              title={isCopied ? "Copied" : "Copy email"}
            >
              {isCopied ? <Check size={19} /> : <Copy size={19} />}
            </button>
            <span role="status" className="sr-only">
              {isCopied ? "Copied" : ""}
            </span>
          </div>
          <div className="contact-actions">
            <a href={`mailto:${contactContent.email}`} className="quiet-link">
              Write email <ArrowUpRight size={15} />
            </a>
            <Link href="/contact" className="quiet-link">
              Start a conversation <ArrowUpRight size={15} />
            </Link>
          </div>
          <div className="social-index">
            {contactContent.socialLinks.map((link) => (
              <a
                href={link.url}
                key={link.platform}
                target="_blank"
                rel="noopener noreferrer"
              >
                <BrandIcon name={link.platform} className="h-4 w-4" />
                <span>{link.platform}</span>
                <span className="social-handle">{link.handle}</span>
                <ArrowUpRight size={14} />
              </a>
            ))}
          </div>
        </Reveal>
      </section>
      <InteractiveSiteFooter />
    </>
  );
}
