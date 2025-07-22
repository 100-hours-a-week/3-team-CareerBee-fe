import { create } from 'zustand';

interface feedbackStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isReady: boolean;
  setIsReady: (loading: boolean) => void;
}

export const useFeedbackStore = create<feedbackStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  isReady: false,
  setIsReady: (ready) => set({ isReady: ready }),
}));
