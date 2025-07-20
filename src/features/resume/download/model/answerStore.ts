import { create } from 'zustand';

interface answerProps {
  answer: string;
  setAnswer: (answer: string) => void;
}

export const useAnswer = create<answerProps>((set) => ({
  answer: '',
  setAnswer: (answer) => set({ answer: answer }),
}));
