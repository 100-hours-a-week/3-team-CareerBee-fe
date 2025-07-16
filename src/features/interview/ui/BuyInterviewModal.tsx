import { Modal } from '@/src/widgets/ui/modal';
// import { NeedMorePointsModal } from '@/src/shared/ui/NeedMorePointsModal';

import React from 'react';

export const BuyInterviewModal = ({ children }: { children: React.ReactNode }) => {
  return (
    <Modal
      title="문제를 더 풀려면 포인트를 사용해 주세요."
      description="1 포인트가 필요합니다."
      actionText="문제 더 풀기"
      cancelText="되돌아가기"
      trigger={children}
    />
  );
};
