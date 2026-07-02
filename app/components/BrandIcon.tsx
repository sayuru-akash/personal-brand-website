"use client";

import type { SimpleIcon } from "simple-icons";
import {
  siBitcoin,
  siDocker,
  siFacebook,
  siFigma,
  siFramer,
  siGit,
  siGithub,
  siGraphql,
  siInstagram,
  siMarkdown,
  siMongodb,
  siNextdotjs,
  siNodedotjs,
  siPostgresql,
  siPython,
  siReact,
  siTelegram,
  siTailwindcss,
  siTiktok,
  siTypescript,
  siVercel,
  siX,
} from "simple-icons";
import {
  Article,
  ChartLineUp,
  Database,
  FileText,
  Globe,
  Graph,
  Headphones,
  IconContext,
  LinkedinLogo,
  type Icon,
  MusicNotes,
  PenNib,
  Plugs,
  Pulse,
  ShieldCheck,
  SlidersHorizontal,
  Sparkle,
  Stack,
  Strategy,
  Waveform,
} from "@phosphor-icons/react";

const iconMap: Record<string, SimpleIcon> = {
  "Next.js": siNextdotjs,
  "Next.js 16": siNextdotjs,
  React: siReact,
  TypeScript: siTypescript,
  "Node.js": siNodedotjs,
  Python: siPython,
  PostgreSQL: siPostgresql,
  MongoDB: siMongodb,
  GraphQL: siGraphql,
  Git: siGit,
  Figma: siFigma,
  "Tailwind CSS": siTailwindcss,
  "Tailwind CSS v4": siTailwindcss,
  Docker: siDocker,
  Vercel: siVercel,
  Markdown: siMarkdown,
  Cryptocurrency: siBitcoin,
  Bitcoin: siBitcoin,
  GitHub: siGithub,
  Facebook: siFacebook,
  Instagram: siInstagram,
  Twitter: siX,
  X: siX,
  Telegram: siTelegram,
  TikTok: siTiktok,
  "Motion (Framer Motion v12)": siFramer,
};

const fallbackIconMap: Record<string, Icon> = {
  "REST APIs": Plugs,
  LinkedIn: LinkedinLogo,
  Linkedin: LinkedinLogo,
  "UI/UX Design": Stack,
  "Adobe XD": PenNib,
  Prototyping: Sparkle,
  "Design Systems": Stack,
  "Responsive Design": Globe,
  Animation: Pulse,
  "FL Studio": MusicNotes,
  "Ableton Live": Waveform,
  "Audio Engineering": Headphones,
  "Mixing & Mastering": SlidersHorizontal,
  "Sound Design": Waveform,
  Composition: MusicNotes,
  "Technical Writing": Article,
  "Blog Posts": PenNib,
  Documentation: FileText,
  Copywriting: PenNib,
  "SEO Writing": ChartLineUp,
  "Content Strategy": Strategy,
  "Blockchain Technology": Graph,
  "Market Analysis": ChartLineUp,
  "Portfolio Management": Database,
  "Risk Assessment": ShieldCheck,
  AWS: Globe,
};

export function hasBrandIcon(name: string) {
  return Boolean(iconMap[name] || fallbackIconMap[name]);
}

export default function BrandIcon({
  name,
  className = "h-5 w-5",
}: {
  name: string;
  className?: string;
}) {
  const icon = iconMap[name];

  if (!icon) {
    const FallbackIcon = fallbackIconMap[name];

    if (FallbackIcon) {
      return (
        <IconContext.Provider value={{ weight: "duotone" }}>
          <FallbackIcon aria-label={name} className={className} />
        </IconContext.Provider>
      );
    }

    return (
      <span
        aria-hidden="true"
        className={`${className} flex items-center justify-center rounded-full border border-current font-code text-[0.55rem] leading-none`}
      >
        {name.slice(0, 2).toUpperCase()}
      </span>
    );
  }

  return (
    <svg
      role="img"
      aria-label={icon.title}
      viewBox="0 0 24 24"
      className={className}
      fill="currentColor"
    >
      <path d={icon.path} />
    </svg>
  );
}
