'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { skillCategories } from '@/data/portfolio';
import { useRef, useState, useEffect } from 'react';

// Emoji mapping for each individual skill
const skillEmojis: Record<string, string> = {
  // Development
  'Next.js': '⚡',
  'React': '⚛️',
  'TypeScript': '📘',
  'Node.js': '🟢',
  'Python': '🐍',
  'PostgreSQL': '🐘',
  'MongoDB': '🍃',
  'GraphQL': '🔷',
  'REST APIs': '🔌',
  'Git': '🌿',
  
  // Design
  'UI/UX Design': '🎨',
  'Figma': '🎯',
  'Adobe XD': '💎',
  'Prototyping': '🔨',
  'Design Systems': '📐',
  'Responsive Design': '📱',
  'Animation': '✨',
  
  // Music Production
  'FL Studio': '🎹',
  'Ableton Live': '🎵',
  'Audio Engineering': '🎧',
  'Mixing & Mastering': '🎚️',
  'Sound Design': '🔊',
  'Composition': '🎼',
  
  // Content Writing
  'Technical Writing': '📝',
  'Blog Posts': '✍️',
  'Documentation': '📚',
  'Copywriting': '💬',
  'SEO Writing': '🔍',
  'Content Strategy': '📊',
  
  // Investment
  'Cryptocurrency': '₿',
  'Blockchain Technology': '⛓️',
  'Market Analysis': '📈',
  'Portfolio Management': '💼',
  'Risk Assessment': '⚖️',
};

/**
 * SkillsSection Component
 * 
 * PREMIUM VERSION with emoji cursor followers
 * - Smooth emoji cursor that follows mouse on skill hover
 * - Magnetic hover effects on cards
 * - Smooth scroll-linked reveals
 * - Interactive card tilts
 * - Spotlight effects on hover
 * - Buttery smooth animations with spring physics
 */
export default function SkillsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  const [hoveredSkill, setHoveredSkill] = useState<{ skill: string; emoji: string } | null>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Smooth cursor following with spring physics
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothCursorX = useSpring(cursorX, { stiffness: 120, damping: 20, mass: 0.3 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 120, damping: 20, mass: 0.3 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (hoveredSkill) {
        cursorX.set(e.clientX);
        cursorY.set(e.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY, hoveredSkill]);
  
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
          background: 'radial-gradient(circle, rgba(100,116,139,0.08) 0%, transparent 70%)',
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

      {/* Emoji cursor follower - only shows when hovering skills */}
      {hoveredSkill && (
        <motion.div
          className="fixed pointer-events-none z-50 text-5xl"
          style={{
            left: smoothCursorX,
            top: smoothCursorY,
            x: '-50%',
            y: '-50%',
          }}
          initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
          transition={{
            opacity: { duration: 0.2 },
            scale: { type: 'spring', stiffness: 300, damping: 20 },
            rotate: { type: 'spring', stiffness: 200, damping: 15 },
          }}
        >
          <motion.div
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            {hoveredSkill.emoji}
          </motion.div>
        </motion.div>
      )}

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
                  boxShadow: '0 12px 24px rgba(0,0,0,0.04)',
                }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {/* Spotlight effect on hover */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: 'radial-gradient(circle at 50% 0%, rgba(100,116,139,0.06) 0%, transparent 60%)',
                  }}
                />

                {/* Animated border on hover */}
                <motion.div
                  className="absolute inset-0 rounded-3xl"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                  style={{
                    background: 'linear-gradient(135deg, rgba(100,116,139,0.08) 0%, transparent 50%)',
                  }}
                />

                <div className="relative z-10">
                  {/* Category icon/number */}
                  <motion.div 
                    className="mb-6 inline-flex items-center justify-center w-14 h-14 bg-accent/10 rounded-2xl"
                    animate={hoveredCard === category.id ? { scale: 1.1, rotate: 5 } : { scale: 1, rotate: 0 }}
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
                        className="flex items-start gap-3 text-base lg:text-lg text-neutral-700 cursor-default"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ 
                          duration: 0.4, 
                          delay: index * 0.08 + skillIndex * 0.03 + 0.4,
                          ease: [0.22, 1, 0.36, 1]
                        }}
                        onMouseEnter={() => setHoveredSkill({ 
                          skill, 
                          emoji: skillEmojis[skill] || '✨' 
                        })}
                        onMouseLeave={() => setHoveredSkill(null)}
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
                  className="absolute -bottom-20 -right-20 w-40 h-40 bg-slate-500/15 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
