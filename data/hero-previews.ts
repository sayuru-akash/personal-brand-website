export type HeroPreview = {
  term: string;
  title: string;
  eyebrow: string;
  kind: "organisation" | "location" | "software" | "music" | "design";
  description: string;
  facts: { label: string; value: string }[];
  href: string;
  linkLabel: string;
  logo?: string;
  source?: string;
};

export const heroPreviews: HeroPreview[] = [
  {
    term: "software",
    title: "From interface to infrastructure",
    eyebrow: "Engineering",
    kind: "software",
    description:
      "My software practice spans product interfaces, APIs, data, and the systems behind them.",
    facts: [
      { label: "Interface", value: "Next.js / React / TypeScript" },
      { label: "Systems", value: "Node.js / Python / PostgreSQL" },
    ],
    href: "/#stack",
    linkLabel: "Explore my stack",
  },
  {
    term: "Codezela Technologies",
    title: "Codezela Technologies",
    eyebrow: "Founder & CEO",
    kind: "organisation",
    description:
      "A technology company working across software, web and mobile applications, design, and digital services.",
    facts: [
      { label: "Headquarters", value: "London, United Kingdom" },
      { label: "Sri Lanka", value: "Colombo / Western Province" },
    ],
    href: "https://codezela.com/",
    linkLabel: "Visit Codezela",
    logo: "/images/context/codezela-official.webp",
    source: "https://codezela.com/",
  },
  {
    term: "Codezela Career Accelerator",
    title: "Codezela Career Accelerator",
    eyebrow: "Lecturer",
    kind: "organisation",
    description:
      "Codezela's education arm connects industry-led learning, practical projects, and career preparation.",
    facts: [
      { label: "Learning", value: "Real projects / expert mentorship" },
      { label: "Tracks", value: "Software, AI, data, systems & design" },
    ],
    href: "https://cca.it.com/",
    linkLabel: "Explore CCA",
    logo: "/images/context/cca.webp",
    source: "https://cca.it.com/about-us/",
  },
  {
    term: "ISBS Campus",
    title: "ISBS Campus",
    eyebrow: "Lecturer",
    kind: "organisation",
    description:
      "The Institute of Studies in Business & Sciences offers practical professional diplomas with guided teaching and project work.",
    facts: [
      { label: "Location", value: "World Trade Center, Colombo 01" },
      { label: "Study", value: "Colombo and live online" },
    ],
    href: "https://isbs.lk/",
    linkLabel: "Explore ISBS",
    logo: "/images/context/isbs.webp",
    source: "https://isbs.lk/about/",
  },
  {
    term: "Colombo, Sri Lanka",
    title: "Colombo, Sri Lanka",
    eyebrow: "Home base",
    kind: "location",
    description:
      "Based on Sri Lanka's western coast, working across technology, education, and creative projects.",
    facts: [
      { label: "Region", value: "Western Province" },
      { label: "Time zone", value: "Asia/Colombo · UTC+05:30" },
    ],
    href: "https://www.openstreetmap.org/?mlat=6.934675&mlon=79.8428278#map=12/6.934675/79.8428278",
    linkLabel: "Find Colombo on the map",
    source: "https://ungegn.un.org/dashboard/cities/details?id=127",
  },
  {
    term: "music",
    title: "A parallel practice in sound",
    eyebrow: "Musical artist",
    kind: "music",
    description:
      "Electronic and independent music work, with production, arrangement, sound design, and mixing.",
    facts: [
      { label: "Since", value: "2020" },
      { label: "Also", value: "HMM with Sayuru & Chanuka / Podcast" },
    ],
    href: "/about",
    linkLabel: "More about my music practice",
  },
  {
    term: "design",
    title: "Design close to the build",
    eyebrow: "Product & interface",
    kind: "design",
    description:
      "UI/UX, prototypes, responsive interfaces, and design systems that carry through to implementation.",
    facts: [
      { label: "Tools", value: "Figma / Adobe XD" },
      { label: "Focus", value: "Hierarchy, spacing, interaction & motion" },
    ],
    href: "/#stack",
    linkLabel: "Explore design tools",
  },
];
