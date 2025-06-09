import { useState, useEffect } from 'react';
import { safeGet } from '@/lib/request';
import { useAuthStore } from '@/features/Member/auth/store/auth';

interface DailyRanking {
  rank: number;
  elapsedTime: number;
  solvedCount: number;
}

interface PeriodicRanking {
  rank: number;
  continuous: number;
  correctRate: number;
}

interface MyRanking {
  daily: DailyRanking | null;
  weekly: PeriodicRanking | null;
  monthly: PeriodicRanking | null;
}

export function useMyRanking() {
  const token = useAuthStore((state) => state.token);
  const [myRanking, setMyRanking] = useState<MyRanking>({
    daily: null,
    weekly: null,
    monthly: null,
  });

  useEffect(() => {
    if (!token) return;
    (async () => {
      const res = await safeGet('/api/v1/members/competitions/rankings', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        const { daily, week, month } = res.data;
        setMyRanking({
          daily,
          weekly: week,
          monthly: month,
        });
      }
    })();
  }, [token]);

  return { myRanking };
}
