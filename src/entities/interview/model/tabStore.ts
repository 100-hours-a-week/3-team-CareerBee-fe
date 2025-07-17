import { create } from 'zustand';
import { interviewType } from '@/src/entities/interview/model/interviewType';

type TabState = {
  activeTab: interviewType | 'SAVED';
  setActiveTab: (tab: interviewType | 'SAVED') => void;
};

export const useTabStore = create<TabState>((set) => ({
  activeTab: 'FRONTEND',
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
