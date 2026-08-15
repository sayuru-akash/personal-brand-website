import Link from "next/link";
import { contactContent, siteNavigation } from "@/data/portfolio";

export default function SiteFooter() {
  return (
    <footer className="relative mx-auto w-full max-w-[1500px] border-t border-[var(--line)] px-5 py-10 text-sm text-[var(--ink)] sm:px-8 lg:px-10 lg:py-12">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_auto] md:items-end">
        <div>
          <p className="font-code text-xs uppercase text-[var(--ink)]">
            Copyright 2015-2026
          </p>
          <p className="mt-2 font-bold text-[var(--ink)]">
            Sayuru Akash Amarasinghe / Colombo, Sri Lanka
          </p>
          <a
            className="fine-link mt-3 inline-block font-code text-xs"
            href={`mailto:${contactContent.email}`}
          >
            {contactContent.email}
          </a>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-3 font-code text-xs uppercase">
            {siteNavigation.map((item) => (
              <li key={item.href}>
                <Link className="fine-link" href={item.href}>
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="fine-link" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
