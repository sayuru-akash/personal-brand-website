"use client";

import { CursorDotField } from "@/app/components/ReactBitsPrimitives";
import SiteFooter from "@/app/components/SiteFooter";

export default function InteractiveSiteFooter() {
  return (
    <div className="interactive-footer">
      <CursorDotField
        className="pointer-events-none opacity-40"
        dotRadius={1.1}
        dotSpacing={24}
        cursorRadius={160}
        pushStrength={35}
        from="rgba(34,74,196,0.35)"
        to="rgba(34,74,196,0.18)"
      />
      <SiteFooter />
    </div>
  );
}
