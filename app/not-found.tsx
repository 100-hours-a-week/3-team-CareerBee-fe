'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <DotLottieReact src="/animation/404.lottie" loop autoplay className=" h-36 z-50" />
      <h1 className="text-4xl font-bold my-4">404 - Not Found</h1>
      <p className="text-lg">죄송합니다. 요청하신 페이지를 찾을 수 없습니다.</p>
    </div>
  );
}
