import { interviewType } from '@/src/entities/interview/model/interviewType';
import { useQueryClient } from '@tanstack/react-query';

export const QuestionMemberTitle = ({ type }: { type: interviewType | 'SAVED' }) => {
  const queryClient = useQueryClient();

  const data = queryClient.getQueryData(['interviewQuestions', type]) as
    | { memberInterviewProblemResp?: { question?: string } }
    | undefined;
  const questionText = data?.memberInterviewProblemResp?.question;

  return (
    <div className="mr-auto font-medium font-bold text-lg mb-2">
      {questionText || '면접 문제가 들어옵니다.'}
    </div>
  );
};

export default QuestionMemberTitle;
