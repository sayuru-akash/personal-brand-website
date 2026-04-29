# Implementation Plan: Animated Portfolio Homepage

## Overview

This implementation plan breaks down the animated portfolio homepage into discrete, actionable coding tasks. The portfolio will be built using Next.js 16, Motion (Framer Motion v12), and Tailwind CSS v4, following Japanese minimalist design principles with advanced scroll animations and micro-interactions.

**Implementation Strategy:**
- Start with project setup and configuration
- Build core section components incrementally (Hero → About → Skills → Projects → Contact)
- Implement animation system with custom hooks
- Add styling and responsive design
- Optimize performance and accessibility
- Add testing coverage

**Key Technologies:**
- Next.js 16.2.4 (App Router, Server/Client Components)
- Motion v12.35.2 (Framer Motion v12)
- Tailwind CSS v4
- TypeScript 5

## Tasks

- [ ] 1. Project setup and configuration
  - [x] 1.1 Configure Tailwind CSS v4 with custom design tokens
    - Create `tailwind.config.ts` with custom color palette (90% neutrals, 8% muted tones, 2% accent)
    - Configure typography scale with Sans-Serif font stack (Geist, Satoshi, Cabinet Grotesk)
    - Set up responsive breakpoints (sm: 640px, md: 768px, lg: 1024px, xl: 1280px)
    - Add custom utilities for Japanese design (letter-spacing, asymmetric offsets)
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 9.1, 9.2, 9.3, 9.6, 10.1_

  - [x] 1.2 Set up TypeScript types and interfaces
    - Create `types/portfolio.ts` with HeroContent, AboutContent, SkillCategory, Project, ContactContent interfaces
    - Define SocialLink interface for contact section
    - Add type definitions for animation configurations
    - _Requirements: 15.4, 15.5_

  - [x] 1.3 Create static content data file
    - Create `data/portfolio.ts` with typed content constants
    - Add Sayuru's biographical information (name, Japanese name, roles, traits, location, education)
    - Define skill categories (Development, Design, Music Production, Content Writing, Investment)
    - Add project data including Codezela Technologies
    - Add contact information and social links
    - _Requirements: 14.1, 14.2, 14.3, 14.4, 14.5, 14.6, 14.7_

  - [x] 1.4 Configure root layout and global styles
    - Update `app/layout.tsx` with metadata and font configuration
    - Add global styles to `app/globals.css` (grain texture overlay, base typography)
    - Configure Next.js metadata for SEO
    - Set up proper HTML semantic structure
    - _Requirements: 9.5, 12.7, 15.1_

- [ ] 2. Implement animation system and custom hooks
  - [x] 2.1 Create useReducedMotion hook
    - Implement `hooks/useReducedMotion.ts` to detect prefers-reduced-motion media query
    - Return boolean indicating if user prefers reduced motion
    - Add proper cleanup for media query listener
    - _Requirements: 12.1, 12.2_

  - [x] 2.2 Create useScrollAnimation hook
    - Implement `hooks/useScrollAnimation.ts` using Motion's useScroll and useTransform
    - Return scrollYProgress, parallaxY, and opacity values
    - Configure spring physics (stiffness: 100, damping: 20)
    - Support different parallax rates for foreground/background elements
    - _Requirements: 6.1, 6.2, 6.3, 6.5_

  - [x] 2.3 Create useMagneticHover hook
    - Implement `hooks/useMagneticHover.ts` using useMotionValue and useTransform
    - Accept strength parameter to control magnetic effect intensity
    - Return x, y motion values and mouse event handlers
    - Implement cursor-tracking logic outside React render cycle
    - _Requirements: 7.1, 7.2, 7.4_

  - [x] 2.4 Create animation configuration utilities
    - Create `utils/animationConfig.ts` with shared spring physics constants
    - Define stagger configuration (staggerChildren: 0.1)
    - Export reusable animation variants for entrance, exit, hover states
    - _Requirements: 1.2, 3.5, 6.5_

