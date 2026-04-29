import { useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import { RefObject } from 'react';

interface UseScrollAnimationOptions {
  /**
   * Parallax rate multiplier for the element
   * - Foreground elements: 0.5 (moves faster)
   * - Background elements: 0.2 (moves slower)
   * - Default: 0.3 (medium parallax)
   */
  parallaxRate?: number;
  
  /**
   * Optional ref to track scroll progress relative to a specific element
   * If not provided, tracks scroll progress relative to the viewport
   */
  targetRef?: RefObject<HTMLElement | null>;
  
  /**
   * Offset configuration for when the animation starts and ends
   * Default: ["start end", "end start"] - starts when element enters viewport, ends when it leaves
   */
  offset?: ["start end", "end start"] | ["start start", "end end"] | ["start center", "end center"];
}

interface UseScrollAnimationReturn {
  /**
   * Scroll progress value from 0 to 1
   * 0 = element at bottom of viewport
   * 1 = element at top of viewport
   */
  scrollYProgress: MotionValue<number>;
  
  /**
   * Parallax Y transform value with spring physics
   * Negative values move element up, positive values move element down
   */
  parallaxY: MotionValue<number>;
  
  /**
   * Opacity value that fades in as element enters viewport
   * 0 = fully transparent
   * 1 = fully opaque
   */
  opacity: MotionValue<number>;
}

/**
 * Custom hook for scroll-linked animations with parallax effects
 * 
 * Uses Motion's useScroll and useTransform to create smooth scroll-driven animations
 * with spring physics for premium feel.
 * 
 * @example
 * ```tsx
 * // Foreground element with faster parallax
 * const { parallaxY, opacity } = useScrollAnimation({ parallaxRate: 0.5 });
 * 
 * return (
 *   <motion.div style={{ y: parallaxY, opacity }}>
 *     Foreground content
 *   </motion.div>
 * );
 * ```
 * 
 * @example
 * ```tsx
 * // Background element with slower parallax
 * const targetRef = useRef(null);
 * const { parallaxY } = useScrollAnimation({ 
 *   parallaxRate: 0.2,
 *   targetRef 
 * });
 * 
 * return (
 *   <motion.div ref={targetRef} style={{ y: parallaxY }}>
 *     Background content
 *   </motion.div>
 * );
 * ```
 */
export function useScrollAnimation({
  parallaxRate = 0.3,
  targetRef,
  offset = ["start end", "end start"] as const,
}: UseScrollAnimationOptions = {}): UseScrollAnimationReturn {
  // Track scroll progress relative to target element or viewport
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset,
  });

  // Apply spring physics to scroll progress for smooth, natural motion
  // stiffness: 100 - moderate spring tension (not too bouncy, not too sluggish)
  // damping: 20 - moderate resistance (smooth deceleration)
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 20,
    restDelta: 0.001,
  });

  // Calculate parallax Y transform based on scroll progress
  // Range: -100px to 100px (moves up as you scroll down)
  // Multiplied by parallaxRate to control intensity
  // Foreground (0.5): -50px to 50px (more movement)
  // Background (0.2): -20px to 20px (less movement, creates depth)
  const parallaxY = useTransform(
    smoothProgress,
    [0, 1],
    [100 * parallaxRate, -100 * parallaxRate]
  );

  // Calculate opacity based on scroll progress
  // Fades in from 0 to 1 as element enters viewport (0 to 0.3)
  // Stays at 1 in middle range (0.3 to 0.7)
  // Fades out from 1 to 0 as element exits viewport (0.7 to 1)
  const opacity = useTransform(
    smoothProgress,
    [0, 0.3, 0.7, 1],
    [0, 1, 1, 0]
  );

  return {
    scrollYProgress: smoothProgress,
    parallaxY,
    opacity,
  };
}
