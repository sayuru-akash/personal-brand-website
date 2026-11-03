"use client";

import { CaretDown } from "@phosphor-icons/react";
import { useState } from "react";
import BrandIcon from "@/app/components/BrandIcon";
import Reveal from "@/app/components/Reveal";
import { skillCategories } from "@/data/portfolio";

const stackNotes: Record<string, string> = {
  development:
    "The main bench: interfaces, APIs, data, deploys, and the small fixes that make a product feel finished.",
  design:
    "Spacing, hierarchy, prototypes, motion, and handoff decisions that survive implementation.",
  "music-production":
    "Arrangement, sound design, engineering, mix decisions, and the habit of listening until something feels right.",
  "content-writing":
    "Technical writing, docs, and public notes that make complicated systems easier to use.",
  investment:
    "Crypto and market research with attention to risk, timing, and what not to touch.",
};

export default function SkillsSection() {
  const [expanded, setExpanded] = useState<string[]>(["development"]);
  return (
    <section
      id="stack"
      className="journal-wrap journal-section"
      aria-labelledby="stack-heading"
    >
      <Reveal>
        <div className="section-heading">
          <span className="micro-label">02 / Stack</span>
          <span className="micro-label">
            {skillCategories.reduce(
              (total, category) => total + category.skills.length,
              0,
            )}{" "}
            tools & disciplines
          </span>
        </div>
        <h2 id="stack-heading">Tools</h2>
        <p className="section-deck">
          The stack changes by discipline because each mode asks for a different
          rhythm.
        </p>
        <div className="stack-index">
          {skillCategories.map((category, index) => {
            const isOpen = expanded.includes(category.id);
            return (
              <div className="stack-entry" key={category.id}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={`skills-${category.id}`}
                  onClick={() =>
                    setExpanded((current) =>
                      isOpen
                        ? current.filter((id) => id !== category.id)
                        : [...current, category.id],
                    )
                  }
                >
                  <span className="index-number">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span>{category.title}</span>
                  <span className="stack-count">{category.skills.length}</span>
                  <CaretDown size={16} className={isOpen ? "rotate-180" : ""} />
                </button>
                <div
                  id={`skills-${category.id}`}
                  className="stack-expand"
                  inert={!isOpen}
                  data-open={isOpen}
                >
                  <div>
                    <p>{stackNotes[category.id]}</p>
                    <ul>
                      {category.skills.map((skill) => (
                        <li key={skill}>
                          <BrandIcon name={skill} className="h-5 w-5" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
