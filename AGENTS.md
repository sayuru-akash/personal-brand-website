# AGENTS.md

## Project Overview

This is Sayuru Akash Amarasinghe's personal brand website. It is a single Next.js App Router application with an animated portfolio homepage plus About, Contact, and Privacy Policy pages for a full-stack developer, musical artist, and Codezela Technologies founder.

The current implementation uses Next.js 16, React 19, TypeScript, Tailwind CSS v4, Motion (`motion/react`), Jest, Resend, Zod, and Cloudflare Turnstile. The homepage is assembled in `app/page.tsx` from section components under `app/components`, with portfolio copy and structured content stored in `data/portfolio.ts`.

## Repository Layout

- `app/layout.tsx` defines metadata, viewport settings, favicon/manifest links, accessibility wrappers, and structured data.
- `app/page.tsx` composes the homepage sections and wraps each animated section with `AnimationErrorBoundary`.
- `app/about/`, `app/contact/`, and `app/privacy-policy/` contain the public supporting pages.
- `app/api/contact/route.ts` validates Turnstile tokens and contact payloads before delivering inquiries through Resend.
- `app/sitemap.ts`, `app/robots.ts`, and `app/opengraph-image.tsx` provide the crawl and social-sharing surfaces.
- `app/components/` contains the homepage sections, animation fallback components, scroll progress indicator, and component tests.
- `app/hooks/` contains component-scoped hooks such as `useMagneticHover`.
- `hooks/` contains shared hooks such as `useReducedMotion` and `useScrollAnimation`.
- `data/portfolio.ts` is the primary source for editable homepage, biography, contact, navigation, and privacy content.
- `types/portfolio.ts` defines the content contracts used by `data/portfolio.ts`.
- `lib/contact.ts` contains contact validation plus the HTML and plain-text notification email renderers.
- `types/contact.ts` contains the client/server contact response contract and shared Turnstile action.
- `utils/animationConfig.ts` centralizes reusable Motion variants and transition settings.
- `app/globals.css` and `tailwind.config.ts` define design tokens, typography, global styles, and animation utilities.
- `public/images/archive/` contains optimized local copies of personal images used by the supporting pages.
- `public/` also contains the web app icon and manifest.

## Commands

Use npm for this repo.

```bash
npm install
npm run dev
npm run lint
npm run test
npm run build
npm run start
```

- `npm run dev` starts the local Next.js dev server.
- `npm run lint` runs ESLint with Next.js core web vitals and TypeScript rules.
- `npm run test` runs Jest with `jest-environment-jsdom`.
- `npm run build` creates the production Next.js build.
- `npm run start` serves the production build after `npm run build`.

Before handing off code changes, run at least `npm run lint` and the most relevant tests. For shared component, hook, config, or routing changes, also run `npm run test` and `npm run build`.

## Development Workflow

- Keep the app as a single App Router application unless the user explicitly asks for a larger structural change.
- Prefer editing content in `data/portfolio.ts` over hardcoding copy inside components.
- Keep data shape changes synchronized with `types/portfolio.ts` and every component that consumes the changed fields.
- Preserve the existing white, neutral, Japanese-minimal visual direction unless the user explicitly asks for a redesign.
- Keep animated UI resilient: wrap new major animated sections with `AnimationErrorBoundary` when they can fail independently.
- Respect reduced-motion behavior when adding animations or scroll effects.
- Do not treat `.github/copilot-instructions.md` as fully current without checking the source files; parts of it describe an older dark-theme component structure.

## Code Style

- Use TypeScript for app code and keep `strict` compatibility.
- Use the `@/*` path alias for root-relative imports.
- Prefer named exports for shared utilities and typed data; section components may stay as default exports where that is already the local pattern.
- Use Motion from `motion/react`, not `framer-motion`.
- Reuse animation primitives from `utils/animationConfig.ts` before creating new variants.
- Keep client-only components marked with `'use client'` when they use hooks, Motion values, browser APIs, or event handlers.
- Prefer Tailwind utilities and existing CSS variables over one-off CSS.
- Keep comments useful and brief. Remove generated requirement references when they stop describing real product constraints.

## Styling and UX Rules

- Current palette is white and neutral with red, blue, purple, and green used as restrained semantic accents. Avoid introducing a new dominant color system casually.
- Maintain the spacious, asymmetric layout and Japanese typography touches already present in `app/globals.css` and `tailwind.config.ts`.
- Use responsive Tailwind classes and stable layout constraints for section grids, cards, and animated elements.
- Keep text readable on mobile and desktop; check long labels, Japanese text, and card content for wrapping.
- Avoid adding decorative clutter that fights the existing minimalist direction.
- Interactive animation should feel subtle and intentional. Avoid heavy continuous animation that can hurt performance.

## Testing Instructions

Tests live next to the relevant code:

- Component tests: `app/components/__tests__/`
- Component hook tests: `app/hooks/__tests__/`
- Shared hook tests: `hooks/*.test.ts`

Run all tests:

```bash
npm run test
```

Run a focused Jest file:

```bash
npx jest app/components/__tests__/SkillsSection.test.tsx
```

When changing animations, reduced-motion behavior, error boundaries, or hook logic, add or update tests close to the affected file.

## Build and Deployment Notes

- Public page imagery is stored locally and served through Next.js image optimization.
- `app/layout.tsx` sets canonical metadata for `https://sayuru.me`.
- Keep manifest, icon, Open Graph metadata, and structured data consistent with any brand or URL changes.
- Copy `.env.example` to the deployment provider and set real values for Resend delivery and Turnstile. Never commit `.env.local` or secret values.
- The contact form requires `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET_KEY`, and `TURNSTILE_ALLOWED_HOSTNAMES`.
- Production deployment is expected to be a static/standard Next.js deployment path. Verify with `npm run build` before release-oriented changes.

## Git and Change Safety

- The worktree may contain user changes. Check `git status --short` before editing and do not revert unrelated changes.
- Keep changes scoped to the requested surface.
- If touching UI, avoid visual drift unless the user asked for it.
- If changing commands, dependencies, routes, metadata, or reusable workflow, update this file and any directly related docs.
