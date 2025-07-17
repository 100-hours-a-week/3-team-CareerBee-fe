import { useAIResponseState } from '@/src/features/resume/download/api/fetchQuestion';

import { EventSourcePolyfill } from 'event-source-polyfill';
import { create } from 'zustand';

export interface AIQuestion {
  question: string;
  answer: string;
}

interface AIStore {
  aiQuestion: AIQuestion | null;
  setAIQuestion: (q: AIQuestion) => void;
  clear: () => void;
}
export const useAIStore = create<AIStore>((set) => ({
  aiQuestion: null,
  setAIQuestion: (q) => set({ aiQuestion: q }),
  clear: () => set({ aiQuestion: null }),
}));

export const eventAIQuestionReady = (eventSource: EventSourcePolyfill) => {
  eventSource.addEventListener('ai-question-ready', async (e: any) => {
    const newQuestion = JSON.parse(e.data);
    useAIStore.getState().setAIQuestion(newQuestion);
    useAIResponseState.getState().setIsLoading(false);
  });
};
