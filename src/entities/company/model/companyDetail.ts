import { create } from 'zustand';
import { Company } from '@/src/entities/company/model/companyType';

interface CompanyStore {
  company: Company | null;
  setCompany: (_company: Company) => void;
  clearCompany: () => void;
  isBookmarked: boolean;
  setIsBookmarked: (_isBookmarked: boolean) => void;
}

export const useCompanyStore = create<CompanyStore>((set) => ({
  company: null,
  setCompany: (company) => set({ company }),
  clearCompany: () => set({ company: null }),
  isBookmarked: false,
  setIsBookmarked: (isBookmarked) => set({ isBookmarked }),
}));
