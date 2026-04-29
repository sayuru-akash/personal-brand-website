# Design Document: Animated Portfolio Homepage

## Overview

This design document outlines the architecture for Sayuru Akash Amarasinghe's animated portfolio homepage - a high-performance, animation-rich single-page application built with Next.js 16, Motion (Framer Motion v12), and Tailwind CSS v4. The portfolio showcases multi-disciplinary expertise through Japanese-minimalist design principles combined with advanced scroll animations, parallax effects, and micro-interactions.

**Core Design Principles:**
- **Japanese Minimalism (Ma)**: 40-60% whitespace, asymmetric layouts, subtractive aesthetics
- **Performance-First**: 60fps animations using hardware-accelerated transforms
- **Accessibility**: Respect prefers-reduced-motion, keyboard navigation, semantic HTML
- **Mobile-First Responsive**: Seamless adaptation across all viewport sizes

## Architecture

### Component Structure

The application follows a modular component architecture with clear separation between Server and Client Components:

**Server Components (Static Layouts):**
- `app/page.tsx` - Root page orchestrating all sections
- `app/layout.tsx` - Root layout with metadata and global styles
- Section container components (non-interactive shells)

**Client Components (Interactive/Animated):**
- `HeroSection` - Asymmetric hero with staggered entrance animations
- `AboutSection` - Split-screen layout with parallax effects
- `SkillsSection` - Bento grid with magnetic hover interactions
- `ProjectsSection` - Masonry layout with scroll-triggered reveals
- `ContactSection` - Minimal contact interface with subtle animations
- `ScrollController` - Scroll-linked animation orchestration
- `InteractionHandler` - Hover effects and micro-animations

**Shared Utilities:**
- `hooks/useScrollAnimation.ts` - Scroll-linked animation logic
- `hooks/useMagneticHover.ts` - Magnetic hover effect logic
- `hooks/useReducedMotion.ts` - Accessibility motion detection
- `utils/animationConfig.ts` - Shared animation constants (spring physics)
- `types/portfolio.ts` - TypeScript interfaces for content data

### Technology Stack

- **Framework**: Next.js 16.2.4 (App Router, Server Components)
- **Animation**: Motion v12.35.2 (Framer Motion v12)
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss
- **Language**: TypeScript 5
- **Runtime**: React 19.2.3
- **Deployment**: Vercel (optimized for Next.js)

## Animation Strategy

### Animation System Architecture

**Three-Layer Animation System:**

1. **Entrance Animations** (One-time on mount/viewport entry)
   - Staggered fade-in with translateY transforms
   - Spring physics: `{ type: "spring", stiffness: 100, damping: 20 }`
   - Triggered by viewport intersection using Motion's `whileInView` prop

2. **Scroll-Linked Animations** (Continuous during scroll)
   - Parallax effects using `useScroll()` + `useTransform()`
   - Scroll progress indicators using `scrollYProgress`
   - Different parallax rates for depth perception (foreground: 0.5x, background: 0.2x)

3. **Interaction Animations** (User-triggered)
   - Magnetic hover effects using `useMotionValue()` + `useTransform()`
   - Perpetual micro-animations (pulse, float) using `animate` prop with `repeat: Infinity`
   - Tactile click feedback with scale transforms

### Performance Optimization

**Hardware Acceleration:**
- Animate only `transform` and `opacity` properties
- Apply `will-change: transform` sparingly to actively animating elements
- Use `translateZ(0)` or `translate3d()` to force GPU acceleration

**Render Optimization:**
- Isolate perpetual animations in memoized Client Components
- Use `useMotionValue()` for cursor tracking (bypasses React render cycle)
- Implement proper cleanup in `useEffect` hooks
- Lazy-load heavy components with `next/dynamic`

**Reduced Motion:**
- Detect `prefers-reduced-motion` media query
- Replace animations with instant state changes when enabled
- Provide static fallback layouts

## Data Flow

### Content Data Architecture

**Static Content (Type-Safe):**

