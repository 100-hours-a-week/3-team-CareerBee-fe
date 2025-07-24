import Seo from '@/src/shared/lib/Seo';

export default function Head() {
  return (
    <>
      <Seo />
      <link
        rel="preload"
        href="/fonts/pretendard/PretendardVariable.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />
    </>
  );
}
