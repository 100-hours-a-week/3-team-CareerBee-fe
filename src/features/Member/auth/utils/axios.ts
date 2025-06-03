import axios, { AxiosError } from 'axios';

import { retryWithRefreshedToken, forceLogout } from '@/features/Member/auth/utils/authManager';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // .env
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

const isTokenExpired = (res: AxiosError): boolean => {
  const status = res.response?.status;
  const data = res.response?.data as { message?: string };
  return status === 401 && (data?.message?.includes('만료') ?? false);
};

const shouldForceLogout = (res: AxiosError): boolean => {
  const status = res.response?.status;
  const data = res.response?.data as { message?: string };
  return (
    [409, 404].includes(status as number) &&
    ['리프레시 토큰', '존재하지 않는 회원'].some((msg) => data?.message?.includes(msg))
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
