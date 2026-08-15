"use client";

import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "motion/react";
import type { PointerEvent } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const spring = { stiffness: 260, damping: 32, mass: 0.55 };

export default function HeroPortraitReveal() {
  const prefersReducedMotion = useReducedMotion();
  const pointerX = useMotionValue(50);
  const pointerY = useMotionValue(50);
  const revealRadius = useMotionValue(0);
  const revealOpacity = useMotionValue(0);
  const smoothX = useSpring(pointerX, spring);
  const smoothY = useSpring(pointerY, spring);
  const smoothRadius = useSpring(revealRadius, spring);
  const smoothOpacity = useSpring(revealOpacity, { stiffness: 220, damping: 30 });
  const maskImage = useMotionTemplate`radial-gradient(circle ${smoothRadius}px at ${smoothX}% ${smoothY}%, #000 0%, #000 48%, transparent 100%)`;

  const positionReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || prefersReducedMotion) {
      return;
    }

    const bounds = event.currentTarget.getBoundingClientRect();
    pointerX.set(((event.clientX - bounds.left) / bounds.width) * 100);
    pointerY.set(((event.clientY - bounds.top) / bounds.height) * 100);
  };

  const showReveal = (event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || prefersReducedMotion) {
      return;
    }

    positionReveal(event);
    revealRadius.set(Math.min(event.currentTarget.clientWidth * 0.34, 165));
    revealOpacity.set(1);
  };

  const hideReveal = () => {
    revealRadius.set(0);
    revealOpacity.set(0);
  };

  return (
    <div
      className="relative aspect-[4/5] w-full overflow-hidden rounded-[1.6rem] bg-[var(--paper-quiet)]"
      onPointerEnter={showReveal}
      onPointerMove={positionReveal}
      onPointerLeave={hideReveal}
      onPointerCancel={hideReveal}
    >
      <Image
        src="/images/portraits/sayuru-graduation.webp"
        alt="Sayuru Akash Amarasinghe at his graduation ceremony"
        width={690}
        height={981}
        priority
        quality={88}
        sizes="(min-width: 1024px) 36vw, (min-width: 640px) 512px, calc(100vw - 40px)"
        className="h-full w-full object-cover object-center"
      />

      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 will-change-[mask-image,opacity]"
        style={{
          opacity: smoothOpacity,
          maskImage,
          WebkitMaskImage: maskImage,
        }}
      >
        <Image
          src="/images/generated/sayuru-hero-portrait.webp"
          alt=""
          width={1122}
          height={1402}
          quality={82}
          sizes="(min-width: 1024px) 36vw, (min-width: 640px) 512px, calc(100vw - 40px)"
          className="h-full w-full object-cover"
        />
      </motion.div>
    </div>
  );
}
