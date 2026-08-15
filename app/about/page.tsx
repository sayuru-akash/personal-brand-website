import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InteractiveSiteFooter from "@/app/components/InteractiveSiteFooter";
import Reveal from "@/app/components/Reveal";
import SiteHeader from "@/app/components/SiteHeader";
import { aboutPageContent, heroContent } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description:
    "Biography of Sayuru Akash Amarasinghe, a Sri Lankan full-stack developer, musical artist, designer, writer, investor, and founder of Codezela Technologies.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Sayuru Akash Amarasinghe",
    description:
      "Developer, musical artist, designer, writer, investor, and Codezela Technologies founder from Colombo, Sri Lanka.",
    url: "/about",
    type: "profile",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Sayuru Akash Amarasinghe",
    description:
      "Developer, musical artist, designer, writer, investor, and founder from Colombo, Sri Lanka.",
    images: ["/opengraph-image"],
  },
};

const aboutJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": "https://sayuru.me/about#profile-page",
  url: "https://sayuru.me/about",
  name: "About Sayuru Akash Amarasinghe",
  mainEntity: {
    "@id": "https://sayuru.me/#sayuru",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white text-[var(--ink)]">
      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0 ink-grid opacity-25" />
        <div className="absolute right-0 top-0 h-full w-[42%] bg-[var(--paper-blue)]/55" />
        <div className="absolute left-0 top-0 h-full w-1 bg-[var(--aka)] sm:w-1.5" />

        <SiteHeader />

        <div className="relative mx-auto grid min-h-[calc(100dvh-9rem)] w-full max-w-[1500px] grid-cols-1 items-center gap-16 px-5 py-20 sm:px-8 sm:py-24 lg:grid-cols-[0.92fr_1.08fr] lg:gap-24 lg:px-10 lg:py-28">
          <Reveal aboveFold>
            <p className="font-code text-xs uppercase text-[var(--muted)]">
              {heroContent.name}
            </p>
            <h1 className="font-display mt-7 max-w-[9ch] text-[clamp(3.6rem,10vw,8.5rem)] leading-[0.96]">
              About <span className="text-[var(--ai)]">Sayuru.</span>
            </h1>
            <p className="mt-10 max-w-[40rem] text-xl font-semibold leading-9 text-[var(--muted)] sm:text-2xl sm:leading-10">
              {aboutPageContent.introduction}
            </p>
          </Reveal>

          <Reveal className="relative lg:pl-8" delay={0.08} aboveFold>
            <div className="paper-shadow relative overflow-hidden rounded-[2rem] border border-[var(--ink)] bg-white p-2">
              <Image
                src={aboutPageContent.archive[0].src}
                alt={aboutPageContent.archive[0].alt}
                width={aboutPageContent.archive[0].width}
                height={aboutPageContent.archive[0].height}
                quality={60}
                className="aspect-[4/3] w-full rounded-[1.45rem] object-cover"
                priority
                sizes="(min-width: 1024px) 44vw, 50vw"
              />
            </div>
            <p className="font-code mt-4 text-xs uppercase text-[var(--faint)]">
              {aboutPageContent.archive[0].caption}
            </p>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-20 px-5 py-28 sm:px-8 sm:py-36 lg:grid-cols-[0.7fr_1.3fr] lg:gap-28 lg:px-10 lg:py-48">
        <Reveal className="lg:sticky lg:top-28 lg:self-start">
          <p className="font-code text-xs uppercase text-[var(--aka)]">Biography</p>
          <h2 className="font-display mt-6 max-w-[8ch] text-5xl leading-[1.02] sm:text-7xl">
            One practice. Several forms.
          </h2>
        </Reveal>

        <div>
          <div className="space-y-10">
            {aboutPageContent.biography.map((paragraph, index) => (
              <Reveal key={paragraph} delay={index * 0.05}>
                <p className="max-w-[58rem] text-xl font-semibold leading-9 text-[var(--muted)] sm:text-2xl sm:leading-10">
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-20 border-t border-[var(--ink)]" delay={0.08}>
            {aboutPageContent.facts.map((fact, index) => (
              <div
                key={fact.label}
                className="grid grid-cols-[3rem_minmax(0,0.7fr)_minmax(0,1.3fr)] gap-4 border-b border-[var(--line)] py-6 sm:grid-cols-[4rem_minmax(9rem,0.55fr)_1fr] sm:gap-8"
              >
                <span className="font-code text-xs text-[var(--aka)]">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="font-code text-xs uppercase text-[var(--faint)]">
                  {fact.label}
                </span>
                <span className="text-base font-bold leading-7 text-[var(--ink)] sm:text-lg">
                  {fact.value}
                </span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="relative overflow-hidden border-y border-[var(--line)] bg-[var(--paper-quiet)] py-28 sm:py-36 lg:py-44">
        <div className="absolute inset-0 ink-grid opacity-20" />
        <div className="relative mx-auto w-full max-w-[1500px] px-5 sm:px-8 lg:px-10">
          <Reveal className="grid grid-cols-1 gap-8 border-b border-[var(--ink)] pb-10 md:grid-cols-[1fr_auto] md:items-end">
            <h2 className="font-display text-5xl leading-none sm:text-7xl">The path so far.</h2>
            <p className="font-code text-xs uppercase text-[var(--faint)]">Origin / Now</p>
          </Reveal>

          <div className="mt-8">
            {aboutPageContent.moments.map((moment, index) => (
              <Reveal
                key={moment.marker}
                className="group grid grid-cols-[4rem_minmax(0,1fr)] gap-6 border-b border-[var(--line)] py-9 sm:grid-cols-[7rem_minmax(12rem,0.65fr)_1fr] sm:gap-10"
                delay={index * 0.05}
              >
                <span className="font-code text-sm font-bold text-[var(--aka)]">
                  {moment.marker}
                </span>
                <h3 className="text-xl font-black text-[var(--ink)] sm:text-2xl">
                  {moment.title}
                </h3>
                <p className="col-start-2 max-w-[42rem] text-base leading-7 text-[var(--muted)] sm:col-start-auto sm:text-lg sm:leading-8">
                  {moment.description}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto w-full max-w-[1500px] px-5 py-28 sm:px-8 sm:py-36 lg:px-10 lg:py-48">
        <Reveal className="max-w-4xl">
          <p className="font-code text-xs uppercase text-[var(--ai)]">Personal archive</p>
          <h2 className="font-display mt-6 text-5xl leading-[1.02] sm:text-7xl">
            Earlier frames, kept visible.
          </h2>
        </Reveal>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
          {aboutPageContent.archive.slice(1).map((image, index) => (
            <Reveal
              key={image.src}
              className={
                index === 0
                  ? "md:col-span-4 md:mt-24"
                  : index === 1
                    ? "md:col-span-8"
                    : "md:col-span-7 md:col-start-6"
              }
              delay={index * 0.06}
            >
              <figure>
                <div className="overflow-hidden rounded-[1.7rem] border border-[var(--line)] bg-white p-2">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    width={image.width}
                    height={image.height}
                    className={`w-full rounded-[1.2rem] object-cover transition-transform duration-700 hover:scale-[1.025] ${
                      index === 0 ? "aspect-square" : "aspect-[16/9]"
                    }`}
                    sizes={index === 0 ? "(min-width: 768px) 33vw, 94vw" : "(min-width: 768px) 64vw, 94vw"}
                  />
                </div>
                <figcaption className="font-code mt-4 text-xs uppercase text-[var(--faint)]">
                  {image.caption}
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--line)]">
        <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-10 px-5 py-24 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end lg:px-10 lg:py-32">
          <Reveal>
            <h2 className="font-display max-w-[12ch] text-5xl leading-[1.02] sm:text-7xl">
              Have something useful to make?
            </h2>
          </Reveal>
          <Link
            href="/contact"
            className="ink-button group inline-flex min-h-14 items-center justify-center gap-3 rounded-full px-7 text-sm font-bold"
          >
            Start a conversation
            <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>
      </section>

      <InteractiveSiteFooter />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
    </div>
  );
}
