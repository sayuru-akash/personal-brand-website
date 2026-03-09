"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const crafts = [
  {
    num: "01",
    title: "Full-stack Development",
    jp: "フルスタック開発",
    desc: "Building robust web applications with a focus on performance and user experience. From pixel-perfect frontend to scalable backend — craftsmanship in every line of code.",
    tools: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"],
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

function CraftRow({
  craft,
  index,
}: {
  craft: (typeof crafts)[0];
  index: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: rowRef,
    offset: ["start end", "center center"],
  });

  const rowOpacity = useTransform(scrollYProgress, [0, 0.6], [0, 1]);
  const rowX = useTransform(scrollYProgress, [0, 0.6], [30, 0]);
  // Progress bar fills as you scroll to each row
  const progressWidth = useTransform(
    scrollYProgress,
    [0.2, 0.8],
    ["0%", "100%"],
  );

  return (
    <motion.div
      ref={rowRef}
      style={{ opacity: rowOpacity, x: rowX }}
      className="group hover:bg-surface/50 transition-colors duration-500 relative"
    >
      {/* Scroll progress accent bar */}
      <motion.div
        className="absolute bottom-0 left-0 h-px bg-accent/30"
        style={{ width: progressWidth }}
      />

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
          {craft.tools.map((tool, ti) => (
            <motion.span
              key={tool}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.3,
                delay: index * 0.08 + ti * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="text-[10px] tracking-[0.08em] uppercase text-text-dim px-2.5 py-1 border border-divider rounded group-hover:border-accent/15 transition-colors duration-300"
            >
              {tool}
            </motion.span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Craft() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headingX = useTransform(scrollYProgress, [0, 0.25], [-40, 0]);
  const headingOpacity = useTransform(scrollYProgress, [0.02, 0.2], [0, 1]);
  const dividerWidth = useTransform(
    scrollYProgress,
    [0.02, 0.18],
    ["0%", "100%"],
  );

  return (
    <section id="craft" ref={sectionRef} className="relative py-28 md:py-40">
      {/* Subtle bg gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-bg-warm/50 to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-7xl px-6 md:px-12">
        {/* Section divider with scroll-animated line */}
        <div className="flex items-center gap-4 mb-16 md:mb-20">
          <motion.span
            style={{ opacity: headingOpacity }}
            className="text-[10px] tracking-[0.18em] text-text-dim uppercase jp-serif shrink-0"
          >
            02 — 技術
          </motion.span>
          <div className="flex-1 h-px bg-divider relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-accent/40"
              style={{ width: dividerWidth }}
            />
          </div>
          <motion.span
            style={{ opacity: headingOpacity }}
            className="text-[10px] tracking-[0.18em] text-text-dim uppercase shrink-0"
          >
            Craft
          </motion.span>
        </div>

        <motion.h2
          style={{ x: headingX, opacity: headingOpacity }}
          className="text-3xl md:text-4xl lg:text-[2.75rem] font-semibold leading-tight tracking-tight mb-16 md:mb-20 max-w-2xl"
        >
          The disciplines I practice,
          <br />
          <span className="text-text-muted">refined through obsession.</span>
        </motion.h2>

        <div className="divide-y divide-divider border-y border-divider">
          {crafts.map((craft, i) => (
            <CraftRow key={craft.num} craft={craft} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