```typescript
// types/portfolio.ts
interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactContent;
}

interface HeroContent {
  name: string;
  nameJapanese: string;
  role: string;
  subtitle: string;
}

interface SkillCategory {
  id: string;
  title: string;
  skills: string[];
  gridSize: 'small' | 'medium' | 'large'; // Bento grid sizing
}

interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  role: string;
  aspectRatio: string; // For masonry layout
}
```

**Data Flow Pattern:**

1. **Static Content Definition** → Define content in `data/portfolio.ts` as typed constants
2. **Server Component Fetch** → Import content in Server Components (zero runtime cost)
3. **Props Passing** → Pass content to Client Components as props
4. **Client Rendering** → Client Components apply animations to received data

**No External Data Sources:**
- All content is statically defined (no CMS, no API calls)
- Content updates require code changes and redeployment
- Optimized for performance (no loading states, no hydration mismatches)

### Animation State Management

**Local Component State:**
- Hover states managed by Motion's `whileHover` prop
- Scroll progress managed by `useScroll()` hook
- Cursor position managed by `useMotionValue()` hook

**No Global State Required:**
- Each section manages its own animation state
- No Redux, Zustand, or Context API needed
- Animations are declarative and self-contained

## Components and Interfaces

### Core Section Components

**HeroSection**
- **Purpose**: First impression with large statement and Japanese subtitle
- **Layout**: Asymmetric with 40-60% whitespace
- **Animations**: Staggered entrance (heading → subtitle → SVG motif), parallax on scroll
- **Key Props**: `name`, `nameJapanese`, `role`, `subtitle`

**AboutSection**
- **Purpose**: Biographical content with visual storytelling
- **Layout**: Split-screen or offset grid (asymmetric 8-32px offsets)
- **Animations**: Staggered content block reveals, parallax visual elements
- **Key Props**: `roles[]`, `traits[]`, `bio`, `location`, `education`

**SkillsSection**
- **Purpose**: Interactive expertise showcase
- **Layout**: Bento grid (asymmetric tile sizing using CSS Grid)
- **Animations**: Perpetual micro-animations, magnetic hover effects, staggered entrance
- **Key Props**: `categories[]` (each with `title`, `skills[]`, `gridSize`)

**ProjectsSection**
- **Purpose**: Portfolio work gallery
- **Layout**: Masonry grid (varied aspect ratios)
- **Animations**: Scroll-triggered reveals, hover detail overlays
- **Key Props**: `projects[]` (each with `title`, `description`, `technologies[]`, `role`, `aspectRatio`)

**ContactSection**
- **Purpose**: Minimal contact interface
- **Layout**: Dominant whitespace (60%+), single CTA element
- **Animations**: Subtle entrance effects
- **Key Props**: `email`, `socialLinks[]`, `ctaText`

### Shared Animation Hooks

**useScrollAnimation()**
- Returns: `{ scrollYProgress, parallaxY, opacity }`
- Usage: Scroll-linked transforms and fades
- Implementation: Wraps `useScroll()` + `useTransform()`

**useMagneticHover(strength: number)**
- Returns: `{ x, y, handleMouseMove, handleMouseLeave }`
- Usage: Cursor-tracking hover effects
- Implementation: Uses `useMotionValue()` + `useTransform()`

**useReducedMotion()**
- Returns: `boolean` (true if user prefers reduced motion)
- Usage: Conditional animation rendering
- Implementation: Wraps `window.matchMedia('(prefers-reduced-motion: reduce)')`

## Data Models

### Content Type Definitions

