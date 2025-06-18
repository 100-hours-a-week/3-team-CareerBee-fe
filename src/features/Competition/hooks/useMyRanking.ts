import { formatToMS } from '@/features/Competition/components/timer';

import { safeGet } from '@/lib/request';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuthStore } from '@/features/Member/auth/store/auth';

import { useEffect } from 'react';

interface MyChartProps {
  rank: number;
  elapsedTime: string;
  solvedCount: number;
}

const convertToChartProps = (item: any, isDaily: boolean): MyChartProps => {
  return {
    rank: item.rank,
    elapsedTime: isDaily ? formatToMS(item.elapsedTime) : String(item.continuous),
    solvedCount: isDaily ? item.solvedCount : item.correctRate,
  };
};

export const useMyRanking = () => {
  const token = useAuthStore((state) => state.token);

  const {
    data: myRanking,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['my-ranking'],
    queryFn: async () => {
      const res = await safeGet('/api/v1/members/competitions/rankings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.httpStatusCode !== 200) throw new Error('Failed to fetch rankings');

      return {
        daily: convertToChartProps(res.data.daily, true),
        weekly: convertToChartProps(res.data.week, false),
        monthly: convertToChartProps(res.data.month, false),
      };
    },
    enabled: !!token,
    staleTime: 6 * 60 * 60 * 1000, // 6시간
  });

  return { myRanking, isLoading, isError };
};

// polling으로 일일 실시간 내랭킹 불러오기
export const useDailyMyPolling = (enabled: boolean) => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();

  useEffect(() => {
    if (!enabled) return;

    const interval = setInterval(async () => {
      const res = await safeGet('/api/v1/members/competitions/rankings/live', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      // console.log(res);
      if (res.httpStatusCode === 200) {
        const liveData = res.data;
        queryClient.setQueryData(['my-ranking'], (old: any) => ({
          ...old,
          daily: convertToChartProps(liveData, true),
        }));
      }
    }, 5 * 1000); // 5초마다

    return () => clearInterval(interval);
  }, [enabled, queryClient]);
};
