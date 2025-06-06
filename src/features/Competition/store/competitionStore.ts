import { create } from 'zustand';

interface CompetitionState {
  competitionId: number | null;
  setCompetitionId: (_id: number) => void;
}

export const useCompetitionStore = create<CompetitionState>((set) => ({
  competitionId: null,
  setCompetitionId: (id) => set({ competitionId: id }),
}));
