"use client";

import Image from "next/image";
import { ArrowDown } from "@phosphor-icons/react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import BrandIcon from "@/app/components/BrandIcon";
import DeferredSignalLottie from "@/app/components/DeferredSignalLottie";
import SiteHeader from "@/app/components/SiteHeader";
import {
  MagnetLines,
  RoleTicker,
  ShinyText,
} from "@/app/components/ReactBitsPrimitives";
import { aboutContent, heroContent } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const toolStrip = ["Next.js", "React", "TypeScript", "Figma", "PostgreSQL"];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const copyY = useTransform(scrollYProgress, [0, 1], [0, -72]);
  const visualY = useTransform(scrollYProgress, [0, 1], [0, -36]);
  const washY = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="relative isolate min-h-[100dvh] overflow-hidden bg-white"
      aria-labelledby="hero-heading"
    >
      <div className="absolute inset-0 ink-grid opacity-30" />
      <motion.div
        className="absolute -right-24 top-0 h-[28rem] w-[42rem] rounded-bl-[12rem] bg-[rgba(238,244,255,0.58)]"
        style={{ y: washY }}
      />
      <div className="absolute left-0 top-0 h-full w-1 bg-[var(--aka)]/90 sm:w-1.5" />
      <svg
        className="absolute inset-x-0 bottom-0 h-20 w-full text-[var(--aka)]"
        viewBox="0 0 1440 120"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 78C174 44 295 103 471 70C648 37 764 24 934 63C1112 104 1266 42 1440 65"
          stroke="currentColor"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.86"
        />
      </svg>

      {!prefersReducedMotion && (
        <motion.div
          className="absolute right-[12vw] top-[18vh] h-2.5 w-2.5 rounded-full bg-[var(--ai)]"
          animate={{ y: [0, 20, 0], scale: [1, 1.55, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      <SiteHeader />

      <div className="relative z-20 mx-auto grid min-h-[calc(100dvh-148px)] w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-5 pb-20 pt-10 sm:px-8 md:min-h-[calc(100dvh-90px)] lg:grid-cols-[minmax(0,0.96fr)_minmax(24rem,0.64fr)] lg:gap-24 lg:px-10 lg:pb-28 lg:pt-14 xl:gap-28">
        <motion.div className="max-w-[60rem]" style={{ y: copyY }}>
          <motion.p
            className="font-code text-xs uppercase text-[var(--muted)]"
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
          >
            {aboutContent.location} / Codezela Technologies
          </motion.p>

          <motion.p
            className="mt-4 text-lg font-bold text-[var(--aka)] sm:text-xl"
            initial={{ opacity: 1, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.72,
              delay: 0.05,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {heroContent.nameJapanese}
          </motion.p>

          <motion.h1
            id="hero-heading"
            className="font-display mt-8 max-w-full text-[clamp(2.75rem,12vw,4.6rem)] leading-[1.01] text-[var(--ink)] sm:text-[clamp(4.4rem,7vw,6.25rem)]"
            initial={{ opacity: 1, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.88,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <span className="block">Sayuru</span>
            <span className="block">Akash</span>
            <span className="block text-[clamp(2.1rem,9vw,3.7rem)] text-[var(--ai)] sm:text-[clamp(3.2rem,5.95vw,5.35rem)]">
              Amarasinghe
            </span>
          </motion.h1>

          <motion.div
            className="mt-12 grid max-w-[58rem] grid-cols-1 gap-8 border-y border-[var(--line)] py-9 sm:py-10 xl:grid-cols-[minmax(18rem,0.72fr)_minmax(0,1.28fr)] xl:gap-14"
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.82,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <div>
              <p className="font-code text-xs uppercase text-[var(--faint)]">
                Current mode
              </p>
              <RoleTicker
                roles={heroContent.roles}
                className="font-display mt-4 min-h-[3.6rem] text-3xl leading-[1.08] text-[var(--aka)] sm:min-h-[5.8rem] sm:text-4xl lg:text-[2.65rem]"
              />
              <p className="font-code mt-4 text-xs uppercase text-[var(--muted)]">
                <ShinyText
                  color="var(--muted)"
                  shineColor="var(--ai)"
                  speed={4.2}
                >
                  {heroContent.role}
                </ShinyText>
              </p>
            </div>
            <p className="max-w-[45rem] text-xl font-semibold leading-9 text-[var(--muted)] sm:text-2xl sm:leading-10">
              {heroContent.subtitle} I work across product interfaces,
              full-stack systems, writing, and sound.
            </p>
          </motion.div>

          <motion.ul
            className="mt-10 flex max-w-[56rem] flex-wrap gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.78,
              delay: 0.25,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {heroContent.signalTags.map((tag, index) => (
              <motion.li
                key={tag}
                className="paper-button inline-flex h-10 items-center rounded-full px-4 font-code text-xs uppercase"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.42,
                  delay: 0.28 + index * 0.035,
                  ease: [0.22, 1, 0.36, 1],
                }}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.96 }}
              >
                {tag}
              </motion.li>
            ))}
          </motion.ul>

          <motion.div
            className="mt-8 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.78,
              delay: 0.28,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {toolStrip.map((tool) => (
              <span
                key={tool}
                className="paper-button inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold transition-colors duration-300"
              >
                <BrandIcon name={tool} className="h-4 w-4" />
                {tool}
              </span>
            ))}
          </motion.div>
        </motion.div>

        <motion.div className="relative" style={{ y: visualY }}>
          <div className="relative mx-auto max-w-[32rem] lg:mr-0">
            <MagnetLines
              className="absolute -right-10 -top-10 hidden h-52 w-52 opacity-40 lg:grid"
              rows={7}
              columns={7}
              lineColor="var(--ai)"
              lineWidth="2px"
              lineHeight="28px"
            />
            <div className="paper-shadow relative overflow-hidden rounded-[2.25rem] border border-[var(--ink)] bg-white p-2">
              <Image
                src="/images/generated/sayuru-hero-portrait.png"
                alt="Abstract portrait illustration for Sayuru Akash Amarasinghe"
                width={1122}
                height={1402}
                priority
                quality={65}
                sizes="(min-width: 1024px) 36vw, (min-width: 640px) 512px, calc(100vw - 40px)"
                className="aspect-[4/5] w-full rounded-[1.6rem] object-cover"
              />
            </div>

            <div className="absolute -bottom-5 -left-3 grid h-28 w-28 place-items-center rounded-[1.3rem] border border-[var(--line)] bg-[rgba(255,255,255,0.88)] backdrop-blur-xl sm:h-32 sm:w-32">
              <DeferredSignalLottie
                className="h-24 w-24 sm:h-28 sm:w-28"
                variant="tabs"
              />
            </div>
          </div>
        </motion.div>
      </div>

      <motion.a
        href="#profile"
        className="absolute bottom-8 right-8 z-30 hidden h-12 w-12 place-items-center rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.82)] text-[var(--ink)] backdrop-blur-xl md:grid"
        aria-label="Scroll to profile"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        whileHover={{ y: 2 }}
        whileTap={{ scale: 0.94 }}
      >
        <motion.span
          animate={prefersReducedMotion ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown className="h-5 w-5" />
        </motion.span>
      </motion.a>
    </section>
  );
}
