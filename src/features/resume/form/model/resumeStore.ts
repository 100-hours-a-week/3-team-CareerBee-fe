import { create } from 'zustand';

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

interface ResumeResultState {
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

export const useResumeResultStore = create<ResumeResultState>((set) => ({
  result: initialResultValues,
  setResult: (values) => set({ result: values }),
  resetResult: () => set({ result: initialResultValues }),
}));
