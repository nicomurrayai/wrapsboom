import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  outputFileTracingRoot: process.cwd(),
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.lacartaa.com",
      },
      {
        protocol: "https",
        hostname: "tvqzwrzwaadgbcczjmqs.supabase.co",
      },
    ],
  },
};

export default nextConfig;
