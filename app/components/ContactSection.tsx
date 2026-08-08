"use client";

import {
  ArrowUpRight,
  Check,
  Copy,
  EnvelopeSimple,
} from "@phosphor-icons/react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
} from "motion/react";
import { useState } from "react";
import BrandIcon from "@/app/components/BrandIcon";
import SiteFooter from "@/app/components/SiteFooter";
import {
  CursorDotField,
  SplitWords,
} from "@/app/components/ReactBitsPrimitives";
import { contactContent } from "@/data/portfolio";

export default function ContactSection() {
  const [isCopied, setIsCopied] = useState(false);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 84,
    damping: 24,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 84,
    damping: 24,
    mass: 0.5,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setIsCopied(true);
      window.setTimeout(() => setIsCopied(false), 1800);
    } catch {
      setIsCopied(false);
    }
  };

  return (
    <section
      id="contact"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-white py-32 sm:py-40 lg:py-52"
      onPointerMove={handlePointerMove}
      aria-labelledby="contact-heading"
    >
      <div className="absolute inset-0 ink-grid opacity-24" />
      <div className="absolute inset-x-0 top-0 h-40 bg-[linear-gradient(to_bottom,rgba(248,247,244,0.78),rgba(255,255,255,0))]" />

      <motion.div
        className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-[rgba(214,58,47,0.055)] blur-3xl"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
      />

      <CursorDotField
        className="pointer-events-none opacity-70 mix-blend-multiply"
        dotRadius={1.6}
        dotSpacing={22}
        cursorRadius={230}
        pushStrength={58}
        from="rgba(214,58,47,0.44)"
        to="rgba(35,79,213,0.34)"
      />

      <div className="relative mx-auto grid min-h-[calc(100dvh-16rem)] w-full max-w-[1500px] grid-cols-1 content-center gap-24 px-5 sm:px-8 lg:grid-cols-[0.92fr_1.08fr] lg:px-10 xl:gap-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.82, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-code text-xs uppercase text-[var(--aka)]">
            Contact
          </p>
          <h2
            id="contact-heading"
            className="font-display mt-6 block max-w-[10ch] text-6xl leading-[1.02] text-[var(--ink)] sm:text-8xl lg:text-9xl"
          >
            <SplitWords text="Send the rough idea." />
          </h2>
          <p className="mt-8 max-w-[40rem] text-2xl font-semibold leading-snug text-[var(--muted)]">
            {contactContent.ctaText}
          </p>
        </motion.div>

        <motion.div
          className="self-end overflow-hidden rounded-[2.4rem] border border-[var(--ink)] bg-white p-2 paper-shadow"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.82, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="rounded-[1.85rem] bg-white p-6 sm:p-8">
            <div className="border-b border-[var(--line)] pb-8">
              <div>
                <p className="font-code text-xs uppercase text-[var(--faint)]">
                  Email
                </p>
                <a
                  href={`mailto:${contactContent.email}`}
                  className="mt-4 block break-words text-[clamp(1.45rem,5.5vw,3.3rem)] font-black leading-tight text-[var(--ink)] transition-colors duration-300 hover:text-[var(--aka)]"
                >
                  {contactContent.email}
                </a>
              </div>
            </div>

            <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <a
                href={`mailto:${contactContent.email}`}
                className="ink-button group inline-flex min-h-14 items-center justify-between rounded-full px-5 text-sm font-bold transition-transform duration-300 active:translate-y-px"
              >
                Write email
                <EnvelopeSimple className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </a>
              <motion.button
                type="button"
                onClick={handleCopyEmail}
                className="paper-button inline-flex min-h-14 items-center justify-center gap-2 rounded-full px-5 text-sm font-bold transition-colors duration-300"
                whileTap={{ scale: 0.97 }}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isCopied ? "copied" : "copy"}
                    className="inline-flex items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {isCopied ? (
                      <Check className="h-5 w-5 text-[var(--matcha)]" />
                    ) : (
                      <Copy className="h-5 w-5" />
                    )}
                    {isCopied ? "Copied" : "Copy email"}
                  </motion.span>
                </AnimatePresence>
              </motion.button>
            </div>

            <div className="mt-10 divide-y divide-[var(--line)] border-y border-[var(--line)]">
              {contactContent.socialLinks.map((link, index) => (
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="fine-link group flex items-center justify-between gap-6 py-5 transition-colors duration-300"
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{
                    duration: 0.4,
                    delay: index * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="flex items-center gap-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white transition-colors duration-300 group-hover:bg-[var(--paper-blue)]">
                      <BrandIcon name={link.platform} className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-lg font-bold">
                        {link.platform}
                      </span>
                      <span className="mt-1 block font-code text-xs text-[var(--faint)]">
                        {link.handle}
                      </span>
                    </span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-[var(--aka)] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
                </motion.a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      <div className="relative mt-20">
        <SiteFooter />
      </div>
    </section>
  );
}
