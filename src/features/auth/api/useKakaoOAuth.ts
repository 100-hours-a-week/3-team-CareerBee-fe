'use client';

import { useEffect } from 'react';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safePost } from '@/src/shared/api/request';
import { toast } from '@/src/shared/model/useToast';
import { useQueryClient } from '@tanstack/react-query';

export function useKakaoOAuth() {
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
            setToken(res.data.accessToken);
            queryClient.removeQueries({ queryKey: ['userInfo'] });
            queryClient.invalidateQueries({ queryKey: ['userInfo'] });
            window.location.href = '/';
          }
        } catch (error: any) {
          if (error.response?.data?.httpStatusCode === 410) {
            toast({ title: '탈퇴한 회원입니다', variant: 'destructive' });
            setTimeout(() => {
              window.location.href = '/';
            }, 2000);
          }
        }
      })();
    } else {
      console.error('❌ No token found in URL');
      window.location.href = '/login';
    }
  }, [setToken, queryClient]);
}