- [ ] 3. Implement Hero Section component
  - [x] 3.1 Create HeroSection Client Component
    - Create `app/components/HeroSection.tsx` with "use client" directive
    - Implement asymmetric layout with 40-60% whitespace
    - Add large display heading with Sayuru's name and role
    - Add Japanese subtitle (サユル アーカーシュ) with lighter weight
    - Use min-h-[100dvh] for full viewport height
    - Apply tight tracking (tracking-tighter) and large scale (text-4xl md:text-6xl)
    - _Requirements: 1.1, 1.4, 1.5, 1.7, 8.2, 8.4, 10.3_

  - [x] 3.2 Add staggered entrance animations to Hero
    - Implement staggered animation for heading → subtitle → SVG motif
    - Use spring physics (stiffness: 100, damping: 20)
    - Respect prefers-reduced-motion setting
    - _Requirements: 1.2, 12.1, 12.2_

  - [x] 3.3 Add animated SVG motif with perpetual animation
    - Create or integrate animated SVG element
    - Implement perpetual float or pulse animation using Motion's animate prop with repeat: Infinity
    - Isolate in memoized component for performance
    - _Requirements: 1.3, 7.3, 11.3_

  - [x] 3.4 Add parallax scroll effects to Hero
    - Implement scroll-linked parallax using useScrollAnimation hook
    - Apply parallax transforms to background elements
    - Maintain 60fps performance with hardware-accelerated transforms
    - _Requirements: 1.6, 6.1, 6.2, 6.7, 11.1_

  - [ ]* 3.5 Write unit tests for HeroSection
    - Test component renders with correct content
    - Test staggered animation triggers on mount
    - Test parallax effects apply correct transforms
    - Test prefers-reduced-motion disables animations
    - _Requirements: 1.1, 1.2, 1.6, 12.1_

- [ ] 4. Implement About Section component
  - [~] 4.1 Create AboutSection Client Component
    - Create `app/components/AboutSection.tsx` with "use client" directive
    - Implement split-screen or offset layout with asymmetric alignment (8-32px offsets)
    - Display biographical content (roles, traits, bio, location, education)
    - Apply typography hierarchy with Sans-Serif font
    - _Requirements: 2.1, 2.3, 2.4, 2.6, 2.7, 8.1, 8.5_

  - [~] 4.2 Add staggered fade-in animations to About
    - Implement viewport intersection detection using Motion's whileInView
    - Trigger staggered fade-in for content blocks
    - Use spring physics for smooth entrance
    - _Requirements: 2.2, 6.4_

  - [~] 4.3 Add parallax effects to About visual elements
    - Apply different parallax rates to foreground and background elements
    - Use useScrollAnimation hook for scroll-linked transforms
    - Maintain performance with hardware acceleration
    - _Requirements: 2.5, 6.3, 11.1_

  - [ ]* 4.4 Write unit tests for AboutSection
    - Test component renders all biographical content
    - Test staggered animations trigger on viewport entry
    - Test parallax effects apply at different rates
    - _Requirements: 2.1, 2.2, 2.5_

