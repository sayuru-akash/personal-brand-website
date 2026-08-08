"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const SignalLottie = dynamic(() => import("@/app/components/SignalLottie"), {
  ssr: false,
  loading: () => null,
});

function SignalFallback({ className }: { className: string }) {
  return (
    <div className={`deferred-signal ${className}`} aria-hidden="true">
      <span />
      <span />
      <span />
    </div>
  );
}

export default function DeferredSignalLottie({
  className = "",
  variant = "signal",
}: {
  className?: string;
  variant?: "signal" | "tabs" | "pagination";
}) {
  const prefersReducedMotion = useReducedMotion();
  const [isEnhanced, setIsEnhanced] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) return;

    const enhance = () => setIsEnhanced(true);
    const events: Array<keyof WindowEventMap> = [
      "pointermove",
      "pointerdown",
      "touchstart",
      "keydown",
      "scroll",
    ];

    events.forEach((event) =>
      window.addEventListener(event, enhance, { once: true, passive: true }),
    );
    const fallbackTimer = window.setTimeout(enhance, 15000);

    return () => {
      events.forEach((event) => window.removeEventListener(event, enhance));
      window.clearTimeout(fallbackTimer);
    };
  }, [prefersReducedMotion]);

  if (!isEnhanced) return <SignalFallback className={className} />;

  return <SignalLottie className={className} variant={variant} />;
}
