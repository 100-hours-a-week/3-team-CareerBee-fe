import { ProductProps, TicketType } from './Product';
import Product from './Product';
import ticketRed from '../image/ticket-red.png';
import ticketGreen from '../image/ticket-green.png';
import ticketBlue from '../image/ticket-blue.png';

const ticketConfig: Record<TicketType, ProductProps['ticket']> = {
  red: {
    title: '레드 뽑기권',
    ticketImage: ticketRed,
    point: 5,
  },
  green: {
    title: '그린 뽑기권',
    ticketImage: ticketGreen,
    point: 5,
  },
  blue: {
    title: '블루 뽑기권',
    ticketImage: ticketBlue,
    point: 5,
  },
};

const ProductList = () => {
  return (
    <div className="grid xs:grid-cols-1 sm:grid-cols-3 gap-8 px-5">
      {Object.entries(ticketConfig).map(([key, ticket]) => (
        <Product
          key={key}
          ticket={ticket}
          productImage={`../image/product-${key}.png`}
          productDescription={`Description for ${ticket.title}`}
        />
      ))}
    </div>
  );
};

export default ProductList;
