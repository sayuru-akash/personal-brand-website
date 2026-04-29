'use client';

import { motion } from 'motion/react';
import { aboutContent } from '@/data/portfolio';
import { 
  entranceVariants,
  entranceVariantsLeft,
  entranceVariantsRight,
  staggerContainerVariants,
  springPhysics,
  staggerConfigSlow
} from '@/utils/animationConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

/**
 * AboutSection Component
 * 
 * Implements split-screen layout with asymmetric alignment and biographical content.
 * Features staggered content block reveals and parallax visual elements.
 * Displays roles, traits, bio, location, and education with typography hierarchy.
 * 
 * Requirements: 2.1, 2.3, 2.4, 2.6, 2.7, 8.1, 8.5
 * 
 * Design Principles:
 * - 間 (Ma): 40-60% whitespace with intentional breath
 * - 非対称 (Asymmetry): 8-32px offsets from grid alignment
 * - 引き算の美学 (Subtractive Aesthetics): One dominant element per section
 */
export default function AboutSection() {
  // Parallax effects for depth perception
  const { parallaxY: bgParallaxY } = useScrollAnimation({ 
    parallaxRate: 0.2 
  });
  
  const { parallaxY: fgParallaxY } = useScrollAnimation({ 
    parallaxRate: 0.4 
  });
  
  return (
    <section 
      className="relative min-h-[100dvh] flex items-center bg-neutral-50 overflow-hidden"
      aria-labelledby="about-heading"
    >
      {/* Background decorative elements with parallax */}
      <motion.div 
        className="absolute top-1/4 right-1/4 w-64 h-64 bg-accent/5 rounded-full blur-3xl pointer-events-none"
        style={{ y: bgParallaxY }}
      />
      
      <motion.div 
        className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-accent-light/5 rounded-full blur-3xl pointer-events-none"
        style={{ y: bgParallaxY }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        
        {/* Split-screen grid with asymmetric layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left column - Biographical content with offset */}
          <motion.div 
            className="lg:col-span-5 lg:col-start-1 space-y-12 offset-lg"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springPhysics, ...staggerConfigSlow }}
          >
            {/* Japanese label divider */}
            <motion.div 
              className="space-y-2"
              variants={entranceVariantsLeft}
            >
              <p className="japanese-text text-xs uppercase tracking-[0.18em] text-neutral-500">
                について / About
              </p>
              <div className="w-12 h-px bg-accent" />
            </motion.div>

            {/* Section heading */}
            <motion.h2 
              id="about-heading"
              className="text-4xl md:text-5xl font-bold tracking-tighter leading-none text-neutral-900"
              variants={entranceVariantsLeft}
            >
              Multi-disciplinary
              <br />
              Creator
            </motion.h2>

            {/* Biographical paragraph */}
            <motion.p 
              className="text-base md:text-lg text-neutral-700 leading-relaxed max-w-[65ch]"
              variants={entranceVariantsLeft}
            >
              {aboutContent.bio}
            </motion.p>

            {/* Location and education */}
            <motion.div 
              className="space-y-3 text-sm text-neutral-600"
              variants={entranceVariantsLeft}
            >
              <div className="flex items-center gap-2">
                <svg 
                  className="w-4 h-4 text-accent" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                  />
                </svg>
                <span>{aboutContent.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg 
                  className="w-4 h-4 text-accent" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 14l9-5-9-5-9 5 9 5z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" 
                  />
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" 
                  />
                </svg>
                <span>{aboutContent.education}</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Roles and traits with offset */}
          <motion.div 
            className="lg:col-span-6 lg:col-start-7 space-y-12 -offset-md"
            variants={staggerContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ ...springPhysics, ...staggerConfigSlow }}
          >
            {/* Roles section */}
            <motion.div 
              className="space-y-6"
              variants={entranceVariantsRight}
            >
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" aria-hidden="true" />
                Roles
              </h3>
              <ul className="space-y-3" role="list">
                {aboutContent.roles.map((role, index) => (
                  <motion.li
                    key={role}
                    className="text-base md:text-lg text-neutral-700 flex items-start gap-3 group"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      ...springPhysics, 
                      delay: index * 0.05 
                    }}
                  >
                    <span 
                      className="mt-2 w-1.5 h-1.5 rounded-full bg-accent flex-shrink-0 group-hover:scale-125 transition-transform duration-300" 
                      aria-hidden="true"
                    />
                    <span className="leading-relaxed">{role}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Traits section with asymmetric offset */}
            <motion.div 
              className="space-y-6 offset-xl"
              variants={entranceVariantsRight}
            >
              <h3 className="text-xl md:text-2xl font-semibold tracking-tight text-neutral-900 flex items-center gap-3">
                <span className="w-8 h-px bg-accent" aria-hidden="true" />
                Interests
              </h3>
              <div className="flex flex-wrap gap-3">
                {aboutContent.traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    className="px-4 py-2 text-sm md:text-base text-neutral-700 bg-neutral-100 rounded-full border border-neutral-200 hover:border-accent hover:bg-accent/5 transition-colors duration-300"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    transition={{ 
                      ...springPhysics, 
                      delay: index * 0.05 
                    }}
                  >
                    {trait}
                  </motion.span>
                ))}
              </div>
            </motion.div>

            {/* Decorative floating element with parallax */}
            <motion.div
              className="relative h-32 flex items-center justify-end"
              style={{ y: fgParallaxY }}
            >
              <motion.div
                className="w-24 h-24 border border-accent/20 rounded-full"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <motion.div
                  className="w-full h-full border border-accent/30 rounded-full"
                  animate={{
                    scale: [1, 0.8, 1],
                    rotate: [360, 180, 0],
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Subtle accent dots with parallax */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-2 h-2 bg-accent rounded-full opacity-40"
        style={{ y: bgParallaxY }}
        animate={{
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      <motion.div
        className="absolute bottom-1/4 right-1/3 w-1.5 h-1.5 bg-accent-light rounded-full opacity-30"
        style={{ y: fgParallaxY }}
        animate={{
          opacity: [0.1, 0.5, 0.1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />
    </section>
  );
}
