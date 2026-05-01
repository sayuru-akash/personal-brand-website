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
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);
  
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
              
              {/* Location & Education cards with unique micro-interactions */}
              <div className="space-y-4 pt-6">
                {/* Location Card - Pin drop animation */}
                <motion.div 
                  className="group relative flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-red-500/5 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  
                  {/* Icon with pin drop animation */}
                  <motion.div 
                    className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl border border-neutral-200 group-hover:border-red-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  >
                    <motion.svg 
                      className="w-6 h-6 text-red-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                      whileHover={{ 
                        y: [-8, 0],
                        scale: [0.8, 1.1, 1]
                      }}
                      transition={{ 
                        duration: 0.5,
                        ease: [0.34, 1.56, 0.64, 1]
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </motion.svg>
                    
                    {/* Pulse effect */}
                    <motion.div
                      className="absolute inset-0 rounded-xl border-2 border-red-500"
                      animate={{ 
                        scale: [1, 1.4, 1.4],
                        opacity: [0.5, 0, 0]
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: 'easeOut'
                      }}
                    />
                  </motion.div>
                  
                  <div className="relative">
                    <motion.p 
                      className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1"
                      whileHover={{ x: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      Location
                    </motion.p>
                    <motion.p 
                      className="text-base font-medium text-neutral-900"
                      whileHover={{ x: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.05 }}
                    >
                      {aboutContent.location}
                    </motion.p>
                  </div>
                </motion.div>

                {/* Education Card - Book opening animation */}
                <motion.div 
                  className="group relative flex items-center gap-4 p-5 bg-neutral-50 rounded-2xl border border-neutral-200 overflow-hidden cursor-default"
                  whileHover={{ x: 4 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                >
                  {/* Animated background on hover */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  
                  {/* Icon with book pages turning */}
                  <motion.div 
                    className="relative flex-shrink-0 w-12 h-12 flex items-center justify-center bg-white rounded-xl border border-neutral-200 group-hover:border-blue-500/30 transition-colors"
                    style={{ perspective: 1000 }}
                  >
                    <motion.svg 
                      className="w-6 h-6 text-blue-500" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                      whileHover={{ 
                        rotateY: [0, -15, 15, 0],
                        scale: [1, 1.05, 1.05, 1]
                      }}
                      transition={{ 
                        duration: 0.8,
                        ease: 'easeInOut'
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </motion.svg>
                    
                    {/* Sparkle effect */}
                    <motion.div
                      className="absolute -top-1 -right-1 text-blue-500 text-xs"
                      initial={{ opacity: 0, scale: 0, rotate: -45 }}
                      whileHover={{ 
                        opacity: [0, 1, 0],
                        scale: [0, 1.2, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ duration: 0.6 }}
                    >
                      ✨
                    </motion.div>
                  </motion.div>
                  
                  <div className="relative">
                    <motion.p 
                      className="text-xs uppercase tracking-[0.15em] text-neutral-500 mb-1"
                      whileHover={{ x: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    >
                      Education
                    </motion.p>
                    <motion.p 
                      className="text-base font-medium text-neutral-900"
                      whileHover={{ x: 2 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25, delay: 0.05 }}
                    >
                      {aboutContent.education}
                    </motion.p>
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
                {aboutContent.roles.map((role, index) => {
                  // Map roles to icon files
                  const iconMap: Record<string, string> = {
                    'Full-stack Developer': '/icons/developer.svg',
                    'Musical Artist': '/icons/music.svg',
                    'CEO @ Codezela Technologies': '/icons/ceo.svg',
                    'Content Writer': '/icons/writer.svg',
                    'Investor': '/icons/investor.svg',
                  };
                  
                  const isHovered = hoveredRole === role;
                  
                  return (
                    <motion.div
                      key={role}
                      className="group relative flex items-center justify-between gap-4 p-4 rounded-xl overflow-visible cursor-default"
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ 
                        duration: 0.5, 
                        delay: 0.5 + index * 0.05,
                        ease: [0.22, 1, 0.36, 1]
                      }}
                      onMouseEnter={() => setHoveredRole(role)}
                      onMouseLeave={() => setHoveredRole(null)}
                    >
                      {/* Expanding background on hover */}
                      <motion.div
                        className="absolute inset-0 bg-emerald-50/50 rounded-xl"
                        initial={{ scaleX: 0, originX: 0 }}
                        animate={isHovered ? { scaleX: 1 } : { scaleX: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                      
                      <div className="relative flex items-center gap-4">
                        {/* Animated bullet point */}
                        <motion.div 
                          className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0"
                          animate={{ 
                            scale: [1, 1.3, 1],
                            opacity: [0.7, 1, 0.7]
                          }}
                          transition={{ 
                            duration: 2,
                            repeat: Infinity,
                            ease: 'easeInOut',
                            delay: index * 0.2
                          }}
                        />
                        
                        {/* Role text */}
                        <motion.span 
                          className="relative text-lg text-neutral-700 group-hover:text-neutral-900 transition-colors"
                          animate={isHovered ? { x: 4 } : { x: 0 }}
                          transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                        >
                          {role}
                        </motion.span>
                      </div>
                      
                      {/* Custom SVG icon appearing from right */}
                      <motion.div
                        className="relative w-6 h-6 flex-shrink-0"
                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                        animate={isHovered ? { 
                          opacity: 1, 
                          x: 0, 
                          scale: 1,
                        } : {
                          opacity: 0,
                          x: 20,
                          scale: 0.8,
                        }}
                        transition={{ 
                          type: 'spring',
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <motion.img 
                          src={iconMap[role] || '/icons/developer.svg'} 
                          alt="" 
                          className="w-full h-full"
                          animate={isHovered ? {
                            rotate: [0, -10, 10, 0]
                          } : {
                            rotate: 0
                          }}
                          transition={{ 
                            duration: 0.6, 
                            ease: 'easeInOut' 
                          }}
                        />
                      </motion.div>
                      
                      {/* Accent line that grows on hover */}
                      <motion.div
                        className="absolute left-0 top-0 bottom-0 w-1 bg-emerald-500 rounded-r-full"
                        initial={{ scaleY: 0, originY: 0.5 }}
                        animate={isHovered ? { scaleY: 1 } : { scaleY: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.div>
                  );
                })}
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
