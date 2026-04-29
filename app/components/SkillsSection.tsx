'use client';

import { motion } from 'motion/react';
import { skillCategories } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

/**
 * SkillsSection Component
 * 
 * Refined, elegant Bento grid with subtle, sophisticated animations.
 * Clean and easy on the eyes - true Japanese minimalism.
 * 
 * Requirements: 3.1, 3.2, 10.5
 */
export default function SkillsSection() {
  const prefersReducedMotion = useReducedMotion();

  /**
   * Get grid column span based on gridSize
   */
  const getGridSpan = (size: 'small' | 'medium' | 'large') => {
    switch (size) {
      case 'large':
        return 'lg:col-span-2';
      case 'medium':
        return 'lg:col-span-1';
      case 'small':
        return 'lg:col-span-1';
      default:
        return 'lg:col-span-1';
    }
  };

  return (
    <section 
      className="relative min-h-[100dvh] flex items-center bg-white"
      aria-labelledby="skills-heading"
    >
      {/* Main content */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 sm:px-8 lg:px-12 py-12 sm:py-16">
        
        {/* Section header */}
        <motion.div 
          className="mb-12 lg:mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springPhysics, delay: 0.1 }}
        >
          {/* Section label */}
          <div className="space-y-3 mb-8">
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
              スキル
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
            id="skills-heading"
            className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-[-0.02em] leading-[0.95] text-neutral-900"
          >
            Expertise
          </h2>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.id}
              className={`${getGridSpan(category.gridSize)}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                ...springPhysics, 
                delay: index * 0.08 
              }}
            >
              <div className="h-full bg-neutral-50 border border-neutral-200 rounded-2xl p-8 lg:p-10 transition-all duration-500 hover:border-accent/30 hover:shadow-sm">
                
                {/* Category title */}
                <div className="mb-8">
                  <h3 className="text-2xl lg:text-3xl font-semibold tracking-tight text-neutral-900">
                    {category.title}
                  </h3>
                  <div className="mt-4 h-[1px] w-12 bg-accent" />
                </div>

                {/* Skills list */}
                <ul className="space-y-3" role="list">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.li
                      key={skill}
                      className="text-base lg:text-lg text-neutral-700 flex items-start gap-3"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        ...springPhysics, 
                        delay: (index * 0.08) + (skillIndex * 0.03)
                      }}
                    >
                      <span className="mt-2 w-1 h-1 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{skill}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
