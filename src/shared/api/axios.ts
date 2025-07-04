import axios, { AxiosResponse } from 'axios';

import { retryWithRefreshedToken, forceLogout } from '@/src/entities/auth/lib/authManager';

export const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL, // .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// POST 중복 요청 방지
const pendingPosts = new Set<string>();

const clearPendingPost = (config?: any) => {
  if (config?.method === 'post') {
    pendingPosts.delete(config.url!);
  }
};

const isTokenExpired = (res: AxiosResponse): boolean => {
  const status = res?.status;
  const message = (res?.data as { message?: string })?.message;
  return status === 401 && (message?.includes('만료') ?? false);
};

const shouldForceLogout = (res: AxiosResponse): boolean => {
  const status = res?.status;
  const message = (res?.data as { message?: string })?.message;
  return (
    [409, 404].includes(status as number) &&
    ['리프레시 토큰', '존재하지 않는 회원'].some((msg) => message?.includes(msg))
  );
};

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
    clearPendingPost(response.config);
    return response;
  },
  async (error) => {
    clearPendingPost(error.config);
    const res = error.response;

    if (isTokenExpired(res)) {
      return retryWithRefreshedToken(error.config);
    } else if (shouldForceLogout(res)) {
      forceLogout();
    }

    return Promise.reject(error);
  },
);
