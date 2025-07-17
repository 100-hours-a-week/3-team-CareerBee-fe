import { create } from 'zustand';

interface feedbackStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useFeedbackStore = create<feedbackStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
