# Sayuru Akash Personal Brand Website - Copilot Instructions

**Last Updated:** 2025-03-09  
**Project Version:** 0.1.0  
**Tech Stack:** Next.js 16.1.6 | React 19.2.3 | TypeScript 5 | Tailwind CSS 4 | Motion

---

## PROJECT OVERVIEW

Premium personal brand website for Sayuru Akash—a multidisciplinary creative (musician, frontend developer, web designer, content writer, investor) based in Sri Lanka. Bilingual (English + Japanese) with dark modern aesthetic, smooth animations, and visual storytelling focus.

**Website:** https://sayuru.me | **Build:** ✅ Linting passes | ⚠️ Build needs network for Google Fonts

---

## CORE TECH STACK

### Dependencies
```json
{
  "next": "16.1.6",
  "react": "19.2.3",
  "motion": "^12.35.2",
  "tailwindcss": "^4",
  "typescript": "^5"
}
```

### Key Tools
- **ESLint:** Next.js core-web-vitals + TypeScript
- **Tailwind CSS:** v4 with custom CSS variables
- **PostCSS:** For CSS processing
- **TypeScript:** Strict mode enabled (`strict: true`)

---

## PROJECT STRUCTURE

```
app/
├── components/              # 8 Main sections
│   ├── Header.tsx          # Navigation + mobile menu
│   ├── Hero.tsx            # Hero introduction
│   ├── Marquee.tsx         # Scrolling text animation
│   ├── About.tsx           # About + traits grid
│   ├── Craft.tsx           # Services showcase
│   ├── Philosophy.tsx      # Core values
│   ├── Contact.tsx         # CTA + contact info
│   └── Footer.tsx          # Footer + social links
├── layout.tsx              # Root layout (metadata, fonts)
├── page.tsx               # Home page
├── globals.css            # Theme variables + base styles
└── favicon.ico            # Brand icon

Root Config:
├── package.json
├── tsconfig.json          # TypeScript strict mode
├── next.config.ts         # Image optimization
├── eslint.config.mjs      # ESLint rules
├── postcss.config.mjs     # CSS processing
└── .gitignore
```

---

## DESIGN SYSTEM

### Color Palette (Dark Theme)
| Element | Color | CSS Variable |
|---------|-------|--------------|
| Background | #0c0c0c | `--color-bg` |
| Surface | #1a1917 | `--color-surface` |
| Text Primary | #e8e4de | `--color-text-primary` |
| Text Muted | #8a8680 | `--color-text-muted` |
| Text Dim | #5c5856 | `--color-text-dim` |
| **Accent (CTA)** | **#bc002d** | `--color-accent` |
| Divider | rgba(232, 228, 222, 0.08) | `--color-divider` |

### Typography
| Purpose | Font | Weights | Source |
|---------|------|---------|--------|
| Body/Headings | Manrope | 300–800 | Google Fonts |
| Japanese/Accent | Zen Old Mincho | 400, 700 | Google Fonts CDN |

Apply with class: `.jp-serif` for Japanese text

### Layout
- **Max Width:** 1400px (`max-w-7xl`)
- **Spacing Unit:** 0.25rem
- **Mobile Padding:** `px-6` | **Desktop:** `md:px-12`
- **Responsive Text:** Use `clamp()` for fluid sizing

---

## COMPONENT ARCHITECTURE

### Header (`Header.tsx`) - Client Component
**Responsibility:** Navigation, scroll detection, mobile menu  
**Features:**
- Fixed positioning with scroll-triggered frosted glass effect (500ms transition)
- Mobile hamburger menu with AnimatePresence
- Links: Home, About, Craft, Contact (with JP translations)
- Passive scroll listeners: `{ passive: true }`
- Body overflow management for mobile menu

**Animation Pattern:** Smooth transitions via `motion/react`, staggered mobile menu items

### Hero (`Hero.tsx`) - Client Component
**Purpose:** Full-screen biographical intro  
**Content:**
- Main heading: "SAYURU AKA 詩 SH"
- 5 role tags (Musical Artist, Frontend Developer, etc.)
- Bio paragraph + scroll indicator
- Decorations: Vertical JP text, gradient lines, circle motifs
- Responsive: `clamp(2.8rem, 7vw, 5.5rem)` for heading

**Animations:** Staggered entrance (0.2–0.7s), floating scroll indicator

