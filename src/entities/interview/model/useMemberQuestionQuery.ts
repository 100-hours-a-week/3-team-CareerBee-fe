'use client';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safeGet } from '@/src/shared/api/request';
import { useTabStore } from '@/src/entities/interview/model/tabStore';

import { useQuery } from '@tanstack/react-query';

export const useMemberQuestionQuery = (enabled: boolean) => {
  const token = useAuthStore.getState().token;
  const activeTab = useTabStore((s) => s.activeTab);

  return useQuery({
    queryKey: ['member-question', activeTab],
    queryFn: async () => {
      const res = await safeGet(`/api/v1/members/interview-problems?type=${activeTab}`, {
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
