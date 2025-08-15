// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
     eslint: {
    ignoreDuringBuilds: true,  // Disables ESLint during builds
  },

  typescript: {
    ignoreBuildErrors: true,  // Optional: skip TypeScript errors during build
  }

  // ✅ Completely remove `experimental: { serverExternalPackages }`
  // No Webpack, no hacks
};

export default nextConfig;