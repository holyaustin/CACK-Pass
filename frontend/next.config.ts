// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  swcMinify: true,

  // Webpack configuration
  webpack: (config, { buildId, dev, isServer, defaultLoaders, nextRuntime }) => {
    // Prevents webpack from polyfilling Node.js modules
    config.resolve.fallback = {
      fs: false,
      net: false,
      tls: false,
      path: false,
      os: false,
      crypto: false,
    };

    // Support for WASM modules (if needed)
    config.module.rules.push({
      test: /\.wasm$/,
      type: 'webassembly/async',
    });

    // Important: return the modified config
    return config;
  },

  // Optional: Transpile external libraries (like ZXing)
  transpilePackages: ['@zxing/library', '@zxing/browser'],

  // Enable server components to import outside of app directory
  experimental: {
    serverComponentsExternalPackages: ['@zxing/library', '@zxing/browser'],
  },
};

export default nextConfig;