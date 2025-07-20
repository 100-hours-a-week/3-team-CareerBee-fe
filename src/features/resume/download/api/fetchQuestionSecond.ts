import { safePost } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useAIResponseState } from '@/src/features/resume/download/model/extraQuestionStore';
import { useAnswer } from '../model/answerStore';

export const fetchQuestion = async () => {
  const { setIsLoading } = useAIResponseState.getState();
  const token = useAuthStore.getState().token;
  const { answer } = useAnswer.getState();

  const res = await safePost(
    '/api/v1/members/advanced-resume/update',
    {
      answer: { answer },
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (res.httpStatusCode === 202) {
    setIsLoading(true);
  }
};
