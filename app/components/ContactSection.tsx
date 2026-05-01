'use client';

import { motion, useScroll, useTransform, useMotionValue, useSpring } from 'motion/react';
import { contactContent } from '@/data/portfolio';
import { springPhysics } from '@/utils/animationConfig';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useState, useRef, useEffect, type RefObject } from 'react';

type ContactParticle = {
  left: number;
  top: number;
  delay: number;
  duration: number;
};

const CONTACT_PARTICLES: ContactParticle[] = [
  { left: 10, top: 20, delay: 0, duration: 5.4 },
  { left: 25, top: 60, delay: 0.5, duration: 6 },
  { left: 40, top: 15, delay: 1, duration: 5.8 },
  { left: 55, top: 75, delay: 1.5, duration: 6.4 },
  { left: 70, top: 30, delay: 2, duration: 5.4 },
  { left: 85, top: 50, delay: 2.5, duration: 6.1 },
  { left: 15, top: 85, delay: 3, duration: 5.7 },
  { left: 60, top: 45, delay: 3.5, duration: 6.2 },
  { left: 80, top: 70, delay: 4, duration: 5.5 },
  { left: 35, top: 90, delay: 4.5, duration: 6.3 },
  { left: 90, top: 25, delay: 0.2, duration: 5.6 },
  { left: 5, top: 55, delay: 0.7, duration: 6.2 },
  { left: 50, top: 10, delay: 1.2, duration: 5.9 },
  { left: 75, top: 80, delay: 1.7, duration: 6.4 },
  { left: 20, top: 40, delay: 2.2, duration: 5.6 },
];

function InteractiveParticle({
  particle,
  mouseX,
  mouseY,
  containerRef,
}: {
  particle: ContactParticle;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  mouseY: ReturnType<typeof useMotionValue<number>>;
  containerRef: RefObject<HTMLElement | null>;
}) {
  const particleX = useMotionValue(0);
  const particleY = useMotionValue(0);
  const smoothX = useSpring(particleX, { stiffness: 72, damping: 22, mass: 0.45 });
  const smoothY = useSpring(particleY, { stiffness: 72, damping: 22, mass: 0.45 });

  useEffect(() => {
    const unsubscribeX = mouseX.on('change', (x) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const particleScreenX = rect.left + (rect.width * particle.left / 100);
      const particleScreenY = rect.top + (rect.height * particle.top / 100);
      const distanceX = x - particleScreenX;
      const distanceY = mouseY.get() - particleScreenY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
      const attractionRadius = 280;

      if (distance < attractionRadius) {
        const strength = (1 - distance / attractionRadius) * 58;
        particleX.set(distanceX * strength * 0.012);
        particleY.set(distanceY * strength * 0.012);
      } else {
        particleX.set(0);
        particleY.set(0);
      }
    });

    const unsubscribeY = mouseY.on('change', () => {
      mouseX.set(mouseX.get());
    });

    return () => {
      unsubscribeX();
      unsubscribeY();
    };
  }, [containerRef, mouseX, mouseY, particle.left, particle.top, particleX, particleY]);

  return (
    <motion.div
      className="absolute h-1.5 w-1.5 rounded-full bg-emerald-500/70 shadow-[0_0_20px_rgba(16,185,129,0.48)] ring-1 ring-white/70"
      style={{
        left: `${particle.left}%`,
        top: `${particle.top}%`,
        x: smoothX,
        y: smoothY,
      }}
      animate={{
        y: [0, -38, 0],
        opacity: [0.28, 0.92, 0.28],
        scale: [0.75, 1.45, 0.75],
      }}
      transition={{
        duration: particle.duration,
        repeat: Infinity,
        delay: particle.delay,
        ease: 'easeInOut',
      }}
    />
  );
}

/**
 * ContactSection Component
 * 
 * PREMIUM VERSION with smooth daylight background
 * - Smooth transition from previous section
 * - Animated cyan/emerald atmospheric gradients
 * - Floating particles (client-only)
 * - Professional, luxurious aesthetic
 */
