import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    // serve AVIF where supported (much smaller than WebP for photos), falling back to WebP
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      // ambassador headshots in Supabase Storage
      {
        protocol: 'https',
        hostname: '*.supabase.co',
        pathname: '/storage/v1/object/public/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-sjc3-1.cdninstagram.com',
      },
      {
        protocol: 'https',
        hostname: 'graph.instagram.com',
      },
      {
        protocol: 'https',
        hostname: '**.cdninstagram.com',
      },
    ],
  },
};

export default nextConfig;
