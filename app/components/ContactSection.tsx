'use client';

import { motion } from 'motion/react';
import { contactContent } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useState } from 'react';

/**
 * ContactSection Component
 * 
 * Minimal contact section with dominant whitespace (60%+) and subtle animations.
 * Follows Japanese Ma principle with one primary call-to-action element.
 * Clean, professional, and elegant.
 * 
 * Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6
 */
export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

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
  
  return (
    <section 
      className="relative min-h-[100dvh] flex items-center justify-center bg-neutral-50"
      aria-labelledby="contact-heading"
    >
      {/* Subtle background gradient */}
      {!prefersReducedMotion && (
        <motion.div 
          className="absolute bottom-1/4 left-1/3 w-[500px] h-[500px] bg-gradient-to-br from-accent/4 to-transparent rounded-full blur-3xl pointer-events-none"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      )}

      {/* Main content - centered with dominant whitespace */}
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
            <p className="text-xs uppercase tracking-[0.2em] text-neutral-500 font-light">
              連絡 / Contact
            </p>
            <motion.div 
              className="h-[1px] w-16 bg-accent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          </div>

          {/* Primary CTA - dominant element */}
          <motion.div
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ ...springPhysics, delay: 0.4 }}
          >
            <h2 
              id="contact-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-[-0.02em] leading-[1.1] text-neutral-900 max-w-[20ch] mx-auto"
            >
              {contactContent.ctaText}
            </h2>

            {/* Email - primary contact method with premium interaction */}
            <motion.div
              className="relative inline-block"
              onHoverStart={() => setIsEmailHovered(true)}
              onHoverEnd={() => setIsEmailHovered(false)}
            >
              {/* Glow effect on hover */}
              <motion.div
                className="absolute inset-0 rounded-2xl blur-2xl"
                initial={{ opacity: 0 }}
                animate={isEmailHovered ? { 
                  opacity: 0.15,
                  scale: 1.1,
                } : { 
                  opacity: 0,
                  scale: 1,
                }}
                transition={{ duration: 0.4 }}
                style={{
                  background: 'radial-gradient(circle, rgba(100,116,139,0.4) 0%, transparent 70%)',
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
                  animate={isEmailHovered ? { 
                    width: '100%',
                  } : { 
                    width: '0%',
                  }}
                  transition={{ 
                    duration: 0.5,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                />

                {/* Character-by-character reveal */}
                {contactContent.email.split('').map((char, index) => (
                  <motion.span
                    key={index}
                    className="inline-block"
                    initial={{ y: 0 }}
                    animate={isEmailHovered ? {
                      y: [-2, 0],
                    } : {
                      y: 0,
                    }}
                    transition={{
                      duration: 0.3,
                      delay: index * 0.02,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    {char}
                  </motion.span>
                ))}

                {/* Copy icon / Checkmark - appears on hover, changes on copy */}
                <motion.span
                  className="inline-block ml-3 align-middle"
                  initial={{ opacity: 0, x: -10, scale: 0.8 }}
                  animate={isEmailHovered || isCopied ? {
                    opacity: 1,
                    x: 0,
                    scale: 1,
                  } : {
                    opacity: 0,
                    x: -10,
                    scale: 0.8,
                  }}
                  transition={{
                    type: 'spring',
                    stiffness: 400,
                    damping: 20,
                  }}
                >
                  {isCopied ? (
                    // Checkmark icon when copied
                    <motion.svg
                      className="w-6 h-6 sm:w-7 sm:h-7 text-green-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{
                        type: 'spring',
                        stiffness: 500,
                        damping: 15,
                      }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </motion.svg>
                  ) : (
                    // Copy icon
                    <svg 
                      className="w-6 h-6 sm:w-7 sm:h-7" 
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

              {/* "Copied!" tooltip */}
              <motion.div
                className="absolute -top-12 left-1/2 -translate-x-1/2 px-4 py-2 bg-neutral-900 text-white text-sm font-medium rounded-lg whitespace-nowrap pointer-events-none"
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={isCopied ? {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                } : {
                  opacity: 0,
                  y: 10,
                  scale: 0.9,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 400,
                  damping: 20,
                }}
              >
                Copied to clipboard!
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-neutral-900 rotate-45" />
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Social links - minimal presentation */}
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
                  transition={{ 
                    ...springPhysics, 
                    delay: 0.7 + (index * 0.05) 
                  }}
                  onHoverStart={() => setHoveredLink(link.platform)}
                  onHoverEnd={() => setHoveredLink(null)}
                >
                  <motion.a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-2 text-neutral-600 hover:text-accent transition-colors duration-300"
                    whileHover={{ y: -2 }}
                    aria-label={`${link.platform}: ${link.handle}`}
                  >
                    <span className="text-sm font-medium tracking-wide">
                      {link.platform}
                    </span>
                    <span className="text-xs text-neutral-500 transition-colors duration-300" style={{ color: hoveredLink === link.platform ? 'var(--accent)' : undefined }}>
                      {link.handle}
                    </span>
                  </motion.a>

                  {/* Beautiful curved arrow pointing up - appears below on hover */}
                  <motion.div
                    className="absolute -bottom-12 left-1/2 -translate-x-1/2 text-accent pointer-events-none"
                    initial={{ opacity: 0, y: -10 }}
                    animate={hoveredLink === link.platform ? { 
                      opacity: 1, 
                      y: 0 
                    } : { 
                      opacity: 0, 
                      y: -10 
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  >
                    <svg 
                      width="40" 
                      height="40" 
                      viewBox="0 0 40 40" 
                      fill="none" 
                      className="text-accent"
                    >
                      {/* Curved arrow path pointing upward */}
                      <path
                        d="M20 35 Q15 25, 20 15 L20 8 M20 8 L16 12 M20 8 L24 12"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                      />
                    </svg>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Subtle decorative element */}
          {!prefersReducedMotion && (
            <motion.div
              className="pt-16 flex justify-center"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, delay: 1 }}
            >
              <motion.div
                className="w-1 h-1 bg-accent/40 rounded-full"
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.4, 0.7, 0.4],
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

      {/* Footer note - minimal */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2, duration: 1 }}
      >
        <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-400 font-light">
          {new Date().getFullYear()} — Sayuru Akash
        </p>
      </motion.div>
    </section>
  );
}
