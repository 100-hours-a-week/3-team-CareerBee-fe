'use client';

import { Loader } from '@/src/widgets/ui/loader';
import { useKakaoOAuth } from '@/src/features/auth/api/useKakaoOAuth';

export default function Page() {
  useKakaoOAuth();

  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center text-lg font-semibold">
      <Loader />
      <p>로그인 중이에요...</p>
    </div>
  );
}
