/**
 * Animation Configuration Utilities
 * 
 * Shared animation constants and variants for Motion (Framer Motion v12)
 * following Japanese minimalist design principles with spring physics.
 * 
 * Requirements: 1.2, 3.5, 6.5
 */

import type { Transition, Variants } from 'motion/react';

/**
 * Shared spring physics configuration
 * Provides premium, natural motion feel across all animations
 */
export const springPhysics: Transition = {
  type: 'spring',
  stiffness: 100,
  damping: 20,
};

/**
 * Stagger configuration for sequential animations
 * 100ms delay between child elements (0.1 seconds)
 */
export const staggerConfig = {
  staggerChildren: 0.1,
  delayChildren: 0,
};

/**
 * Fast stagger for quick sequential reveals
 */
export const staggerConfigFast = {
  staggerChildren: 0.05,
  delayChildren: 0,
};

/**
 * Slow stagger for dramatic sequential reveals
 */
export const staggerConfigSlow = {
  staggerChildren: 0.15,
  delayChildren: 0.1,
};

/**
 * Entrance animation variants
 * Fade in with translateY transform from below
 */
export const entranceVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPhysics,
  },
};

/**
 * Entrance animation variants with larger translateY
 * For more dramatic reveals
 */
export const entranceVariantsLarge: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: springPhysics,
  },
};

/**
 * Entrance animation variants from left
 * Slide in from left with fade
 */
export const entranceVariantsLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springPhysics,
  },
};

/**
 * Entrance animation variants from right
 * Slide in from right with fade
 */
export const entranceVariantsRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: springPhysics,
  },
};

/**
 * Staggered container variants
 * Parent container that staggers child animations
 */
export const staggerContainerVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...springPhysics,
      ...staggerConfig,
    },
  },
};

/**
 * Exit animation variants
 * Fade out with translateY transform upward
 */
export const exitVariants: Variants = {
  visible: {
    opacity: 1,
    y: 0,
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: springPhysics,
  },
};

/**
 * Hover animation variants
 * Subtle scale and lift effect
 */
export const hoverVariants: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.02,
    y: -4,
    transition: springPhysics,
  },
};

/**
 * Hover animation variants with stronger effect
 * More pronounced scale and lift
 */
export const hoverVariantsStrong: Variants = {
  initial: {
    scale: 1,
    y: 0,
  },
  hover: {
    scale: 1.05,
    y: -8,
    transition: springPhysics,
  },
};

/**
 * Tactile press animation variants
 * Subtle scale down on press for feedback
 */
export const pressVariants: Variants = {
  initial: {
    scale: 1,
  },
  press: {
    scale: 0.98,
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 30,
    },
  },
};

/**
 * Float animation configuration
 * Perpetual floating motion for decorative elements
 */
export const floatAnimation = {
  y: [-10, 10, -10],
  transition: {
    duration: 4,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * Pulse animation configuration
 * Perpetual scale pulse for accent elements
 */
export const pulseAnimation = {
  scale: [1, 1.05, 1],
  transition: {
    duration: 2,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * Shimmer animation configuration
 * Perpetual opacity shimmer for subtle emphasis
 */
export const shimmerAnimation = {
  opacity: [0.7, 1, 0.7],
  transition: {
    duration: 3,
    repeat: Infinity,
    ease: 'easeInOut',
  },
};

/**
 * Rotate animation configuration
 * Perpetual slow rotation for decorative elements
 */
export const rotateAnimation = {
  rotate: [0, 360],
  transition: {
    duration: 20,
    repeat: Infinity,
    ease: 'linear',
  },
};

/**
 * Scroll reveal variants
 * Optimized for viewport intersection triggers
 */
export const scrollRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      ...springPhysics,
      duration: 0.6,
    },
  },
};

/**
 * Parallax configuration presets
 * Different rates for depth perception
 */
export const parallaxRates = {
  foreground: 0.5,  // Moves faster (closer to viewer)
  midground: 0.3,   // Medium speed
  background: 0.2,  // Moves slower (further from viewer)
  subtle: 0.1,      // Very subtle movement
};

/**
 * Easing functions for custom animations
 */
export const easings = {
  smooth: [0.43, 0.13, 0.23, 0.96],
  snappy: [0.68, -0.55, 0.265, 1.55],
  gentle: [0.25, 0.46, 0.45, 0.94],
};

/**
 * Duration presets (in seconds)
 */
export const durations = {
  fast: 0.2,
  normal: 0.4,
  slow: 0.6,
  verySlow: 1,
};

/**
 * Helper function to create custom spring transition
 */
export const createSpringTransition = (
  stiffness: number = 100,
  damping: number = 20
): Transition => ({
  type: 'spring',
  stiffness,
  damping,
});

/**
 * Helper function to create stagger configuration
 */
export const createStaggerConfig = (
  staggerChildren: number = 0.1,
  delayChildren: number = 0
) => ({
  staggerChildren,
  delayChildren,
});
