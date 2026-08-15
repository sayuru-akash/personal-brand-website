"use client";

import type Lenis from "lenis";
import { usePathname } from "next/navigation";
import { useEffect, useRef, type ReactNode } from "react";

export default function SmoothScroll({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const shouldEnhance = window.matchMedia(
      "(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)",
    ).matches;

    if (!shouldEnhance) return;

    let cancelled = false;
    let instance: Lenis | undefined;

    void import("lenis").then(({ default: LenisController }) => {
      if (cancelled) return;

      instance = new LenisController({
        autoRaf: true,
        duration: 1.08,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
      });
      lenisRef.current = instance;
    });

    return () => {
      cancelled = true;
      instance?.destroy();
      lenisRef.current = null;
    };
  }, []);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      lenisRef.current?.scrollTo(0, { immediate: true });
      window.scrollTo({ top: 0, behavior: "auto" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  return children;
}
