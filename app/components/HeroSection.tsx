'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { heroContent } from '@/data/portfolio';
import { 
  entranceVariants, 
  staggerContainerVariants, 
  springPhysics
} from '@/utils/animationConfig';
import { useRef } from 'react';

/**
 * HeroSection Component
 * 
 * Implements asymmetric layout with large display heading and Japanese subtitle.
 * Features staggered entrance animations and perpetual floating SVG motif.
 * Includes smooth "sucking up" scroll effect for immersive transitions.
 * 
 * Requirements: 1.1, 1.4, 1.5, 1.6, 1.7, 6.1, 6.2, 6.7, 8.2, 8.4, 10.3, 11.1
 */
export default function HeroSection() {
  const containerRef = useRef<HTMLElement>(null);
  
  // Smooth "sucking up" scroll effect
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start']
  });
  
  // Transform values for smooth scroll effect
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.92]);
  const y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  
  // Parallax for background elements
  const bgParallaxY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const fgParallaxY = useTransform(scrollYProgress, [0, 1], [0, -120]);
  
  return (
    <>
      {/* Fixed sky background layer - sits behind the hero section */}
      <motion.div
        className="fixed inset-0 pointer-events-none"
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.15, 0.4, 0.6], [0, 1, 1, 0]),
          zIndex: 0,
        }}
      >
        {/* Sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #bae6fd 0%, #e0f2fe 30%, #f0f9ff 60%, #ffffff 100%)',
          }}
        />

        {/* Animated clouds - Layer 1 (far) */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cloud 1 */}
          <motion.div
            className="absolute"
            style={{
              top: '15%',
              left: '10%',
              x: useTransform(scrollYProgress, [0, 1], [0, 100]),
              y: useTransform(scrollYProgress, [0, 1], [0, -30]),
            }}
          >
            <svg width="120" height="60" viewBox="0 0 120 60" fill="none">
              <ellipse cx="30" cy="35" rx="25" ry="20" fill="white" opacity="0.7" />
              <ellipse cx="50" cy="30" rx="30" ry="25" fill="white" opacity="0.7" />
              <ellipse cx="75" cy="32" rx="28" ry="22" fill="white" opacity="0.7" />
              <ellipse cx="95" cy="38" rx="22" ry="18" fill="white" opacity="0.7" />
            </svg>
          </motion.div>

          {/* Cloud 2 */}
          <motion.div
            className="absolute"
            style={{
              top: '25%',
              right: '15%',
              x: useTransform(scrollYProgress, [0, 1], [0, -80]),
              y: useTransform(scrollYProgress, [0, 1], [0, -25]),
            }}
          >
            <svg width="100" height="50" viewBox="0 0 100 50" fill="none">
              <ellipse cx="25" cy="30" rx="20" ry="16" fill="white" opacity="0.6" />
              <ellipse cx="42" cy="26" rx="24" ry="20" fill="white" opacity="0.6" />
              <ellipse cx="62" cy="28" rx="22" ry="18" fill="white" opacity="0.6" />
              <ellipse cx="78" cy="32" rx="18" ry="15" fill="white" opacity="0.6" />
            </svg>
          </motion.div>

          {/* Cloud 3 */}
          <motion.div
            className="absolute"
            style={{
              top: '45%',
              left: '60%',
              x: useTransform(scrollYProgress, [0, 1], [0, 120]),
              y: useTransform(scrollYProgress, [0, 1], [0, -20]),
            }}
          >
            <svg width="90" height="45" viewBox="0 0 90 45" fill="none">
              <ellipse cx="22" cy="28" rx="18" ry="15" fill="white" opacity="0.65" />
              <ellipse cx="38" cy="24" rx="22" ry="18" fill="white" opacity="0.65" />
              <ellipse cx="56" cy="26" rx="20" ry="16" fill="white" opacity="0.65" />
              <ellipse cx="70" cy="30" rx="16" ry="13" fill="white" opacity="0.65" />
            </svg>
          </motion.div>
        </div>

        {/* Animated clouds - Layer 2 (near) */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Cloud 4 */}
          <motion.div
            className="absolute"
            style={{
              top: '20%',
              left: '40%',
              x: useTransform(scrollYProgress, [0, 1], [0, 150]),
              y: useTransform(scrollYProgress, [0, 1], [0, -40]),
            }}
          >
            <svg width="140" height="70" viewBox="0 0 140 70" fill="none">
              <ellipse cx="35" cy="40" rx="30" ry="24" fill="white" opacity="0.85" />
              <ellipse cx="60" cy="35" rx="35" ry="28" fill="white" opacity="0.85" />
              <ellipse cx="90" cy="37" rx="32" ry="26" fill="white" opacity="0.85" />
              <ellipse cx="115" cy="43" rx="25" ry="20" fill="white" opacity="0.85" />
            </svg>
          </motion.div>

          {/* Cloud 5 */}
          <motion.div
            className="absolute"
            style={{
              top: '35%',
              right: '25%',
              x: useTransform(scrollYProgress, [0, 1], [0, -100]),
              y: useTransform(scrollYProgress, [0, 1], [0, -35]),
            }}
          >
            <svg width="110" height="55" viewBox="0 0 110 55" fill="none">
              <ellipse cx="28" cy="33" rx="24" ry="19" fill="white" opacity="0.8" />
              <ellipse cx="48" cy="29" rx="28" ry="23" fill="white" opacity="0.8" />
              <ellipse cx="72" cy="31" rx="26" ry="21" fill="white" opacity="0.8" />
              <ellipse cx="90" cy="36" rx="20" ry="16" fill="white" opacity="0.8" />
            </svg>
          </motion.div>

          {/* Cloud 6 */}
          <motion.div
            className="absolute"
            style={{
              top: '50%',
              left: '5%',
              x: useTransform(scrollYProgress, [0, 1], [0, 130]),
              y: useTransform(scrollYProgress, [0, 1], [0, -28]),
            }}
          >
            <svg width="130" height="65" viewBox="0 0 130 65" fill="none">
              <ellipse cx="32" cy="38" rx="28" ry="22" fill="white" opacity="0.75" />
              <ellipse cx="55" cy="33" rx="32" ry="26" fill="white" opacity="0.75" />
              <ellipse cx="82" cy="35" rx="30" ry="24" fill="white" opacity="0.75" />
              <ellipse cx="105" cy="40" rx="23" ry="18" fill="white" opacity="0.75" />
            </svg>
          </motion.div>
        </div>
      </motion.div>

      {/* Hero section with scaling */}
      <motion.section 
        ref={containerRef}
        className="relative min-h-[100dvh] flex items-center justify-start overflow-hidden"
        style={{ 
          scale,
          zIndex: 1,
          backgroundColor: 'transparent',
        }}
      >
        {/* Smooth gradient fade to next section */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
            opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]),
          }}
        />

      {/* Main content container with asymmetric layout */}
      <motion.div 
        className="relative z-10 w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8"
        style={{ y }}
      >
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
            {/* Animated SVG motif with parallax */}
            <motion.div
              className="relative"
              style={{ y: fgParallaxY }}
              animate={{
                y: [-10, 10, -10],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
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

            {/* Removed green accent dots for cleaner design */}
          </div>
        </div>
      </motion.div>

      {/* Scroll indicator with fade on scroll */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ...springPhysics, delay: 3 }}
        style={{ opacity: useTransform(scrollYProgress, [0, 0.3], [1, 0]) }}
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
    </motion.section>
    </>
  );
}