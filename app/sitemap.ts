import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date("2026-08-08T00:00:00+05:30");

  return [
    {
      url: "https://sayuru.me/",
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      images: ["https://sayuru.me/images/generated/sayuru-hero-portrait.png"],
    },
    {
      url: "https://sayuru.me/about",
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
      images: [
        "https://sayuru.me/images/archive/sayuru-beach-profile.webp",
        "https://sayuru.me/images/archive/sayuru-window-portrait.webp",
        "https://sayuru.me/images/archive/sayuru-garden-profile.webp",
      ],
    },
    {
      url: "https://sayuru.me/contact",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: "https://sayuru.me/privacy-policy",
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
