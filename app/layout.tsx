import './globals.css';

import { AppLayout } from '@/src/app/ui/AppLayout';
import { Providers } from '@/src/app/ui/Providers';
import GoogleAnalytics from '@/src/shared/lib/GoogleAnalytics';
import Seo from '@/src/shared/lib/Seo';

import React from 'react';
import Script from 'next/script';

const kakaoKey = process.env.NEXT_PUBLIC_KAKAOMAP_KEY;

if (!kakaoKey) {
  throw new Error('Kakao Map Key is missing!');
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Seo />
      <body className="antialiased">
        {process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS && (
          <GoogleAnalytics googleAnalyticsId={process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS} />
        )}
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${kakaoKey}&autoload=false&libraries=clusterer,drawing`}
          strategy="beforeInteractive"
        />
        <Providers>
          <AppLayout>{children}</AppLayout>
        </Providers>
      </body>
    </html>
  );
}
