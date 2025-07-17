import { safePost } from '@/src/shared/api/request';
import { useFeedbackStore } from '@/src/features/interview/model/feedbackStore';

export const postAnswer = async ({
  token,
  problemId,
  type,
  question,
  answer,
  isFreeProblem,
}: {
  token: string;
  problemId: number;
  type: string;
  question: string;
  answer: string;
  isFreeProblem: boolean;
  onSuccess?: () => void;
}) => {
  const res = await safePost(
    '/api/v1/interview-problems/answers',
    {
      problemId,
      type,
      question,
      answer,
      isFreeProblem,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.httpStatusCode === 202) {
    useFeedbackStore.getState().setIsLoading(true);
  } else {
    console.error('제출 실패', res);
  }

  return res;
};
