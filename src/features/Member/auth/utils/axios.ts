import axios from 'axios';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { publishErrorToast } from '@/lib/errorEvents';

import { retryWithRefreshedToken } from '@/features/Member/auth/utils/authManager';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// POST 중복 요청 방지
const pendingPosts = new Set<string>();

instance.interceptors.request.use((config) => {
  if (config.method === 'post') {
    const key = config.url!;
    if (pendingPosts.has(key)) {
      return Promise.reject(new axios.Cancel(`중복 POST 메서드 제거: ${key}`));
    }
    pendingPosts.add(key);
  }
  return config;
});

instance.interceptors.response.use(
  (response) => {
    if (response.config.method === 'post') {
      pendingPosts.delete(response.config.url!);
    }
    return response;
  },
  async (error) => {
    if (error.config?.method === 'post') {
      pendingPosts.delete(error.config.url!);
    }
    const res = error.response;
    const message = res?.data?.message;

    if (res?.status === 401 && message?.inclues('만료')) {
      return retryWithRefreshedToken(error.config);
    } else if (res?.status === 409 || res?.status === 404) {
      const message = res?.data?.message;
      if (message?.includes('리프레시 토큰') || message?.includes('존재하지 않는 회원')) {
        publishErrorToast('로그아웃되었습니다. 다시 로그인 해주세요.');
        useAuthStore.getState().clearToken();
        setTimeout(() => {
          window.location.href = '/login';
        }, 3000);
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  },
);
