import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { toast } from '@/hooks/useToast';
import { queryClient } from '@/lib/react-query-client';
import originAxios from 'axios';

export async function retryWithRefreshedToken(config: AxiosRequestConfig) {
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
  } catch (e) {
    if (!originAxios.isCancel(e)) {
      forceLogout();
    }
    return Promise.reject(e);
  }
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
