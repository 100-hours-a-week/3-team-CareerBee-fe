import LoginButton from '@/src/features/auth/ui/LoginButton';

import Image from 'next/image';

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center my-auto px-16 gap-4">
      <Image src="/images/logo.png" alt="커리어비 로고" width={96} height={96} />
      <h1 className="text-center text-2xl font-bold ">로그인 후 사용할 수 있어요!</h1>
      <p className="text-center text-lg">
        지금 바로 로그인하고 <br />
        맞춤형 서비스를 경험해보세요
      </p>
      <LoginButton />
    </div>
  );
}
