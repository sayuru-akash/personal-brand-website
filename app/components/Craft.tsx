"use client";

import { motion } from "motion/react";

const crafts = [
  {
    num: "01",
    title: "Frontend Development",
    jp: "フロントエンド開発",
    desc: "Building performant, accessible web interfaces with React, Next.js, and modern tooling. Pixel-perfect implementations that breathe.",
    tools: ["React", "Next.js", "TypeScript", "Tailwind"],
  },
  {
    num: "02",
    title: "Web Design",
    jp: "ウェブデザイン",
    desc: "Designing digital experiences that balance aesthetics with usability. Every spacing decision, every colour choice — intentional.",
    tools: ["Figma", "Adobe XD", "CSS", "Motion"],
  },
  {
    num: "03",
    title: "Music Production",
    jp: "音楽制作",
    desc: "Composing and producing original music. From ambient soundscapes to electronic beats — finding rhythm in everything.",
    tools: ["FL Studio", "Ableton", "MIDI", "Mixing"],
  },
  {
    num: "04",
    title: "Content & Writing",
    jp: "コンテンツ制作",
    desc: "Crafting words that inform, inspire, and convert. Technical writing, creative content, and everything in between.",
    tools: ["Blogging", "Copywriting", "SEO", "Storytelling"],
  },
];

const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" } as const,
};

export default function Craft() {
  return (
    <section id="craft" className="relative py-28 md:py-40">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-warm/50 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        <motion.div
          {...fadeUp}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-4 mb-16 md:mb-20"
        >
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif">
            02 — 技術
          </span>
          <div className="flex-1 h-px bg-divider" />
          <span className="text-[10px] tracking-[0.18em] text-text-dim uppercase">
            Craft
          </span>
        </motion.div>

        <motion.h2
          {...fadeUp}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight tracking-tight mb-16 md:mb-20 max-w-2xl"
        >
          The disciplines I practice,
          <br />
          <span className="text-text-muted">refined through obsession.</span>
        </motion.h2>

        <div className="divide-y divide-divider border-y border-divider">
          {crafts.map((craft, i) => (
            <motion.div
              key={craft.num}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="group hover:bg-surface/50 transition-colors duration-500"
            >
              <div className="py-8 md:py-10 grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 items-start md:items-center">
                <div className="md:col-span-1">
                  <span className="text-[11px] text-text-dim font-mono tracking-widest">
                    {craft.num}
                  </span>
                </div>

                <div className="md:col-span-3">
                  <h3 className="text-lg font-semibold tracking-[0.02em] text-text-primary group-hover:text-accent transition-colors duration-300">
                    {craft.title}
                  </h3>
                  <p className="text-[10px] tracking-[0.14em] text-text-dim mt-1 jp-serif">
                    {craft.jp}
                  </p>
                </div>

                <div className="md:col-span-5">
                  <p className="text-sm text-text-muted leading-relaxed">
                    {craft.desc}
                  </p>
                </div>

                <div className="md:col-span-3 flex flex-wrap gap-2 mt-2 md:mt-0">
                  {craft.tools.map((tool) => (
                    <span
                      key={tool}
                      className="text-[10px] tracking-[0.08em] uppercase text-text-dim px-2.5 py-1 border border-divider rounded group-hover:border-accent/15 transition-colors duration-300"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
