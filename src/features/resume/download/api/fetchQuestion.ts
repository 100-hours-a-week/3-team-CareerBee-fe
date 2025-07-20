import { safePost } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { useAIResponseState } from '@/src/features/resume/download/model/extraQuestionStore';

export const fetchQuestion = async () => {
  const { setIsLoading } = useAIResponseState.getState();
  const token = useAuthStore.getState().token;

  const res = await safePost(
    '/api/v1/advanced-resume/init',
    {},
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
