"use client";

import {
  Buildings,
  GraduationCap,
  MapPin,
  Sparkle,
  Waveform,
} from "@phosphor-icons/react";
import Image from "next/image";
import { motion } from "motion/react";
import {
  SplitWords,
  SpotlightCard,
} from "@/app/components/ReactBitsPrimitives";
import { aboutContent } from "@/data/portfolio";

const facts = [
  {
    label: "Base",
    value: aboutContent.location,
    icon: MapPin,
    tone: "text-[var(--aka)]",
  },
  {
    label: "Study",
    value: aboutContent.education,
    icon: GraduationCap,
    tone: "text-[var(--ai)]",
  },
  {
    label: "Company",
    value: "Codezela Technologies",
    icon: Buildings,
    tone: "text-[var(--murasaki)]",
  },
  {
    label: "Parallel practice",
    value: "Music production",
    icon: Waveform,
    tone: "text-[var(--matcha)]",
  },
];

const notes = [
  "Build the product surface and the backend that makes it real.",
  "Keep design decisions close to implementation details.",
  "Use writing to make systems easier to operate.",
  "Treat sound as another interface: rhythm, texture, release.",
];

export default function AboutSection() {
  return (
    <section
      id="profile"
      className="relative isolate overflow-x-clip bg-white py-28 sm:py-36 lg:py-48"
      aria-labelledby="profile-heading"
    >
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-24 px-5 sm:px-8 lg:grid-cols-[0.82fr_1.18fr] lg:px-10 xl:gap-28">
        <motion.div
          className="lg:sticky lg:top-24 lg:self-start"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-120px" }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="font-code text-xs uppercase text-[var(--aka)]">
            Profile
          </p>
          <h2
            id="profile-heading"
            className="font-display mt-6 block max-w-[10ch] text-6xl leading-[1.02] text-[var(--ink)] sm:text-7xl md:text-8xl"
          >
            <SplitWords text="Range without noise." />
          </h2>
          <p className="mt-8 max-w-[32rem] text-lg leading-8 text-[var(--muted)]">
            Not a role collage. A working practice that moves between code,
            business, writing, and music.
          </p>
        </motion.div>

        <div className="space-y-24">
          <motion.div
            className="grid grid-cols-1 gap-12 border-t border-[var(--line)] pt-12 xl:grid-cols-[0.92fr_1.08fr]"
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="font-display text-4xl leading-tight text-[var(--murasaki)] sm:text-5xl">
              I like work that becomes real.
            </p>
            <p className="text-lg leading-8 text-[var(--muted)]">
              {aboutContent.bio}
            </p>
          </motion.div>

          <motion.div
            className="paper-shadow relative overflow-hidden rounded-[2.2rem] border border-[var(--line)] bg-white p-2"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 0.78,
              delay: 0.04,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src="/images/generated/sayuru-profile-still-life.png"
              alt="Minimal still-life visual representing software, music, writing, and studio practice"
              width={1586}
              height={992}
              className="aspect-[16/10] w-full rounded-[1.55rem] object-cover"
              sizes="(min-width: 1024px) 56vw, 92vw"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--line)] md:grid-cols-2"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-120px" }}
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.08, delayChildren: 0.05 },
              },
            }}
          >
            {facts.map((fact) => {
              const Icon = fact.icon;

              return (
                <motion.div
                  key={fact.label}
                  className="bg-white p-6 sm:p-9"
                  variants={{
                    hidden: { opacity: 0, y: 18 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
                    },
                  }}
                >
                  <Icon className={`h-6 w-6 ${fact.tone}`} weight="duotone" />
                  <p className="font-code mt-8 text-xs uppercase text-[var(--faint)]">
                    {fact.label}
                  </p>
                  <p className="mt-2 text-xl font-bold leading-snug text-[var(--ink)]">
                    {fact.value}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>

          <motion.div
            className="space-y-16 border-t border-[var(--line)] pt-14"
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-120px" }}
            transition={{
              duration: 0.78,
              delay: 0.08,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div>
              <p className="font-code text-xs uppercase text-[var(--aka)]">
                Roles
              </p>
              <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 [&>*:last-child]:sm:col-span-2">
                {aboutContent.roles.map((role, index) => (
                  <SpotlightCard
                    key={role}
                    className="min-h-32 p-6"
                    glowColor="rgba(214,58,47,0.14)"
                    tilt
                    motionProps={{
                      initial: { opacity: 0, y: 16 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true, margin: "-80px" },
                      transition: {
                        duration: 0.5,
                        delay: index * 0.06,
                        ease: [0.22, 1, 0.36, 1],
                      },
                      whileHover: { y: -4 },
                      whileTap: { scale: 0.98 },
                    }}
                  >
                    <span className="font-code text-xs text-[var(--faint)]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <p className="mt-7 text-xl font-black leading-snug text-[var(--ink)]">
                      {role}
                    </p>
                  </SpotlightCard>
                ))}
              </div>
            </div>

            <div>
              <p className="font-code text-xs uppercase text-[var(--ai)]">
                Signals
              </p>
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {aboutContent.traits.map((trait, index) => (
                  <motion.div
                    key={trait}
                    className="flex min-h-24 items-center gap-4 rounded-[1.15rem] border border-[var(--line)] bg-white p-5"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    whileHover={{ y: -2 }}
                  >
                    <Sparkle
                      className="h-5 w-5 shrink-0 text-[var(--aka)]"
                      weight="duotone"
                    />
                    <span className="text-sm font-bold leading-tight text-[var(--ink)]">
                      {trait}
                    </span>
                  </motion.div>
                ))}
              </div>
            </div>

            <div className="space-y-5">
              {notes.map((note, index) => (
                <motion.div
                  key={note}
                  className="group grid grid-cols-[3rem_1fr] items-start gap-7 border-t border-[var(--line)] py-8"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.07,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  whileHover={{ x: 8 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <span className="font-code text-xs text-[var(--aka)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <p className="text-2xl font-bold leading-snug text-[var(--ink)] transition-colors duration-300 group-hover:text-[var(--ai)]">
                    {note}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
