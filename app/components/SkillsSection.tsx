"use client";

import {
  AnimatePresence,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import Image from "next/image";
import { useMemo, useState } from "react";
import BrandIcon, { hasBrandIcon } from "@/app/components/BrandIcon";
import {
  SplitWords,
  SpotlightCard,
} from "@/app/components/ReactBitsPrimitives";
import { skillCategories } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const stackNotes: Record<string, string> = {
  development:
    "The main bench: interfaces, APIs, data, deploys, and the small fixes that make a product feel finished.",
  design:
    "Spacing, hierarchy, prototypes, motion, and handoff decisions that survive implementation.",
  "music-production":
    "Arrangement, sound design, engineering, mix decisions, and the habit of listening until something feels right.",
  "content-writing":
    "Technical writing, docs, and public notes that make complicated systems easier to use.",
  investment:
    "Crypto and market research with attention to risk, timing, and what not to touch.",
};

const categoryTone: Record<string, string> = {
  development: "var(--aka)",
  design: "var(--ai)",
  "music-production": "var(--murasaki)",
  "content-writing": "var(--matcha)",
  investment: "var(--ink)",
};

export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();
  const [activeId, setActiveId] = useState(skillCategories[0]?.id ?? "");
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 110, damping: 24, mass: 0.4 });
  const smoothY = useSpring(mouseY, { stiffness: 110, damping: 24, mass: 0.4 });
  const rotateX = useTransform(
    smoothY,
    [-220, 220],
    prefersReducedMotion ? [0, 0] : [7, -7],
  );
  const rotateY = useTransform(
    smoothX,
    [-220, 220],
    prefersReducedMotion ? [0, 0] : [-7, 7],
  );

  const activeCategory = useMemo(
    () =>
      skillCategories.find((category) => category.id === activeId) ??
      skillCategories[0]!,
    [activeId],
  );

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left - rect.width / 2);
    mouseY.set(event.clientY - rect.top - rect.height / 2);
  };

  const handleLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="stack"
      className="relative isolate overflow-hidden bg-white py-32 text-[var(--ink)] sm:py-40 lg:py-52"
      aria-labelledby="stack-heading"
    >
      <div className="absolute inset-0 ink-grid opacity-25" />
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[rgba(238,244,255,0.72)] blur-3xl" />
      <div className="absolute -left-24 bottom-24 h-72 w-72 rounded-full bg-[rgba(214,58,47,0.07)] blur-3xl" />

      <div className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-24 px-5 sm:px-8 lg:grid-cols-[0.72fr_1.28fr] lg:px-10 xl:gap-28">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-code text-xs uppercase text-[var(--aka)]">Stack</p>
          <h2
            id="stack-heading"
            className="font-display mt-6 block max-w-[9ch] text-6xl leading-[0.9] text-[var(--ink)] sm:text-7xl md:text-8xl"
          >
            <SplitWords text="Tools" />
          </h2>
          <p className="mt-8 max-w-[31rem] text-lg leading-8 text-[var(--muted)]">
            The stack changes by discipline because each mode asks for a
            different rhythm.
          </p>
          <motion.div
            className="mt-16 hidden overflow-hidden rounded-[2rem] border border-[var(--line)] bg-white p-2 lg:block"
            initial={{ opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 0.76,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/images/generated/sayuru-stack-interface.png"
              alt="Abstract interface composition for Sayuru's technical stack"
              width={1254}
              height={1254}
              className="aspect-square w-full rounded-[1.45rem] object-cover"
              sizes="(min-width: 1024px) 32vw, 90vw"
            />
          </motion.div>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 xl:grid-cols-[0.66fr_1.34fr]">
          <motion.div
            className="divide-y divide-[var(--line)] border-y border-[var(--line)]"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.06, delayChildren: 0.06 },
              },
            }}
          >
            {skillCategories.map((category, index) => {
              const isActive = category.id === activeId;

              return (
                <motion.button
                  key={category.id}
                  type="button"
                  className="group relative flex w-full items-center justify-between gap-5 py-7 text-left"
                  onMouseEnter={() => setActiveId(category.id)}
                  onFocus={() => setActiveId(category.id)}
                  onClick={() => setActiveId(category.id)}
                  variants={{
                    hidden: { opacity: 0, y: 14 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isActive && (
                    <motion.span
                      layoutId="stack-active-dot"
                      className="absolute -left-5 top-1/2 h-3 w-3 -translate-y-1/2 rounded-full"
                      style={{ background: categoryTone[category.id] }}
                      transition={{
                        type: "spring",
                        stiffness: 320,
                        damping: 26,
                      }}
                    />
                  )}
                  <span>
                    <span className="font-code block text-xs text-[var(--faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="mt-2 block text-2xl font-bold text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--aka)]">
                      {category.title}
                    </span>
                  </span>
                  <span className="font-code text-xs text-[var(--faint)]">
                    {category.skills.length}
                  </span>
                </motion.button>
              );
            })}
          </motion.div>

          <motion.div
            className="paper-shadow relative min-h-[40rem] overflow-hidden rounded-[2.2rem] border border-[var(--ink)] bg-white p-2"
            style={{ rotateX, rotateY, transformPerspective: 900 }}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 0.78,
              delay: 0.12,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div className="relative flex h-full flex-col overflow-hidden rounded-[1.65rem] bg-[var(--paper)] text-[var(--ink)]">
              <div
                className="absolute inset-x-0 top-0 h-2"
                style={{ background: categoryTone[activeCategory.id] }}
              />
              <div className="flex items-start justify-between gap-8 border-b border-[var(--line)] p-7 sm:p-9">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory.id}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.24 }}
                  >
                    <p className="font-code text-xs uppercase text-[var(--faint)]">
                      active
                    </p>
                    <h3 className="mt-4 text-4xl font-black leading-none text-[var(--ink)] sm:text-5xl">
                      {activeCategory.title}
                    </h3>
                  </motion.div>
                </AnimatePresence>
                <div className="hidden h-16 w-16 place-items-center rounded-full border border-[var(--line)] bg-white md:grid">
                  <BrandIcon
                    name={
                      activeCategory.skills.find(hasBrandIcon) ??
                      activeCategory.skills[0] ??
                      ""
                    }
                    className="h-8 w-8"
                  />
                </div>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory.id}
                  className="flex flex-1 flex-col justify-between gap-12 p-7 sm:p-9"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -16 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="max-w-[44rem] text-xl font-semibold leading-8 text-[var(--ink)] sm:text-2xl sm:leading-snug">
                    {stackNotes[activeCategory.id]}
                  </p>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {activeCategory.skills.map((skill, index) => (
                      <SpotlightCard
                        key={skill}
                        className="min-h-32 p-5"
                        glowColor="rgba(35,79,213,0.16)"
                        motionProps={{
                          initial: { opacity: 0, y: 14 },
                          animate: { opacity: 1, y: 0 },
                          transition: { duration: 0.28, delay: index * 0.025 },
                          whileHover: { y: -3 },
                          whileTap: { scale: 0.98 },
                        }}
                      >
                        <BrandIcon
                          name={skill}
                          className="h-6 w-6 text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--ai)]"
                        />
                        <p className="mt-6 text-sm font-bold leading-tight text-[var(--ink)]">
                          {skill}
                        </p>
                      </SpotlightCard>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
