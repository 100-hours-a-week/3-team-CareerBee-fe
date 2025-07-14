import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export const useResumeResultStore = create<ResumeResultState>()(
  persist(
    (set) => ({
      result: initialResultValues,
      setResult: (values) => set({ result: values }),
      resetResult: () => set({ result: initialResultValues }),
    }),
    {
      name: 'resume-result-storage',
      storage: {
        getItem: (key) => {
          const item = sessionStorage.getItem(key);
          return item ? JSON.parse(item) : null;
        },
        setItem: (key, value) => sessionStorage.setItem(key, JSON.stringify(value)),
        removeItem: (key) => sessionStorage.removeItem(key),
      },
    },
  ),
);
