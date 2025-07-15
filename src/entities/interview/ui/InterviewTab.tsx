'use client';

import { useState } from 'react';
import QuestionTab from '@/src/features/interview/ui/QuestionTab';
import { Toggle } from '@/src/widgets/ui/toggle';

import { interviewType } from '@/src/entities/interview/model/interviewType';

const interviewTabs: { label: string; value: interviewType['type'] | 'SAVED' }[] = [
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: 'AI', value: 'AI' },
  { label: 'DevOps', value: 'DEVOPS' },
  { label: '저장한 문제', value: 'SAVED' },
];

export const InterviewTab = () => {
  const [activeTab, setActiveTab] = useState<interviewType['type'] | 'SAVED'>('FRONTEND');

  return (
    <>
      <div className="flex items-center justify-center gap-2 w-full whitespace-nowrap">
        {interviewTabs.map(({ label, value }) => (
          <Toggle
            key={value}
            variant="pill"
            label={label}
            pressed={activeTab === value}
            onPressedChange={() => setActiveTab(value)}
            className="shadow-md px-6 py-1 min-w-[104px] text-sm rounded-full border border-border/50 bg-white text-gray-800 whitespace-nowrap"
          />
        ))}
      </div>
      <QuestionTab />
    </>
  );
};

export default InterviewTab;
