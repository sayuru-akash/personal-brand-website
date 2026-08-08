"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";
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

  return (
    <motion.div
      className={className}
      initial={
        prefersReducedMotion
          ? false
          : { opacity: aboveFold ? 1 : 0, y: aboveFold ? 14 : 22 }
      }
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{
        duration: aboveFold ? 0.58 : 0.72,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