### Other Sections
All remaining components (Marquee, About, Craft, Philosophy, Contact, Footer) use **client components** with scroll-triggered animations:
```tsx
const fadeUp = {
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
};

<motion.div {...fadeUp} transition={{ duration: 0.6 }}>
  Content
</motion.div>
```

---

## STYLING CONVENTIONS

### ✅ DO
- Use Tailwind utilities: `px-6`, `py-8`, `text-text-primary`
- Reference CSS variables via Tailwind: `bg-bg`, `text-accent`
- Use responsive prefixes: `md:`, `lg:`
- Apply animations via `motion/react`

### ❌ DON'T
- Write custom CSS in components (Tailwind first)
- Use hardcoded hex colors (use theme variables)
- Create non-semantic class names
- Import heavy libraries without `dynamic`

### CSS Variables (app/globals.css)
All colors/fonts defined in `@theme` block:
```css
@theme {
  --color-bg: #0c0c0c;
  --color-text-primary: #e8e4de;
  --color-accent: #bc002d;
  --font-sans: "Manrope", ui-sans-serif, system-ui, sans-serif;
}
```

Reference in Tailwind: `bg-bg`, `text-text-primary`, `text-accent`

---

## ANIMATION GUIDELINES

### Motion Library Usage
```tsx
// Scroll-triggered
<motion.div 
  initial={{ opacity: 0, y: 10 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, margin: "-80px" }}
  transition={{ duration: 0.6, delay: 0.2 }}
>
  Content
</motion.div>

// Staggered children
{items.map((item, i) => (
  <motion.div
    key={item}
    transition={{ delay: i * 0.08 }}
    {...fadeUp}
  >
    {item}
  </motion.div>
))}

// AnimatePresence for mount/unmount
<AnimatePresence>
  {menuOpen && <motion.div {...} />}
</AnimatePresence>
```

### Performance Tips
- Use `whileInView` + `{ once: true }` for scroll animations
- Stagger with small delays (i * 0.06–0.08)
- Keep animation durations under 1s
- Use passive listeners: `{ passive: true }`
- Prefer CSS for static animations (GPU-accelerated)

---

## SCRIPTS & COMMANDS

```bash
npm run dev          # Start dev server (http://localhost:3000)
npm run build        # Create optimized build
npm run start        # Start production server
npm run lint         # Run ESLint (should pass with 0 errors)
```

### Build Notes
- Currently fails without network (Google Fonts download)
- Succeeds in production (Vercel has network access)
- Lint passes with 1 minor warning about custom fonts

---

## NAMING CONVENTIONS

### Components
- **Format:** PascalCase, descriptive names
- **Location:** `app/components/ComponentName.tsx`
- **Export:** Named exports preferred

### CSS & Variables
- **Tailwind:** Utility-first, lowercase
- **Custom Classes:** kebab-case in `app/globals.css`
- **CSS Variables:** `--color-{purpose}`, `--font-{type}`
- **Japanese Styling:** `.jp-serif` class

### TypeScript
- **Variables:** camelCase
- **Types:** PascalCase
- **Interfaces:** PascalCase with `I` prefix optional

---

## METADATA & SEO

**Location:** `app/layout.tsx`

Key metadata included:
```typescript
export const metadata: Metadata = {
  title: "Sayuru Akash — サユル アーカーシュ",
  description: "Musical Artist, Frontend Developer, Web Designer...",
  keywords: [...],
  openGraph: { ... },
  twitter: { ... },
  robots: { index: true, follow: true },
};
```

**When adding routes/pages:** Always include metadata with OpenGraph tags for social sharing.

---

## TESTING INFRASTRUCTURE

**Current Status:** ❌ No test files exist

**Recommendation:** Add Jest + React Testing Library
- **Location:** `app/**/__tests__/` or co-located with components
- **Priority:** Header, Hero, Contact (interactive elements)
- **Config:** Minimal setup needed with Next.js

---

## CI/CD & DEPLOYMENT

**Current Status:** ❌ No GitHub Actions workflows

**Create These Workflows:**
1. **Lint & Type Check** (on PR)
   ```bash
   npm run lint
   npm run build
   ```
2. **Auto Deploy to Vercel** (on main push)
3. **Lighthouse CI** (optional, for performance)

**Deployment:** Vercel (inferred from `next.config.ts`)

---

## KNOWN ISSUES

