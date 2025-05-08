import axios from 'axios';
import { authStore } from '@/store/auth';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env 파일에 설정
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => {
    console.log("api");
    return response},
  (error) => {
    const res = error.response;
    const logoutMessage = res?.data?.message;

    if (
      res?.status === 401 || 
      logoutMessage?.includes("로그아웃") || 
      logoutMessage?.includes("다시 로그인")
    ) {
      console.warn('자동 로그아웃 처리됨 (토큰 만료 또는 세션 종료)');
      authStore.getState().clearToken();
    }
    else{
      console.log("idontknow")
    }

    return Promise.reject(error);
  }
);