---
name: frontend-design-jp
description: Create distinctive, production-grade frontend interfaces with high design quality and japanese touch. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications with a japanese touch and vibe. Generates creative, polished code and UI design that represents a mix of modern web design and japanese aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that reflect Japanese modern design principles through typography-led layout, symbolic colour use, controlled asymmetry, atmospheric motion, and subtractive visual composition. Implement real working code with exceptional attention to aesthetic details rooted in Japanese visual culture.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a Japanese-rooted aesthetic direction:

- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Anchor to a Japanese principle: 間 (Ma / emptiness), 引き算の美学 (subtractive beauty), 侘び寂び (wabi-sabi / imperfect transience), 清潔感 (cleanliness), or 凛 (rin / dignified refinement). These are starting points — synthesise one that is true to the context.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What single visual gesture will someone remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. The goal is not "Japan-flavoured decoration" — it is a design philosophy expressed through every spacing, typographic, and motion decision.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:

- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear Japanese aesthetic point-of-view
- Meticulously refined in every detail

## Core Principles

### 間 (Ma)

Design through absence. Target 40–60% visual emptiness per viewport. Whitespace is not empty — it is intentional breath.

### 非対称 (Asymmetry)

Break grid alignment intentionally. Shift content by 8px–32px where required. Symmetry signals template; asymmetry signals authorship.

### 引き算の美学 (Subtractive Aesthetics)

One dominant visual element per section only. Remove until nothing can be removed without loss.

## Design Tokens

### Colour Tokens

```css
--bg: #f7f5f2;
--surface: #eae7e2;
--text: #1b1b1b;
--muted: #5c5c5c;
--divider: rgba(0, 0, 0, 0.08);
--accent: #bc002d;
--accent-hover: #9e001f;
--accent-soft: rgba(188, 0, 45, 0.08);
```

Apply ratio: **90% neutral · 8% secondary · 2% accent**

No decorative gradients. No full background fills. Accent used for one deliberate moment only.

### Typography Tokens

Primary UI Fonts: `Inter`, `IBM Plex Sans`, `Manrope`

Accent Display Fonts: `Noto Serif JP`, `Zen Old Mincho`, `Cormorant`, `Playfair Display`

| Role      | Size               | Tracking        |
| --------- | ------------------ | --------------- |
| H1        | 2.5rem – 4rem      | 0.06em – 0.14em |
| H2        | 1.75rem – 2.25rem  | 0.06em – 0.10em |
| Body      | 1rem – 1.125rem    | 0               |
| Caption   | 0.75rem – 0.875rem | 0               |
| JP Accent | 0.7rem – 0.9rem    | 0.12em – 0.18em |

JP subtitles and labels must always render lighter in weight than adjacent Latin text.

### Spacing Tokens

Pause spacing (use between sections — never equal intervals):

- `margin-top: 8rem` (mt-32)
- `margin-top: 10rem` (mt-40)
- `margin-top: 14rem` (mt-56)

Unequal vertical rhythm is intentional and required.

### Motion Tokens

```css
/* Entrance */
opacity: 0 → 1;
transform: translateY(6px) → translateY(0);
duration: 0.8s;
easing: cubic-bezier(0.22, 1, 0.36, 1);

/* Hover */
opacity: subtle shift;
transform: translateX(4px);
```

No bounce. No spring overshoot. Calm, deliberate easing only.

### Global Atmosphere Overlay

```css
body::after {
  content: "";
  position: fixed;
  inset: 0;
  background: url("/grain.png");
  opacity: 0.04;
  pointer-events: none;
  z-index: 9999;
}
```

## Component Patterns

**Hero**
Large English statement headline. Small JP subtitle beneath. One circular SVG motif. No CTA button in hero.

**Divider Label**
JP label (e.g. `プロジェクト`) left-aligned, followed by a thin full-width rule.

**Projects Grid**
Monochrome thumbnail visuals at rest. Accent colour reveal on hover only.

**Process Steps**
Zero-padded number (`01`), JP label (`戦略`), English descriptor (`Strategy`). Staggered entrance animation.

**Contact Section**
Whitespace dominant. One single CTA. No decorative elements.

## Quality Checklists

### Typography

- [ ] Letter-spacing applied to all headings and JP labels
- [ ] JP subtitle renders lighter weight than heading
- [ ] Clear typographic hierarchy visible at a glance

### Colour

- [ ] No gradients present
- [ ] Accent used no more than once prominently
- [ ] No section has a full solid background fill

### Layout

- [ ] Asymmetry is present and intentional
- [ ] Pause spacing used between all major sections
- [ ] One dominant element per section

### Motion

- [ ] No bounce or spring easing
- [ ] All entrance animations use the approved token
- [ ] Hover states are subtle, not dramatic

### Fail Test

If the result looks SaaS-like, template-clean, or startup-generic — **remove something**. The correct response to "too much" is subtraction, not substitution.

## Recommended Stack

- **Framework**: Next.js
- **Styling**: Tailwind CSS + CSS Variables
- **Animation**: Framer Motion, Lenis (smooth scroll)
- **Motifs**: Inline SVG
- **Effects**: `mix-blend-mode` overlays, grain texture
- **Fonts**: Google Fonts (Noto Serif JP, Cormorant, IBM Plex Sans)

Avoid UI component kits. Build primitives from scratch.

## When to Use This Skill

- Personal portfolios
- Studio and agency landing pages
- Brand and product launch pages
- Executive identity pages
- Any context where restraint, atmosphere, and cultural intentionality are required

## Definition of Done

The completed interface must:

- Use a restrained palette within the defined token ratios
- Feature intentional asymmetry
- Include typography-led visual hierarchy with JP accent elements
- Maintain calm atmospheric motion throughout
- Avoid symmetry as a default composition choice
- Avoid decorative gradients entirely

If symmetry dominates the layout — redesign the layout.
