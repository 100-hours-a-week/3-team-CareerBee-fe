'use client';

import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/src/widgets/ui/tabs';
import QuestionTab from '@/src/features/interview/ui/QuestionTab';

import { interviewType } from '@/src/entities/interview/model/interviewType';

const interviewTabs: { label: string; value: interviewType['type'] | 'SAVED' }[] = [
  { label: '프론트엔드', value: 'FRONTEND' },
  { label: '백엔드', value: 'BACKEND' },
  { label: 'AI', value: 'AI' },
  { label: 'DevOps', value: 'DEVOPS' },
  { label: '저장한 문제', value: 'SAVED' },
];

export const InterviewTab = () => {
  return (
    <Tabs defaultValue="FRONTEND" className="grow mt-4 w-full">
      <TabsList>
        {interviewTabs.map((tab) => (
          <TabsTrigger key={tab.value} value={tab.value} variant="pill">
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>

      <TabsContent value="FRONTEND" className="grow">
        <QuestionTab />
      </TabsContent>
      <TabsContent value="BACKEND"></TabsContent>
      <TabsContent value="AI"></TabsContent>
      <TabsContent value="DEVOPS"></TabsContent>
      <TabsContent value="SAVED"></TabsContent>
    </Tabs>
  );
};

export default InterviewTab;
