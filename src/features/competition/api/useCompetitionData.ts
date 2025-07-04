import { Problem } from '@/src/entities/competition/lib/questionProps';

import { useAuthStore } from '@/src/entities/auth/model/auth';
import { toast } from '@/src/shared/model/useToast';
import { safeGet, safePost } from '@/src/shared/api/request';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export function useCompetitionData(competitionId: number | null) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const token = useAuthStore((state) => state.token);
  const router = useRouter();

  const fetchProblems = async () => {
    if (process.env.NEXT_USE_MOCK === 'true') {
      const mock = await fetch('/mock/mock-problems.json');
      const res = await mock.json();
      setProblems(res.data.problems);
    } else {
      const res = await safeGet(`/api/v1/competitions/${competitionId}/problems`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.httpStatusCode === 200) {
        setProblems(res.data.problems);
      }
    }
  };

  const joinCompetition = async () => {
    try {
      await safePost(
        `/api/v1/competitions/${competitionId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (error: any) {
      if (error.response?.data?.httpStatusCode === 409) {
        toast({ title: '이미 참가한 대회입니다.', variant: 'destructive' });
        router.push('/competition');
      }
    }
  };

  useEffect(() => {
    fetchProblems();
    joinCompetition();
  }, []);

  return { problems };
}
