import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.mchose.store',
        port: '',
        pathname: '/**',
      },
      // Add more hostnames as needed for other keyboard images
    ],
  },
};

export default nextConfig;