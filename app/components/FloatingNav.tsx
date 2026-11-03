"use client";

import { ArrowUp, ArrowUpRight } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactContent, siteNavigation } from "@/data/portfolio";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function FloatingNav() {
  const pathname = usePathname();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const update = () => setVisible(window.scrollY > 600);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          aria-label="Quick navigation"
          className="floating-navigation"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label="Back to top"
            title="Back to top"
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: reduced ? "instant" : "smooth",
              })
            }
          >
            <ArrowUp size={16} />
          </button>
          {siteNavigation.map((item) => (
            <Link
              href={item.href}
              key={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
          <a
            href={`mailto:${contactContent.email}`}
            aria-label="Email Sayuru"
            title="Email Sayuru"
          >
            <ArrowUpRight size={17} />
          </a>
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
