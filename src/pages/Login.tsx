import { Button } from '@/components/ui/button';
import axios from 'axios';

export default function Login() {
  const handleLogin = async () => {
    try {
      const res = await axios.get('https://api.careerbee.co.kr/api/v1/auth/oauth', {
        params: { type: 'KAKAO' },
      });
      console.log(res.data);
      const loginUrl = res.data.data.loginUrl;
      if (loginUrl) {
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error('로그인 URL 요청 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };
  return (
    // <div></div>
    <div className="flex flex-col items-center justify-center gap-4">
      <h1 className="text-center text-2xl font-bold ">
        No.1 AI기반 커리어 길찾기 서비스
        <br />
        커리어비에 오신 것을
        <br />
        환영합니다!
      </h1>
      <p className="text-center text-lg">
        지금 바로 로그인하고 <br />
        맞춤형 서비스를 경험해보세요
      </p>
      <Button
        label="카카오톡으로 시작하기"
        size="lg"
        fullWidth={true}
        className="mx-16 mb-8"
        onClick={handleLogin}
      ></Button>
    </div>
  );
}
