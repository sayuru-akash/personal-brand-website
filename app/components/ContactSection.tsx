'use client';

import { motion } from 'motion/react';
import { contactContent } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';

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

            {/* Email - primary contact method */}
            <motion.a
              href={`mailto:${contactContent.email}`}
              className="inline-block text-xl sm:text-2xl lg:text-3xl font-medium text-accent hover:text-accent-dark transition-colors duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={springPhysics}
            >
              {contactContent.email}
            </motion.a>
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
                <motion.a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center gap-2 text-neutral-600 hover:text-accent transition-colors duration-300"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ 
                    ...springPhysics, 
                    delay: 0.7 + (index * 0.05) 
                  }}
                  whileHover={{ y: -2 }}
                  aria-label={`${link.platform}: ${link.handle}`}
                >
                  <span className="text-sm font-medium tracking-wide">
                    {link.platform}
                  </span>
                  <span className="text-xs text-neutral-500 group-hover:text-accent transition-colors duration-300">
                    {link.handle}
                  </span>
                </motion.a>
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
