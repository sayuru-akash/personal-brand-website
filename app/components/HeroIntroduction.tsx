"use client";

import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  FloatingPortal,
  offset,
  safePolygon,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useFocus,
  useHover,
  useInteractions,
  useRole,
} from "@floating-ui/react";
import { ArrowUpRight, X } from "@phosphor-icons/react";
import Image from "next/image";
import { useCallback, useId, useState } from "react";
import BrandIcon from "@/app/components/BrandIcon";
import { heroContent } from "@/data/portfolio";
import { heroPreviews, type HeroPreview } from "@/data/hero-previews";
import { colomboPoint, sriLankaOutline } from "@/data/sri-lanka-map";

function PreviewVisual({ preview }: { preview: HeroPreview }) {
  if (preview.kind === "location") {
    return (
      <div className="context-map">
        <svg
          viewBox="0 0 320 180"
          role="img"
          aria-label="Sri Lanka outline with Colombo marked on the western coast"
        >
          <path className="island-outline" d={sriLankaOutline} pathLength={1} />
          <path
            className="map-leader"
            d={`M${colomboPoint.x},${colomboPoint.y} H100 L86,${colomboPoint.y - 14} H30`}
          />
          <circle
            className="map-dot-halo"
            cx={colomboPoint.x}
            cy={colomboPoint.y}
            r="8"
          />
          <circle
            className="map-dot"
            cx={colomboPoint.x}
            cy={colomboPoint.y}
            r="3.5"
          />
          <text x="30" y={colomboPoint.y - 23}>
            Colombo
          </text>
          <text className="map-country" x="30" y="165">
            SRI LANKA
          </text>
        </svg>
      </div>
    );
  }
  if (preview.logo) {
    return (
      <div
        className={`context-brand context-brand-${preview.term === "ISBS Campus" ? "isbs" : preview.term === "Codezela Technologies" ? "codezela" : "cca"}`}
      >
        <Image
          src={preview.logo}
          alt={preview.title}
          width={300}
          height={100}
          sizes="180px"
        />
      </div>
    );
  }
  if (preview.kind === "music") {
    return (
      <div className="context-sound" aria-hidden="true">
        {Array.from({ length: 36 }, (_, index) => (
          <span
            key={index}
            style={{
              height: `${12 + Math.abs(Math.sin(index * 1.7) * Math.cos(index * 0.4)) * 60}px`,
              animationDelay: `${index * -0.09}s`,
            }}
          />
        ))}
      </div>
    );
  }
  const names =
    preview.kind === "software"
      ? ["Next.js", "React", "TypeScript", "PostgreSQL"]
      : ["Figma", "Prototyping", "Design Systems", "Animation"];
  return (
    <div
      className={`context-tool-strip context-tool-strip-${preview.kind}`}
      aria-hidden="true"
    >
      {names.map((name) => (
        <span key={name}>
          <BrandIcon name={name} className="h-7 w-7" />
        </span>
      ))}
    </div>
  );
}

function ContextWord({
  preview,
  open,
  onOpenChange,
}: {
  preview: HeroPreview;
  open: boolean;
  onOpenChange: (value: boolean) => void;
}) {
  const titleId = useId();
  const descriptionId = useId();
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange,
    placement: "top-start",
    strategy: "fixed",
    whileElementsMounted: autoUpdate,
    middleware: [offset(12), flip({ padding: 16 }), shift({ padding: 16, crossAxis: true })],
  });
  const hover = useHover(context, {
    mouseOnly: true,
    delay: { open: 160, close: 120 },
    handleClose: safePolygon(),
  });
  const focus = useFocus(context);
  const click = useClick(context);
  const dismiss = useDismiss(context);
  const role = useRole(context, { role: "dialog" });
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    click,
    dismiss,
    role,
  ]);
  const external = preview.href.startsWith("https://");
  const setReference = useCallback((node: HTMLButtonElement | null) => refs.setReference(node), [refs]);
  const setFloating = useCallback((node: HTMLDivElement | null) => refs.setFloating(node), [refs]);

  return (
    <>
      <button
        ref={setReference}
        type="button"
        className="context-trigger"
        {...getReferenceProps()}
      >
        {preview.term}
      </button>
      {open && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
            initialFocus={-1}
          >
            <div
              ref={setFloating}
              style={floatingStyles}
              className="context-popup"
              {...getFloatingProps({
                "aria-labelledby": titleId,
                "aria-describedby": descriptionId,
              })}
            >
              <div className="context-card">
                <div className="context-card-top">
                  <span>{preview.eyebrow}</span>
                  <button
                    type="button"
                    onClick={() => onOpenChange(false)}
                    aria-label="Close preview"
                    title="Close preview"
                  >
                    <X size={16} />
                  </button>
                </div>
                <PreviewVisual preview={preview} />
                <div className="context-card-copy">
                  <h2 id={titleId}>{preview.title}</h2>
                  <p id={descriptionId}>{preview.description}</p>
                  <dl>
                    {preview.facts.map((fact) => (
                      <div key={fact.label}>
                        <dt>{fact.label}</dt>
                        <dd>{fact.value}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <a
                  href={preview.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="context-card-link"
                  onClick={() => onOpenChange(false)}
                >
                  {preview.linkLabel}
                  <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  );
}

export default function HeroIntroduction() {
  const [activeTerm, setActiveTerm] = useState<string | null>(null);
  const pattern = new RegExp(
    `(${heroPreviews.map((preview) => preview.term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  return (
    <div className="intro-copy">
      <p>
        {heroContent.subtitle.split(pattern).map((part, index) => {
          const preview = heroPreviews.find((entry) => entry.term === part);
          return preview ? (
            <ContextWord
              key={part}
              preview={preview}
              open={activeTerm === part}
              onOpenChange={(value) =>
                setActiveTerm((current) =>
                  value ? part : current === part ? null : current,
                )
              }
            />
          ) : (
            <span key={index}>{part}</span>
          );
        })}
      </p>
    </div>
  );
}
