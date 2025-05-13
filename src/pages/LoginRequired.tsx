import { Button } from '@/components/ui/button';
import { instance as axios } from '@/lib/axios';

export default function LoginRequired() {
  const handleLogin = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/oauth`, {
        params: { type: 'KAKAO' },
      });
      const loginUrl = res.data.data.loginUrl;
      if (loginUrl) {
        console.log(loginUrl)
        window.location.href = loginUrl;
      }
    } catch (error) {
      console.error('로그인 URL 요청 실패:', error);
      alert('로그인에 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-auto px-16 gap-4">
      <img src="/assets/logo.png" alt="커리어비 로고" className='w-24 h-24'/>
      <h1 className="text-center text-2xl font-bold ">
         로그인 후 사용할 수 있어요!
      </h1>
      <p className="text-center text-lg">
        지금 바로 로그인하고 <br />
        맞춤형 서비스를 경험해보세요
      </p>
      <Button
        label="카카오톡으로 시작하기"
        size="lg"
        fullWidth={true}
        className="mx-16 mb-8 font-bold"
        onClick={handleLogin}
      ></Button>
    </div>
  );
}
