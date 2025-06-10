import { useEffect, useState } from 'react';
import { Problem } from '../Competition';
import { safeGet } from '@/lib/request';
// import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { useAuthStore } from '@/features/Member/auth/store/auth';

export function useCompetitionData(competitionId: number | null) {
  const [problems, setProblems] = useState<Problem[]>([]);
  const token = useAuthStore((state) => state.token);
  // const { competitionId } = useCompetitionStore();

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
        if (res.status === 200) {
          setProblems(res.data.problems);
        }
      }
    };

    const joinCompetition = async () => {
      const res = await fetch(`/api/v1/competitions/${competitionId}`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status !== 204) {
        alert('대회 참가에 실패했습니다.');
      }
    };

    fetchProblems();
    joinCompetition();
  }, []);

  return { problems };
}
