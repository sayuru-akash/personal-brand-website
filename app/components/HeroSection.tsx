"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import Image from "next/image";
import { MapPin, X } from "@phosphor-icons/react";
import BrandIcon from "@/app/components/BrandIcon";
import HeroPortraitReveal from "@/app/components/HeroPortraitReveal";
import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
import { RoleTicker } from "@/app/components/ReactBitsPrimitives";
import { aboutPageContent, heroContent, socialLinks } from "@/data/portfolio";

export default function HeroSection() {
  return (
    <section id="home" aria-labelledby="hero-heading">
      <SiteHeader />
      <div className="journal-wrap hero-intro">
        <Reveal aboveFold>
          <div className="identity-row">
            <div className="identity-portrait">
              <HeroPortraitReveal />
            </div>
            <div>
              <p className="japanese-name">{heroContent.nameJapanese}</p>
              <h1 id="hero-heading">{heroContent.name}</h1>
              <p className="identity-role">{heroContent.role}</p>
            </div>
          </div>
          <div className="intro-copy">
            <p>
              {heroContent.subtitle.split("Western Sri Lanka")[0]}
              <button
                type="button"
                className="location-trigger"
                popoverTarget="location-preview"
                aria-label="Western Sri Lanka: show photo"
              >
                Western Sri Lanka
              </button>
              {heroContent.subtitle.split("Western Sri Lanka")[1]} I work across
              product interfaces, full-stack systems, writing, and sound.
            </p>
          </div>
          <div
            popover="auto"
            id="location-preview"
            className="location-preview"
          >
            <Image
              src={aboutPageContent.archive[0].src}
              alt={aboutPageContent.archive[0].alt}
              width={1800}
              height={1348}
              sizes="340px"
            />
            <div>
              <p>
                <MapPin size={14} />
                {aboutPageContent.archive[0].caption}
              </p>
              <button
                type="button"
                popoverTarget="location-preview"
                popoverTargetAction="hide"
                aria-label="Close location photo"
                title="Close location photo"
              >
                <X size={17} />
              </button>
            </div>
          </div>
          <div className="current-role">
            <span className="status-light" />
            <span className="micro-label">Current mode</span>
            <RoleTicker roles={heroContent.roles} className="role-line" />
          </div>
          <div className="intro-links">
            {socialLinks
              .filter((link) =>
                ["GitHub", "LinkedIn", "Instagram", "X"].includes(
                  link.platform,
                ),
              )
              .map((link) => (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="quiet-link"
                >
                  <BrandIcon name={link.platform} className="h-4 w-4" />
                  {link.platform}
                  <ArrowUpRight size={13} />
                </a>
              ))}
          </div>
          <div className="hero-tools">
            {["Next.js", "React", "TypeScript", "Figma", "PostgreSQL"].map(
              (tool) => (
                <span key={tool}>
                  <BrandIcon name={tool} className="h-4 w-4" />
                  {tool}
                </span>
              ),
            )}
          </div>
          <div className="intro-bottom">
            <a href="#profile" className="quiet-link">
              Scroll to profile <ArrowDown size={14} />
            </a>
            <Link href="/about" className="quiet-link">
              About Sayuru <ArrowUpRight size={14} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
