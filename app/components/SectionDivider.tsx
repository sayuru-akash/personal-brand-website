'use client';

import { StarFour } from '@phosphor-icons/react';
import { Marquee } from '@/app/components/ReactBitsPrimitives';

type SectionDividerProps = {
  /** words/phrases to scroll across the band, repeated as a set */
  items: string[];
  /** accent color used for the separator glyph + end glow */
  accent?: string;
};

/**
 * A kinetic marquee band used to separate homepage sections. It eliminates the
 * hard cut between sections, adds a perpetual "alive" motion signature, and
 * reinforces the editorial/Japanese-minimal rhythm. The band speeds up and
 * reverses direction with scroll velocity (handled by the Marquee primitive).
 */
export default function SectionDivider({ items, accent = 'var(--aka)' }: SectionDividerProps) {
  return (
    <div
      className="relative isolate overflow-hidden border-y border-[var(--line)] bg-[var(--paper-quiet)] py-7"
      aria-hidden="true"
    >
      <Marquee baseVelocity={3.2} direction={1} className="[mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <div className="flex items-center">
          {items.map((item, index) => (
            <span key={`${item}-${index}`} className="flex items-center">
              <span className="font-display whitespace-nowrap px-8 text-2xl font-medium tracking-tight text-[var(--ink)] sm:text-3xl">
                {item}
              </span>
              <StarFour className="h-4 w-4 shrink-0" style={{ color: accent }} weight="fill" />
            </span>
          ))}
        </div>
      </Marquee>

      {/* soft edge fades so the band feels continuous */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-[var(--paper-quiet)] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-[var(--paper-quiet)] to-transparent" />
    </div>
  );
}
