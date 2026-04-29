'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { skillCategories } from '@/data/portfolio';
import { useRef, useState } from 'react';

/**
 * SkillsSection Component
 * 
 * PREMIUM VERSION with advanced interactions
 * - Magnetic hover effects on cards
 * - Smooth scroll-linked reveals
 * - Interactive card tilts
 * - Spotlight effects on hover
 * - Buttery smooth animations
 */
export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  const getGridSpan = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'large': return 'lg:col-span-2';
      case 'medium': return 'lg:col-span-1';
      case 'small': return 'lg:col-span-1';
      default: return 'lg:col-span-1';
    }
  };

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center bg-neutral-50 py-24 sm:py-32 overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, #000 1px, transparent 1px),
            linear-gradient(to bottom, #000 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
      </div>

      {/* Floating gradient orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full"
        style={{
          background: 'radial-gradient(circle, rgba(188,0,45,0.06) 0%, transparent 70%)',
          y: useTransform(scrollYProgress, [0, 1], [0, -100]),
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

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
              スキル / Skills
            </span>
          </motion.div>
          
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] text-neutral-900">
            Expertise
          </h2>
        </motion.div>

        {/* Bento grid with enhanced interactions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`${getGridSpan(category.gridSize)} group`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.08,
                ease: [0.22, 1, 0.36, 1]
              }}
              onHoverStart={() => setHoveredCard(category.id)}
              onHoverEnd={() => setHoveredCard(null)}
            >
              <motion.div 
                className="relative h-full bg-white border border-neutral-200 rounded-3xl p-8 lg:p-10 overflow-hidden"
                whileHover={{ 
                  y: -8,
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Spotlight effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(188,0,45,0.08) 0%, transparent 60%)',
                  }}
                />

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(188,0,45,0.1) 0%, transparent 50%)',
                  }}
                />

                <div className="relative z-10">
                  {/* Category icon/number */}
                  <motion.div 
                    className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  >
                    <span className="text-2xl font-bold text-accent">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </motion.div>

                  {/* Category title */}
                  <h3 className="text-2xl lg:text-3xl font-bold tracking-tight text-neutral-900 mb-6">
                    {category.title}
                  </h3>

                  {/* Animated divider */}
                  <motion.div 
                    className="h-[2px] bg-gradient-to-r from-accent to-transparent mb-8"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: index * 0.08 + 0.3 }}
                    style={{ transformOrigin: 'left' }}
                  />

                  {/* Skills list */}
                  <ul className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <motion.li
                        key={skill}
                        className="flex items-start gap-3 text-base lg:text-lg text-neutral-700"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.08 + skillIndex * 0.03 + 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                      >
                        <motion.span 
                          className="mt-2 w-2 h-2 rounded-full bg-accent flex-shrink-0"
                          animate={hoveredCard === category.id ? {
                            scale: [1, 1.5, 1],
                          } : {}}
                          transition={{
                            duration: 0.6,
                            delay: skillIndex * 0.05,
                            repeat: hoveredCard === category.id ? Infinity : 0,
                          }}
                        />
                        <span className="leading-relaxed group-hover:text-neutral-900 transition-colors">
                          {skill}
                        </span>
                      </motion.li>
                    ))}
                  </ul>
                </div>

                {/* Hover glow effect */}
                <motion.div
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <p className="text-lg text-neutral-600 mb-6">
            Interested in working together?
          </p>
          <motion.button
            className="group inline-flex items-center gap-3 px-8 py-4 bg-neutral-900 text-white text-base font-medium rounded-full"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
          >
            <span>Let's Connect</span>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </motion.svg>
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
