'use client';

import { TicketType } from '@/src/entities/shop/lib/ticket';
import { ticketConfig, ticketImgs } from '@/src/entities/shop/config/ticketConfig';
import { productProps } from '@/src/entities/shop/config/productConfig';
import Product from '@/src/features/shop/ui/Product';

import getTicketCount from '@/src/features/shop/api/getTicketCount';
import getMyTicketCount from '@/src/features/shop/api/getMyTicketCount';
import getProduct from '@/src/entities/shop/api/getProduct';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

const ProductList = () => {
  const token = useAuthStore.getState().token;

  const { data: count } = useQuery({
    queryKey: ['ticketCount'],
    queryFn: getTicketCount,
  });

  const { data: myCount } = useQuery({
    queryKey: ['myTicketCount'],
    queryFn: getMyTicketCount,
    enabled: !!token,
  });

  const [products, setProducts] = useState<productProps>({} as productProps);

  const fetchProducts = async () => {
    const products = await getProduct();
    if (products) setProducts(products);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!count) return null;

  return (
    <>
      {token && (
        <div className="flex justify-center gap-12">
          {Object.entries(ticketImgs).map(([key, ticket]) => (
            <div key={key} className="flex flex-row gap-2">
              <img src={ticket} alt={`${key} ticket`} className="w-6 h-6" />
              <span className="text-sm font-medium">{myCount?.[key as TicketType] ?? 0}개</span>
            </div>
          ))}
        </div>
      )}
      <div className="grid grid-cols-3 gap-8 px-5 mt-12">
        {Object.entries(ticketConfig).map(([key, ticket]) => (
          <Product
            key={key}
            ticketType={key as TicketType}
            ticket={ticket}
            productImage={products?.[key as TicketType].prizeImgUrl ?? ''}
            productDescription={products?.[key as TicketType].prizeName}
            ticketCount={count?.[key as TicketType]}
          />
        ))}
      </div>
    </>
  );
};

export default ProductList;