```typescript
// Comprehensive type system for portfolio content

interface HeroContent {
  name: string;              // "Sayuru Akash Amarasinghe"
  nameJapanese: string;      // "サユル アーカーシュ"
  role: string;              // "Full-stack Developer & Musical Artist"
  subtitle: string;          // Additional tagline
}

interface AboutContent {
  bio: string;               // Biographical paragraph
  roles: string[];           // ["Full-stack Developer", "CEO @ Codezela", ...]
  traits: string[];          // ["Coffee enthusiast", "Tech lover", ...]
  location: string;          // "Colombo, Sri Lanka"
  education: string;         // "Plymouth University, UK"
}

interface SkillCategory {
  id: string;                // Unique identifier
  title: string;             // "Development", "Design", etc.
  skills: string[];          // Array of skill names
  gridSize: 'small' | 'medium' | 'large'; // Bento grid tile size
  icon?: string;             // Optional icon identifier
}

interface Project {
  id: string;                // Unique identifier
  title: string;             // "Codezela Technologies"
  description: string;       // Project summary
  technologies: string[];    // ["Next.js", "TypeScript", ...]
  role: string;              // "Founder & CEO"
  aspectRatio: string;       // "16/9", "4/3", "1/1" for masonry
  imageUrl?: string;         // Optional project image
  link?: string;             // Optional external link
}

interface ContactContent {
  email: string;             // Contact email
  socialLinks: SocialLink[]; // Array of social profiles
  ctaText: string;           // Call-to-action text
}

interface SocialLink {
  platform: string;          // "GitHub", "LinkedIn", etc.
  url: string;               // Full URL
  handle: string;            // Display handle
}
```

## Error Handling

### Client Component Error Boundaries

**Animation Error Handling:**
- Wrap animated Client Components in error boundaries
- Fallback to static layout if animation fails
- Log animation errors to console (development only)

**Implementation Pattern:**
```typescript
// components/ErrorBoundary.tsx
class AnimationErrorBoundary extends React.Component {
  componentDidCatch(error, errorInfo) {
    console.error('Animation error:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <StaticFallback>{this.props.children}</StaticFallback>;
    }
    return this.props.children;
  }
}
```

### Graceful Degradation

**Progressive Enhancement Strategy:**
1. **Base Layer**: Semantic HTML with proper structure (works without JS)
2. **Style Layer**: Tailwind CSS for layout and typography (works without animations)
3. **Animation Layer**: Motion animations enhance experience (optional)

**Fallback Scenarios:**
- JavaScript disabled → Static layout with CSS-only hover effects
- Reduced motion enabled → Instant state changes, no transitions
- Slow network → Content visible immediately, animations load progressively

## Testing Strategy

### Testing Approach

This portfolio is primarily a UI presentation layer with animation-heavy interactions. Property-based testing is **not applicable** for this feature type. Instead, we focus on:

**1. Visual Regression Testing**
- Snapshot tests for each section component
- Verify layout structure and styling
- Detect unintended visual changes
- Tools: Jest + React Testing Library snapshots

**2. Interaction Testing**
- Unit tests for hover effects (verify state changes)
- Unit tests for scroll animation triggers (verify viewport intersection)
- Unit tests for accessibility (keyboard navigation, focus states)
- Tools: Jest + React Testing Library + Testing Library User Event

**3. Accessibility Testing**
- Verify prefers-reduced-motion detection and handling
- Verify keyboard navigation works for all interactive elements
- Verify ARIA labels and semantic HTML structure
- Verify color contrast ratios meet WCAG AA standards
- Tools: jest-axe, manual testing with screen readers

**4. Performance Testing**
- Verify animations run at 60fps (Chrome DevTools Performance tab)
- Verify no layout shifts (Lighthouse CLS metric)
- Verify bundle size remains under budget
- Tools: Lighthouse, Chrome DevTools, Next.js bundle analyzer

**5. Integration Testing**
- Verify all sections render correctly on page
- Verify scroll behavior works across sections
- Verify responsive breakpoints adapt layout correctly
- Tools: Playwright or Cypress for E2E tests

### Example Test Cases

**Unit Test Example (Interaction):**
```typescript
describe('SkillsSection', () => {
  it('applies magnetic hover effect on card hover', () => {
    const { getByTestId } = render(<SkillsSection categories={mockCategories} />);
    const card = getByTestId('skill-card-0');
    
    fireEvent.mouseEnter(card);
    expect(card).toHaveStyle({ transform: expect.stringContaining('translate') });
  });
});
```

