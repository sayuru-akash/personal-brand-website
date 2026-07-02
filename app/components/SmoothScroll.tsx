'use client';

import { ReactLenis } from 'lenis/react';
import type { ReactNode } from 'react';

export default function SmoothScroll({ children }: { children: ReactNode }) {
  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        duration: 1.08,
        easing: (t) => Math.min(1, 1.001 - 2 ** (-10 * t)),
        lerp: 0.09,
        smoothWheel: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
