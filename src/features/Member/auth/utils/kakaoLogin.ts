import { safeGet } from '@/lib/request';

const handleLogin = async () => {
  const res = await safeGet('/api/v1/auth/oauth', {
    params: { type: 'KAKAO' },
  });
  if (res) {
    const loginUrl = res.data.loginUrl;
    if (loginUrl) {
      window.location.href = loginUrl;
    }
  }
};

export default handleLogin;
