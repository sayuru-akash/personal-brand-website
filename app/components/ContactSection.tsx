'use client';

import { motion, useScroll, useTransform } from 'motion/react';
import { contactContent } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useState, useRef } from 'react';

/**
 * ContactSection Component
 * 
 * PREMIUM VERSION with smooth aurora background
 * - Smooth transition from previous section
 * - Animated aurora borealis gradient waves
 * - Floating particles (client-only)
 * - Professional, luxurious aesthetic
 */
export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Clean smooth transition - white to dark blue
  const backgroundColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['#ffffff', '#0f1729']
  );
  
  // Smooth text color transitions
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['#171717', '#ffffff']
  );
  
  const subtleTextColor = useTransform(
    scrollYProgress,
    [0, 0.5],
    ['#737373', '#ffffff']
  );

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(contactContent.email);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  };

  // Static particle positions (no hydration issues)
  const particles = [
    { left: 10, top: 20, delay: 0, duration: 4 },
    { left: 25, top: 60, delay: 0.5, duration: 5 },
    { left: 40, top: 15, delay: 1, duration: 4.5 },
    { left: 55, top: 75, delay: 1.5, duration: 5.5 },
    { left: 70, top: 30, delay: 2, duration: 4 },
    { left: 85, top: 50, delay: 2.5, duration: 5 },
    { left: 15, top: 85, delay: 3, duration: 4.5 },
    { left: 60, top: 45, delay: 3.5, duration: 5 },
    { left: 80, top: 70, delay: 4, duration: 4 },
    { left: 35, top: 90, delay: 4.5, duration: 5.5 },
    { left: 90, top: 25, delay: 0.2, duration: 4.2 },
    { left: 5, top: 55, delay: 0.7, duration: 5.2 },
    { left: 50, top: 10, delay: 1.2, duration: 4.7 },
    { left: 75, top: 80, delay: 1.7, duration: 5.3 },
    { left: 20, top: 40, delay: 2.2, duration: 4.3 },
  ];
  
  return (
    <motion.section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor }}
      aria-labelledby="contact-heading"
    >
      {/* Smooth gradient transition overlay at top - no white shadow */}
      <motion.div
        className="absolute top-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.7) 20%, rgba(255,255,255,0.3) 50%, transparent 100%)',
          opacity: useTransform(scrollYProgress, [0, 0.5], [1, 0]),
        }}
      />

      {/* Smooth aurora background */}
      {!prefersReducedMotion && (
        <div className="absolute inset-0">
          {/* Aurora Layer 1 - Purple glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 120% 80% at 50% 0%, rgba(147, 51, 234, 0.2) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Aurora Layer 2 - Blue glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 100% 70% at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.25, 0.4, 0.25],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Aurora Layer 3 - Emerald glow */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 90% 90% at 80% 60%, rgba(16, 185, 129, 0.12) 0%, transparent 70%)',
              filter: 'blur(60px)',
            }}
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.2, 0.35, 0.2],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Floating particles - client only, no hydration */}
          <div suppressHydrationWarning>
            {particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 bg-white/70 rounded-full"
                style={{
                  left: `${particle.left}%`,
                  top: `${particle.top}%`,
                }}
                animate={{
                  y: [0, -50, 0],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  delay: particle.delay,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fallback for reduced motion */}
      {prefersReducedMotion && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to bottom, #0f1729 0%, #1a2332 100%)',
          }}
        />
      )}

      {/* Main content */}
      <div className="relative z-10 w-full max-w-[900px] mx-auto px-6 sm:px-8 lg:px-12 py-16">
        
        <motion.div 
          className="text-center space-y-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ ...springPhysics, delay: 0.1 }}
        >
          {/* Section label */}
          <div className="flex flex-col items-center gap-3">
            <motion.p 
              className="text-xs uppercase tracking-[0.2em] font-light"
              style={{
                color: subtleTextColor,
              }}
            >
              連絡 / Contact
            </motion.p>
            <motion.div 
              className="h-[1px] w-16"
              style={{
                backgroundColor: subtleTextColor,
                opacity: 0.7,
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          {/* Primary CTA */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springPhysics, delay: 0.4 }}
          >
            <motion.h2 
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1] max-w-[20ch] mx-auto"
              style={{
                color: textColor,
              }}
            >
              {contactContent.ctaText}
            </motion.h2>

            {/* Email with premium interaction */}
            <motion.div
              className="relative inline-block"
              onHoverStart={() => setIsEmailHovered(true)}
              onHoverEnd={() => setIsEmailHovered(false)}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-2xl"
                initial={{ opacity: 0 }}
                animate={isEmailHovered ? { 
                  opacity: 0.4,
                  scale: 1.2,
                } : { 
                  opacity: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'radial-gradient(circle, rgba(16,185,129,0.6) 0%, transparent 70%)',
                }}
              />

              <motion.a
                href={`mailto:${contactContent.email}`}
                onClick={handleCopyEmail}
                className="relative inline-block text-xl sm:text-2xl lg:text-3xl font-medium text-accent overflow-hidden cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springPhysics}
              >
                {/* Animated underline */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-accent"
                  initial={{ width: '0%' }}
                  animate={isEmailHovered ? { width: '100%' } : { width: '0%' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />

                {/* Character animation */}
                {contactContent.email.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    animate={isEmailHovered ? { y: [-2, 0] } : { y: 0 }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.02,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}

                {/* Copy icon */}
                <motion.span
                  className="inline-block ml-3 align-middle"
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  animate={isEmailHovered || isCopied ? {
                    opacity: 1, x: 0, scale: 1,
                  } : {
                    opacity: 0, x: -10, scale: 0.8,
                  }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                >
                  {isCopied ? (
                    <motion.svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-green-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    <svg 
                      className="w-6 h-6 sm:w-7 sm:h-7 text-accent" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor" 
                      strokeWidth={2}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  )}
                </motion.span>
              </motion.a>

              {/* Tooltip */}
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-white text-neutral-900 text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={isCopied ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 10, scale: 0.9 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
              >
                Copied to clipboard!
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Social links */}
          <motion.div
            className="pt-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8">
              {contactContent.socialLinks.map((link, index) => (
                <motion.div
                  key={link.platform}
                  className="relative"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ ...springPhysics, delay: 0.7 + (index * 0.05) }}
                  onHoverStart={() => setHoveredLink(link.platform)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-white/80 hover:text-accent transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    aria-label={`${link.platform}: ${link.handle}`}
                  >
                    <span className="text-sm font-medium tracking-wide">
                      {link.platform}
                    </span>
                    <span className="text-xs text-white/60 transition-colors duration-300" style={{ color: hoveredLink === link.platform ? 'var(--accent)' : undefined }}>
                      {link.handle}
                    </span>
                  </motion.a>

                  {/* Arrow */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-accent pointer-events-none"
                    initial={{ opacity: 0, y: -10 }}
                    animate={hoveredLink === link.platform ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path
                        d="M20 35 Q15 25, 20 15 L20 8 M20 8 L16 12 M20 8 L24 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Decorative dot */}
          {!prefersReducedMotion && (
            <motion.div
              className="pt-16 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <motion.div
                className="w-1 h-1 bg-white/50 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <motion.p 
          className="text-[10px] uppercase tracking-[0.2em] font-light"
          style={{
            color: subtleTextColor,
            opacity: 0.8,
          }}
        >
          {new Date().getFullYear()} — Sayuru Akash
        </motion.p>
      </motion.div>
    </motion.section>
  );
}
