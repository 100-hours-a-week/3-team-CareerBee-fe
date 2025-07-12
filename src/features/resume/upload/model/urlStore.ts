import { create } from 'zustand';

interface uploadUrlStore {
  fileUrl: string | null;
  setFileUrl: (url: string | null) => void;
}

export const useUploadUrlStore = create<uploadUrlStore>((set) => ({
  fileUrl: null,
  setFileUrl: (url) => set({ fileUrl: url }),
}));
