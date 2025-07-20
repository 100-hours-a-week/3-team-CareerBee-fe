'use client';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { useDownload } from '@/src/features/resume/download/model/useDownload';

export const AILoading = () => {
  const { isLoading } = useDownload();
  return (
    <>
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex justify-center items-center bg-black/20">
          <DotLottieReact src="/animation/AI-loading.lottie" loop autoplay className="h-72 z-50" />
          <div className="absolute mt-24 text-lg font-black text-white">이력서 생성 중...</div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default AILoading;
