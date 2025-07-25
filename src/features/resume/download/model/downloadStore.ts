import { create } from 'zustand';

interface downloadProps {
  url: string;
  setUrl: (url: string) => void;
  isReady: boolean;
  setIsReady: (isReady: boolean) => void;
}

export const useDownload = create<downloadProps>((set) => ({
  url: '',
  setUrl: (url) => set({ url }),
  isReady: false,
  setIsReady: (isReady) => set({ isReady }),
}));
