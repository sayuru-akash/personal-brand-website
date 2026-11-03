"use client";

import {
  Buildings,
  GraduationCap,
  MapPin,
  Waveform,
  ArrowUpRight,
  Sparkle,
} from "@phosphor-icons/react";
import Image from "next/image";
import Link from "next/link";
import Reveal from "@/app/components/Reveal";
import { aboutContent } from "@/data/portfolio";

const facts = [
  { label: "Base", value: aboutContent.location, icon: MapPin },
  { label: "Study", value: aboutContent.education, icon: GraduationCap },
  { label: "Company", value: "Codezela Technologies", icon: Buildings },
  { label: "Parallel practice", value: "Music production", icon: Waveform },
];
const notes = [
  "Build the product surface and the backend that makes it real.",
  "Keep design decisions close to implementation details.",
  "Use writing to make systems easier to operate.",
  "Treat sound as another interface: rhythm, texture, release.",
];

export default function AboutSection() {
  return (
    <section
      id="profile"
      className="journal-wrap journal-section"
      aria-labelledby="profile-heading"
    >
      <Reveal>
        <div className="section-heading">
          <span className="micro-label">01 / Profile</span>
          <Link className="quiet-link" href="/about">
            About <ArrowUpRight size={14} />
          </Link>
        </div>
        <h2 id="profile-heading">Range without noise.</h2>
        <p className="section-deck">
          Not a role collage. A working practice that moves between code,
          business, writing, and music.
        </p>
        <div className="profile-story">
          <h3>I like work that becomes real.</h3>
          <p>{aboutContent.bio}</p>
        </div>
        <figure className="story-image">
          <Image
            src="/images/generated/sayuru-profile-still-life.webp"
            alt="Minimal still-life visual representing software, music, writing, and studio practice"
            width={1586}
            height={992}
            sizes="(max-width: 760px) 90vw, 720px"
          />
        </figure>
        <dl className="fact-list">
          {facts.map(({ label, value, icon: Icon }) => (
            <div key={label}>
              <dt>
                <Icon size={17} />
                {label}
              </dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
      <Reveal>
        <div className="practice-grid">
          <div>
            <h3 className="micro-label">Roles</h3>
            <ol className="role-list">
              {aboutContent.roles.map((role, index) => (
                <li key={role}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  {role}
                </li>
              ))}
            </ol>
          </div>
          <div>
            <h3 className="micro-label">Signals</h3>
            <ul className="trait-list">
              {aboutContent.traits.map((trait) => (
                <li key={trait}>
                  <Sparkle size={15} />
                  {trait}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <ol className="practice-notes">
          {notes.map((note, index) => (
            <li key={note}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{note}</p>
            </li>
          ))}
        </ol>
      </Reveal>
    </section>
  );
}
