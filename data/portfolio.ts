/**
 * Static portfolio content data
 * Contains all biographical information, skills, projects, and contact details
 * for Sayuru Akash Amarasinghe's animated portfolio homepage
 */

import type {
  PortfolioContent,
  HeroContent,
  AboutContent,
  SkillCategory,
  Project,
  ContactContent,
  SocialLink,
  AboutPageContent,
  PrivacyPolicySection,
  SiteNavigationItem,
} from "@/types/portfolio";

export const siteNavigation: SiteNavigationItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Hero section content
 */
export const heroContent: HeroContent = {
  name: "Sayuru Akash Amarasinghe",
  nameJapanese: "サユル アーカーシュ",
  role: "Full-stack Developer & Musical Artist",
  roles: [
    "Musical Artist",
    "Full-stack Developer",
    "Web Designer",
    "Content Writer",
    "Investor",
  ],
  subtitle:
    "I make web products, studio systems, and music from Western Sri Lanka.",
};

/**
 * About section biographical content
 */
export const aboutContent: AboutContent = {
  bio: "I run Codezela Technologies, build with Next.js and TypeScript, write the notes that make systems usable, and keep a parallel practice in music production. I studied Software Engineering through Plymouth University and still prefer work that moves from rough sketch to shipped thing without losing taste.",
  roles: [
    "Full-stack Developer",
    "Musical Artist",
    "CEO @ Codezela Technologies",
    "Content Writer",
    "Investor",
  ],
  traits: [
    "Coffee maniac",
    "Team Android",
    "Tech enthusiast",
    "Music addict",
    "Crypto holder",
    "Netflix lover",
  ],
  location: "Colombo, Sri Lanka",
  education: "BSc Software Engineering, Plymouth University, UK",
};

export const aboutPageContent: AboutPageContent = {
  introduction:
    "Sayuru Akash Amarasinghe is a Sri Lankan full-stack developer, musical artist, designer, writer, investor, and founder of Codezela Technologies.",
  biography: [
    "Born on 14 June in Colombo and raised in Kottawa, Sayuru built his practice around technology, sound, and independent creative work. He works from Sri Lanka across product interfaces, full-stack systems, writing, and music production.",
    "His public music work began in 2020. HMM with Sayuru & Chanuka, a conversational podcast project, is part of that early catalogue. Today, the same interest in rhythm and structure carries between software, design, sound, and the systems behind Codezela Technologies.",
    "Sayuru studied Software Engineering through Plymouth University in the United Kingdom. His approach remains practical: understand the real problem, make the interface clear, build the underlying system, and ship work that can keep evolving.",
  ],
  facts: [
    { label: "Born", value: "14 June / Colombo, Sri Lanka" },
    { label: "Based", value: "Colombo, Sri Lanka" },
    { label: "Education", value: "BSc Software Engineering / Plymouth University, UK" },
    { label: "Company", value: "Founder & CEO / Codezela Technologies" },
    { label: "Practice", value: "Software / design / music / writing" },
    { label: "Notable work", value: "HMM with Sayuru & Chanuka / Podcast" },
  ],
  moments: [
    {
      marker: "ORIGIN",
      title: "Colombo",
      description: "Born in Colombo and raised in Kottawa, Western Province.",
    },
    {
      marker: "2020",
      title: "Music",
      description: "Began publishing electronic and independent music work.",
    },
    {
      marker: "BSc",
      title: "Software engineering",
      description: "Studied through Plymouth University in the United Kingdom.",
    },
    {
      marker: "NOW",
      title: "Codezela Technologies",
      description: "Leads product, software, and web-system work from Sri Lanka.",
    },
  ],
  archive: [
    {
      src: "/images/archive/sayuru-beach-profile.webp",
      alt: "Sayuru Akash Amarasinghe standing by the coast in Sri Lanka",
      caption: "Western Sri Lanka / personal archive",
      width: 1800,
      height: 1348,
    },
    {
      src: "/images/archive/sayuru-window-portrait.webp",
      alt: "An early portrait of Sayuru Akash Amarasinghe by a window",
      caption: "Early portrait / personal archive",
      width: 900,
      height: 900,
    },
    {
      src: "/images/archive/sayuru-garden-profile.webp",
      alt: "Sayuru Akash Amarasinghe outdoors during his university years",
      caption: "University years / personal archive",
      width: 1600,
      height: 899,
    },
    {
      src: "/images/archive/sayuru-brick-portrait.webp",
      alt: "Sayuru Akash Amarasinghe photographed against a painted brick wall",
      caption: "Portrait study / personal archive",
      width: 1800,
      height: 1013,
    },
  ],
};

