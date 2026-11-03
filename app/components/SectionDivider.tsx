"use client";

import { Marquee } from "@/app/components/ReactBitsPrimitives";

export default function SectionDivider({
  items,
  accent = "var(--ai)",
}: {
  items: string[];
  accent?: string;
}) {
  return (
    <div className="journal-wrap quiet-marquee" aria-hidden="true">
      <Marquee baseVelocity={0.7} direction={1}>
        <div className="flex items-center">
          {items.map((item, index) => (
            <span key={index} className="marquee-item">
              <span style={{ color: accent }}>+</span>
              {item}
            </span>
          ))}
        </div>
      </Marquee>
    </div>
  );
}
