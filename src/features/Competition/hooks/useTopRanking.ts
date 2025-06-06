import { useEffect, useState } from 'react';
import { safeGet } from '@/lib/request';

interface DailyRanking {
  nickname: string;
  badgeUrl: string;
  profileUrl: string;
  elapsedTime: number;
  solvedCount: number;
}

interface PeriodicRanking {
  nickname: string;
  badgeUrl: string;
  profileUrl: string;
  continuous: number;
  correctRate: number;
}

interface TopRankings {
  daily: DailyRanking[];
  weekly: PeriodicRanking[];
  monthly: PeriodicRanking[];
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
        const { daily, week, month } = res.data;
        setTopRankings({
          daily,
          weekly: week,
          monthly: month,
        });
      }
    })();
  }, []);

  return { topRankings };
};
