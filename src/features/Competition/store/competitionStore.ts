import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompetitionState {
  competitionId: number | null;
  isSubmitted: boolean;
  setCompetitionId: (_id: number) => void;
  setIsSubmitted: (_val: boolean) => void;
  clearCompetition: () => void;
}

export const useCompetitionStore = create(
  persist<CompetitionState>(
    (set) => ({
      competitionId: null,
      isSubmitted: false,
      setCompetitionId: (id) => set({ competitionId: id }),
      setIsSubmitted: (val) => set({ isSubmitted: val }),
      clearCompetition: () => {
        localStorage.removeItem('competition-storage');
        window.location.reload();
      },
    }),
    {
      name: 'competition-storage', // localStorage key
    },
  ),
);
