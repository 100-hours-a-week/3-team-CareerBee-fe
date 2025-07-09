'use client';

import { TicketType } from '@/src/entities/shop/lib/ticket';
import { ticketConfig, ticketImgs } from '@/src/entities/shop/config/ticketConfig';

import Product from '@/src/entities/shop/ui/Product';

import productRed from '@/src/entities/shop/assets/product-red.png';
import productGreen from '@/src/entities/shop/assets/product-green.png';
import productBlue from '@/src/entities/shop/assets/product-blue.png';

import getTicketCount from '@/src/features/shop/api/getTicketCount';
import getMyTicketCount from '@/src/features/shop/api/getMyTicketCount';
import { useAuthStore } from '@/src/entities/auth/model/auth';

const productDescriptions: Record<TicketType, string> = {
  red: '흠.... 뭐하지',
  green: '하겐다즈',
  blue: '무무의 오뜨',
};
const productImages: Record<TicketType, string> = {
  red: productRed.src,
  green: productGreen.src,
  blue: productBlue.src,
};

import { useEffect, useState } from 'react';

const ProductList = () => {
  const token = useAuthStore.getState().token;

  const [count, setCount] = useState<Record<TicketType, number>>();
  const [myCount, setMyCount] = useState<Record<TicketType, number>>();

  useEffect(() => {
    const fetchCounts = async () => {
      const countData = await getTicketCount();
      if (countData) setCount(countData);

      if (!token) return;
      const myCountData = await getMyTicketCount();
      if (myCountData) setMyCount(myCountData);
    };
    fetchCounts();
  }, []);

  if (!count) return null;

  return (
    <>
      {token && (
        <div className="flex justify-center gap-4 mt-6">
          {Object.entries(ticketImgs).map(([key, ticket]) => (
            <div key={key} className="flex items-center gap-2">
              <img src={ticket} alt={`${key} ticket`} className="w-6 h-6" />
              <span className="text-sm font-medium">{myCount[key as TicketType] ?? 0}개</span>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-8 px-5 mt-14">
        {Object.entries(ticketConfig).map(([key, ticket]) => (
          <Product
            key={key}
            ticket={ticket}
            productImage={productImages[key as TicketType]}
            productDescription={productDescriptions[key as TicketType]}
            count={count[key as TicketType]}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
