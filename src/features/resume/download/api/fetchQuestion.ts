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
  const { setIsLoading } = useAIResponseState.getState();
  const token = useAuthStore.getState().token;

  const res = await safePost(
    '/api/v1/advanced-resume/init',
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.httpStatusCode === 202) {
    setIsLoading(true);
  }
};
