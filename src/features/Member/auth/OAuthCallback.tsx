import { useEffect } from 'react';
import { Loader } from '@/components/ui/loader';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { instance as axios } from '@/features/Member/auth/utils/axios';

export default function OAuthCallback() {
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('code');
    // console.log(token);

    if (token) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/v1/auth/oauth/tokens/kakao`, {
          authorizationCode: token,
        })
        .then((response) => {
          const { accessToken, userInfo } = response.data.data;
          setToken(accessToken); // ✅ Zustand + persist로 저장됨
          localStorage.setItem('userPoint', userInfo.userPoint);
          localStorage.setItem('hasNewAlarm', userInfo.hasNewAlarm);
          window.location.href = '/'; // ✅ 로그인 성공 후 홈으로 이동
          console.log('✅ Login successful');
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });
    } else {
      console.error('❌ No token found in URL');
      window.location.href = '/login'; // ❌ 토큰 없으면 로그인 페이지로
    }
  }, [setToken]);

  return (
    <div className="flex flex-col gap-4 h-screen items-center justify-center text-lg font-semibold">
      <Loader />
      <p>로그인 중이에요...</p>
    </div>
  );
}
