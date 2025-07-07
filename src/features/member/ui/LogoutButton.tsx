'use client';

import { Button } from '@/src/widgets/ui/button';
import { Modal } from '@/src/widgets/ui/modal';
import { logout } from '@/src/features/auth/api/logout';

export const LogoutButton = () => {
  return (
    <Modal
      trigger={
        <Button label="로그아웃" size="sm" variant="link" className="mx-16 mb-8 underline" />
      }
      title="로그아웃 하시겠어요?"
      description={
        <>
          다음에 서비스를 더 편하게 이용하시려면
          <br />
          로그인 상태를 유지해 주세요.
        </>
      }
      cancelText="되돌아가기"
      actionText="로그아웃 하기"
      cancelButton={false}
      onAction={logout}
    />
  );
};

export default LogoutButton;
