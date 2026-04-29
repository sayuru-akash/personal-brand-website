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
  subtitle: 'Building digital experiences with code and creativity',
};

/**
 * About section biographical content
 */
export const aboutContent: AboutContent = {
  bio: 'A multi-talented full-stack developer, startup founder, and musical artist from Colombo, Sri Lanka. Currently pursuing Software Engineering at Plymouth University, UK, while leading Codezela Technologies as CEO. Passionate about creating exceptional digital experiences that blend technical excellence with creative vision.',
  roles: [
    'Full-stack Developer',
    'Start-up Founder',
    'Musical Artist',
    'CEO @ Codezela Technologies',
    'Front End Developer',
    'Web Designer',
    'Content Writer',
    'Investor',
  ],
  traits: [
    'Coffee enthusiast',
    'Tech lover',
    'Crypto holder',
    'Music addict',
    'Netflix fan',
    'Android enthusiast',
  ],
  location: 'Colombo, Sri Lanka',
  education: 'Software Engineering, Plymouth University, UK',
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
      'A technology startup focused on delivering innovative software solutions and digital experiences. Leading a team of developers and designers to create cutting-edge web applications and mobile solutions for clients worldwide.',
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
  },
  {
    id: 'portfolio-platform',
    title: 'Portfolio Platform',
    description:
      'An animated portfolio showcase featuring advanced scroll animations, parallax effects, and micro-interactions. Built with Japanese minimalist design principles and modern web motion choreography.',
    technologies: [
      'Next.js 16',
      'Motion (Framer Motion v12)',
      'Tailwind CSS v4',
      'TypeScript',
    ],
    role: 'Full-stack Developer & Designer',
    aspectRatio: '4/3',
  },
  {
    id: 'music-production',
    title: 'Music Production Portfolio',
    description:
      'A collection of original music productions spanning multiple genres. Showcasing expertise in audio engineering, mixing, mastering, and sound design.',
    technologies: ['FL Studio', 'Ableton Live', 'Audio Engineering'],
    role: 'Musical Artist & Producer',
    aspectRatio: '1/1',
  },
  {
    id: 'web-design-projects',
    title: 'Web Design Projects',
    description:
      'A series of web design projects featuring modern UI/UX principles, responsive layouts, and engaging user experiences. Focus on clean aesthetics and intuitive navigation.',
    technologies: ['Figma', 'Adobe XD', 'React', 'Tailwind CSS'],
    role: 'Web Designer & Front End Developer',
    aspectRatio: '16/9',
  },
  {
    id: 'content-writing',
    title: 'Technical Content Writing',
    description:
      'Technical articles, blog posts, and documentation covering software development, web technologies, and digital trends. Focus on clear, accessible explanations of complex topics.',
    technologies: ['Markdown', 'Technical Writing', 'SEO'],
    role: 'Content Writer',
    aspectRatio: '4/3',
  },
];

/**
 * Contact section social links
 */
export const socialLinks: SocialLink[] = [
  {
    platform: 'GitHub',
    url: 'https://github.com/sayuruakash',
    handle: '@sayuruakash',
  },
  {
    platform: 'LinkedIn',
    url: 'https://linkedin.com/in/sayuruakash',
    handle: '@sayuruakash',
  },
  {
    platform: 'Twitter',
    url: 'https://twitter.com/sayuruakash',
    handle: '@sayuruakash',
  },
  {
    platform: 'Instagram',
    url: 'https://instagram.com/sayuruakash',
    handle: '@sayuruakash',
  },
];

/**
 * Contact section content
 */
export const contactContent: ContactContent = {
  email: 'hello@sayuruakash.com',
  socialLinks,
  ctaText: "Let's create something exceptional together",
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
