import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface CompetitionState {
  competitionId: number | null;
  joinedTime: number | null;
  isSubmitted: boolean;
  setCompetitionId: (_id: number) => void;
  setJoinedTime: (_time: number) => void;
  setIsSubmitted: (_val: boolean) => void;
  clearCompetition: () => void;
}

export const useCompetitionStore = create(
  persist<CompetitionState>(
    (set) => ({
      competitionId: null,
      joinedTime: null,
      isSubmitted: false,
      setCompetitionId: (id) => set({ competitionId: id }),
      setJoinedTime: (time) => set({ joinedTime: time }),
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
