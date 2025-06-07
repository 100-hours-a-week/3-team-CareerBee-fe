import { useEffect, useState } from 'react';
import { safeGet } from '@/lib/request';

// ChartProps interface for chart display
export interface ChartProps {
  rank: number;
  nickname: string;
  profileImgUrl: string;
  badgeImgUrl: string;
  elapsedTime: string;
  solvedCount: number;
}

interface TopRankings {
  daily: ChartProps[];
  weekly: ChartProps[];
  monthly: ChartProps[];
}

export const useTopRankings = () => {
  const [topRankings, setTopRankings] = useState<TopRankings>({
    daily: [],
    weekly: [],
    monthly: [],
  });

  useEffect(() => {
    (async () => {
      const res = await safeGet('/api/v1/competitions/rankings');
      if (res.status === 200) {
        const fallbackBadgeUrl = '/images/default_badge.png';

        const convertToChartProps = (data: any[], isDaily: boolean): ChartProps[] => {
          return data.map((item: any, index: number) => ({
            rank: index + 1,
            nickname: item.nickname,
            profileImgUrl: item.profileUrl,
            badgeImgUrl: fallbackBadgeUrl,
            elapsedTime: isDaily ? String(item.elapsedTime) : String(item.continuous),
            solvedCount: isDaily ? item.solvedCount : item.correctRate,
          }));
        };

        setTopRankings({
          daily: convertToChartProps(res.data.daily, true),
          weekly: convertToChartProps(res.data.week, false),
          monthly: convertToChartProps(res.data.month, false),
        });
      }
    })();
  }, []);

  return { topRankings };
};
