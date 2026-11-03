import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import InteractiveSiteFooter from "@/app/components/InteractiveSiteFooter";
import Reveal from "@/app/components/Reveal";
import PhotoArchive from "@/app/components/PhotoArchive";
import SiteHeader from "@/app/components/SiteHeader";
import { aboutPageContent, heroContent } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "About",
  description:
    "Biography of Sayuru Akash Amarasinghe, a Sri Lankan full-stack engineer, musical artist, designer, writer, investor, and founder of Codezela Technologies.",
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
    <div className="journal-page">
      <SiteHeader />
      <section className="journal-wrap page-intro">
        <Reveal aboveFold>
          <p className="micro-label">{heroContent.name}</p>
          <h1>About Sayuru.</h1>
          <p className="section-deck">{aboutPageContent.introduction}</p>
        </Reveal>
        <Reveal aboveFold className="about-cover">
          <Image
            src={aboutPageContent.archive[0].src}
            alt={aboutPageContent.archive[0].alt}
            width={aboutPageContent.archive[0].width}
            height={aboutPageContent.archive[0].height}
            priority
            sizes="(max-width: 760px) 90vw, 720px"
          />
          <p className="image-caption">{aboutPageContent.archive[0].caption}</p>
        </Reveal>
      </section>
      <section className="journal-wrap journal-section">
        <Reveal>
          <p className="micro-label">Biography</p>
          <h2>One practice. Several forms.</h2>
        </Reveal>
        <div className="biography-copy">
          {aboutPageContent.biography.map((paragraph, index) => (
            <Reveal key={paragraph} delay={index * 0.03}>
              <p>{paragraph}</p>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <dl className="fact-list">
            {aboutPageContent.facts.map((fact) => (
              <div key={fact.label}>
                <dt>{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </section>
      <section className="journal-wrap journal-section">
        <Reveal>
          <div className="section-heading">
            <h2>The path so far.</h2>
            <span className="micro-label">Origin / Now</span>
          </div>
        </Reveal>
        <ol className="timeline">
          {aboutPageContent.moments.map((moment, index) => (
            <li key={moment.marker}>
              <Reveal delay={index * 0.03}>
                <span className="micro-label">{moment.marker}</span>
                <div>
                  <h3>{moment.title}</h3>
                  <p>{moment.description}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>
      <section className="journal-wrap journal-section">
        <Reveal>
          <p className="micro-label">Personal archive</p>
          <h2>Earlier frames, kept visible.</h2>
          <PhotoArchive />
        </Reveal>
      </section>
      <section className="journal-wrap journal-section conversation-note">
        <Reveal>
          <h2>Have something useful to make?</h2>
          <Link href="/contact" className="quiet-link">
            Start a conversation <ArrowUpRight size={16} />
          </Link>
        </Reveal>
      </section>
      <InteractiveSiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />
    </div>
  );
}
