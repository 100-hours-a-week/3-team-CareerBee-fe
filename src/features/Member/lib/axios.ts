import axios, { AxiosError } from 'axios';
import { useAuthStore } from '@/features/Member/store/auth';
import { publishErrorToast } from '@/lib/errorEvents'
import { logout } from '@/features/Member/lib/logout';

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
        while (retryCount++ < 1) {
          try {
            // retryCount++;
            const refreshResponse = await instance.post(
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
            // retryCount++;
            const axiosError = err as AxiosError;
            if (retryCount >= 3) {
              // 너무 많이 실패하면 로그아웃 처리
              if (axiosError.status===500) {
                // 네트워크 오류 (서버 응답 없음), 중복 토큰 존재
                publishErrorToast("에러가 발생했습니다. 다시 시도해 주세요.");
                useAuthStore.getState().clearToken();
                window.location.href = "/login";
                // toast({title: "네트워크 문제입니다. 다시 시도해 주세요."});
                return Promise.reject(axiosError);
              } else if (axiosError.status === 401 || axiosError.status === 403) {
                // 재로그인 유도
                publishErrorToast("에러가 발생했습니다. 다시 로그인해주세요 ㅠㅜ");
                setTimeout(() => {
                  logout();
                  useAuthStore.getState().clearToken();
                  // window.location.href = "/login";
                }, 3000);
              }
            }
          }
        }
      }
    }
    else if(res?.status === 409){
      const message = res?.data?.message;
      if(message?.includes("리프레시 토큰")){
        setTimeout(()=>{
          publishErrorToast("로그아웃되었습니다. 다시 로그인 해주세요.");
        },3000)
          // toast({title: "로그아웃되었습니다. 다시 로그인 해주세요."});
        console.log('🔑 로그아웃됨');
        useAuthStore.getState().clearToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }
    else if(res?.status === 404){
      const message = res?.data?.message;
      if(message?.includes("존재하지 않는 회원")){
        setTimeout(()=>{
          publishErrorToast("존재하지 않는 회원입니다. 다시 로그인 해주세요.");
        },3000)
          // toast({title: "로그아웃되었습니다. 다시 로그인 해주세요."});
        console.log('🔑 로그아웃됨');
        useAuthStore.getState().clearToken();
        window.location.href = "/login";
        return Promise.reject(error);
      }
    }

    return Promise.reject(error);
  }
);