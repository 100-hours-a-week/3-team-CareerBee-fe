'use client';

import { safeGet } from '@/src/shared/api/request';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { MyChartProps } from '@/src/entities/competition/lib/chartProps';
import { convertToMyChartProps } from '@/src/entities/competition/lib/convertToChartProps';

import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

// polling으로 일일 실시간 내랭킹 불러오기
export const useDailyMyPolling = (enabled: boolean) => {
  const token = useAuthStore((state) => state.token);
  const queryClient = useQueryClient();
  const [liveRanking, setLiveRanking] = useState<MyChartProps | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const fetchInitial = async () => {
      const res = await safeGet('/api/v1/members/competitions/rankings/live', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.httpStatusCode === 200) {
        const liveData = res.data;
        let converted = null;
        if (liveData != null) {
          converted = convertToMyChartProps(liveData, true);
        }
        queryClient.setQueryData(['my-ranking'], (old: any) => ({
          ...old,
          daily: converted,
        }));
        setLiveRanking(converted);
        return converted;
      }
    };

    fetchInitial();

    const interval = setInterval(fetchInitial, 3000); // polling 3초

    return () => clearInterval(interval);
  }, [enabled, queryClient, token]);

  return liveRanking;
};
