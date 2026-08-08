import type { Metadata } from "next";
import Reveal from "@/app/components/Reveal";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { contactContent, privacyPolicySections } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for sayuru.me, including website logs, email communications, cookies, service providers, retention, and privacy rights.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Sayuru Akash Amarasinghe",
    description: "How information is handled when you visit or contact sayuru.me.",
    url: "/privacy-policy",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sayuru Akash Amarasinghe",
    description: "How information is handled when you visit or contact sayuru.me.",
    images: ["/opengraph-image"],
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://sayuru.me/privacy-policy#webpage",
  url: "https://sayuru.me/privacy-policy",
  name: "Privacy Policy",
  dateModified: "2026-08-08",
  isPartOf: { "@id": "https://sayuru.me/#website" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-y border-[var(--line)]">
        <div className="absolute inset-0 ink-grid opacity-24" />
        <div className="absolute left-0 top-0 h-full w-1 bg-[var(--aka)] sm:w-1.5" />
        <div className="absolute right-0 top-0 h-full w-[36%] bg-[var(--paper-blue)]/52" />
        <div className="relative mx-auto flex min-h-[62dvh] w-full max-w-[1500px] flex-col justify-center px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <Reveal aboveFold>
            <h1 className="font-display max-w-[11ch] text-[clamp(3.7rem,10vw,8.6rem)] leading-[0.96]">
              Privacy <span className="text-[var(--ai)]">Policy.</span>
            </h1>
            <div className="mt-10 grid max-w-[70rem] grid-cols-1 gap-8 border-t border-[var(--ink)] pt-8 md:grid-cols-[1fr_auto] md:items-end">
              <p className="max-w-[48rem] text-xl font-semibold leading-9 text-[var(--muted)] sm:text-2xl sm:leading-10">
                A plain-language account of what this site handles, what it does not collect, and how to ask a question.
              </p>
              <p className="font-code text-xs uppercase text-[var(--faint)]">
                Effective 8 August 2026
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-20 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.55fr_1.45fr] lg:gap-28 lg:px-10 lg:py-44">
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <Reveal>
            <p className="font-code text-xs uppercase text-[var(--aka)]">Contents</p>
            <nav aria-label="Privacy policy sections" className="mt-8 border-t border-[var(--ink)]">
              <ol>
                {privacyPolicySections.map((section, index) => (
                  <li key={section.id} className="border-b border-[var(--line)]">
                    <a
                      className="fine-link grid grid-cols-[2.5rem_1fr] gap-3 py-4 text-sm font-bold leading-6"
                      href={`#${section.id}`}
                    >
                      <span className="font-code text-xs text-[var(--faint)]">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </Reveal>
        </aside>

        <article className="min-w-0 border-t border-[var(--ink)]">
          {privacyPolicySections.map((section, index) => (
            <Reveal
              key={section.id}
              className="scroll-mt-28 border-b border-[var(--line)] py-10 sm:py-14"
              delay={Math.min(index * 0.02, 0.12)}
            >
              <section id={section.id} aria-labelledby={`${section.id}-heading`}>
                <div className="grid grid-cols-[3rem_minmax(0,1fr)] gap-5 sm:grid-cols-[4rem_minmax(0,1fr)] sm:gap-8">
                  <span className="font-code text-xs text-[var(--aka)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h2 id={`${section.id}-heading`} className="text-2xl font-black sm:text-3xl">
                      {section.title}
                    </h2>
                    <div className="mt-7 space-y-6 text-base leading-8 text-[var(--muted)] sm:text-lg sm:leading-9">
                      {section.paragraphs.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                    {section.bullets ? (
                      <ul className="mt-7 space-y-4 border-l-2 border-[var(--aka)] pl-6 text-base leading-8 text-[var(--muted)] sm:text-lg">
                        {section.bullets.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                </div>
              </section>
            </Reveal>
          ))}

          <Reveal className="py-12 sm:py-16">
            <p className="font-code text-xs uppercase text-[var(--faint)]">Privacy contact</p>
            <a
              href={`mailto:${contactContent.email}`}
              className="mt-4 block break-words text-[clamp(1.6rem,4vw,3rem)] font-black leading-tight text-[var(--ink)] transition-colors duration-300 hover:text-[var(--aka)]"
            >
              {contactContent.email}
            </a>
          </Reveal>
        </article>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
    </div>
  );
}
