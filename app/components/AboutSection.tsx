'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { aboutContent } from '@/data/portfolio';
import { useRef, useState } from 'react';

// Emoji mapping for interests
const interestEmojis: Record<string, string> = {
  'Coffee enthusiast': '☕',
  'Tech lover': '💻',
  'Crypto holder': '₿',
  'Music addict': '🎵',
  'Netflix fan': '🎬',
  'Android enthusiast': '🤖',
};

/**
 * AboutSection Component
 * 
 * PREMIUM VERSION with smooth interactions
 * - Scroll-triggered content reveals with smooth easing
 * - Staggered card animations
 * - Hover-aware interactive elements with emojis
 * - Depth through layered motion
 * - Clean, professional aesthetic
 */
export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredInterest, setHoveredInterest] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  
  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center bg-white py-24 sm:py-32"
    >
      {/* Subtle animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/3 right-1/4 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(100,116,139,0.05) 0%, transparent 70%)',
            y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          }}
        />
      </div>

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Section header */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.div 
            className="inline-flex items-center gap-4 mb-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="h-[2px] w-12 bg-accent" />
            <span className="text-sm uppercase tracking-[0.2em] text-accent font-medium">
              について / About
            </span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] text-neutral-900 max-w-[800px]">
            Multi-disciplinary
            <br />
            <span className="text-neutral-400">Creator</span>
          </h2>
        </motion.div>

        {/* Content grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Left column - Bio */}
          <motion.div 
            className="space-y-8"
            style={{ y: useTransform(scrollYProgress, [0.2, 0.8], [50, -50]) }}
          >
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <p className="text-xl sm:text-2xl text-neutral-700 leading-relaxed">
                {aboutContent.bio}
              </p>
              
              {/* Location & Education cards */}
              <div className="space-y-4 pt-6">
                <motion.div 
                  className="group flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 transition-all duration-300 hover:border-accent/30 hover:shadow-sm"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-xl group-hover:bg-slate-500/15 transition-colors">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">Location</p>
                    <p className="text-base font-medium text-neutral-900">{aboutContent.location}</p>
                  </div>
                </motion.div>

                <motion.div 
                  className="group flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 transition-all duration-300 hover:border-accent/30 hover:shadow-sm"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center bg-accent/10 rounded-xl group-hover:bg-slate-500/15 transition-colors">
                    <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1">Education</p>
                    <p className="text-base font-medium text-neutral-900">{aboutContent.education}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right column - Roles & Interests */}
          <div className="space-y-12">
            
            {/* Roles */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-3xl font-bold tracking-tight text-neutral-900">Roles</h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />
              </div>
              
              <div className="space-y-3">
                {aboutContent.roles.map((role, index) => (
                  <motion.div
                    key={role}
                    className="group flex items-start gap-4 p-4 rounded-xl hover:bg-neutral-50 transition-colors"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 0.5 + index * 0.05,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                    whileHover={{ x: 4 }}
                  >
                    <motion.div 
                      className="mt-2 w-2 h-2 rounded-full bg-accent flex-shrink-0"
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    />
                    <span className="text-lg text-neutral-700 group-hover:text-neutral-900 transition-colors">
                      {role}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Interests */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="flex items-center gap-4 mb-8">
                <h3 className="text-3xl font-bold tracking-tight text-neutral-900">Interests</h3>
                <div className="flex-1 h-[1px] bg-gradient-to-r from-accent/50 to-transparent" />
              </div>
              
              <div className="flex flex-wrap gap-3">
                {aboutContent.traits.map((trait, index) => (
                  <motion.span
                    key={trait}
                    className="inline-block"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ 
                      duration: 0.4, 
                      delay: 0.7 + index * 0.03,
                      ease: [0.22, 1, 0.36, 1]
                    }}
                  >
                    <motion.span
                      className="inline-flex items-center gap-2 px-5 py-3 text-base text-neutral-700 bg-white border border-neutral-200 rounded-full hover:border-accent/50 transition-all cursor-default"
                      animate={hoveredInterest === trait ? { 
                        scale: 1.05,
                      } : { 
                        scale: 1,
                      }}
                      onMouseEnter={() => setHoveredInterest(trait)}
                      onMouseLeave={() => setHoveredInterest(null)}
                    >
                      <span>{trait}</span>
                      
                      {/* Emoji appears after text on hover */}
                      <motion.span
                        className="text-xl inline-block overflow-hidden"
                        initial={{ opacity: 0, scale: 0, width: 0 }}
                        animate={hoveredInterest === trait ? {
                          opacity: 1,
                          scale: 1,
                          width: 'auto',
                        } : {
                          opacity: 0,
                          scale: 0,
                          width: 0,
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 400,
                          damping: 20,
                        }}
                      >
                        {interestEmojis[trait] || '✨'}
                      </motion.span>
                    </motion.span>
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
