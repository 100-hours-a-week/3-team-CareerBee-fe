import { create } from 'zustand';

interface ExampleState {
  count: number;
  increment: () => void;
}

export const useExampleStore = create<ExampleState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));