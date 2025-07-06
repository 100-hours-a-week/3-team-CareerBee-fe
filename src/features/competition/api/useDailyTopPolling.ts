import { safeGet } from '@/src/shared/api/request';
import { useQuery } from '@tanstack/react-query';

import { convertToTopChartProps } from '@/src/entities/competition/lib/convertToChartProps';

// polling으로 일일 실시간 랭킹 불러오기
export const useDailyTopPolling = () => {
  return useQuery({
    queryKey: ['top-rankings', 'live'],
    queryFn: async () => {
      const res = await safeGet('/api/v1/competitions/rankings/live');

      if (res.httpStatusCode !== 200) throw new Error('Failed to fetch rankings');

      return {
        daily: convertToTopChartProps(res.data.rankings, true),
      };
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });
};
