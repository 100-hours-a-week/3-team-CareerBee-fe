import Head from 'next/head';

export const Seo = () => {
  return (
    <Head>
      <title>CareerBee - IT 커리어 지도</title>
      <meta
        name="description"
        content="커리어비는 IT 구직자를 위한 커리어 시각화 플랫폼입니다. 지도 기반 기업 정보, 채용 공고, AI 이력서 생성, 실시간 대회 기능을 제공합니다! 지금 바로 당신의 커리어 여정을 시작해보세요."
      />
      <meta
        name="keywords"
        content="커리어비, IT 취업, AI 코칭, 이력서, 채용 정보, 채용, 대회, IT, 지도, 판교"
      />
      <meta name="author" content="ssammu" />

      <meta name="site:name" content="커리어비" />
      <meta name="site:name:ko" content="커리어비" />
      <meta name="site:name:en" content="CareerBee" />
      <meta property="og:site_name" content="커리어비" />

      {/* Open Graph */}
      <meta property="og:title" content="CareerBee - IT 커리어 지도" />
      <meta property="og:description" content="AI 코칭부터 채용 공고까지, 커리어비에서!" />
      <meta property="og:image" content="https://careerbee.co.kr/images/og-image.png" />
      <meta property="og:url" content="https://careerbee.co.kr" />
      <meta property="og:type" content="website" />

      {/* Twitter 카드 */}
      <meta name="twitter:title" content="CareerBee - IT 커리어 지도" />
      <meta name="twitter:description" content="IT 구직자를 위한 AI 커리어 플랫폼" />
      <meta name="twitter:image" content="https://careerbee.co.kr/images/twitter-image.png" />
      <meta name="twitter:card" content="summary_large_image" />
    </Head>
  );
};

export default Seo;
