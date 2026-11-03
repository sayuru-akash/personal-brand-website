import type { Metadata } from "next";
import InteractiveSiteFooter from "@/app/components/InteractiveSiteFooter";
import Reveal from "@/app/components/Reveal";
import SiteHeader from "@/app/components/SiteHeader";
import { contactContent, privacyPolicySections } from "@/data/portfolio";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for sayuru.me, including website logs, email communications, cookies, service providers, retention, and privacy rights.",
  alternates: { canonical: "/privacy-policy" },
  openGraph: {
    title: "Privacy Policy | Sayuru Akash Amarasinghe",
    description:
      "How information is handled when you visit or contact sayuru.me.",
    url: "/privacy-policy",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy | Sayuru Akash Amarasinghe",
    description:
      "How information is handled when you visit or contact sayuru.me.",
    images: ["/opengraph-image"],
  },
};

const privacyJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://sayuru.me/privacy-policy#webpage",
  url: "https://sayuru.me/privacy-policy",
  name: "Privacy Policy",
  dateModified: "2026-08-25",
  isPartOf: { "@id": "https://sayuru.me/#website" },
};

export default function PrivacyPolicyPage() {
  return (
    <div className="journal-page">
      <SiteHeader />
      <section className="journal-wrap page-intro">
        <Reveal aboveFold>
          <p className="micro-label">Effective 25 August 2026</p>
          <h1>Privacy Policy.</h1>
          <p className="section-deck">
            A plain-language account of what this site handles, what it does not
            collect, and how to ask a question.
          </p>
        </Reveal>
      </section>
      <div className="journal-wrap privacy-layout">
        <nav aria-label="Privacy policy sections" className="privacy-contents">
          <p className="micro-label">Contents</p>
          <ol>
            {privacyPolicySections.map((section, index) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {section.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>
        <article>
          {privacyPolicySections.map((section, index) => (
            <section
              id={section.id}
              key={section.id}
              className="privacy-section"
              aria-labelledby={`${section.id}-heading`}
            >
              <Reveal>
                <p className="micro-label">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 id={`${section.id}-heading`}>{section.title}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                {section.bullets ? (
                  <ul>
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            </section>
          ))}
          <section className="privacy-section">
            <p className="micro-label">Privacy contact</p>
            <a
              className="privacy-email"
              href={`mailto:${contactContent.email}`}
            >
              {contactContent.email}
            </a>
          </section>
        </article>
      </div>
      <InteractiveSiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(privacyJsonLd) }}
      />
    </div>
  );
}
