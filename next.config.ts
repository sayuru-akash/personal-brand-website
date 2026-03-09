import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sayuru.me",
      },
    ],
  },
};

export default nextConfig;
