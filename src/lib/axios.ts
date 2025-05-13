import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { publishErrorToast } from '@/lib/errorEvents'

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = useAuthStore.getState().token;
    // if(!token){
    //   window.location.href="/login";
    // }

    const res = error.response;
    console.log(res?.status);
    if (res?.status === 400) {
      const message = res?.data?.message;
      const status=res.data.httpStatusCode;
      console.log(res.data.httpStatusCode);
      if(status===404){
        const message = res?.data?.message;
  
        // 1️⃣ 로그아웃 케이스
        if (message?.includes("로그아웃")) {
          error.code = "LOGGED_OUT";
          publishErrorToast("세션이 만료되었습니다. 다시 로그인 해주세요.");
          console.log('🔑 로그아웃됨');
          useAuthStore.getState().clearToken();
          return Promise.reject(error);
        }
      }
      
      // 2️⃣ 토큰 만료 케이스
      else if (message?.match("만료된 토큰입니다.")) {
        console.log('🔑 토큰 만료됨');
        try {
          const refreshResponse = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/api/v1/auth/reissue`,
            null,
            { withCredentials: true }
          );
  
          const newToken = refreshResponse.data.data.newAccessToken;
          useAuthStore.getState().setToken(newToken); // 상태 갱신
  
          console.log('🔑 토큰 재발급 성공', newToken)
          // 재요청
          const originalRequest = error.config;
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
  
          return axios(originalRequest);
        } catch (refreshError) {
          console.error("🔑 토큰 재발급 실패", refreshError);
          console.log(token);
          // useAuthStore.getState().clearToken();
          return Promise.reject(refreshError);
        }
      }


    }

    return Promise.reject(error);
  }
);