'use client';

import QuestionTab from './QuestionTab';
import Feedback from './Feedback';

import { QuestionTabProps } from '@/src/entities/interview/model/interviewType';
import { useMemberQuestionQuery } from '@/src/entities/interview/model/useMemberQuestionQuery';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';

export const TabContent = ({ questions }: QuestionTabProps) => {
  const token = useAuthStore.getState().token;
  const { isLoading } = useFeedbackStore();

  const { data: question } = useMemberQuestionQuery(!!token);

  return (
    <>
      <QuestionTab questions={questions} />
      {(isLoading || question?.memberInterviewProblemResp?.feedback) && (
        <Feedback feedback={{ feedback: question.memberInterviewProblemResp.feedback }} />
      )}
    </>
  );
};

export default TabContent;
