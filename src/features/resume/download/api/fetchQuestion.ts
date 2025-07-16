import { safePost } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { create } from 'zustand';

interface AIResponseState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAIResponseState = create<AIResponseState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));

export const fetchQuestion = async () => {
  const { setIsLoading } = useAIResponseState();
  const token = useAuthStore.getState().token;

  const res = await safePost(
    '/api/question',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.httpStatusCode === 202) {
    //TODO: 성공 로직
    setIsLoading(true);
  }
};