/**
 * Skills section categories with Bento grid sizing
 */
export const skillCategories: SkillCategory[] = [
  {
    id: "development",
    title: "Development",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "MongoDB",
      "GraphQL",
      "REST APIs",
      "Git",
    ],
    gridSize: "large",
  },
  {
    id: "design",
    title: "Design",
    skills: [
      "UI/UX Design",
      "Figma",
      "Adobe XD",
      "Prototyping",
      "Design Systems",
      "Responsive Design",
      "Animation",
    ],
    gridSize: "medium",
  },
  {
    id: "music-production",
    title: "Music Production",
    skills: [
      "FL Studio",
      "Ableton Live",
      "Audio Engineering",
      "Mixing & Mastering",
      "Sound Design",
      "Composition",
    ],
    gridSize: "medium",
  },
  {
    id: "content-writing",
    title: "Content Writing",
    skills: [
      "Technical Writing",
      "Blog Posts",
      "Documentation",
      "Copywriting",
      "SEO Writing",
      "Content Strategy",
    ],
    gridSize: "small",
  },
  {
    id: "investment",
    title: "Investment",
    skills: [
      "Cryptocurrency",
      "Blockchain Technology",
      "Market Analysis",
      "Portfolio Management",
      "Risk Assessment",
    ],
    gridSize: "small",
  },
];

/**
 * Projects section portfolio items
 */
export const projects: Project[] = [
  {
    id: "codezela-technologies",
    title: "Codezela Technologies",
    description:
      "The company I lead for software, web systems, and product interfaces. The work is practical: define the surface, build the stack, ship the release, keep it maintainable.",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "PostgreSQL",
      "AWS",
      "Docker",
    ],
    role: "Founder & CEO",
    aspectRatio: "16/9",
    imageUrl: "/images/work-codezela.svg",
  },
  {
    id: "portfolio-platform",
    title: "Portfolio Platform",
    description:
      "The personal surface you are looking at: identity, work, writing, and motion experiments compressed into one fast Next.js build.",
    technologies: [
      "Next.js 16",
      "Motion (Framer Motion v12)",
      "Tailwind CSS v4",
      "TypeScript",
    ],
    role: "Full-stack Developer & Designer",
    aspectRatio: "4/3",
    imageUrl: "/images/work-portfolio.svg",
  },
  {
    id: "music-production",
    title: "Music Production Portfolio",
    description:
      "Original production, arrangement, mixing, and texture work. A place for finished tracks, unfinished loops, and the small audio ideas that later become something larger.",
    technologies: ["FL Studio", "Ableton Live", "Audio Engineering"],
    role: "Musical Artist & Producer",
    aspectRatio: "1/1",
    imageUrl: "/images/work-music.svg",
  },
  {
    id: "web-design-projects",
    title: "Web Design Projects",
    description:
      "Interface studies and client builds where the design is judged by spacing, hierarchy, responsiveness, and whether the implementation still feels clean.",
    technologies: ["Figma", "Adobe XD", "React", "Tailwind CSS"],
    role: "Web Designer & Front End Developer",
    aspectRatio: "16/9",
    imageUrl: "/images/work-design.svg",
  },
  {
    id: "content-writing",
    title: "Technical Content Writing",
    description:
      "Technical notes and product writing for the parts of software that should not need a meeting to understand.",
    technologies: ["Markdown", "Technical Writing", "SEO"],
    role: "Content Writer",
    aspectRatio: "4/3",
    imageUrl: "/images/work-writing.svg",
  },
];

/**
 * Contact section social links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: "LinkedIn",
    url: "https://linkedin.com/in/sayuruakash",
    handle: "@sayuruakash",
  },
  {
    platform: "Facebook",
    url: "https://facebook.com/sayuru.s",
    handle: "sayuru.s",
  },
  {
    platform: "X",
    url: "https://x.com/sayuru_akash",
    handle: "@sayuru-akash",
  },
  {
    platform: "Instagram",
    url: "https://instagram.com/sayuru_akash",
    handle: "@sayuruakash",
  },
  {
    platform: "TikTok",
    url: "https://tiktok.com/@sayuru_akash",
    handle: "@sayuru_akash",
  },
  {
    platform: "GitHub",
    url: "https://github.com/sayuru-akash",
    handle: "@sayuru-akash",
  },
  {
    platform: "Telegram",
    url: "https://t.me/sayuruakash_channel",
    handle: "sayuruakash_channel",
  },
];

/**
 * Contact section content
 */
