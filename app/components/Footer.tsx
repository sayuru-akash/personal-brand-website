"use client";

import { motion } from "motion/react";

const socialLinks = [
  { label: "Facebook", href: "https://facebook.com/sayuru.s" },
  { label: "Twitter", href: "https://twitter.com/sayuru_akash" },
  { label: "Instagram", href: "https://instagram.com/sayuru_akash" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sayuruakash" },
  { label: "Telegram", href: "https://t.me/sayuruakash_channel" },
  { label: "GitHub", href: "https://github.com/sayuru-akash" },
];

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative border-t border-divider">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-px bg-accent" />

      <div className="mx-auto max-w-7xl px-6 md:px-12 pt-16 md:pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-20">
          {/* Brand */}
          <div className="md:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-2xl font-semibold tracking-[0.04em] text-text-primary mb-2">
                SAYURU AKASH
              </h3>
              <p className="text-sm text-text-dim tracking-[0.14em] mb-6 jp-serif">
                サユル アーカーシュ
              </p>
              <p className="text-sm text-text-muted leading-relaxed max-w-xs">
                Building digital experiences with precision, soul, and a cup of
                coffee that never runs dry.
              </p>
            </motion.div>
          </div>

          {/* Social links */}
          <div className="md:col-span-4 md:col-start-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <p className="text-[10px] tracking-[0.18em] text-text-dim uppercase mb-6 jp-serif">
                繋がり — Connect
              </p>
              <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-text-dim group-hover:bg-accent transition-colors duration-300 shrink-0" />
                    <span className="text-sm text-text-muted group-hover:text-text-primary transition-colors duration-300">
                      {link.label}
                    </span>
                  </a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-divider pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[11px] text-text-dim tracking-[0.06em]">
            &copy; 2015–{currentYear} Sayuru Akash. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <a
              href="/about"
              className="text-[11px] text-text-dim hover:text-text-primary tracking-[0.06em] transition-colors"
            >
              About
            </a>
            <a
              href="/contact"
              className="text-[11px] text-text-dim hover:text-text-primary tracking-[0.06em] transition-colors"
            >
              Contact
            </a>
            <a
              href="/privacy-policy"
              className="text-[11px] text-text-dim hover:text-text-primary tracking-[0.06em] transition-colors"
            >
              Privacy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
