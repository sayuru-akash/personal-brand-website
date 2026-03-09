"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const items = [
  "FULL-STACK",
  "フロントエンド",
  "DESIGN",
  "デザイン",
  "MUSIC",
  "音楽",
  "CODE",
  "コード",
  "CREATE",
  "創造",
];

export default function Marquee() {
  const ref = useRef<HTMLDivElement>(null);
  const repeated = [...items, ...items, ...items, ...items];

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  // Scroll-velocity effect: text shifts based on scroll position
  const x1 = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-300, 300]);
  const sectionOpacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0, 1, 1, 0],
  );

  return (
    <div
      ref={ref}
      className="relative py-14 md:py-20 overflow-hidden border-y border-divider"
    >
      <motion.div style={{ opacity: sectionOpacity }}>
        {/* Row 1 — moves left on scroll */}
        <motion.div
          style={{ x: x1 }}
          className="flex gap-10 whitespace-nowrap mb-6"
        >
          {repeated.map((item, i) => (
            <span
              key={`r1-${item}-${i}`}
              className={`text-2xl md:text-5xl font-light tracking-[0.08em] shrink-0 ${
                i % 2 === 0 ? "text-text-dim/60" : "text-accent/30 jp-serif"
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Row 2 — moves right on scroll (counter-direction) */}
        <motion.div style={{ x: x2 }} className="flex gap-10 whitespace-nowrap">
          {[...repeated].reverse().map((item, i) => (
            <span
              key={`r2-${item}-${i}`}
              className={`text-lg md:text-3xl font-extralight tracking-[0.12em] shrink-0 ${
                i % 2 === 0 ? "text-text-dim/30" : "text-accent/15 jp-serif"
              }`}
            >
              {item}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}
