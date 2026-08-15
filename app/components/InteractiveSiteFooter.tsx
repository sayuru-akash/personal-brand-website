"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { CursorDotField } from "@/app/components/ReactBitsPrimitives";
import SiteFooter from "@/app/components/SiteFooter";

export default function InteractiveSiteFooter() {
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const smoothX = useSpring(pointerX, {
    stiffness: 84,
    damping: 24,
    mass: 0.5,
  });
  const smoothY = useSpring(pointerY, {
    stiffness: 84,
    damping: 24,
    mass: 0.5,
  });

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set(event.clientX - rect.left);
    pointerY.set(event.clientY - rect.top);
  };

  return (
    <div
      className="relative isolate overflow-hidden bg-white pb-24"
      onPointerMove={handlePointerMove}
    >
      <div className="ink-grid absolute inset-0 opacity-24" aria-hidden="true" />
      <motion.div
        className="pointer-events-none absolute h-[30rem] w-[30rem] rounded-full bg-[rgba(214,58,47,0.055)] blur-3xl"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        aria-hidden="true"
      />
      <CursorDotField
        className="pointer-events-none opacity-70 mix-blend-multiply"
        dotRadius={1.6}
        dotSpacing={22}
        cursorRadius={230}
        pushStrength={58}
        from="rgba(214,58,47,0.44)"
        to="rgba(35,79,213,0.34)"
      />
      <div className="relative">
        <SiteFooter />
      </div>
    </div>
  );
}
