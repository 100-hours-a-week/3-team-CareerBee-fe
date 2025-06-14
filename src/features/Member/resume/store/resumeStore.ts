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

export const useResumeStore = create((set) => ({
  resume: null,
  setResume: (data: resumeProps) => set({ resume: data }),
}));
