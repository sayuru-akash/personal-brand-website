"use client";

import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
};

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif">
            04 — 連絡
          </span>
          <div className="flex-1 h-px bg-divider" />
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase">
            Contact
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          {/* Left — CTA */}
          <div className="lg:col-span-7">
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[3.5rem] font-semibold leading-tight tracking-tight mb-8"
            >
              Let&apos;s build something
              <br />
              <span className="text-accent jp-serif">extraordinary</span>{" "}
              together.
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-text-muted text-base md:text-lg leading-relaxed max-w-lg mb-10"
            >
              Whether it&apos;s a collaboration, a project, an idea, or just a
              conversation about code, music, or crypto — I&apos;m always open.
            </motion.p>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="mailto:hello@sayuru.me"
                className="group inline-flex items-center justify-center gap-3 bg-accent hover:bg-accent-hover text-white px-8 py-4 rounded-sm transition-colors duration-300 text-sm font-medium tracking-[0.06em]"
              >
                Get In Touch
                <svg
                  className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/sayuruakash"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 border border-divider hover:border-accent/30 px-8 py-4 rounded-sm text-text-muted hover:text-text-primary transition-all duration-300 text-sm font-medium tracking-[0.06em]"
              >
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right — Info */}
          <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end">
            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="space-y-8"
            >
              <div>
                <p className="text-[10px] tracking-[0.14em] text-text-dim uppercase mb-2 jp-serif">
                  場所 — Location
                </p>
                <p className="text-sm text-text-muted">
                  Western Province, Sri Lanka
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-text-dim uppercase mb-2 jp-serif">
                  学業 — Studies
                </p>
                <p className="text-sm text-text-muted leading-relaxed">
                  BSc Software Engineering
                  <br />
                  Plymouth University, UK
                </p>
              </div>
              <div>
                <p className="text-[10px] tracking-[0.14em] text-text-dim uppercase mb-2 jp-serif">
                  可用性 — Availability
                </p>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <p className="text-sm text-text-muted">
                    Open for opportunities
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
