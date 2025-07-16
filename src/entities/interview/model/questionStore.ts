import { create } from 'zustand';

export type interviewType = 'BACKEND' | 'FRONTEND' | 'DEVOPS' | 'AI';

interface Question {
  type: interviewType;
  question: string;
}

interface Store {
  questions: Question[];
  setQuestions: (q: Question[]) => void;
  getQuestionByType: (type: interviewType) => string | undefined;
}

export const useQuestionStore = create<Store>((set, get) => ({
  questions: [],
  setQuestions: (q) => set({ questions: q }),
  getQuestionByType: (type) => get().questions.find((q) => q.type === type)?.question,
}));
