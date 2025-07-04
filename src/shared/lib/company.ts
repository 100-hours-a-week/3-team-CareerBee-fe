import { create } from 'zustand';

interface CompanyInfo {
  id: number;
  name: string;
  logoUrl: string;
  wishCount: number;
  keywords: { content: string }[];
}

// type BookmarkState = 'true' | 'false' | 'disabled';

interface CompanyStore {
  openCardIndex: number | null;
  setOpenCardIndex: (_index: number | null) => void;
  companyInfo?: CompanyInfo;
  setCompanyInfo: (_info: CompanyInfo) => void;
  isBookmarked: boolean;
  setIsBookmarked: (_state: boolean) => void;
  highlightedCompanyId: number | null;
  setHighlightedCompanyId: (_id: number | null) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  openCardIndex: null,
  setOpenCardIndex: (index) => set({ openCardIndex: index }),
  companyInfo: undefined,
  setCompanyInfo: (info) => set({ companyInfo: info }),
  isBookmarked: false,
  setIsBookmarked: (state) => set({ isBookmarked: state }),
  highlightedCompanyId: null,
  setHighlightedCompanyId: (id) => set({ highlightedCompanyId: id }),
}));
