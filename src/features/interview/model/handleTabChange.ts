import { useQueryClient } from '@tanstack/react-query';
import { fetchMemberQuestions } from '@/src/entities/interview/api/fetchMemberQuestion';
import { interviewType } from '@/src/entities/interview/model/interviewType';
import { useAuthStore } from '@/src/entities/auth/model/auth';

export const useTab = () => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  const handleTabChange = async (value: interviewType | 'SAVED') => {
    if (value === 'SAVED') return value;

    if (token) {
      const cached = queryClient.getQueryData(['interviewQuestions', value]);
      if (!cached) {
        const data = await fetchMemberQuestions({ type: value });
        if (data) {
          queryClient.setQueryData(['interviewQuestions', value], data);
        }
      }
    }

    return value;
  };

  return handleTabChange;
};
