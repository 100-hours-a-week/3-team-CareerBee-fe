import { ProductProps } from '@/src/features/shop/ui/Product';
import { TicketType } from '@/src/entities/shop/lib/ticket';

import ticketRed from '@/src/entities/shop/assets/ticket-red.png';
import ticketGreen from '@/src/entities/shop/assets/ticket-green.png';
import ticketBlue from '@/src/entities/shop/assets/ticket-blue.png';

export const ticketConfig: Record<TicketType, ProductProps['ticket']> = {
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

export const ticketImgs: Record<TicketType, string> = {
  red: ticketRed.src,
  green: ticketGreen.src,
  blue: ticketBlue.src,
};
