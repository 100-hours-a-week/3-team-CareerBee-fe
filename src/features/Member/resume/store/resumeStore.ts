import { create } from 'zustand';

interface resumeProps {
  certification_count: number;
  project_count: number;
  major_type: string;
  company_type: string;
  work_period: number;
  position: string;
  additional_experiences: string;
}

interface ResumeState {
  resume: resumeProps | null;
  setResume: (_data: resumeProps) => void;
}

export const useResumeStore = create<ResumeState>((set) => ({
  resume: null,
  setResume: (data: resumeProps) => set({ resume: data }),
}));
