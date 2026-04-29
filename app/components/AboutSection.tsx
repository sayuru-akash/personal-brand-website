'use client';

import { motion } from 'motion/react';
import { aboutContent } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * AboutSection Component
 * 
 * Elegant about section with sophisticated layout and subtle animations.
 * Professional, clean, and refined - true Japanese minimalism.
 * 
 * Requirements: 2.1, 2.3, 2.4, 2.6, 2.7, 8.1, 8.5
 */
export default function AboutSection() {
  const prefersReducedMotion = useReducedMotion();
  
  const { parallaxY: bgParallaxY } = useScrollAnimation({ 
    parallaxRate: 0.1 
  });
  
  return (
    <section 
      className="relative min-h-[100dvh] flex items-center bg-neutral-50"
      aria-labelledby="about-heading"
    >
      {/* Subtle background gradient */}
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl pointer-events-none"
          style={{ y: bgParallaxY }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left column - Bio */}
          <motion.div 
            className="lg:col-span-5 space-y-8"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springPhysics, delay: 0.1 }}
          >
            {/* Section label */}
            <div className="space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                について
              </p>
              <motion.div 
                className="h-[1px] w-16 bg-accent"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Heading */}
            <h2 
              id="about-heading"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[0.95] text-neutral-900"
            >
              Multi-disciplinary
              <br />
              Creator
            </h2>

            {/* Bio text */}
            <p className="text-lg text-neutral-700 leading-relaxed max-w-[45ch]">
              {aboutContent.bio}
            </p>

            {/* Location & Education */}
            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-3 text-neutral-600">
                <svg 
                  className="w-5 h-5 text-accent flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <span className="text-base">{aboutContent.location}</span>
              </div>
              
              <div className="flex items-center gap-3 text-neutral-600">
                <svg 
                  className="w-5 h-5 text-accent flex-shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" 
                  />
                </svg>
                <span className="text-base">{aboutContent.education}</span>
              </div>
            </div>
          </motion.div>

          {/* Right column - Roles & Interests */}
          <motion.div 
            className="lg:col-span-6 lg:col-start-7 space-y-12"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springPhysics, delay: 0.2 }}
          >
            {/* Roles */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-accent" />
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Roles
                </h3>
              </div>
              
              <ul className="space-y-4" role="list">
                {aboutContent.roles.map((role, index) => (
                  <motion.li
                    key={role}
                    className="text-lg text-neutral-700 flex items-start gap-4"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      ...springPhysics, 
                      delay: index * 0.05 
                    }}
                  >
                    <span className="mt-2.5 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                    <span className="leading-relaxed">{role}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Interests */}
            <div className="space-y-8">
              <div className="flex items-center gap-4">
                <div className="w-12 h-[1px] bg-accent" />
                <h3 className="text-2xl font-semibold tracking-tight text-neutral-900">
                  Interests
                </h3>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {aboutContent.traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    className="px-5 py-2.5 text-base text-neutral-700 bg-white border border-neutral-200 rounded-full"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      ...springPhysics, 
                      delay: index * 0.04 
                    }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
