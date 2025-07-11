import { convertToTopChartProps } from '@/src/entities/competition/lib/convertToChartProps';

import { safeGet } from '@/src/shared/api/request';
import { useQuery } from '@tanstack/react-query';

export const useTopRankings = () => {
  return useQuery({
    queryKey: ['top-rankings'],
    queryFn: async () => {
      const res = await safeGet('/api/v1/competitions/rankings');
      if (res.httpStatusCode !== 200) throw new Error('Failed to fetch rankings');

      return {
        daily: convertToTopChartProps(res.data.daily, true),
        weekly: convertToTopChartProps(res.data.week, false),
        monthly: convertToTopChartProps(res.data.month, false),
      };
    },
    staleTime: 6 * 60 * 60 * 1000, // 6시간
  });
};
