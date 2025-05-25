import { useEffect } from 'react';
import { subscribeErrorToast } from '@/lib/errorEvents';
import { toast } from '@/hooks/useToast';

export const useGlobalErrorToast = () => {
  useEffect(() => {
    const unsubscribe = subscribeErrorToast((msg) => {
      toast({ title: msg });
    });
    return () => {
      unsubscribe();
    };
  }, []);
};
