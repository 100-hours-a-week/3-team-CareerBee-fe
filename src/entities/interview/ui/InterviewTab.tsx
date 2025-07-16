'use client';

import { useState } from 'react';
import { Toggle } from '@/src/widgets/ui/toggle';
import QuestionTab from '@/src/features/interview/ui/QuestionTab';
import Feedback from '@/src/features/interview/ui/Feedback';

import { interviewType } from '@/src/entities/interview/model/questionStore';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { fetchQuestions } from '@/src/entities/interview/api/fetchQuestion';

import { useEffect } from 'react';

const interviewTabs: { label: string; value: interviewType | 'SAVED' }[] = [
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: 'AI', value: 'AI' },
  { label: 'DevOps', value: 'DEVOPS' },
  { label: '저장한 문제', value: 'SAVED' },
];

export const InterviewTab = () => {
  const [activeTab, setActiveTab] = useState<interviewType | 'SAVED'>('FRONTEND');
  const token = useAuthStore.getState().token;

  useEffect(() => {
    if (!token) {
      fetchQuestions();
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2 w-full whitespace-nowrap">
        {interviewTabs.map(({ label, value }) => {
          const isSavedTab = value === 'SAVED';
          const isDisabled = isSavedTab ? (typeof window !== 'undefined' ? !token : true) : false;

          return (
            <Toggle
              key={value}
              variant="pill"
              label={label}
              pressed={activeTab === value}
              onPressedChange={() => {
                if (!isDisabled) setActiveTab(value);
              }}
              className="shadow-md px-6 py-1 min-w-[104px] text-sm rounded-full border border-border/50 bg-white text-gray-800 whitespace-nowrap"
              disabled={isDisabled || undefined}
            />
          );
        })}
      </div>
      <QuestionTab type={activeTab} />
      <Feedback />
    </div>
  );
};

export default InterviewTab;
