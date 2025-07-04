'use client';

import { Button } from '@/src/widgets/ui/button';
import handleLogin from '@/src/features/auth/api/kakaoLogin';

const LoginButton = () => {
  return (
    <Button
      label="카카오톡으로 시작하기"
      size="lg"
      fullWidth={true}
      className="mx-16 mb-8 font-bold"
      onClick={handleLogin}
    ></Button>
  );
};

export default LoginButton;
