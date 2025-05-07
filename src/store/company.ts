import { create } from 'zustand';

interface CompanyInfo {
  id: number;
  name: string;
  logoUrl: string;
  wishCount: number;
  keywords: { content: string }[];
}

type BookmarkState = 'true' | 'false' | 'disabled';

interface CompanyStore {
  openCardIndex: number | null;
  setOpenCardIndex: (index: number | null) => void;
  companyInfo?: CompanyInfo;
  setCompanyInfo: (info: CompanyInfo) => void;
  isBookmarked: BookmarkState;
  setIsBookmarked: (state: BookmarkState) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  openCardIndex: null,
  setOpenCardIndex: (index) => set({ openCardIndex: index }),
  companyInfo: undefined,
  setCompanyInfo: (info) => set({ companyInfo: info }),
  isBookmarked: 'disabled',
  setIsBookmarked: (state) => set({ isBookmarked: state }),
}));