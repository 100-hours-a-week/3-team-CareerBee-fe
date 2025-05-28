import { Button } from '@/components/ui/button';
import handleLogin from '@/features/Member/auth/utils/kakaoLogin';

export default function LoginRequired() {
  return (
    <div className="flex flex-col items-center justify-center my-auto px-16 gap-4">
      <img src="/assets/logo.png" alt="커리어비 로고" className="w-24 h-24" />
      <h1 className="text-center text-2xl font-bold ">로그인 후 사용할 수 있어요!</h1>
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
