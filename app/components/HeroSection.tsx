"use client";

import { ArrowDown, ArrowUpRight } from "@phosphor-icons/react";
import Link from "next/link";
import BrandIcon from "@/app/components/BrandIcon";
import HeroIntroduction from "@/app/components/HeroIntroduction";
import HeroPortraitReveal from "@/app/components/HeroPortraitReveal";
import SiteHeader from "@/app/components/SiteHeader";
import Reveal from "@/app/components/Reveal";
import { RoleTicker } from "@/app/components/ReactBitsPrimitives";
import { heroContent, heroTools, socialLinks } from "@/data/portfolio";

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
              <p className="identity-role">
                <strong>{heroContent.role}</strong>
              </p>
            </div>
          </div>
          <HeroIntroduction />
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
            {heroTools.map((tool) => (
              <span key={tool}>
                <span aria-hidden="true">
                  <BrandIcon name={tool} className="h-4 w-4" />
                </span>
                {tool}
              </span>
            ))}
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
