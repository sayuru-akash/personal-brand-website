"use client";

import { motion } from "motion/react";

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
};

const values = [
  { kanji: "改善", romaji: "Kaizen", meaning: "Continuous improvement" },
  { kanji: "侘寂", romaji: "Wabi-sabi", meaning: "Beauty in imperfection" },
  { kanji: "職人", romaji: "Shokunin", meaning: "Mastery of craft" },
];

export default function Philosophy() {
  return (
    <section className="relative py-28 md:py-40 overflow-hidden">
      {/* Large background kanji */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 text-[20rem] md:text-[28rem] font-bold text-divider select-none pointer-events-none leading-none jp-serif"
        aria-hidden="true"
      >
        道
      </div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif">
            03 — 哲学
          </span>
          <div className="flex-1 h-px bg-divider" />
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase">
            Philosophy
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Left */}
          <div>
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight tracking-tight mb-10"
            >
              The path is the
              <br />
              <span className="text-accent jp-serif">destination.</span>
            </motion.h2>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5 max-w-md"
            >
              <p className="text-text-muted leading-7">
                I believe in the Japanese concept of{" "}
                <strong className="text-text-primary font-medium">
                  kaizen
                </strong>{" "}
                — continuous improvement. Not perfection, but relentless
                refinement. Every line of code, every note composed, every word
                written is a step forward.
              </p>
              <p className="text-text-muted leading-7">
                In a world obsessed with shipping fast, I choose to ship{" "}
                <em>right</em>. Quality over quantity. Depth over breadth.
                Substance over noise.
              </p>
            </motion.div>
          </div>

          {/* Right — values */}
          <div className="flex flex-col justify-center">
            {values.map((value, i) => (
              <motion.div
                key={value.kanji}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.15 + i * 0.1 }}
                className={`py-8 ${i < values.length - 1 ? "border-b border-divider" : ""}`}
              >
                <div className="flex items-start gap-6">
                  <span className="text-4xl md:text-5xl text-accent/80 shrink-0 jp-serif">
                    {value.kanji}
                  </span>
                  <div className="pt-1">
                    <p className="text-sm font-semibold tracking-[0.06em] text-text-primary mb-1">
                      {value.romaji}
                    </p>
                    <p className="text-sm text-text-muted">{value.meaning}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
