'use client';

import { TicketType } from '@/src/entities/shop/lib/ticket';

import { safePost } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { toast } from '@/src/shared/model/useToast';

import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';

const useHandleBuyTicket = ({
  ticketType,
  onSuccess,
  onError,
}: {
  ticketType: TicketType;
  onSuccess?: () => void;
  onError?: () => void;
}) => {
  const buyTicket = async () => {
    const token = useAuthStore.getState().token;
    const ticketTypeToUpper = ticketType.toUpperCase() as Uppercase<TicketType>;
    try {
      const res = await safePost(
        '/api/v1/tickets',
        {
          ticketType: ticketTypeToUpper,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      return res.data;
    } catch (err: any) {
      console.log(err);
      throw err;
    }
  };

  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: buyTicket,
    onSuccess: () => {
      toast({ title: '구매가 완료되었어요!', variant: 'success' });
      queryClient.refetchQueries({ queryKey: ['userInfo'] });
      queryClient.invalidateQueries({ queryKey: ['myTicketCount'] });
      onSuccess?.();
    },
    onError: (err: any) => {
      console.log(err);
      toast({ title: err.response.data.message, variant: 'destructive' });
      onError?.();
    },
  });
};

export default useHandleBuyTicket;
