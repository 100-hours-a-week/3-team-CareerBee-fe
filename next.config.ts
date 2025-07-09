import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    domains: [
      'board.jinhak.com',
      'imgorg.catch.co.kr',
      'storage.googleapis.com'
    ],
  },
  async headers() {
    return [
      {
        source: '/_next/static/media/:all*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default nextConfig;
