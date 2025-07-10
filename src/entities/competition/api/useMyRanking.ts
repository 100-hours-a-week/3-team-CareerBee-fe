import { safeGet } from '@/src/shared/api/request';
import { useQuery } from '@tanstack/react-query';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { convertToMyChartProps } from '@/src/entities/competition/lib/convertToChartProps';

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
        daily: res.data.daily ? convertToMyChartProps(res.data.daily, true) : null,
        weekly: res.data.week ? convertToMyChartProps(res.data.week, false) : null,
        monthly: res.data.month ? convertToMyChartProps(res.data.month, false) : null,
      };
    },
    enabled: !!token,
    staleTime: 6 * 60 * 60 * 1000, // 6시간
  });

  return { myRanking, isLoading, isError };
};
