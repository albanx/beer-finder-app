import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Force client-side rendering to prevent hydration mismatches
  reactStrictMode: true,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
