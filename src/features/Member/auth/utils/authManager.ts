import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { toast } from '@/hooks/useToast';
import { queryClient } from '@/lib/react-query-client';
import originAxios, { AxiosError } from 'axios';

export async function retryWithRefreshedToken(config: AxiosRequestConfig) {
  const MAX_RETRIES = 2;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await axios.post('/api/v1/auth/reissue', null, {
        withCredentials: true,
      });
      const newToken = res.data.data.newAccessToken;
      useAuthStore.getState().setToken(newToken);
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${newToken}`,
      };
      return originAxios(config);
    } catch (e: unknown) {
      if (originAxios.isCancel(e)) {
        continue;
      }

      const status = (e as AxiosError)?.response?.status;
      if ((status && status < 500) || (!originAxios.isCancel(e) && attempt >= 1)) {
        forceLogout();
        return Promise.reject(e);
      }

      // 재시도
      if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000));
      } else {
        return Promise.reject(e);
      }
    }
  }

  return Promise.reject(new Error('Maximum reissue attempts reached'));
}
export function forceLogout() {
  toast({ title: '로그아웃 되었습니다.' });
  useAuthStore.getState().clearToken();
  useCompetitionStore.getState().clearCompetition();
  queryClient.removeQueries({ queryKey: ['userInfo'] });
  setTimeout(() => {
    window.location.href = '/login';
  }, 3000);
}
