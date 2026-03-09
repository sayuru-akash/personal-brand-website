---
name: japanese-frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality and japanese touch. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications with a japanese touch and vibe. Generates creative, polished code and UI design that represents a mix of modern web design and japanese aesthetics.
license: Complete terms in LICENSE.txt 
---

## Japanese Modern Web Interface Design

The purpose of this skill is to enable agents to design and implement landing pages that reflect Japanese modern design principles through typography-led layout, symbolic colour use, controlled asymmetry, atmospheric motion, and subtractive visual composition.

---

## WHEN TO USE

- Personal portfolios
- Studio landing pages
- Agency websites
- Brand landing pages
- Product launch pages
- Executive identity pages

---

## SKILL OUTCOMES

After mastering this skill, an agent should be able to:

- Design a landing page with intentional whitespace (Ma)
- Implement typography-led layout hierarchy
- Apply asymmetrical grid breaking with purpose
- Use restrained symbolic colour palettes
- Create calm, subtle motion behaviour
- Build reusable layout systems using tokens
- Produce visually atmospheric interfaces
- Avoid SaaS/template-driven aesthetics

---

## CORE PRINCIPLES

### 間 (Ma)

Design through absence.
Target 40–60% visual emptiness per viewport.

### 非対称 (Asymmetry)

Break grid alignment intentionally.
Shift content by 8px–32px where required.

### 引き算の美学

One dominant visual element per section only.

---

## DESIGN TOKENS

### COLOUR TOKENS

--bg: #F7F5F2
--surface: #EAE7E2
--text: #1B1B1B
--muted: #5C5C5C
--divider: rgba(0,0,0,0.08)
--accent: #BC002D
--accent-hover: #9E001F
--accent-soft: rgba(188,0,45,0.08)

Apply ratio:
90% neutral
8% secondary
2% accent

---

### TYPOGRAPHY TOKENS

Primary UI Fonts:
Inter
IBM Plex Sans
Manrope

Accent Display Fonts:
Noto Serif JP
Zen Old Mincho
Cormorant
Playfair Display

Tracking:
Headings: 0.06em–0.14em
JP Labels: 0.12em–0.18em

Hierarchy:
H1: 2.5rem–4rem
H2: 1.75rem–2.25rem
Body: 1rem–1.125rem
Caption: 0.75rem–0.875rem
JP Accent: 0.7rem–0.9rem

---

### SPACING TOKENS

Pause:
mt-32
mt-40
mt-56

Never equal spacing across sections.

---

## MOTION TOKENS

opacity: 0 → 1
translateY: 6px → 0px
duration: 0.8s
ease: cubic-bezier(0.22,1,0.36,1)

Hover:
opacity shift
translateX(4px)

---

## GLOBAL OVERLAY

body::after {
content:'';
position:fixed;
inset:0;
background:url('/grain.png');
opacity:0.04;
pointer-events:none;
}

---

## COMPONENT PATTERNS

Hero:
Large English statement
Small JP subtitle
Circular motif
No CTA

Divider Label:
JP label
Thin divider

Projects Grid:
Monochrome visuals
Accent on hover

Process Steps:
01
戦略
Strategy

Contact:
Whitespace dominant
Single CTA

---

## CHECKLISTS

### Typography

- Tracking applied
- JP subtitle lighter
- Hierarchy visible

### Colour

- No gradients
- Accent minimal
- No full background fill

### Layout

- Asymmetry present
- Pause spacing used

### Motion

- No bounce
- Calm easing

### Fail Test

If it looks:

- SaaS-like
- Template-clean
- Startupish
  Remove something.

---

## DRILLS

### Drill 01 — Hero Build (30 min)

Build hero with:

- English H1
- JP subtitle
- Circle motif

### Drill 02 — Rhythm Section (60 min)

Create 3 staggered blocks with pause spacing.

### Drill 03 — Token Variants

Rebuild page using:
Warm tone
Cool tone
Ink tone

---

## DEFINITION OF DONE

Completed design must:

- Use restrained palette
- Feature asymmetry
- Include typography-led hierarchy
- Maintain atmospheric motion
- Avoid symmetry
- Avoid decorative gradients

If symmetry dominates, redesign.

---

## RECOMMENDED STACK

Next.js
Tailwind CSS
Framer Motion
Lenis
CSS Variables
SVG motifs
mix-blend-mode overlays

Avoid UI kits.
