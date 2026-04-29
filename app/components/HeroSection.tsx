'use client';

import { motion } from 'motion/react';
import { heroContent } from '@/data/portfolio';
import { 
  entranceVariants, 
  staggerContainerVariants, 
  springPhysics,
  floatAnimation 
} from '@/utils/animationConfig';

/**
 * HeroSection Component
 * 
 * Implements asymmetric layout with large display heading and Japanese subtitle.
 * Features staggered entrance animations and perpetual floating SVG motif.
 * 
 * Requirements: 1.1, 1.4, 1.5, 1.7, 8.2, 8.4, 10.3
 */
export default function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] flex items-center justify-start bg-neutral-50 overflow-hidden">
      {/* Background grain texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content container with asymmetric layout */}
      <div className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[100dvh] py-16">
          
          {/* Content area - 40% of space with offset */}
          <motion.div 
            className="lg:col-span-5 lg:col-start-1 space-y-6 offset-md"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Main heading with staggered entrance */}
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tighter leading-none text-neutral-900"
              variants={entranceVariants}
            >
              {heroContent.name}
            </motion.h1>

            {/* Japanese subtitle with lighter weight */}
            <motion.p 
              className="japanese-text text-japanese-base font-light text-neutral-600 tracking-wide"
              variants={entranceVariants}
            >
              {heroContent.nameJapanese}
            </motion.p>

            {/* Role statement */}
            <motion.p 
              className="text-xl md:text-2xl font-medium text-neutral-700 tracking-tight leading-relaxed max-w-[65ch]"
              variants={entranceVariants}
            >
              {heroContent.role}
            </motion.p>

            {/* Subtitle */}
            <motion.p 
              className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-[65ch]"
              variants={entranceVariants}
            >
              {heroContent.subtitle}
            </motion.p>
          </motion.div>

          {/* Whitespace area - 60% with floating SVG motif */}
          <div className="lg:col-span-7 lg:col-start-6 flex items-center justify-center relative">
            {/* Animated SVG motif */}
            <motion.div
              className="relative"
              animate={floatAnimation}
            >
              <svg
                width="200"
                height="200"
                viewBox="0 0 200 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-neutral-300"
              >
                {/* Minimalist geometric motif inspired by Japanese design */}
                <motion.circle
                  cx="100"
                  cy="100"
                  r="80"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ ...springPhysics, duration: 2, delay: 1 }}
                />
                <motion.circle
                  cx="100"
                  cy="100"
                  r="40"
                  stroke="currentColor"
                  strokeWidth="1"
                  fill="none"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.6 }}
                  transition={{ ...springPhysics, duration: 2, delay: 1.5 }}
                />
                <motion.line
                  x1="100"
                  y1="20"
                  x2="100"
                  y2="180"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ ...springPhysics, duration: 2, delay: 2 }}
                />
                <motion.line
                  x1="20"
                  y1="100"
                  x2="180"
                  y2="100"
                  stroke="currentColor"
                  strokeWidth="1"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.4 }}
                  transition={{ ...springPhysics, duration: 2, delay: 2.2 }}
                />
              </svg>
            </motion.div>

            {/* Additional floating accent element */}
            <motion.div
              className="absolute top-1/4 right-1/4 w-2 h-2 bg-accent rounded-full"
              animate={{
                y: [-5, 5, -5],
                opacity: [0.6, 1, 0.6],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 0.5,
              }}
            />

            <motion.div
              className="absolute bottom-1/3 left-1/3 w-1 h-1 bg-accent-light rounded-full"
              animate={{
                y: [3, -3, 3],
                opacity: [0.4, 0.8, 0.4],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: 1.2,
              }}
            />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPhysics, delay: 3 }}
      >
        <motion.div
          className="w-6 h-10 border border-neutral-400 rounded-full flex justify-center"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <motion.div
            className="w-1 h-3 bg-neutral-400 rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}