- [ ] 5. Implement Skills Section component
  - [~] 5.1 Create SkillsSection Client Component
    - Create `app/components/SkillsSection.tsx` with "use client" directive
    - Implement Bento grid layout with asymmetric tile sizing using CSS Grid
    - Display skill categories with titles and skill lists
    - Apply responsive grid (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
    - _Requirements: 3.1, 3.2, 10.5_

  - [~] 5.2 Add perpetual micro-animations to skill cards
    - Implement pulse, float, or shimmer animations on skill cards
    - Use Motion's animate prop with repeat: Infinity
    - Isolate animations in memoized components
    - Animate only transform and opacity properties
    - _Requirements: 3.3, 3.7, 7.3, 11.1, 11.3_

  - [~] 5.3 Add magnetic hover effects to skill cards
    - Implement magnetic hover using useMagneticHover hook
    - Apply directional pull toward cursor on hover
    - Use spring physics for smooth interactions
    - _Requirements: 3.4, 3.5, 7.1, 7.2_

  - [~] 5.4 Add staggered entrance animations to Skills
    - Implement staggerChildren with 100ms delays
    - Trigger animations on viewport entry
    - _Requirements: 3.6, 6.4_

  - [ ]* 5.5 Write unit tests for SkillsSection
    - Test Bento grid renders with correct layout
    - Test magnetic hover effects apply transforms
    - Test perpetual animations run continuously
    - Test staggered entrance timing
    - _Requirements: 3.1, 3.3, 3.4, 3.6_

- [ ] 6. Implement Projects Section component
  - [~] 6.1 Create ProjectsSection Client Component
    - Create `app/components/ProjectsSection.tsx` with "use client" directive
    - Implement masonry layout with CSS Grid and varied aspect ratios
    - Display project cards with title, description, technologies, role
    - Include Codezela Technologies as featured project
    - _Requirements: 4.1, 4.4, 4.5, 4.7_

  - [~] 6.2 Add scroll-triggered reveal animations to project cards
    - Implement fade-in with translateY transforms on viewport entry
    - Use scroll-linked reveals with Scroll_Controller
    - Stagger card animations for visual flow
    - _Requirements: 4.2, 4.6, 6.4_

  - [~] 6.3 Add hover interactions to project cards
    - Implement hover-reveal for project details
    - Use smooth transitions for detail overlay
    - Apply tactile feedback on hover
    - _Requirements: 4.3, 7.5_

  - [ ]* 6.4 Write unit tests for ProjectsSection
    - Test masonry layout renders correctly
    - Test scroll-triggered reveals fire on viewport entry
    - Test hover interactions show project details
    - _Requirements: 4.1, 4.2, 4.3_

- [ ] 7. Implement Contact Section component
  - [~] 7.1 Create ContactSection Client Component
    - Create `app/components/ContactSection.tsx` with "use client" directive
    - Implement minimal layout with 60%+ whitespace
    - Display one primary call-to-action element
    - Include contact methods (email, social links)
    - Apply subtractive aesthetics with minimal decoration
    - _Requirements: 5.1, 5.2, 5.3, 5.5, 5.6_

  - [~] 7.2 Add subtle entrance animations to Contact
    - Implement gentle fade-in on viewport entry
    - Use spring physics for smooth entrance
    - _Requirements: 5.4_

  - [ ]* 7.3 Write unit tests for ContactSection
    - Test component renders contact information
    - Test minimal layout maintains whitespace
    - Test entrance animations trigger correctly
    - _Requirements: 5.1, 5.2, 5.4_

- [ ] 8. Integrate sections into main page
  - [~] 8.1 Update app/page.tsx with all sections
    - Import all section components (Hero, About, Skills, Projects, Contact)
    - Arrange sections in vertical layout
    - Pass content data from portfolio.ts to each section as props
    - Use Server Component for page layout, Client Components for sections
    - Apply max-w-[1400px] mx-auto for consistent content width
    - _Requirements: 10.4, 15.1, 15.6_

  - [~] 8.2 Implement scroll progress indicators
    - Add scroll progress bar or indicators for long sections
    - Use scrollYProgress from useScroll hook
    - _Requirements: 6.6_

  - [ ]* 8.3 Write integration tests for main page
    - Test all sections render correctly
    - Test scroll behavior works across sections
    - Test content data flows to all components
    - _Requirements: 1.1, 2.1, 3.1, 4.1, 5.1_

- [~] 9. Checkpoint - Ensure all components render and animate
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 10. Implement responsive design and mobile optimizations
  - [~] 10.1 Add responsive breakpoints to all sections
    - Apply Tailwind responsive classes (sm, md, lg, xl) to all components
    - Collapse asymmetric layouts to single-column below 768px
    - Adjust typography scale for mobile (smaller text-4xl → text-3xl)
    - _Requirements: 10.1, 10.2, 10.5_

  - [~] 10.2 Optimize animations for mobile performance
    - Reduce animation complexity on mobile viewports
    - Disable heavy effects on touch devices
    - Maintain touch-friendly interaction targets (min 44x44px)
    - _Requirements: 10.6, 10.7_

  - [ ]* 10.3 Write responsive design tests
    - Test layouts adapt correctly at key breakpoints
    - Test mobile touch targets meet minimum size
    - Test animations reduce complexity on mobile
    - _Requirements: 10.1, 10.2, 10.7_

- [ ] 11. Implement advanced visual effects
  - [~] 11.1 Add liquid glass refraction effects
    - Implement backdrop-blur with 1px inner border and inner shadow
    - Apply to appropriate UI elements (cards, overlays)
    - _Requirements: 13.1_

  - [~] 11.2 Add spotlight border cards
    - Implement dynamic border illumination under cursor
    - Use CSS custom properties and JavaScript for cursor tracking
    - _Requirements: 13.2_

  - [~] 11.3 Add kinetic typography effects
    - Implement letter animations on scroll or hover for headings
    - Use Motion's stagger for individual letter animations
    - _Requirements: 13.3, 7.6_

  - [ ]* 11.4 Write tests for visual effects
    - Test glass effects apply correct styles
    - Test spotlight cards track cursor position
    - Test kinetic typography animates letters
    - _Requirements: 13.1, 13.2, 13.3_

- [ ] 12. Implement performance optimizations
  - [~] 12.1 Optimize animation performance
    - Ensure all animations use only transform and opacity
    - Apply will-change: transform sparingly to actively animating elements
    - Verify 60fps performance in Chrome DevTools
    - _Requirements: 11.1, 11.2, 11.7_

  - [~] 12.2 Implement lazy loading for heavy components
    - Use next/dynamic for lazy-loading non-critical components
    - Implement proper loading states
    - _Requirements: 11.7_

  - [~] 12.3 Add proper cleanup for animations
    - Implement cleanup functions in useEffect hooks
    - Remove event listeners on component unmount
    - Cancel in-flight animations on unmount
    - _Requirements: 11.4_

  - [~] 12.4 Optimize grain texture overlay
    - Apply grain filter only to fixed, pointer-events-none pseudo-elements
    - Ensure grain doesn't impact scroll performance
    - _Requirements: 11.5_

  - [ ]* 12.5 Run performance audit
    - Run Lighthouse audit and verify score 90+
    - Check bundle size with Next.js bundle analyzer
    - Verify no layout shifts (CLS metric)
    - _Requirements: 11.1, 11.7_

- [ ] 13. Implement accessibility features
  - [~] 13.1 Add keyboard navigation support
    - Ensure all interactive elements are keyboard accessible
    - Add visible focus states to all focusable elements
    - Implement proper tab order
    - _Requirements: 12.3_

  - [~] 13.2 Add ARIA labels and semantic HTML
    - Add appropriate ARIA labels to interactive elements
    - Use semantic HTML elements (nav, main, section, article)
    - Implement proper heading hierarchy (h1, h2, h3)
    - _Requirements: 12.4, 12.7_

  - [~] 13.3 Ensure color contrast compliance
    - Verify all text meets 4.5:1 contrast ratio for body text
    - Verify large text meets 3:1 contrast ratio
    - Test with color contrast analyzer
    - _Requirements: 12.5_

  - [~] 13.4 Add alt text to all images
    - Provide descriptive alt text for all images
    - Use empty alt for decorative images
    - _Requirements: 12.6_

  - [ ]* 13.5 Run accessibility audit
    - Run jest-axe tests for WCAG AA compliance
    - Test with screen reader (NVDA or VoiceOver)
    - Verify keyboard navigation works for all sections
    - _Requirements: 12.1, 12.3, 12.4, 12.5, 12.6, 12.7_

- [~] 14. Checkpoint - Ensure performance and accessibility standards met
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 15. Add error boundaries and graceful degradation
  - [~] 15.1 Create AnimationErrorBoundary component
    - Create `components/ErrorBoundary.tsx` for animation errors
    - Implement fallback to static layout on error
    - Log errors to console in development
    - _Requirements: 15.6_

  - [~] 15.2 Wrap animated components in error boundaries
    - Wrap all Client Components with AnimationErrorBoundary
    - Ensure graceful degradation if animations fail
    - _Requirements: 15.6_

  - [~] 15.3 Implement progressive enhancement
    - Ensure base HTML structure works without JavaScript
    - Add CSS-only hover effects as fallback
    - Provide static layout for JavaScript-disabled browsers
    - _Requirements: 15.6_

  - [ ]* 15.4 Write error boundary tests
    - Test error boundary catches animation errors
    - Test fallback UI renders correctly
    - Test error logging in development
    - _Requirements: 15.6_

- [ ] 16. Final integration and polish
  - [~] 16.1 Review and refine all animations
    - Verify all animations use consistent spring physics
    - Ensure smooth transitions between sections
    - Check animation timing and stagger delays
    - _Requirements: 1.2, 3.5, 6.5_

  - [~] 16.2 Review and refine typography
    - Verify consistent font sizing across sections
    - Check letter-spacing on all headings
    - Ensure Japanese typography renders correctly
    - _Requirements: 8.1, 8.2, 8.3, 8.4, 8.5, 8.6, 8.7_

  - [~] 16.3 Review and refine color system
    - Verify color palette consistency (90% neutral, 8% muted, 2% accent)
    - Check grain texture overlay opacity
    - Ensure no gradients or neon glows
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 9.6, 9.7_

  - [~] 16.4 Final responsive design review
    - Test on multiple devices and screen sizes
    - Verify mobile layouts work correctly
    - Check touch interactions on mobile
    - _Requirements: 10.1, 10.2, 10.3, 10.4, 10.5, 10.6, 10.7_

  - [ ]* 16.5 Run full test suite
    - Run all unit tests
    - Run all integration tests
    - Run accessibility tests
    - Run performance tests
    - _Requirements: All requirements_

- [~] 17. Final checkpoint - Complete implementation
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation at key milestones
- Focus on performance: animate only transform and opacity, maintain 60fps
- Respect accessibility: detect prefers-reduced-motion, ensure keyboard navigation
- Follow Japanese design principles: Ma (emptiness), asymmetry, subtractive aesthetics
- Use Server Components for static layouts, Client Components only for interactive elements
