import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompetitionState {
  competitionId: number | null;
  setCompetitionId: (_id: number) => void;
}

export const useCompetitionStore = create(
  persist<CompetitionState>(
    (set) => ({
      competitionId: null,
      setCompetitionId: (id) => set({ competitionId: id }),
    }),
    {
      name: 'competition-storage', // localStorage key
    },
  ),
);