export const contactContent: ContactContent = {
  email: "contact@sayuru.me",
  socialLinks,
  ctaText: "For software, product design, music, or something between them.",
};

export const contactTopics = [
  "Software / product",
  "Web design",
  "Music / sound",
  "Writing / other",
] as const;

export const privacyPolicySections: PrivacyPolicySection[] = [
  {
    id: "scope",
    title: "Scope",
    paragraphs: [
      "This policy explains how information is handled when you visit sayuru.me, use its contact tools, or follow links from the site. It applies to this personal website and not to services operated by Codezela Technologies or other third parties.",
    ],
  },
  {
    id: "information",
    title: "Information handled",
    paragraphs: [
      "The website does not provide user accounts, checkout, payments, social login, or public comments. When you use the contact form, the name, email address, topic, and message you enter are submitted to the website and delivered as an email.",
      "The hosting platform, Cloudflare Turnstile, and network providers may process standard technical records needed to deliver and protect the site, such as an IP address, browser type, requested URL, approximate region, timestamp, and security signals.",
    ],
    bullets: [
      "Information you choose to send by email, including your name, email address, and message.",
      "Basic server, delivery, and security logs created by the hosting infrastructure.",
      "No sensitive personal information is intentionally requested through the website.",
    ],
  },
  {
    id: "use",
    title: "How information is used",
    paragraphs: [
      "Information is used only to operate and secure the website, respond to messages, understand and resolve technical issues, and meet applicable legal obligations. Personal information is not sold or rented.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and local storage",
    paragraphs: [
      "The current website does not set advertising cookies and does not include a first-party analytics tracker. Essential infrastructure providers may use limited technical mechanisms for security, routing, abuse prevention, or performance. If analytics or other non-essential tracking is introduced, this policy and any consent controls will be updated before that collection begins.",
    ],
  },
  {
    id: "sharing",
    title: "Service providers and disclosure",
    paragraphs: [
      "Information may be processed by infrastructure providers that host, deliver, or protect the website. Cloudflare Turnstile helps detect automated abuse, and Resend delivers contact form messages to contact@sayuru.me. Information may also be disclosed when required by law, to protect legal rights, or to investigate abuse and security incidents.",
    ],
  },
  {
    id: "retention",
    title: "Retention",
    paragraphs: [
      "Messages are retained only for as long as they are useful for the conversation, professional record-keeping, security, or legal obligations. Infrastructure logs are retained according to the relevant provider's operational and security schedules.",
    ],
  },
  {
    id: "rights",
    title: "Your choices and rights",
    paragraphs: [
      "Depending on where you live, you may have rights to request access, correction, deletion, restriction, or a copy of personal information, and to object to certain processing. You may contact Sayuru using the email below. Identity may need to be verified before a request is completed.",
    ],
  },
  {
    id: "security",
    title: "Security and international processing",
    paragraphs: [
      "Reasonable technical and organisational measures are used to protect the website and communications. No internet service can guarantee absolute security. Hosting and email providers may process information in countries other than your own under their applicable safeguards.",
    ],
  },
  {
    id: "external",
    title: "External links",
    paragraphs: [
      "The website links to social networks, GitHub, Codezela Technologies, and other third-party services. Their privacy practices and content are governed by their own policies. Opening those links leaves sayuru.me.",
    ],
  },
  {
    id: "children",
    title: "Children",
    paragraphs: [
      "This website is a general personal and professional portfolio. It is not directed to children and does not knowingly collect personal information from children through an account or registration service.",
    ],
  },
  {
    id: "updates",
    title: "Updates and contact",
    paragraphs: [
      "This policy may be revised when the website, its providers, or legal requirements change. The current version will always be published on this page with its effective date.",
      "For privacy questions or requests, email contact@sayuru.me.",
    ],
  },
];

/**
 * Complete portfolio content export
 */
export const portfolioContent: PortfolioContent = {
  hero: heroContent,
  about: aboutContent,
  skills: skillCategories,
  projects,
  contact: contactContent,
};

/**
 * Default export for convenience
 */
export default portfolioContent;
