"use client";

import { ArrowUpRight } from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { contactContent, siteNavigation } from "@/data/portfolio";

export default function SiteHeader({ className = "" }: { className?: string }) {
  const pathname = usePathname();
  return (
    <header className={`site-header journal-wrap ${className}`}>
      <Link href="/" aria-label="Sayuru home" className="wordmark">
        <Image
          src="/images/generated/sayuru-wordmark-red.webp"
          alt="Sayuru"
          width={1963}
          height={751}
          sizes="100px"
          priority
        />
      </Link>
      <nav aria-label="Primary navigation">
        {siteNavigation.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            aria-current={pathname === item.href ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>
      <a
        className="header-email"
        href={`mailto:${contactContent.email}`}
        aria-label="Email Sayuru"
        title="Email Sayuru"
      >
        <ArrowUpRight size={19} />
      </a>
    </header>
  );
}
