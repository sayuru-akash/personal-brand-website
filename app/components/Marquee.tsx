"use client";

import { motion } from "motion/react";

const items = [
  "FRONTEND",
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
  const repeated = [...items, ...items, ...items, ...items];

  return (
    <div className="relative py-10 overflow-hidden border-y border-divider">
      <motion.div
        animate={{ x: [0, -1920] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="flex gap-10 whitespace-nowrap"
      >
        {repeated.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className={`text-2xl md:text-4xl font-light tracking-[0.08em] shrink-0 ${
              i % 2 === 0 ? "text-text-dim" : "text-accent/40 jp-serif"
            }`}
          >
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}
