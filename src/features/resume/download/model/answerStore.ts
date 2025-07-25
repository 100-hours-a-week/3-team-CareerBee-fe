import { create } from 'zustand';

interface answerProps {
  answer: string;
  setAnswer: (answer: string) => void;
  step: number;
  setStep: (step: number) => void;
}

export const useAnswer = create<answerProps>((set) => ({
  answer: '',
  setAnswer: (answer) => set({ answer }),
  step: 0,
  setStep: (step) => set({ step }),
}));
