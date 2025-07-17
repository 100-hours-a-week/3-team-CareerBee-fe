import { interviewType } from '@/src/entities/interview/model/interviewType';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safeGet } from '@/src/shared/api/request';

import { useQuery } from '@tanstack/react-query';

export const useMemberQuestionQuery = (type: interviewType | 'SAVED', enabled: boolean) => {
  const token = useAuthStore.getState().token;

  return useQuery({
    queryKey: ['member-question', type],
    queryFn: async () => {
      const res = await safeGet(`/api/v1/members/interview-problems?type=${type}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.httpStatusCode === 200) {
        return res?.data ?? '';
      }
    },
    enabled,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  });
};
