'use client';

import { Toggle } from '@/src/widgets/ui/toggle';
import QuestionTab from '@/src/features/interview/ui/QuestionTab';
import Feedback from '@/src/features/interview/ui/Feedback';

import { interviewType } from '@/src/entities/interview/model/questionStore';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { fetchQuestions } from '@/src/entities/interview/api/fetchQuestion';
import { useTab } from '@/src/features/interview/model/handleTabChange';

import { useEffect } from 'react';
import { useState } from 'react';

const interviewTabs: { label: string; value: interviewType | 'SAVED' }[] = [
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: 'AI', value: 'AI' },
  { label: 'DevOps', value: 'DEVOPS' },
  { label: '저장한 문제', value: 'SAVED' },
];

export const InterviewTab = () => {
  const token = useAuthStore.getState().token;
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<interviewType | 'SAVED'>('FRONTEND');
  const handleTabChange = useTab();
  useEffect(() => {
    setIsClient(true);
    if (!token) {
      fetchQuestions();
    }
  }, [token]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-center gap-2 w-full whitespace-nowrap">
        {interviewTabs.map(({ label, value }) => {
          const isSavedTab = value === 'SAVED';
          const isDisabled = isSavedTab && (!token || !isClient);

          return (
            <Toggle
              key={value}
              variant="pill"
              label={label}
              pressed={activeTab === value}
              onPressedChange={async () => {
                if (!isDisabled) {
                  const res = await handleTabChange(value);
                  setActiveTab(res);
                }
              }}
              className="shadow-md px-6 py-1 min-w-[104px] text-sm rounded-full border border-border/50 bg-white text-gray-800 whitespace-nowrap"
              disabled={isDisabled ? true : false}
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
