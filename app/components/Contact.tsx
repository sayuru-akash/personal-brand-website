"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Label + divider
  const labelOpacity = useTransform(scrollYProgress, [0.02, 0.15], [0, 1]);
  const dividerWidth = useTransform(
    scrollYProgress,
    [0.02, 0.18],
    ["0%", "100%"],
  );

  // Heading scale-up entrance
  const headingScale = useTransform(scrollYProgress, [0.05, 0.25], [0.92, 1]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.25], [30, 0]);

  // Body text
  const bodyOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.12, 0.28], [20, 0]);

  // Buttons stagger
  const btn1Opacity = useTransform(scrollYProgress, [0.18, 0.32], [0, 1]);
  const btn1Y = useTransform(scrollYProgress, [0.18, 0.32], [16, 0]);
  const btn2Opacity = useTransform(scrollYProgress, [0.22, 0.36], [0, 1]);
  const btn2Y = useTransform(scrollYProgress, [0.22, 0.36], [16, 0]);

  // Right column info
  const infoOpacity = useTransform(scrollYProgress, [0.2, 0.35], [0, 1]);
  const infoX = useTransform(scrollYProgress, [0.2, 0.35], [20, 0]);

  return (
    <section id="contact" ref={sectionRef} className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section divider with scroll-animated line */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <motion.span
            style={{ opacity: labelOpacity }}
            className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif shrink-0"
          >
            04 — 連絡
          </motion.span>
          <div className="flex-1 h-px bg-divider relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent/40"
              style={{ width: dividerWidth }}
            />
          </div>
          <motion.span
            style={{ opacity: labelOpacity }}
            className="text-[10px] tracking-[0.18em] text-text-dim uppercase shrink-0"
          >
            Contact
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          {/* Left — CTA */}
          <div className="lg:col-span-7">
            <motion.h2
              style={{
                scale: headingScale,
                opacity: headingOpacity,
                y: headingY,
              }}
              className="text-3xl md:text-4xl lg:text-[3.5rem] font-semibold leading-tight tracking-tight mb-8 origin-left"
            >
              Let&apos;s build something
              <br />
              <span className="text-accent jp-serif">extraordinary</span>{" "}
              together.
            </motion.h2>

            <motion.p
              style={{ opacity: bodyOpacity, y: bodyY }}
              className="text-text-muted text-base md:text-lg leading-relaxed max-w-lg mb-10"
            >
              Whether it&apos;s a collaboration, a project, an idea, or just a
              conversation about code, music, or crypto — I&apos;m always open.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="mailto:hello@sayuru.me"
                style={{ opacity: btn1Opacity, y: btn1Y }}
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
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/sayuruakash"
                target="_blank"
                rel="noopener noreferrer"
                style={{ opacity: btn2Opacity, y: btn2Y }}
                className="inline-flex items-center justify-center gap-3 border border-divider hover:border-accent/30 px-8 py-4 rounded-sm text-text-muted hover:text-text-primary transition-all duration-300 text-sm font-medium tracking-[0.06em]"
              >
                LinkedIn
              </motion.a>
            </div>
          </div>

          {/* Right — Info */}
          <motion.div
            style={{ opacity: infoOpacity, x: infoX }}
            className="lg:col-span-4 lg:col-start-9 flex flex-col justify-end"
          >
            <div className="space-y-8">
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
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
