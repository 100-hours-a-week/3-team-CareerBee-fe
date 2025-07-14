import { create } from 'zustand';

interface resumeResultProps {
  preferredJob: string;
  psTier: string;
  certificationCount: number | undefined;
  projectCount: number | undefined;
  majorType: string | undefined;
  companyName: string | undefined;
  workPeriod: number | undefined;
  position: string | undefined;
  additionalExperiences: string | undefined;
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
  companyName: '',
  workPeriod: 0,
  position: '',
  additionalExperiences: '',
};

export const useResumeResultStore = create<ResumeResultState>((set) => ({
  result: initialResultValues,
  setResult: (values) => set({ result: values }),
  resetResult: () => set({ result: initialResultValues }),
}));
