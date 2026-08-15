"use client";

import { motion, useInView } from "motion/react";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  aboveFold = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  aboveFold?: boolean;
}) {
  const prefersReducedMotion = useReducedMotion();
  const revealRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(revealRef, {
    once: true,
    margin: "-80px",
  });
  const [canEnhance, setCanEnhance] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setCanEnhance(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const isVisible =
    prefersReducedMotion || aboveFold || !canEnhance || isInView;

  return (
    <motion.div
      ref={revealRef}
      className={className}
      initial={false}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
      transition={{
        duration: 0.72,
        delay: prefersReducedMotion || !canEnhance ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
