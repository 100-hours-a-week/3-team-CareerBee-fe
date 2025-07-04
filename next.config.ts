import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: [
      'board.jinhak.com',
      // 필요하면 다른 도메인도 추가
    ],
  },
};

export default nextConfig;
