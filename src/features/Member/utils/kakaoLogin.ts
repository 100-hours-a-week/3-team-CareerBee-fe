import { instance as axios } from '@/features/Member/utils/axios';

const handleLogin = async () => {
  try {
    const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/oauth`, {
      params: { type: 'KAKAO' },
    });
    const loginUrl = res.data.data.loginUrl;
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  } catch (error) {
    console.error('로그인 URL 요청 실패:', error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
  }
};

export default handleLogin;
