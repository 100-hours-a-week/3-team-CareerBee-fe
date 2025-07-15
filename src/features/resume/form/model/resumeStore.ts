import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface ResumeFormProps {
  preferredJob: string | undefined;
  tier: string | undefined;
  certificationCount: number | undefined;
  projectCount: number | undefined;
  majorType: string | undefined;
  companyName: string | undefined;
  workPeriod: number | undefined;
  position: string | undefined;
  additionalExperiences: string | undefined;
}

interface ResumeResultState {
  result: ResumeFormProps;
  setResult: (_values: ResumeFormProps) => void;
  resetResult: () => void;
}

const initialResultValues: ResumeFormProps = {
  preferredJob: undefined,
  tier: undefined,
  certificationCount: undefined,
  projectCount: undefined,
  majorType: undefined,
  companyName: undefined,
  workPeriod: undefined,
  position: undefined,
  additionalExperiences: undefined,
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
