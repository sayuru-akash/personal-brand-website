"use client";

import { motion } from "motion/react";

const traits = [
  { icon: "☕", label: "Coffee Maniac", jp: "珈琲中毒" },
  { icon: "🤖", label: "Team Android", jp: "アンドロイド派" },
  { icon: "⚡", label: "Tech Enthusiast", jp: "技術愛好家" },
  { icon: "₿", label: "Crypto Hodler", jp: "暗号資産" },
  { icon: "🎵", label: "Music Addict", jp: "音楽依存症" },
  { icon: "🎬", label: "Netflix Lover", jp: "ネトフリ好き" },
];

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
};

export default function About() {
  return (
    <section id="about" className="relative py-28 md:py-40">
      <div className="mx-auto max-w-7xl px-6 md:px-12">
        {/* Section divider */}
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif">
            01 — 自己紹介
          </span>
          <div className="flex-1 h-px bg-divider" />
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase">
            About
          </span>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-12">
          {/* Left column */}
          <div className="lg:col-span-6">
            <motion.h2
              {...fadeUp}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight tracking-tight mb-8"
            >
              I create things that
              <br />
              live at the intersection of{" "}
              <span className="text-accent">sound</span>,{" "}
              <span className="text-accent">code</span>, and{" "}
              <span className="text-accent">design</span>.
            </motion.h2>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-5"
            >
              <p className="text-text-muted leading-7 text-base max-w-lg">
                I&apos;m Sayuru Akash — also known as サユル アーカーシュ. A
                multi-hyphenate creative who finds harmony between melodies and
                pixels. Currently pursuing Software Engineering at Plymouth
                University while building things that matter.
              </p>
              <p className="text-text-muted leading-7 text-base max-w-lg">
                From crafting frontend interfaces to composing music, from
                designing web experiences to writing about technology — my work
                is driven by curiosity and an obsession for the details others
                overlook.
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-10 pl-4 border-l-2 border-accent/30"
            >
              <p className="text-sm text-text-dim italic tracking-wide jp-serif">
                &ldquo;一期一会&rdquo; — Every encounter is a once-in-a-lifetime
                experience
              </p>
            </motion.div>
          </div>

          {/* Right column — traits */}
          <div className="lg:col-span-5 lg:col-start-8">
            <motion.p
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="text-[10px] tracking-[0.18em] text-text-dim uppercase mb-6 jp-serif"
            >
              特徴 — Traits
            </motion.p>

            <div className="grid grid-cols-2 gap-3">
              {traits.map((trait, i) => (
                <motion.div
                  key={trait.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.06 }}
                  className="group p-4 rounded-lg border border-divider hover:border-accent/20 bg-bg-warm hover:bg-surface transition-all duration-300"
                >
                  <span className="text-lg mb-2 block">{trait.icon}</span>
                  <p className="text-sm font-medium text-text-primary mb-0.5">
                    {trait.label}
                  </p>
                  <p className="text-[10px] text-text-dim tracking-[0.12em] jp-serif">
                    {trait.jp}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="mt-5 p-4 bg-accent-soft rounded-lg border border-accent/10"
            >
              <p className="text-xs text-text-muted tracking-[0.06em]">
                <span className="text-accent font-semibold">#GITHUB</span>{" "}
                <span className="text-text-dim">·</span>{" "}
                <span className="text-accent font-semibold">#DOGE</span>{" "}
                <span className="text-text-dim ml-2">— Oh yes, those too.</span>
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
