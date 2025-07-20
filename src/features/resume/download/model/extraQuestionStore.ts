import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

export interface AIResponse {
  memberId: string;
  question: string;
}

interface extraQuestionProps {
  extraQuestion: AIResponse | null;
  setExtraQuestion: (q: AIResponse) => void;
  clear: () => void;
}

export const useExtraQuestion = create<extraQuestionProps>()(
  persist(
    (set) => ({
      extraQuestion: null,
      setExtraQuestion: (q) => set({ extraQuestion: q }),
      clear: () => set({ extraQuestion: null }),
    }),
    {
      name: 'extra-question',
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);

interface AIResponseState {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useAIResponseState = create<AIResponseState>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
