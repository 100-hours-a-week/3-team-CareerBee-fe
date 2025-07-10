'use client';

import { Button } from '@/src/widgets/ui/button';
import handleBuyTicket from '@/src/features/shop/api/handleBuyTicket';
import { TicketType } from '@/src/entities/shop/lib/ticket';

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

  return (
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex flex-col items-center gap-1">
        <img src={ticket.ticketImage} alt={ticket.title} className="w-20 h-20" />
        <p className="font-ria">{ticket.title}</p>
        <p>{ticket.point} 포인트</p>
        <p> {count} / 100</p>
      </div>
      <Button
        label="구매하기"
        className="rounded-full px-6"
        variant="primary"
        onClick={() => buyTicketMutation.mutate()}
      />
      <hr className="border-border w-full my-[10px]"></hr>
      <img src={productImage} alt={productDescription} className="w-[108px] h-[108px]" />
      <p className="text-center">{productDescription}</p>
    </div>
  );
};

export default Product;
