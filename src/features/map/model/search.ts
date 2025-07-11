import { create } from 'zustand';

export interface CompanySuggestion {
  id: number;
  name: string;
  // lat: number;
  // lng: number;
}

interface SearchState {
  search: string;
  suggestions: CompanySuggestion[];
  setSearch: (_value: string) => void;
  setSuggestions: (_suggestions: CompanySuggestion[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  suggestions: [],
  setSearch: (value) => set({ search: value }),
  setSuggestions: (suggestions) => set({ suggestions }),
}));
