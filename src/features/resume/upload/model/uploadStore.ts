import { create } from 'zustand';

interface uploadStore {
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
}

export const useUploadStore = create<uploadStore>((set) => ({
  isLoading: false,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));