| Issue | Severity | Status | Fix |
|-------|----------|--------|-----|
| Custom fonts ESLint warning | Minor | ⚠️ Open | Migrate Zen Old Mincho to `next/font/google` |
| Build requires network | Medium | ✅ OK in Prod | Auto-resolves in Vercel |
| No test suite | Medium | 📝 TODO | Add Jest + React Testing Library |
| No CI/CD workflows | Medium | 📝 TODO | Create GitHub Actions |

---

## COMMON DEVELOPMENT TASKS

### Add New Section
1. Create `app/components/SectionName.tsx` as client component
2. Use `fadeUp` animation pattern (see About, Craft)
3. Import in `app/page.tsx`
4. Add section ID for navigation
5. Test on mobile

### Update Navigation
1. Edit `navLinks` array in `Header.tsx`
2. Add JP translation
3. Update footer links if needed
4. Ensure anchor IDs match

### Change Colors
1. Edit `@theme` block in `app/globals.css`
2. Reference via Tailwind: `bg-bg`, `text-accent`
3. No component changes needed

### Add New Font
1. Add to Google Fonts import in `app/layout.tsx`
2. Define CSS variable in `app/globals.css`
3. Reference in Tailwind or via class

---

## PERFORMANCE CHECKLIST

- ✅ Passive scroll listeners: `{ passive: true }`
- ✅ Scroll-triggered animations: `whileInView`
- ✅ Minimal client components (animation-only)
- ⚠️ Image optimization: Ensure web-optimized
- ⚠️ Bundle size: Monitor with build
- 📝 Lighthouse: Target Core Web Vitals (LCP, FID, CLS)

---

## QUICK START FOR NEW DEVELOPERS

```bash
# 1. Clone & Install
git clone <repo>
cd personal-brand-website
npm install

# 2. Start Dev Server
npm run dev

# 3. Explore
# - app/page.tsx (composition)
# - app/components/Header.tsx (patterns)
# - app/globals.css (color system)

# 4. Make Changes
# Edit any component, save, auto-reload

# 5. Before Commit
npm run lint
git add .
git commit -m "Description"
```

---

## KEY FILES AT A GLANCE

| File | Purpose |
|------|---------|
| `app/page.tsx` | Home page composition |
| `app/layout.tsx` | Root layout, metadata, fonts |
| `app/globals.css` | Theme variables, base styles |
| `app/components/*.tsx` | 8 main page sections |
| `tsconfig.json` | TypeScript strict mode |
| `next.config.ts` | Image optimization |
| `package.json` | Dependencies, scripts |
| `.agents/skills/vercel-react-best-practices/AGENTS.md` | React best practices (80+ KB) |

---

## RESOURCES

- **React 19 Docs:** https://react.dev
- **Next.js 16 Docs:** https://nextjs.org/docs
- **Tailwind CSS v4:** https://tailwindcss.com/docs
- **Motion/Framer Motion:** https://motion.dev
- **Web.dev:** https://web.dev/performance
- **Portfolio:** https://sayuru.me
- **GitHub:** https://github.com/SayuruRemo

---

## CODE EXAMPLES

### Scroll-Triggered Animation
```tsx
export default function Section() {
  const fadeUp = {
    initial: { opacity: 0, y: 10 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
  };

  return (
    <motion.section {...fadeUp} transition={{ duration: 0.6 }}>
      <h2 className="text-3xl font-semibold text-text-primary">
        Heading
      </h2>
      <p className="text-text-muted">Body text</p>
    </motion.section>
  );
}
```

### Responsive Typography
```tsx
<h1 className="text-[clamp(2.8rem,7vw,5.5rem)] font-bold">
  Large Heading
</h1>
```

### Mobile Menu Pattern
```tsx
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-40 bg-bg/95"
    >
      {/* Menu content */}
    </motion.div>
  )}
</AnimatePresence>
```

### Color & Font Usage
```tsx
<div className="bg-bg border border-divider px-6 py-8 rounded">
  <h3 className="text-lg font-semibold text-text-primary">Title</h3>
  <p className="text-sm text-text-muted">Subtitle</p>
  <span className="jp-serif text-[10px] text-text-dim">日本語</span>
</div>
```

---

## FINAL NOTES

- **For Humans:** This is your project guide. Follow conventions for consistency.
- **For AI/LLMs:** Use examples above as patterns for code generation.
- **For Copilot:** Reference this file for architectural decisions.

Keep code clean, animations smooth, and the brand cohesive. ��✨

---

**Project Maintained by:** Sayuru Akash  
**Email:** hello@sayuru.me  
**Last Reviewed:** 2025-03-09
