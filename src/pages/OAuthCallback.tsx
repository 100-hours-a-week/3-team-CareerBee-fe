import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '@/store/auth';
import { instance as axios } from '@/lib/axios';

export default function OAuthCallback() {
  const navigate = useNavigate();
  const setToken = useAuthStore((state) => state.setToken);

  useEffect(() => {
    const url = new URL(window.location.href);
    const token = url.searchParams.get('code');
    console.log(token);

    if (token) {
      axios
        .post(`${import.meta.env.VITE_API_URL}/api/v1/auth/oauth/tokens/kakao`, {
          authorizationCode: token,
        })
        .then((response) => {
          const accessToken = response.data.data.accessToken;
          setToken(accessToken); // ✅ Zustand + persist로 저장됨
          navigate('/'); // ✅ 로그인 성공 후 홈으로 이동
          console.log('✅ Login successful:', accessToken);
        })
        .catch((error) => {
          console.error('Login failed:', error);
        });
    } else {
      console.error('❌ No token found in URL');
      navigate('/login'); // ❌ 토큰 없으면 로그인 페이지로
    }
  }, [setToken, navigate]);

  return (
    <div className="flex h-screen items-center justify-center text-lg font-semibold">
      로그인 처리 중입니다...
    </div>
  );
}
