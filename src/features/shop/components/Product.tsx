import { Button } from '@/components/ui/button';

export type TicketType = 'red' | 'green' | 'blue';
export interface ProductProps {
  ticket: {
    title: string;
    ticketImage: string;
    point: number;
  };
  productImage: string;
  productDescription: string;
}

const Product = ({ ticket, productImage, productDescription }: ProductProps) => {
  return (
    <div className="flex flex-col items-center">
      <img src={ticket.ticketImage} alt={ticket.title} />
      <p>뽑기권</p>
      <p>{ticket.point} 포인트</p>
      <Button label="구매하기" className="w-full" variant="primary" />
      <li className="border-border"></li>
      <img src={productImage} alt={productDescription} />
      <p>{productDescription}</p>
    </div>
  );
};

export default Product;
