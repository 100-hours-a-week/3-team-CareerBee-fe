import { create } from 'zustand';

interface feedbackStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  isReady: boolean;
  setIsReady: (loading: boolean) => void;
  feedback: string;
  setFeedback: (feedback: string) => void;
}

export const useFeedbackStore = create<feedbackStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
  isReady: false,
  setIsReady: (ready) => set({ isReady: ready }),
  feedback: '',
  setFeedback: (feedback) => set({ feedback }),
}));

interface AIResponseState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAIResponseState = create<AIResponseState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
