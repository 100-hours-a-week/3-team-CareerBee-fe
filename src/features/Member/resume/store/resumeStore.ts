import { create } from 'zustand';

interface resumeProps {
  certificationCount: number;
  projectCount: number;
  majorType: string;
  companyType: string;
  workPeriod: number;
  position: string;
  additionalExperiences: string;
}

interface ResumeState {
  resume: resumeProps | null;
  setResume: (_data: resumeProps) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: null,
  setResume: (data: resumeProps) => set({ resume: data }),
}));
