import InterviewTab from '@/src/entities/interview/ui/InterviewTab';
import TabContent from '@/src/features/interview/ui/TabContent';

import { fetchQuestions } from '@/src/entities/interview/api/fetchQuestion';

export default async function Page() {
  const questions = await fetchQuestions();

  return (
    <div className="flex flex-col gap-4 py-5 px-5 w-full mb-auto overflow-y-auto">
      <InterviewTab />
      <TabContent questions={questions} />
    </div>
  );
}
