import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { toast } from '@/hooks/useToast';
import { queryClient } from '@/lib/react-query-client';
import originAxios, { AxiosError } from 'axios';

let isRefreshing = false;
let requestQueue: ((_token: string) => void)[] = [];

export async function retryWithRefreshedToken(config: AxiosRequestConfig) {
  if (isRefreshing) {
    if (config.url?.includes('/auth/reissue')) {
      return Promise.resolve();
    }
    return new Promise((resolve) => {
      requestQueue.push((token: string) => {
        config.headers = {
          ...config.headers,
          Authorization: `Bearer ${token}`,
        };
        resolve(originAxios(config));
      });
    });
  }

  isRefreshing = true;

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

    requestQueue.forEach((cb) => cb(newToken));
    requestQueue = [];
    isRefreshing = false;

    if (config.url?.includes('/auth/reissue')) {
      return Promise.resolve();
    }

    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${newToken}`,
    };
    return originAxios(config);
  } catch (e: unknown) {
    requestQueue = [];
    isRefreshing = false;

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
