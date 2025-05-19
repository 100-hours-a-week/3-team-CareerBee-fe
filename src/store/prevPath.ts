import { create } from 'zustand';

interface PrevPath {
  previousPath: string | null;
  setPreviousPath: (path: string) => void;
}

export const prevPathStore = create<PrevPath>((set) => ({
  previousPath: null,
  setPreviousPath: (path) => set({ previousPath: path }),
}));