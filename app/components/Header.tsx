"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const navLinks = [
  { label: "Home", jp: "ホーム", href: "#" },
  { label: "About", jp: "概要", href: "#about" },
  { label: "Craft", jp: "技術", href: "#craft" },
  { label: "Contact", jp: "連絡", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/80 backdrop-blur-md border-b border-divider"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-6 md:px-12 flex items-center justify-between h-16 md:h-20">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full border border-accent flex items-center justify-center group-hover:bg-accent-soft transition-colors duration-300">
              <span className="text-xs font-bold text-accent">S</span>
            </div>
            <div className="hidden sm:flex flex-col leading-tight">
              <span className="text-sm font-semibold tracking-[0.08em] text-text-primary">
                SAYURU
              </span>
              <span className="text-[9px] tracking-[0.18em] text-text-dim font-light jp-serif">
                サユル
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="group relative py-2"
              >
                <span className="text-[13px] font-medium tracking-[0.06em] text-text-muted group-hover:text-text-primary transition-colors duration-300 uppercase">
                  {link.label}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </nav>

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] p-2"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 origin-center ${menuOpen ? "rotate-45 translate-y-[6.5px]" : ""}`}
            />
            <span
              className={`block w-3 h-[1.5px] bg-text-muted transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block w-5 h-[1.5px] bg-text-primary transition-all duration-300 origin-center ${menuOpen ? "-rotate-45 -translate-y-[6.5px]" : ""}`}
            />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-xl flex flex-col items-center justify-center"
          >
            <nav className="flex flex-col items-center gap-10">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col items-center group"
                >
                  <span className="text-3xl font-light tracking-[0.1em] text-text-primary group-hover:text-accent transition-colors duration-300">
                    {link.label}
                  </span>
                  <span className="text-[11px] tracking-[0.2em] text-text-dim mt-1.5 jp-serif">
                    {link.jp}
                  </span>
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
