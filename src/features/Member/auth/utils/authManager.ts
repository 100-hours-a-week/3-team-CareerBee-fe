import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { toast } from '@/hooks/useToast';
import { queryClient } from '@/lib/react-query-client';
import originAxios, { AxiosError } from 'axios';

export async function retryWithRefreshedToken(config: AxiosRequestConfig) {
  try {
    const res = await originAxios.post(
      `${import.meta.env.VITE_API_URL}/api/v1/auth/reissue`,
      null,
      {
        withCredentials: true,
      },
    );
    const newToken = res.data.data.newAccessToken;
    useAuthStore.getState().setToken(newToken);
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${newToken}`,
    };
    return originAxios(config);
  } catch (e: unknown) {
    const status = (e as AxiosError)?.response?.status;
    if (status && status < 500 && !originAxios.isCancel(e)) {
      await forceLogout();
      return Promise.reject(e);
    } else {
      return Promise.reject(e);
    }
  }
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
