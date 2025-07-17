import InterviewTab from '@/src/entities/interview/ui/InterviewTab';
import QuestionTab from '@/src/features/interview/ui/QuestionTab';
import Feedback from '@/src/features/interview/ui/Feedback';

import { fetchQuestions } from '@/src/entities/interview/api/fetchQuestion';

export default async function Page() {
  const questions = await fetchQuestions();

  return (
    <div className="flex flex-col gap-4 py-5 px-5 w-full mb-auto overflow-y-auto">
      <InterviewTab />
      <QuestionTab questions={questions} />
      <Feedback />
    </div>
  );
}
