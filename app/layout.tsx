import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AppLayout } from '@/src/app/ui/AppLayout';
import { Providers } from '@/src/app/ui/Providers';

import React from 'react';
import type { Metadata } from 'next';
import Script from 'next/script';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CareerBee - IT 커리어 지도',
  description: 'IT 구직자를 위한 커리어 시각화 플랫폼 CareerBee',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAOMAP_KEY}&autoload=false&libraries=clusterer,drawing`}
          strategy="beforeInteractive"
        />
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
