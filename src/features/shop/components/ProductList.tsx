import { ProductProps } from './Product';
import { TicketType } from '../types/ticket';

import Product from './Product';

import ticketRed from '../image/ticket-red.png';
import ticketGreen from '../image/ticket-green.png';
import ticketBlue from '../image/ticket-blue.png';

const productDescriptions: Record<TicketType, string> = {
  red: '흠.... 뭐하지',
  green: '하겐다즈',
  blue: '무무의 오뜨',
};
const productImages: Record<TicketType, string> = {
  red: '../image/product-red.png',
  green: '../image/product-green.png',
  blue: '../image/product-blue.png',
};
const ticketConfig: Record<TicketType, ProductProps['ticket']> = {
  red: {
    title: '레드 뽑기권',
    ticketImage: ticketRed,
    point: 5,
  },
  green: {
    title: '그린 뽑기권',
    ticketImage: ticketGreen,
    point: 10,
  },
  blue: {
    title: '블루 뽑기권',
    ticketImage: ticketBlue,
    point: 15,
  },
};

const ProductList = () => {
  return (
    <div className="grid grid-cols-3 gap-8 px-5 mt-20">
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
