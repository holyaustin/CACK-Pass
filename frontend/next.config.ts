// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,

  // ✅ Completely remove `experimental: { serverExternalPackages }`
  // No Webpack, no hacks
};

export default nextConfig;