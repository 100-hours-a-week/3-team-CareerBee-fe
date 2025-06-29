import { Button } from '@/components/ui/button';
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
    <div className="flex flex-col items-center gap-[10px]">
      <div className="flex flex-col items-center gap-1">
        <img src={ticket.ticketImage} alt={ticket.title} className="w-20 h-20" />
        <p className="font-ria">{ticket.title}</p>
        <p>{ticket.point} 포인트</p>
      </div>
      <Button label="구매하기" className="rounded-full px-6" variant="primary" />
      <hr className="border-border w-full my-[10px]"></hr>
      <img src={productImage} alt={productDescription} className="w-[108px] h-[108px]" />
      <p className="text-center">{productDescription}</p>
    </div>
  );
};

export default Product;
