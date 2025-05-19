import axios from 'axios';
import { useAuthStore } from '@/store/auth';
import { publishErrorToast } from '@/lib/errorEvents'
// import { useToast } from '@/hooks/useToast';


export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // .env
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});


instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const res = error.response;
    // console.log(res?.status);
    if (res?.status === 400 || res?.status === 401) {
      const message = res?.data?.message;
      const status=res.data.httpStatusCode;
      // console.log(res.data.httpStatusCode);
      if(status===404){
        const message = res?.data?.message;
  
        // 1️⃣ 로그아웃 케이스
        if (message?.includes("로그아웃")) {
          error.code = "LOGGED_OUT";
          publishErrorToast("로그아웃되었습니다. 다시 로그인 해주세요.");
          // toast({title: "로그아웃되었습니다. 다시 로그인 해주세요."});
          console.log('🔑 로그아웃됨');
          useAuthStore.getState().clearToken();
          return Promise.reject(error);
        }
      }
      
      // 2️⃣ 토큰 만료 케이스
      else if (message?.match("만료된 토큰입니다.")) {
        console.log('🔑 토큰 만료됨');
        let retryCount = 0;
        while (retryCount < 3) {
          try {
            const refreshResponse = await axios.post(
              `${import.meta.env.VITE_API_URL}/api/v1/auth/reissue`,
              null,
              { withCredentials: true }
            );
            const newToken = refreshResponse.data.data.newAccessToken;
            useAuthStore.getState().setToken(newToken);

            console.log('🔑 토큰 재발급 성공');

            const originalRequest = error.config;
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            
            return axios(originalRequest);
          } catch (err) {
            console.error("🔑 토큰 재발급 실패", err);
            retryCount++;
            if (retryCount >= 3) {
              // 너무 많이 실패하면 로그아웃 처리
              if (!res) {
                // 네트워크 오류 (서버 응답 없음)
                publishErrorToast("네트워크 문제입니다. 다시 시도해 주세요.");
                // toast({title: "네트워크 문제입니다. 다시 시도해 주세요."});
                return Promise.reject(err);
              } else if (res.status === 401 || res.status === 403) {
                // 재로그인 유도
                publishErrorToast("다시 로그인해주세요 ㅠㅜ");
                // toast({title: "다시 로그인해주세요 ㅠㅜ"});
                useAuthStore.getState().clearToken();
                window.location.href = "/login";
              }
            }
          }
        }
      }
    }

    return Promise.reject(error);
  }
);