/**
 * TypeScript type definitions for the animated portfolio homepage
 * 
 * These interfaces define the structure of all content data used throughout
 * the portfolio, ensuring type safety and consistency across components.
 */

/**
 * Hero section content structure
 * Used in the primary landing viewport with asymmetric layout
 */
export interface HeroContent {
  /** Full name displayed in large heading */
  name: string;
  /** Japanese name (e.g., "サユル アーカーシュ") */
  nameJapanese: string;
  /** Primary role statement (e.g., "Full-stack Developer & Musical Artist") */
  role: string;
  /** Expanded rotating role list */
  roles: string[];
  /** Additional tagline or subtitle */
  subtitle: string;
}

/**
 * About section content structure
 * Used in the biographical section with split-screen or offset layout
 */
export interface AboutContent {
  /** Biographical paragraph */
  bio: string;
  /** Array of professional roles */
  roles: string[];
  /** Array of personality traits and interests */
  traits: string[];
  /** Current location (e.g., "Colombo, Sri Lanka") */
  location: string;
  /** Educational background */
  education: string;
}

/**
 * Skill category structure for Bento grid layout
 * Each category represents a tile in the asymmetric grid
 */
export interface SkillCategory {
  /** Unique identifier for the category */
  id: string;
  /** Category title (e.g., "Development", "Design") */
  title: string;
  /** Array of skill names within this category */
  skills: string[];
  /** Bento grid tile size for asymmetric layout */
  gridSize: 'small' | 'medium' | 'large';
  /** Optional icon identifier for visual representation */
  icon?: string;
}

/**
 * Project structure for masonry layout
 * Each project represents a portfolio work item
 */
export interface Project {
  /** Unique identifier for the project */
  id: string;
  /** Project title */
  title: string;
  /** Project description or summary */
  description: string;
  /** Array of technologies used (e.g., ["Next.js", "TypeScript"]) */
  technologies: string[];
  /** Role in the project (e.g., "Founder & CEO") */
  role: string;
  /** Aspect ratio for masonry layout (e.g., "16/9", "4/3", "1/1") */
  aspectRatio: string;
  /** Optional project image URL */
  imageUrl?: string;
  /** Optional external link to project */
  link?: string;
}

/**
 * Social link structure for contact section
 * Represents a social media profile or external link
 */
export interface SocialLink {
  /** Platform name (e.g., "GitHub", "LinkedIn", "Twitter") */
  platform: string;
  /** Full URL to the profile */
  url: string;
  /** Display handle or username */
  handle: string;
}

/**
 * Contact section content structure
 * Used in the minimal contact interface with dominant whitespace
 */
export interface ContactContent {
  /** Contact email address */
  email: string;
  /** Array of social media links */
  socialLinks: SocialLink[];
  /** Call-to-action text */
  ctaText: string;
}

export interface SiteNavigationItem {
  label: string;
  href: string;
}

export interface BiographyFact {
  label: string;
  value: string;
}

export interface BiographyMoment {
  marker: string;
  title: string;
  description: string;
}

export interface ArchiveImage {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface AboutPageContent {
  introduction: string;
  biography: string[];
  facts: BiographyFact[];
  moments: BiographyMoment[];
  archive: ArchiveImage[];
}

export interface PrivacyPolicySection {
  id: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

/**
 * Complete portfolio content structure
 * Aggregates all section content for type-safe data flow
 */
export interface PortfolioContent {
  hero: HeroContent;
  about: AboutContent;
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactContent;
}

/**
 * Animation configuration types
 * Used for consistent animation behavior across components
 */

/**
 * Spring physics configuration for Motion animations
 * Default values: stiffness: 100, damping: 20
 */
export interface SpringConfig {
  /** Spring stiffness (higher = faster) */
  stiffness: number;
  /** Spring damping (higher = less oscillation) */
  damping: number;
  /** Optional mass (affects inertia) */
  mass?: number;
}

/**
 * Stagger animation configuration
 * Used for sequential entrance animations
 */
export interface StaggerConfig {
  /** Delay between each child animation in seconds */
  staggerChildren: number;
  /** Optional delay before stagger begins */
  delayChildren?: number;
}

/**
 * Parallax configuration for scroll-linked animations
 * Different rates create depth perception
 */
export interface ParallaxConfig {
  /** Parallax rate multiplier (0.5 = half scroll speed, 0.2 = fifth speed) */
  rate: number;
  /** Optional scroll range [start, end] for parallax effect */
  range?: [number, number];
}

/**
 * Magnetic hover configuration
 * Controls the strength of cursor-tracking hover effects
 */
export interface MagneticHoverConfig {
  /** Strength of magnetic pull (0-1, where 1 is strongest) */
  strength: number;
  /** Optional maximum distance for effect in pixels */
  maxDistance?: number;
}

/**
 * Animation variant types for Motion components
 * Defines common animation states
 */
export type AnimationVariant = 'hidden' | 'visible' | 'hover' | 'tap' | 'exit';

/**
 * Animation variants object structure
 * Maps variant names to animation properties
 */
export interface AnimationVariants {
  [key: string]: {
    opacity?: number;
    scale?: number;
    x?: number;
    y?: number;
    rotate?: number;
    transition?: {
      type?: 'spring' | 'tween' | 'inertia';
      duration?: number;
      delay?: number;
      stiffness?: number;
      damping?: number;
      repeat?: number;
      repeatType?: 'loop' | 'reverse' | 'mirror';
    };
  };
}

/**
 * Reduced motion preference type
 * Used for accessibility-aware animation rendering
 */
export type ReducedMotionPreference = boolean;
