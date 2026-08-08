import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import BrandIcon from "@/app/components/BrandIcon";
import ContactComposer from "@/app/components/ContactComposer";
import Reveal from "@/app/components/Reveal";
import SiteFooter from "@/app/components/SiteFooter";
import SiteHeader from "@/app/components/SiteHeader";
import { aboutContent, contactContent } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact Sayuru Akash Amarasinghe about software, product design, web systems, music, sound, writing, or collaborations.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "Contact Sayuru Akash Amarasinghe",
    description:
      "Start a conversation about software, product design, music, writing, or a useful overlap.",
    url: "/contact",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Sayuru Akash Amarasinghe",
    description: "Software, product design, music, writing, and collaborations.",
    images: ["/opengraph-image"],
  },
};

const contactJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": "https://sayuru.me/contact#contact-page",
  url: "https://sayuru.me/contact",
  name: "Contact Sayuru Akash Amarasinghe",
  about: { "@id": "https://sayuru.me/#sayuru" },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <SiteHeader />

      <section className="relative isolate overflow-hidden border-t border-[var(--line)]">
        <div className="absolute inset-0 ink-grid opacity-24" />
        <div className="absolute left-0 top-0 h-full w-1 bg-[var(--aka)] sm:w-1.5" />
        <div className="absolute right-0 top-0 h-[58%] w-[38%] bg-[var(--paper-blue)]/60" />

        <div className="relative mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(22rem,0.95fr)] lg:gap-20 lg:px-10 lg:py-28">
          <Reveal>
            <h1 className="font-display max-w-[8ch] text-[clamp(3.25rem,12vw,7.8rem)] leading-[0.96]">
              Contact<span className="text-[var(--aka)]">.</span>
            </h1>
            <p className="mt-10 max-w-[38rem] text-xl font-semibold leading-9 text-[var(--muted)] sm:text-2xl sm:leading-10">
              {contactContent.ctaText}
            </p>
            <div className="mt-12 flex items-center gap-3 font-code text-xs uppercase text-[var(--faint)]">
              <MapPin className="h-5 w-5 text-[var(--ai)]" weight="duotone" />
              {aboutContent.location} / working worldwide
            </div>
          </Reveal>

          <Reveal className="relative lg:pl-8" delay={0.08}>
            <div className="paper-shadow overflow-hidden rounded-[2rem] border border-[var(--ink)] bg-white p-2">
              <Image
                src="/images/archive/sayuru-brick-portrait.webp"
                alt="Sayuru Akash Amarasinghe against a painted brick wall"
                width={1800}
                height={1013}
                className="aspect-[16/10] w-full rounded-[1.45rem] object-cover object-center"
                priority
                sizes="(min-width: 1024px) 52vw, 94vw"
              />
            </div>
            <div className="absolute -bottom-5 -left-1 rounded-full border border-[var(--line)] bg-white px-5 py-3 font-code text-xs uppercase text-[var(--aka)] shadow-sm lg:left-3">
              Open to considered work
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-20 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.72fr_1.28fr] lg:gap-28 lg:px-10 lg:py-48">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-code text-xs uppercase text-[var(--aka)]">Inquiry</p>
          <h2 className="font-display mt-6 max-w-[9ch] text-5xl leading-[1.02] sm:text-7xl">
            Start with the useful part.
          </h2>
          <p className="mt-8 max-w-md text-lg leading-8 text-[var(--muted)]">
            A short brief, the current constraint, and what a good outcome looks like are enough to begin.
          </p>
        </Reveal>

        <Reveal delay={0.06}>
          <ContactComposer />
        </Reveal>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--paper-quiet)] py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 ink-grid opacity-18" />
        <div className="relative mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-[0.65fr_1.35fr] lg:gap-28 lg:px-10">
          <Reveal>
            <p className="font-code text-xs uppercase text-[var(--ai)]">Elsewhere</p>
            <h2 className="font-display mt-6 max-w-[8ch] text-5xl leading-[1.02] sm:text-7xl">
              Find the right channel.
            </h2>
          </Reveal>

          <div className="border-t border-[var(--ink)]">
            {contactContent.socialLinks.map((link, index) => (
              <Reveal key={link.platform} delay={index * 0.035}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid grid-cols-[3rem_minmax(0,1fr)_auto] items-center gap-5 border-b border-[var(--line)] py-6 text-[var(--ink)] transition-colors duration-300 hover:text-[var(--aka)] sm:grid-cols-[4rem_minmax(11rem,0.7fr)_1fr_auto]"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full border border-[var(--line)] bg-white text-[var(--ink)] transition-transform duration-300 group-hover:-translate-y-0.5">
                    <BrandIcon name={link.platform} className="h-5 w-5" />
                  </span>
                  <span className="text-lg font-black">{link.platform}</span>
                  <span className="hidden font-code text-xs text-[var(--faint)] sm:block">
                    {link.handle}
                  </span>
                  <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
    </div>
  );
}
