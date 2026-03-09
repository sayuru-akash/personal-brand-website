"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const values = [
  { kanji: "改善", romaji: "Kaizen", meaning: "Continuous improvement" },
  { kanji: "侘寂", romaji: "Wabi-sabi", meaning: "Beauty in imperfection" },
  { kanji: "職人", romaji: "Shokunin", meaning: "Mastery of craft" },
];

export default function Philosophy() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Giant 道 kanji — slow parallax drift upward
  const kanjiY = useTransform(scrollYProgress, [0, 1], [120, -120]);
  const kanjiOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 0.07, 0.07, 0],
  );

  // Heading entrance
  const headingY = useTransform(scrollYProgress, [0.05, 0.25], [40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.05, 0.22], [0, 1]);

  // Body text entrance (slightly delayed)
  const bodyOpacity = useTransform(scrollYProgress, [0.12, 0.28], [0, 1]);
  const bodyY = useTransform(scrollYProgress, [0.12, 0.28], [24, 0]);

  // Section label entrance
  const labelOpacity = useTransform(scrollYProgress, [0.02, 0.15], [0, 1]);
  const dividerWidth = useTransform(
    scrollYProgress,
    [0.02, 0.18],
    ["0%", "100%"],
  );

  return (
    <section
      ref={sectionRef}
      className="relative py-28 md:py-40 overflow-hidden"
    >
      {/* Large background kanji — multi-speed parallax */}
      <motion.div
        className="absolute right-0 top-1/2 text-[20rem] md:text-[28rem] font-bold text-divider select-none pointer-events-none leading-none jp-serif"
        aria-hidden="true"
        style={{ y: kanjiY, opacity: kanjiOpacity }}
      >
        道
      </motion.div>

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Section divider with scroll-animated line */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <motion.span
            style={{ opacity: labelOpacity }}
            className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif shrink-0"
          >
            03 — 哲学
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
            Philosophy
          </motion.span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-24">
          {/* Left */}
          <div>
            <motion.h2
              style={{ y: headingY, opacity: headingOpacity }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight tracking-tight mb-10"
            >
              The path is the
              <br />
              <span className="text-accent jp-serif">destination.</span>
            </motion.h2>

            <motion.div
              style={{ y: bodyY, opacity: bodyOpacity }}
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

          {/* Right — values with staggered scroll reveals */}
          <div className="flex flex-col justify-center">
            {values.map((value, i) => {
              const start = 0.2 + i * 0.08;
              const end = start + 0.15;
              return (
                <ValueRow
                  key={value.kanji}
                  value={value}
                  index={i}
                  isLast={i === values.length - 1}
                  scrollYProgress={scrollYProgress}
                  rangeStart={start}
                  rangeEnd={end}
                />
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function ValueRow({
  value,
  index,
  isLast,
  scrollYProgress,
  rangeStart,
  rangeEnd,
}: {
  value: (typeof values)[0];
  index: number;
  isLast: boolean;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  rangeStart: number;
  rangeEnd: number;
}) {
  const opacity = useTransform(scrollYProgress, [rangeStart, rangeEnd], [0, 1]);
  const x = useTransform(scrollYProgress, [rangeStart, rangeEnd], [20, 0]);
  // Each kanji drifts at a slightly different speed
  const kanjiScale = useTransform(
    scrollYProgress,
    [rangeStart, rangeEnd + 0.1],
    [0.85, 1],
  );

  return (
    <motion.div
      style={{ opacity, x }}
      className={`py-8 ${!isLast ? "border-b border-divider" : ""}`}
    >
      <div className="flex items-start gap-6">
        <motion.span
          style={{ scale: kanjiScale }}
          className="text-4xl md:text-5xl text-accent/80 shrink-0 jp-serif origin-center"
        >
          {value.kanji}
        </motion.span>
        <div className="pt-1">
          <p className="text-sm font-semibold tracking-[0.06em] text-text-primary mb-1">
            {value.romaji}
          </p>
          <p className="text-sm text-text-muted">{value.meaning}</p>
        </div>
      </div>
    </motion.div>
  );
}
