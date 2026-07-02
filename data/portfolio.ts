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
} from '@/types/portfolio';

/**
 * Hero section content
 */
export const heroContent: HeroContent = {
  name: 'Sayuru Akash Amarasinghe',
  nameJapanese: 'サユル アーカーシュ',
  role: 'Full-stack Developer & Musical Artist',
  roles: [
    'Musical Artist',
    'Full-stack Developer',
    'Web Designer',
    'Content Writer',
    'Investor',
  ],
  subtitle:
    'I make web products, studio systems, and music from Western Sri Lanka.',
  signalTags: [
    'Coffee maniac',
    'Team Android',
    'Tech enthusiast',
    'Crypto holder',
    'Music addict',
    'Netflix lover',
  ],
};

/**
 * About section biographical content
 */
export const aboutContent: AboutContent = {
  bio: 'I run Codezela Technologies, build with Next.js and TypeScript, write the notes that make systems usable, and keep a parallel practice in music production. I studied Software Engineering through Plymouth University and still prefer work that moves from rough sketch to shipped thing without losing taste.',
  roles: [
    'Full-stack Developer',
    'Musical Artist',
    'CEO @ Codezela Technologies',
    'Content Writer',
    'Investor',
  ],
  traits: [
    'Coffee maniac',
    'Team Android',
    'Tech enthusiast',
    'Music addict',
    'Crypto holder',
    'Netflix lover',
  ],
  location: 'Colombo, Sri Lanka',
  education: 'BSc Software Engineering, Plymouth University, UK',
};

/**
 * Skills section categories with Bento grid sizing
 */
export const skillCategories: SkillCategory[] = [
  {
    id: 'development',
    title: 'Development',
    skills: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'Python',
      'PostgreSQL',
      'MongoDB',
      'GraphQL',
      'REST APIs',
      'Git',
    ],
    gridSize: 'large',
  },
  {
    id: 'design',
    title: 'Design',
    skills: [
      'UI/UX Design',
      'Figma',
      'Adobe XD',
      'Prototyping',
      'Design Systems',
      'Responsive Design',
      'Animation',
    ],
    gridSize: 'medium',
  },
  {
    id: 'music-production',
    title: 'Music Production',
    skills: [
      'FL Studio',
      'Ableton Live',
      'Audio Engineering',
      'Mixing & Mastering',
      'Sound Design',
      'Composition',
    ],
    gridSize: 'medium',
  },
  {
    id: 'content-writing',
    title: 'Content Writing',
    skills: [
      'Technical Writing',
      'Blog Posts',
      'Documentation',
      'Copywriting',
      'SEO Writing',
      'Content Strategy',
    ],
    gridSize: 'small',
  },
  {
    id: 'investment',
    title: 'Investment',
    skills: [
      'Cryptocurrency',
      'Blockchain Technology',
      'Market Analysis',
      'Portfolio Management',
      'Risk Assessment',
    ],
    gridSize: 'small',
  },
];

/**
 * Projects section portfolio items
 */
export const projects: Project[] = [
  {
    id: 'codezela-technologies',
    title: 'Codezela Technologies',
    description:
      'The company I lead for software, web systems, and product interfaces. The work is practical: define the surface, build the stack, ship the release, keep it maintainable.',
    technologies: [
      'Next.js',
      'React',
      'TypeScript',
      'Node.js',
      'PostgreSQL',
      'AWS',
      'Docker',
    ],
    role: 'Founder & CEO',
    aspectRatio: '16/9',
    imageUrl: '/images/work-codezela.svg',
  },
  {
    id: 'portfolio-platform',
    title: 'Portfolio Platform',
    description:
      'The personal surface you are looking at: identity, work, writing, and motion experiments compressed into one fast Next.js build.',
    technologies: [
      'Next.js 16',
      'Motion (Framer Motion v12)',
      'Tailwind CSS v4',
      'TypeScript',
    ],
    role: 'Full-stack Developer & Designer',
    aspectRatio: '4/3',
    imageUrl: '/images/work-portfolio.svg',
  },
  {
    id: 'music-production',
    title: 'Music Production Portfolio',
    description:
      'Original production, arrangement, mixing, and texture work. A place for finished tracks, unfinished loops, and the small audio ideas that later become something larger.',
    technologies: ['FL Studio', 'Ableton Live', 'Audio Engineering'],
    role: 'Musical Artist & Producer',
    aspectRatio: '1/1',
    imageUrl: '/images/work-music.svg',
  },
  {
    id: 'web-design-projects',
    title: 'Web Design Projects',
    description:
      'Interface studies and client builds where the design is judged by spacing, hierarchy, responsiveness, and whether the implementation still feels clean.',
    technologies: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS'],
    role: 'Web Designer & Front End Developer',
    aspectRatio: '16/9',
    imageUrl: '/images/work-design.svg',
  },
  {
    id: 'content-writing',
    title: 'Technical Content Writing',
    description:
      'Technical notes and product writing for the parts of software that should not need a meeting to understand.',
    technologies: ['Markdown', 'Technical Writing', 'SEO'],
    role: 'Content Writer',
    aspectRatio: '4/3',
    imageUrl: '/images/work-writing.svg',
  },
];

/**
 * Contact section social links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/sayuruakash',
    handle: '@sayuruakash',
  },
  {
    platform: 'Facebook',
    url: 'https://facebook.com/sayuru.s',
    handle: 'sayuru.s',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/sayuru_akash',
    handle: '@sayuruakash',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/sayuru_akash',
    handle: '@sayuruakash',
  },
  {
    platform: 'TikTok',
    url: 'https://tiktok.com/@sayuru_akash',
    handle: '@sayuru_akash',
  },
  {
    platform: 'GitHub',
    url: 'https://github.com/sayuru-akash',
    handle: '@sayuruakash',
  },
  {
    platform: 'Telegram',
    url: 'https://t.me/sayuruakash_channel',
    handle: 'sayuruakash_channel',
  },
];

/**
 * Contact section content
 */
export const contactContent: ContactContent = {
  email: 'contact@sayuru.me',
  socialLinks,
  ctaText: 'For software, product design, music, or something between them.',
};

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
