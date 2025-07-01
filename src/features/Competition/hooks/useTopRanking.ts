import noProfile from '/assets/no-profile.png';
import { formatToMS } from '@/features/Competition/components/timer';

import { safeGet } from '@/lib/request';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { useEffect } from 'react';

export interface ChartProps {
  rank: number;
  nickname: string;
  profileUrl: string;
  elapsedTime: string;
  solvedCount: number;
}

const convertToChartProps = (data: any[], isDaily: boolean): ChartProps[] => {
  return data.map((item: any, index: number) => ({
    rank: index + 1,
    nickname: item.nickname,
    profileUrl: item.profileUrl ? item.profileUrl : noProfile,
    elapsedTime: isDaily ? formatToMS(item.elapsedTime) : String(item.continuous),
    solvedCount: isDaily ? item.solvedCount : Math.round(item.correctRate * 1000) / 1000,
  }));
};

export const useTopRankings = () => {
  return useQuery({
    queryKey: ['top-rankings'],
    queryFn: async () => {
      const res = await safeGet('/api/v1/competitions/rankings');
      if (res.httpStatusCode !== 200) throw new Error('Failed to fetch rankings');

      return {
        daily: convertToChartProps(res.data.daily, true),
        weekly: convertToChartProps(res.data.week, false),
        monthly: convertToChartProps(res.data.month, false),
      };
    },
    staleTime: 6 * 60 * 60 * 1000, // 6시간
  });
};

// polling으로 일일 실시간 랭킹 불러오기
export const useDailyTopPolling = () => {
  return useQuery({
    queryKey: ['top-rankings', 'live'],
    queryFn: async () => {
      const res = await safeGet('/api/v1/competitions/rankings/live');

      if (res.httpStatusCode !== 200) throw new Error('Failed to fetch rankings');

      return {
        daily: convertToChartProps(res.data.rankings, true),
      };
    },
    refetchInterval: 3000,
    refetchIntervalInBackground: true,
  });
};
