import { create } from 'zustand';

export interface Answer {
  problemId: number;
  answerChoice: number;
  isCorrect: boolean;
  solution: string;
}

interface AnswerState {
  answers: Answer[];
  setAnswers: (_answers: Answer[]) => void;
}

export const useAnswerStore = create<AnswerState>((set) => ({
  answers: [],
  setAnswers: (answers) => set({ answers }),
}));
