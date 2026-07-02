'use client';

import { ArrowUp, ArrowUpRight } from '@phosphor-icons/react';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { contactContent } from '@/data/portfolio';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const sections = [
  { id: 'profile', label: 'Profile' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
] as const;

/**
 * Scroll-triggered "dynamic island" command pill. It stays hidden inside the
 * hero (where the in-header nav lives) and floats up to the bottom-center once
 * the user scrolls into the body sections, restoring persistent navigation,
 * an active-section indicator, and quick email / back-to-top actions.
 */
export default function FloatingNav() {
  const prefersReducedMotion = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState<string>('');

  useEffect(() => {
    const reveal = () => setVisible(window.scrollY > window.innerHeight * 0.62);
    reveal();
    window.addEventListener('scroll', reveal, { passive: true });
    return () => window.removeEventListener('scroll', reveal);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (intersecting) setActive(intersecting.target.id);
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    const targets = sections
      .map((section) => document.getElementById(section.id))
      .filter((el): el is HTMLElement => el !== null);
    targets.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const handleBackToTop = () => {
    if (prefersReducedMotion) {
      window.scrollTo({ top: 0, behavior: 'auto' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Quick navigation"
          className="fixed inset-x-0 bottom-5 z-40 flex justify-center px-4"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 40, filter: 'blur(8px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          exit={prefersReducedMotion ? undefined : { opacity: 0, y: 40, filter: 'blur(8px)' }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.86)] p-1 shadow-[0_18px_50px_-24px_rgba(23,22,19,0.45)] backdrop-blur-xl sm:gap-1.5">
            <button
              type="button"
              onClick={handleBackToTop}
              aria-label="Back to top"
              className="grid h-10 w-10 place-items-center rounded-full text-[var(--ink)] transition-colors duration-300 hover:bg-[var(--ink)] hover:text-white"
            >
              <ArrowUp className="h-4 w-4" weight="bold" />
            </button>

            <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-[var(--line)] sm:block" />

            <ul className="hidden items-center gap-0.5 sm:flex">
              {sections.map((section) => {
                const isActive = active === section.id;
                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      className="relative inline-flex items-center rounded-full px-3.5 py-2 text-xs font-bold transition-colors duration-300"
                      style={{ color: isActive ? 'var(--ink)' : 'var(--muted)' }}
                    >
                      {section.label}
                      {isActive && (
                        <motion.span
                          layoutId="floating-nav-active"
                          className="absolute inset-0 -z-10 rounded-full bg-[var(--paper-blue)]"
                          transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>

            {/* compact active dot for mobile */}
            <span className="flex items-center gap-1.5 px-2 sm:hidden">
              {sections.map((section) => (
                <span
                  key={section.id}
                  className="h-1.5 rounded-full transition-all duration-300"
                  style={{
                    width: active === section.id ? 18 : 6,
                    background: active === section.id ? 'var(--aka)' : 'var(--line)',
                  }}
                />
              ))}
            </span>

            <span aria-hidden="true" className="mx-0.5 hidden h-5 w-px bg-[var(--line)] sm:block" />

            <a
              href={`mailto:${contactContent.email}`}
              className="ink-button inline-flex h-10 items-center gap-1.5 rounded-full px-4 text-xs font-bold"
            >
              Email
              <ArrowUpRight className="h-3.5 w-3.5" weight="bold" />
            </a>
          </div>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
