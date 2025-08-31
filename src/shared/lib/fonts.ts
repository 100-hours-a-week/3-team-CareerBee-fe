import localFont from 'next/font/local';

export const pretendard = localFont({
  src: [
    {
      path: '../../../public/fonts/pretendard/PretendardVariable.woff2',
      weight: '45 920',
      style: 'normal',
    },
  ],
  display: 'swap',
  variable: '--font-pretendard',
});

export const riaSans = localFont({
  src: [
    {
      path: '../../../public/fonts/ria-sans/RiaSans-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../../public/fonts/ria-sans/RiaSans-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  preload: false,
  variable: '--font-ria',
});
