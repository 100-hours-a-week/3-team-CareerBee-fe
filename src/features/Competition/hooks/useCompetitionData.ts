import { useEffect, useState } from 'react';
import { Problem } from '../Competition';
import { safeGet, safePost } from '@/lib/request';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { toast } from '@/hooks/useToast';

export function useCompetitionData(competitionId: number | null) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const token = useAuthStore((state) => state.token);

  useEffect(() => {
    const fetchProblems = async () => {
      if (import.meta.env.VITE_USE_MOCK === 'true') {
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
      const res = await safePost(
        `/api/v1/competitions/${competitionId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.httpStatusCode === 409) {
        toast({ title: '이미 참가한 대회입니다.', variant: 'destructive' });
        window.location.href = '/competition';
      }
    };

    fetchProblems();
    joinCompetition();
  }, []);

  return { problems };
}
