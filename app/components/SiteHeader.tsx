"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactContent, siteNavigation } from "@/data/portfolio";

export default function SiteHeader({
  className = "",
}: {
  className?: string;
}) {
  const pathname = usePathname();

  return (
    <header
      className={`relative z-40 mx-auto flex w-full max-w-[1500px] flex-wrap items-center justify-between gap-x-5 gap-y-4 px-5 py-5 sm:px-8 md:flex-nowrap lg:px-10 ${className}`}
    >
      <Link href="/" className="group block shrink-0" aria-label="Sayuru home">
        <Image
          src="/images/generated/sayuru-wordmark-red.png"
          alt="Sayuru"
          width={1963}
          height={751}
          quality={60}
          sizes="(min-width: 640px) 146px, 126px"
          className="h-12 w-[126px] object-contain object-left transition-transform duration-300 group-hover:-translate-y-0.5 sm:h-14 sm:w-[146px]"
          priority
        />
      </Link>

      <nav
        aria-label="Primary navigation"
        className="order-3 flex w-full items-center justify-center gap-1 rounded-full border border-[var(--line)] bg-[rgba(255,255,255,0.86)] p-1 text-xs font-bold text-[var(--muted)] backdrop-blur-xl sm:text-sm md:order-none md:w-auto"
      >
        {siteNavigation.map((item) => {
          const isCurrent =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isCurrent ? "page" : undefined}
              className={`nav-pill relative rounded-full px-4 py-2 transition-colors duration-300 sm:px-5 ${
                isCurrent ? "bg-[var(--ink)]" : ""
              }`}
              style={isCurrent ? { color: "var(--paper)" } : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>

      <a
        href={`mailto:${contactContent.email}`}
        className="ink-button group inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-bold"
      >
        Email
        <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </a>
    </header>
  );
}
