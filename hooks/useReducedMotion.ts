'use client';

import { useEffect, useState } from 'react';

/**
 * Custom hook to detect if the user prefers reduced motion.
 * 
 * This hook listens to the 'prefers-reduced-motion' media query and returns
 * a boolean indicating whether the user has requested reduced motion in their
 * system settings.
 * 
 * @returns {boolean} true if user prefers reduced motion, false otherwise
 * 
 * **Validates: Requirements 12.1, 12.2**
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    // Initialize with media query value if available (client-side)
    if (typeof window !== 'undefined') {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
    return false;
  });

  useEffect(() => {
    // Create media query list for prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // Handler for media query changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Add event listener for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup: remove event listener on unmount
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}
