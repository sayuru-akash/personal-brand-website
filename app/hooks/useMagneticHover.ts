import { useMotionValue, MotionValue } from 'motion/react';
import { useRef, MouseEvent } from 'react';

interface UseMagneticHoverReturn {
  x: MotionValue<number>;
  y: MotionValue<number>;
  handleMouseMove: (e: MouseEvent<HTMLElement>) => void;
  handleMouseLeave: () => void;
}

/**
 * Custom hook for implementing magnetic hover effects on interactive elements.
 * Uses Motion's useMotionValue for cursor-tracking outside React render cycle.
 * 
 * @param strength - Controls the intensity of the magnetic effect (0-1 range recommended)
 * @returns Object containing x, y motion values and mouse event handlers
 * 
 * @example
 * ```tsx
 * const { x, y, handleMouseMove, handleMouseLeave } = useMagneticHover(0.3);
 * 
 * <motion.div
 *   style={{ x, y }}
 *   onMouseMove={handleMouseMove}
 *   onMouseLeave={handleMouseLeave}
 * >
 *   Magnetic Element
 * </motion.div>
 * ```
 * 
 * **Validates: Requirements 7.1, 7.2, 7.4**
 */
export function useMagneticHover(strength: number = 0.25): UseMagneticHoverReturn {
  // Create motion values for x and y transforms
  // These bypass React's render cycle for optimal performance
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Store element reference for calculating relative cursor position
  const elementRef = useRef<HTMLElement | null>(null);

  /**
   * Handle mouse move to calculate magnetic pull toward cursor
   * Implements directional hover-aware animation based on cursor position
   */
  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const element = e.currentTarget;
    elementRef.current = element;

    // Get element's bounding rectangle
    const rect = element.getBoundingClientRect();

    // Calculate cursor position relative to element center
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate distance from center
    const deltaX = e.clientX - centerX;
    const deltaY = e.clientY - centerY;

    // Apply magnetic effect with strength multiplier
    // Positive values pull element toward cursor
    x.set(deltaX * strength);
    y.set(deltaY * strength);
  };

  /**
   * Reset position when mouse leaves element
   * Smoothly returns element to original position
   */
  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    elementRef.current = null;
  };

  return {
    x,
    y,
    handleMouseMove,
    handleMouseLeave,
  };
}
