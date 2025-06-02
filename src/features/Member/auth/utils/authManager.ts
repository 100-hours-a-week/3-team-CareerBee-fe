import { AxiosRequestConfig } from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { instance as axios } from '@/features/Member/auth/utils/axios';
import { toast } from '@/hooks/useToast';

export async function retryWithRefreshedToken(config: AxiosRequestConfig) {
  try {
    const res = await axios.post('/api/v1/auth/reissue', null, {
      withCredentials: true,
    });
    const newToken = res.data.data.newAccessToken;
    useAuthStore.getState().setToken(newToken);
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${newToken}`;
    return axios(config);
  } catch (e) {
    forceLogout('세션이 만료되었습니다. 다시 로그인 해주세요.');
    return Promise.reject(e);
  }
}

export function forceLogout(message?: string) {
  toast({ title: message ?? '로그아웃 되었습니다.' });
  useAuthStore.getState().clearToken();
  setTimeout(() => {
    window.location.href = '/login';
  }, 3000);
}
