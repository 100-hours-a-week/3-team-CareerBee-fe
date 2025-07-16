import { Modal } from '@/src/widgets/ui/modal';
import React from 'react';

export const NeedMorePointsModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Modal
      title="포인트가 부족해요."
      description="대회에 참가해 포인트를 모아보세요!"
      cancelText="닫기"
      trigger={children}
    />
  );
};
