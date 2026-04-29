'use client';

import { motion } from 'motion/react';
import { heroContent } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useReducedMotion } from '@/hooks/useReducedMotion';

export default function HeroSection() {
  const prefersReducedMotion = useReducedMotion();
  
  const { parallaxY: bgParallaxY } = useScrollAnimation({ parallaxRate: 0.15 });
  const { parallaxY: fgParallaxY } = useScrollAnimation({ parallaxRate: 0.3 });
  
  return (
    <section className="relative min-h-[100dvh] flex items-center bg-neutral-50">
      {/* Subtle mesh gradients */}
      {!prefersReducedMotion && (
        <>
          <motion.div 
            className="absolute -top-1/4 -right-1/4 w-[1000px] h-[1000px] bg-gradient-to-br from-accent/8 via-accent/4 to-transparent rounded-full blur-3xl pointer-events-none"
            style={{ y: bgParallaxY }}
            animate={{ scale: [1, 1.1, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div 
            className="absolute -bottom-1/4 -left-1/4 w-[800px] h-[800px] bg-gradient-to-tr from-accent-light/6 via-accent-light/3 to-transparent rounded-full blur-3xl pointer-events-none"
            style={{ y: bgParallaxY }}
            animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          />
        </>
      )}
      
      {/* Grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center min-h-[100dvh] py-16">
          
          {/* Left: Content */}
          <motion.div 
            className="space-y-6 lg:space-y-8"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...springPhysics, delay: 0.1 }}
          >
            {/* Label */}
            <div className="space-y-3">
              <p className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
                ポートフォリオ / Portfolio
              </p>
              <motion.div 
                className="h-px w-20 bg-accent"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Name */}
            <motion.h1 
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-[-0.03em] leading-[0.9] text-neutral-900"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPhysics, delay: 0.2 }}
            >
              {heroContent.name}
            </motion.h1>

            {/* Japanese name */}
            <motion.p 
              className="text-sm sm:text-base tracking-[0.15em] text-neutral-500 font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              {heroContent.nameJapanese}
            </motion.p>

            {/* Role */}
            <motion.div
              className="pt-4 lg:pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ ...springPhysics, delay: 0.6 }}
            >
              <p className="text-xl sm:text-2xl lg:text-3xl font-medium text-neutral-700 leading-[1.4] max-w-[24ch]">
                {heroContent.role}
              </p>
            </motion.div>

            {/* Subtitle */}
            <motion.p 
              className="text-base sm:text-lg text-neutral-600 leading-relaxed max-w-[42ch] pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              {heroContent.subtitle}
            </motion.p>
          </motion.div>

          {/* Right: Visual */}
          <div className="flex items-center justify-center lg:justify-end relative h-[400px] sm:h-[500px] lg:h-[600px]">
            <motion.div
              className="relative w-full max-w-[500px] aspect-square"
              style={{ y: prefersReducedMotion ? 0 : fgParallaxY }}
            >
              {/* Outer ring */}
              <motion.div
                className="absolute inset-0"
                animate={prefersReducedMotion ? {} : { rotate: 360 }}
                transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
                  <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="0.5" className="text-neutral-300" opacity="0.5" />
                </svg>
              </motion.div>

              {/* Middle ring */}
              <motion.div
                className="absolute inset-[15%]"
                animate={prefersReducedMotion ? {} : { rotate: -360 }}
                transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              >
                <svg viewBox="0 0 400 400" fill="none" className="w-full h-full">
                  <circle cx="200" cy="200" r="140" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 6" className="text-neutral-400" opacity="0.4" />
                </svg>
              </motion.div>

              {/* Center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-28 h-28 sm:w-36 sm:h-36 rounded-full bg-gradient-to-br from-accent/12 to-accent-light/6 backdrop-blur-sm border border-accent/15"
                  animate={prefersReducedMotion ? {} : { scale: [1, 1.08, 1] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                />
              </div>

              {/* Accent dots */}
              {!prefersReducedMotion && (
                <>
                  <motion.div
                    className="absolute top-[20%] left-[25%] w-2 h-2 bg-accent/50 rounded-full"
                    animate={{ opacity: [0.3, 0.7, 0.3] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                  />
                  <motion.div
                    className="absolute bottom-[30%] right-[20%] w-1.5 h-1.5 bg-accent-light/50 rounded-full"
                    animate={{ opacity: [0.2, 0.6, 0.2] }}
                    transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
                  />
                </>
              )}
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 cursor-pointer"
          whileHover={{ y: 4 }}
          transition={springPhysics}
        >
          <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
            Scroll
          </span>
          <div className="w-px h-10 sm:h-12 bg-gradient-to-b from-neutral-300 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}