**Accessibility Test Example:**
```typescript
describe('HeroSection Accessibility', () => {
  it('respects prefers-reduced-motion', () => {
    mockMatchMedia('(prefers-reduced-motion: reduce)');
    const { container } = render(<HeroSection {...mockHeroContent} />);
    
    // Verify no animation classes applied
    expect(container.querySelector('[data-animated]')).toBeNull();
  });
});
```

**Visual Regression Test Example:**
```typescript
describe('AboutSection Snapshots', () => {
  it('matches snapshot for desktop layout', () => {
    const { container } = render(<AboutSection {...mockAboutContent} />);
    expect(container).toMatchSnapshot();
  });
});
```

### Testing Coverage Goals

- **Unit Tests**: 80%+ coverage for interactive components
- **Accessibility Tests**: 100% coverage for WCAG AA compliance
- **Visual Regression**: Snapshots for all section components at key breakpoints
- **Performance**: All animations maintain 60fps, Lighthouse score 90+

---

**Design Document Status**: Complete
**Next Phase**: Task Creation: Animated Portfolio Homepage

## Overview

This design document specifies the technical architecture for an exceptional animated portfolio homepage for Sayuru Akash Amarasinghe. The portfolio combines Japanese minimalist design principles with modern web motion choreography to create an unforgettable, immersive experience that showcases diverse expertise across software development, content creation, music production, and entrepreneurship.

### Design Philosophy

The portfolio follows three core Japanese aesthetic principles:

1. **間 (Ma / Emptiness)**: 40-60% visual emptiness per viewport, treating whitespace as intentional breath rather than unused space
2. **非対称 (Asymmetry)**: Intentional 8px-32px offsets from grid alignment to signal authorship over template
3. **引き算の美学 (Subtractive Aesthetics)**: One dominant visual element per section, removing until nothing can be removed without loss

### Technical Stack

- **Framework**: Next.js 16.2.4 App Router with Server/Client Component architecture
- **Animation**: Motion (Framer Motion v12) for all animations and scroll effects
- **Styling**: Tailwind CSS v4 with @tailwindcss/postcss plugin
- **Type Safety**: TypeScript for all components and utilities
- **Performance**: Hardware-accelerated transforms, 60fps target, prefers-reduced-motion support

### Key Design Decisions

1. **Server-First Architecture**: Use Server Components for static layouts, Client Components only for interactive elements with "use client" directive
2. **Motion-First Animations**: All animations use Motion v12 with spring physics (stiffness: 100, damping: 20) for premium feel
3. **Performance-First Rendering**: Animate only transform and opacity properties, isolate perpetual animations in memoized components
4. **Accessibility-First Interactions**: Detect prefers-reduced-motion, maintain keyboard accessibility, ensure 4.5:1 contrast ratios
5. **Mobile-First Responsive**: Use min-h-[100dvh] instead of h-screen, collapse asymmetric layouts to single-column below 768px

## Architecture

### System Architecture

```mermaid
graph TD
    A[Next.js App Router] --> B[Server Components Layer]
    A --> C[Client Components Layer]
    
    B --> D[Page Layout]
    B --> E[Section Containers]
    B --> F[Static Content]
    
    C --> G[Motion Engine]
    C --> H[Scroll Controller]
    C --> I[Interaction Handler]
    
    G --> J[Spring Physics]
    G --> K[Stagger Orchestration]
    G --> L[Layout Transitions]
    
    H --> M[useScroll Hook]
    H --> N[useTransform Hook]
    H --> O[Parallax System]
    
    I --> P[Magnetic Hover]
    I --> Q[Perpetual Animations]
    I --> R[Tactile Feedback]
    
    S[Performance Monitor] --> G
    S --> H
    S --> I
    
    T[Accessibility Controller] --> G
    T --> H
    T --> I
