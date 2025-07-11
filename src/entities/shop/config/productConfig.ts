import { TicketType } from '@/src/entities/shop/lib/ticket';

export type productProps = {
  [key in TicketType]: {
    prizeName: string;
    prizeImgUrl: string;
  };
};
