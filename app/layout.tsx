import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { AppFrame } from '@/src/app/ui/AppLayout';
import { Providers } from '@/src/app/ui/Providers';

import React from 'react';
import type { Metadata } from 'next';

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
        <Providers>
          <AppFrame>{children}</AppFrame>
        </Providers>
      </body>
    </html>
  );
}
