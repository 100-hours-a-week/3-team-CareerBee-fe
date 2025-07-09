import { TicketType } from '@/src/entities/shop/lib/ticket';
import { ticketConfig } from '@/src/entities/shop/config/ticketConfig';

import Product from '@/src/entities/shop/ui/Product';

import productRed from '@/src/entities/shop/assets/product-red.png';
import productGreen from '@/src/entities/shop/assets/product-green.png';
import productBlue from '@/src/entities/shop/assets/product-blue.png';

import getTicketCount from '@/src/features/shop/api/getTicketCount';

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

const ProductList = async () => {
  const count = await getTicketCount();
  if (!count) return null;

  return (
    <div className="grid grid-cols-3 gap-8 px-5 mt-16">
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
  );
};

export default ProductList;
