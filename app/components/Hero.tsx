"use client";

import { motion } from "motion/react";

const roles = [
  "Musical Artist",
  "Frontend Developer",
  "Web Designer",
  "Content Writer",
  "Investor",
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Vertical JP text — left edge */}
      <div className="vertical-jp absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:block select-none">
        音楽家・開発者・デザイナー
      </div>

      {/* Vertical line — right */}
      <div className="absolute right-10 md:right-14 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-divider to-transparent hidden md:block" />

      {/* Circle motifs */}
      <div className="absolute -right-32 top-1/4 w-64 h-64 md:w-96 md:h-96 rounded-full border border-divider opacity-40" />
      <div className="absolute -right-16 top-1/3 w-40 h-40 md:w-56 md:h-56 rounded-full border border-accent/10" />

      {/* Content */}
      <div className="mx-auto max-w-7xl px-6 md:px-12 w-full pt-32 md:pt-0">
        <div className="max-w-3xl">
          {/* JP subtitle */}
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[11px] tracking-[0.2em] text-text-dim mb-8 uppercase jp-serif"
          >
            サユル アーカーシュ — 西部州、スリランカ
          </motion.p>

          {/* Main heading */}
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold leading-[1.05] tracking-tight mb-10"
          >
            <span className="text-text-primary">SAYURU</span>
            <br />
            <span className="text-text-primary">AKA</span>
            <span className="text-accent ml-4 jp-serif">詩</span>
            <span className="text-text-muted font-light ml-2 text-[clamp(1.2rem,3vw,2rem)] jp-serif">
              SH
            </span>
          </motion.h1>

          {/* Red divider line */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="h-px bg-accent mb-10"
          />

          {/* Role tags */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="flex flex-wrap gap-3 mb-14"
          >
            {roles.map((role) => (
              <span
                key={role}
                className="text-[11px] tracking-[0.1em] uppercase text-text-muted px-4 py-2 border border-divider rounded-full hover:border-accent/30 hover:text-text-primary transition-all duration-300 cursor-default"
              >
                {role}
              </span>
            ))}
          </motion.div>

          {/* Bio */}
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-base md:text-lg text-text-muted leading-relaxed max-w-xl font-light"
          >
            A multidisciplinary creative based in Western, Sri Lanka — composing
            melodies, crafting interfaces, and investing in the future. Software
            Engineering undergraduate at Plymouth University, UK.
          </motion.p>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="mt-24 flex items-center gap-3"
          >
            <div
              className="w-px h-8 bg-text-dim"
              style={{ animation: "float 3s ease-in-out infinite" }}
            />
            <span className="text-[10px] tracking-[0.14em] uppercase text-text-dim">
              Scroll to explore
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
