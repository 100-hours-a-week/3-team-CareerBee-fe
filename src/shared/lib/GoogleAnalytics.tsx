import Script from 'next/script';

export default function GoogleAnalytics({ googleAnalyticsId }: { googleAnalyticsId: string }) {
  return (
    <>
      <Script async src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`} />
      <Script
        id="google-analytics"
        dangerouslySetInnerHTML={{
          __html: `
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', '${googleAnalyticsId}');
		`,
        }}
      />
    </>
  );
}
