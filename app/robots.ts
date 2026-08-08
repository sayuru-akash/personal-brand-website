import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://sayuru.me/sitemap.xml",
    host: "https://sayuru.me",
  };
}
