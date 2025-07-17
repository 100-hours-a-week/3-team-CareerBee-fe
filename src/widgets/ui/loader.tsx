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

export const AILoading = ({ title }: { title: string }) => {
  return (
    <div className="top-0 left-0 h-full w-full z-50 flex flex-col justify-center items-center overflow-hidden">
      <DotLottieReact src="/animation/AI-loading.lottie" loop autoplay className="h-72 z-50" />
      <div className="-mt-24 text-lg font-bold text-black">{title}</div>
    </div>
  );
};
