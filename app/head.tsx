export default function Head() {
  return (
    <>
      {/* Google Analytics */}
      <script async src="https://www.googletagmanager.com/gtag/js?id=G-9WM6MNGPP8" />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-9WM6MNGPP8');
          `,
        }}
      />
    </>
  );
}
