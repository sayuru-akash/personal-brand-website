import { ArrowUpRight, MapPin } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import BrandIcon from "@/app/components/BrandIcon";
import ContactComposer from "@/app/components/ContactComposer";
import InteractiveSiteFooter from "@/app/components/InteractiveSiteFooter";
import Reveal from "@/app/components/Reveal";
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
    description:
      "Software, product design, music, writing, and collaborations.",
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
    <div className="journal-page">
      <SiteHeader />
      <section className="journal-wrap page-intro">
        <Reveal aboveFold>
          <p className="micro-label">Contact</p>
          <h1>Contact.</h1>
          <p className="section-deck">{contactContent.ctaText}</p>
          <p className="location-note">
            <MapPin size={15} />
            {aboutContent.location} / working worldwide
          </p>
        </Reveal>
        <Reveal aboveFold className="contact-cover">
          <Image
            src="/images/archive/sayuru-brick-portrait.webp"
            alt="Sayuru Akash Amarasinghe against a painted brick wall"
            width={1800}
            height={1013}
            priority
            sizes="(max-width: 760px) 90vw, 720px"
          />
        </Reveal>
      </section>
      <section className="journal-wrap journal-section">
        <Reveal>
          <p className="micro-label">Inquiry</p>
          <h2>Start with the useful part.</h2>
          <p className="section-deck">
            A short brief, the current constraint, and what a good outcome looks
            like are enough to begin.
          </p>
        </Reveal>
        <Reveal className="contact-form-surface">
          <ContactComposer />
        </Reveal>
      </section>
      <section className="journal-wrap journal-section">
        <Reveal>
          <p className="micro-label">Elsewhere</p>
          <h2>Find the right channel.</h2>
        </Reveal>
        <div className="social-index">
          {contactContent.socialLinks.map((link) => (
            <a
              href={link.url}
              key={link.platform}
              target="_blank"
              rel="noopener noreferrer"
            >
              <BrandIcon name={link.platform} className="h-5 w-5" />
              <span>{link.platform}</span>
              <span className="social-handle">{link.handle}</span>
              <ArrowUpRight size={16} />
            </a>
          ))}
        </div>
      </section>
      <InteractiveSiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />
    </div>
  );
}
