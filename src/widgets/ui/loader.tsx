'use client';

import '@/src/widgets/assets/loader.css';
import '@/src/widgets/assets/circleLoader.css';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export const Loader = () => {
  return (
    <div className="flex items-center justify-center">
      <div className={`loader`} />
    </div>
  );
};

export const CircleLoader = ({ size = 50 }: { size?: number }) => {
  return (
    <div className="flex items-center justify-center" style={{ width: size, height: size }}>
      <div className="circleLoader" />
    </div>
  );
};

export const AILoading = (title: string) => {
  return (
    <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20">
      <DotLottieReact src="/animation/AI-loading.lottie" loop autoplay className="h-72 z-50" />
      <div className="absolute mt-24 text-lg font-black text-white">title</div>
    </div>
  );
};
