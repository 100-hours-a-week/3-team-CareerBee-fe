import { create } from 'zustand';

interface SearchState {
  search: string;
  suggestions: string[];
  setSearch: (value: string) => void;
  setSuggestions: (suggestions: string[]) => void;
}

export const useSearchStore = create<SearchState>((set) => ({
  search: '',
  suggestions: [],
  setSearch: (value) => set({ search: value }),
  setSuggestions: (suggestions) => set({ suggestions }),
}));