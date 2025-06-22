import { Loader } from '@/components/ui/loader';

import { useAuthStore } from '@/features/Member/auth/store/auth';
import { safePost } from '@/lib/request';
import { toast } from '@/hooks/useToast';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect } from 'react';

export default function OAuthCallback() {
  const setToken = useAuthStore((state) => state.setToken);
  const queryClient = useQueryClient();

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('code');

    if (token) {
      (async () => {
        try {
          const res = await safePost('/api/v1/auth/oauth/tokens/kakao', {
            authorizationCode: token,
          });
          if (res) {
            setToken(res.data.accessToken); // ✅ Zustand + persist로 저장됨
            queryClient.removeQueries({ queryKey: ['userInfo'] });
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            window.location.href = '/'; // ✅ 로그인 성공 후 홈으로 이동
          }
        } catch (error: any) {
          if (error.response?.data?.httpStatusCode === 410) {
            toast({ title: '탈퇴한 회원입니다', variant: 'destructive' });

            setTimeout(() => {
              window.location.href = '/';
            }, 3000);
          }
        }
      })();
    } else {
      console.error('❌ No token found in URL');
      window.location.href = '/login'; // ❌ 토큰 없으면 로그인 페이지로
    }
  }, [setToken]);

  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center text-lg font-semibold">
      <Loader />
      <p>로그인 중이에요...</p>
    </div>
  );
}
