import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  async redirects() {
    return [
      {
        source: '/ai',
        destination: '/lp/ai-ml',
        permanent: false,
      },
      {
        source: '/aiml',
        destination: '/lp/ai-ml',
        permanent: false,
      },
      {
        source: '/rag',
        destination: '/lp/ai-ml',
        permanent: false,
      }
    ];
  },
};

export default nextConfig;
