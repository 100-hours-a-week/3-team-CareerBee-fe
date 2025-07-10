import { Modal } from '@/src/widgets/ui/modal';
import type { UseMutationResult } from '@tanstack/react-query';
import React from 'react';

interface BuyModalProps {
  point: number;
  buyTicketMutation: UseMutationResult<void, unknown, void, unknown>;
  children: React.ReactNode;
}

export const BuyModal = ({ point, buyTicketMutation, children }: BuyModalProps) => {
  return (
    <Modal
      title="이 아이템을 구매할까요?"
      description={`구매시 ${point}포인트가 차감돼요.`}
      cancelText="취소"
      actionText="구매하기"
      onAction={() => buyTicketMutation.mutate()}
      trigger={children}
    />
  );
};
