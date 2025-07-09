import { ProductProps } from '@/src/features/shop/ui/Product';
import { TicketType } from '@/src/entities/shop/lib/ticket';

import Product from '@/src/features/shop/ui/Product';

import ticketRed from '@/src/entities/shop/assets/ticket-red.png';
import ticketGreen from '@/src/entities/shop/assets/ticket-green.png';
import ticketBlue from '@/src/entities/shop/assets/ticket-blue.png';

import productRed from '@/src/entities/shop/assets/product-red.png';
import productGreen from '@/src/entities/shop/assets/product-green.png';
import productBlue from '@/src/entities/shop/assets/product-blue.png';

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
const ticketConfig: Record<TicketType, ProductProps['ticket']> = {
  red: {
    title: '레드 뽑기권',
    ticketImage: ticketRed.src,
    point: 15,
  },
  green: {
    title: '그린 뽑기권',
    ticketImage: ticketGreen.src,
    point: 10,
  },
  blue: {
    title: '블루 뽑기권',
    ticketImage: ticketBlue.src,
    point: 5,
  },
};

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 gap-8 px-5 mt-16">
      {Object.entries(ticketConfig).map(([key, ticket]) => (
        <Product
          key={key}
          ticket={ticket}
          productImage={productImages[key as TicketType]}
          productDescription={productDescriptions[key as TicketType]}
        />
      ))}
    </div>
  );
};

export default ProductList;