export default function ContactSection() {
  const prefersReducedMotion = useReducedMotion();
  const [hoveredLink, setHoveredLink] = useState<string | null>(null);
  const [isEmailHovered, setIsEmailHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  
  const containerRef = useRef<HTMLElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });
  
  // Projects ends on white; Contact stays light and gains atmosphere as it enters.
  const edgeVeilOpacity = useTransform(scrollYProgress, [0, 0.14, 0.34], [0.8, 0.42, 0]);
  const baseWashOpacity = useTransform(scrollYProgress, [0, 0.26, 0.7, 1], [0.18, 0.78, 1, 0.74]);
  const cyanWashOpacity = useTransform(scrollYProgress, [0, 0.22, 0.62, 1], [0, 0.56, 0.86, 0.52]);
  const emeraldWashOpacity = useTransform(scrollYProgress, [0, 0.34, 0.78, 1], [0, 0.34, 0.66, 0.46]);
  const atmosphereOpacity = useTransform(scrollYProgress, [0, 0.2, 0.58], [0.42, 0.82, 1]);
  const gridOpacity = useTransform(scrollYProgress, [0, 0.38, 1], [0.012, 0.038, 0.026]);
  const gridY = useTransform(scrollYProgress, [0, 1], [-28, 28]);

  // Keep the section in the same neutral system as the rest of the page.
  const textColor = useTransform(
    scrollYProgress,
    [0, 0.36],
    ['#171717', '#0f172a']
  );
  
  const subtleTextColor = useTransform(
    scrollYProgress,
    [0, 0.36],
    ['#737373', '#475569']
  );

  const handleCopyEmail = async (e: React.MouseEvent<HTMLAnchorElement>) => {
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
    <motion.section 
      ref={containerRef}
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{
        backgroundColor: '#ffffff',
      }}
      aria-labelledby="contact-heading"
    >
      <motion.div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 24%, #ecfeff 66%, #f8fafc 100%)',
          opacity: baseWashOpacity,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 95% 70% at 70% 18%, rgba(14,165,233,0.2) 0%, rgba(224,242,254,0.34) 32%, transparent 72%)',
          opacity: cyanWashOpacity,
        }}
      />

      <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse 82% 58% at 18% 78%, rgba(16,185,129,0.18) 0%, rgba(209,250,229,0.28) 36%, transparent 74%)',
          opacity: emeraldWashOpacity,
        }}
      />

      {/* Smooth daylight atmosphere */}
      {!prefersReducedMotion && (
        <motion.div className="absolute inset-0" style={{ opacity: atmosphereOpacity }}>
          {/* Sky wash */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 95% 70% at 72% 8%, rgba(14,165,233,0.18) 0%, rgba(224,242,254,0.32) 34%, transparent 72%)',
              filter: 'blur(48px)',
            }}
            animate={{
              x: ['-2%', '2%', '-2%'],
              scale: [1, 1.08, 1],
              opacity: [0.72, 1, 0.72],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Emerald field */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 80% 60% at 18% 72%, rgba(16,185,129,0.16) 0%, rgba(209,250,229,0.22) 34%, transparent 74%)',
              filter: 'blur(54px)',
            }}
            animate={{
              x: ['2%', '-2%', '2%'],
              y: ['1%', '-2%', '1%'],
              scale: [1.04, 1, 1.04],
              opacity: [0.64, 0.94, 0.64],
            }}
            transition={{
              duration: 28,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Soft neutral lens */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(ellipse 70% 58% at 52% 46%, rgba(255,255,255,0.92) 0%, rgba(241,245,249,0.52) 42%, transparent 78%)',
              filter: 'blur(36px)',
            }}
            animate={{
              scale: [1, 1.06, 1],
              opacity: [0.86, 0.62, 0.86],
            }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />

          {/* Interactive floating particles - swim toward cursor */}
          <div suppressHydrationWarning>
            {CONTACT_PARTICLES.map((particle, i) => (
              <InteractiveParticle
                key={i}
                particle={particle}
                mouseX={mouseX}
                mouseY={mouseY}
                containerRef={containerRef}
              />
            ))}
          </div>
        </motion.div>
      )}

      {/* Fallback for reduced motion */}
      {prefersReducedMotion && (
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #f8fafc 42%, #ecfeff 100%)',
          }}
        />
      )}

      {/* Short white edge blend from Projects; resolves before Contact owns the viewport */}
      <motion.div
        className="absolute inset-x-0 top-0 h-[28vh] pointer-events-none z-[2]"
        style={{
          background: 'linear-gradient(to bottom, #ffffff 0%, rgba(255,255,255,0.78) 42%, rgba(255,255,255,0) 100%)',
          opacity: edgeVeilOpacity,
        }}
      />

      {/* Fine surface grid gives the light section depth without making it busy */}
      <motion.div
        className="absolute inset-0 pointer-events-none z-[1]"
        style={{
          backgroundImage: 'linear-gradient(to right, #0f172a 1px, transparent 1px), linear-gradient(to bottom, #0f172a 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          opacity: gridOpacity,
          y: gridY,
        }}
      />

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
                    className="flex flex-col items-center gap-2 text-neutral-700 hover:text-accent transition-colors duration-300"
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
                className="w-1 h-1 bg-accent/50 rounded-full"
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
