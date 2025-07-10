'use client';

import { Button } from '@/src/widgets/ui/button';
import handleBuyTicket from '@/src/features/shop/api/useHandleBuyTicket';
import { TicketType } from '@/src/entities/shop/lib/ticket';
import { BuyModal } from '@/src/features/shop/ui/BuyModal';
import { NeedMorePointsModal } from '@/src/features/shop/ui/NeedMorePointsModal';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useUserInfo } from '@/src/features/member/model/useUserInfo';

import Image from 'next/image';
import { useState } from 'react';

export interface ProductProps {
  ticketType: TicketType;
  ticket: {
    title: string;
    ticketImage: string;
    point: number;
  };
  productImage: string;
  productDescription: string;
  ticketCount: number;
}

const Product = ({
  ticketType,
  ticket,
  productImage,
  productDescription,
  ticketCount,
}: ProductProps) => {
  const [count, setCount] = useState(ticketCount);
  const buyTicketMutation = handleBuyTicket({
    ticketType,
    onSuccess: () => setCount((prev) => prev - 1),
  });
  const { data: userInfo } = useUserInfo();
  const token = useAuthStore.getState().token;

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex flex-col items-center gap-1">
        <img src={ticket.ticketImage} alt={ticket.title} className="w-20 h-20" />
        <p className="font-ria">{ticket.title}</p>
        <p>{ticket.point} 포인트</p>
        <p> {count} / 100</p>
      </div>
      {userInfo?.point != null && userInfo.point < ticket.point ? (
        <NeedMorePointsModal>
          <Button
            label="구매하기"
            className="rounded-full px-6"
            variant="primary"
            disabled={!token}
          />
        </NeedMorePointsModal>
      ) : (
        <BuyModal point={ticket.point} buyTicketMutation={buyTicketMutation}>
          <Button
            label="구매하기"
            className="rounded-full px-6"
            variant="primary"
            disabled={!token}
          />
        </BuyModal>
      )}
      <hr className="border-border w-full my-[10px]"></hr>
      <Image
        src={
          productImage && productImage.startsWith('http') ? productImage.trim() : '/fallback.png'
        }
        alt={productDescription}
        width={108}
        height={108}
      />
      <p className="text-center">{productDescription}</p>
    </div>
  );
};

export default Product;
