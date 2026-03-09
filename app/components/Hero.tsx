"use client";

import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

const roles = [
  "Musical Artist",
  "Tech Lead",
  "Full-stack Developer",
  "Content Writer",
  "Investor",
];

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const headingScale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const sunY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const sunScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const verticalTextY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const scrollIndicatorOpacity = useTransform(
    scrollYProgress,
    [0, 0.15],
    [1, 0],
  );

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Vertical JP text — left edge, parallax */}
      <motion.div
        className="vertical-jp absolute left-6 md:left-10 top-1/2 -translate-y-1/2 hidden md:block select-none"
        style={{ y: verticalTextY }}
      >
        音楽家・開発者・デザイナー
      </motion.div>

      {/* Vertical line — right */}
      <div className="absolute right-10 md:right-14 top-24 bottom-24 w-px bg-linear-to-b from-transparent via-divider to-transparent hidden md:block" />

      {/* ── Sun orb ── */}
      <motion.div
        className="absolute right-[-5%] md:right-[8%] top-[12%] md:top-[10%] w-[320px] h-[320px] md:w-[420px] md:h-[420px] lg:w-[480px] lg:h-[480px] will-change-transform"
        style={{ y: sunY, scale: sunScale }}
      >
        {/* Outer atmospheric bloom */}
        <div
          className="absolute inset-[-50%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(188,0,45,0.12) 0%, rgba(150,30,20,0.06) 25%, transparent 55%)",
          }}
        />

        {/* Mid corona glow */}
        <div
          className="absolute inset-[-25%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(200,60,30,0.18) 0%, rgba(188,0,45,0.08) 30%, transparent 55%)",
          }}
        />

        {/* Main body — smooth burning red circle */}
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "radial-gradient(circle at 45% 45%, rgba(255,120,50,0.35) 0%, rgba(220,50,30,0.28) 20%, rgba(188,0,45,0.22) 40%, rgba(120,0,20,0.10) 60%, transparent 75%)",
            boxShadow:
              "0 0 80px 20px rgba(188,0,45,0.15), 0 0 160px 60px rgba(200,50,20,0.08)",
          }}
        />

        {/* Hot inner core — brighter warm center */}
        <div
          className="absolute inset-[18%] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 46% 44%, rgba(255,160,60,0.30) 0%, rgba(240,90,40,0.18) 30%, transparent 65%)",
          }}
        />

        {/* Bright pinpoint */}
        <div
          className="absolute inset-[35%] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(255,200,120,0.20) 0%, rgba(255,140,60,0.08) 40%, transparent 60%)",
          }}
        />

        {/* Subtle ensō ring */}
        <div
          className="absolute inset-[5%] rounded-full"
          style={{
            border: "1px solid rgba(255,120,50,0.08)",
          }}
        />
      </motion.div>

      {/* Content — parallax fade on scroll */}
      <div className="relative mx-auto max-w-7xl px-6 md:pl-24 lg:pl-32 md:pr-12 w-full pt-32 md:pt-0">
        <motion.div
          className="max-w-3xl"
          style={{ y: headingY, opacity: headingOpacity, scale: headingScale }}
        >
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
                className="text-[11px] tracking-widest uppercase text-text-muted px-4 py-2 border border-divider rounded-full hover:border-accent/30 hover:text-text-primary transition-all duration-300 cursor-default"
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

          {/* Scroll indicator — fades out on scroll */}
          <motion.div
            className="mt-24 flex items-center gap-3"
            style={{ opacity: scrollIndicatorOpacity }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="flex items-center gap-3"
            >
              <div
                className="w-px h-8 bg-text-dim"
                style={{ animation: "float 3s ease-in-out infinite" }}
              />
              <span className="text-[10px] tracking-[0.14em] uppercase text-text-dim">
                Scroll to explore
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
