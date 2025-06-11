import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { toast } from '@/hooks/useToast';
import { queryClient } from '@/lib/react-query-client';
import originAxios, { AxiosError } from 'axios';

export async function retryWithRefreshedToken(config: AxiosRequestConfig) {
  const MAX_RETRIES = 2;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await originAxios.post('/api/v1/auth/reissue', null, {
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
        await forceLogout();
        return Promise.reject(e);
      } else if (attempt < MAX_RETRIES) {
        await new Promise((r) => setTimeout(r, 1000));
      } else {
        return Promise.reject(e);
      }
    }
  }

  return Promise.reject(new Error('Maximum reissue attempts reached'));
}

export async function forceLogout() {
  toast({ title: '로그아웃 되었습니다.' });

  try {
    useAuthStore.getState().clearToken();
    useCompetitionStore.getState().clearCompetition();

    await queryClient.cancelQueries();
    await queryClient.removeQueries({ queryKey: ['userInfo'] });
  } catch (err) {
    console.error('로그아웃 중 예외 발생:', err);
  }

  await new Promise((resolve) => setTimeout(resolve, 3000));
  window.location.replace('/login');
}
