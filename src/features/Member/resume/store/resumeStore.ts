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

interface resumeResultProps {
  preferredJob: string;
  psTier: string;
  certificationCount: number;
  projectCount: number;
  majorType: string;
  workPeriod: number;
  position: string;
  additionalExperiences: string;
}

interface ResumeResultStore {
  result: resumeResultProps;
  setResult: (_values: resumeResultProps) => void;
  resetResult: () => void;
}

const initialResultValues: resumeResultProps = {
  preferredJob: '',
  psTier: '',
  certificationCount: 0,
  projectCount: 0,
  majorType: '',
  workPeriod: 0,
  position: '',
  additionalExperiences: '',
};

export const useResumeResultStore = create<ResumeResultStore>((set) => ({
  result: initialResultValues,
  setResult: (values) => set({ result: values }),
  resetResult: () => set({ result: initialResultValues }),
}));
