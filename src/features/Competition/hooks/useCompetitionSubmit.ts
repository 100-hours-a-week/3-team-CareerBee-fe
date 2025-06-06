import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { safePost } from '@/lib/request';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { useAuthStore } from '@/features/Member/auth/store/auth';

export function useCompetitionSubmit({
  problems,
  selectedAnswers,
  timeLeft,
  setIsSubmitted,
  setShowPointResult,
}: {
  problems: any[];
  selectedAnswers: number[];
  timeLeft: number;
  setIsSubmitted: (_value: boolean) => void;
  setShowPointResult: (_value: boolean) => void;
}) {
  const token = useAuthStore((state) => state.token);
  const competitionId = useCompetitionStore((state) => state.competitionId);
  const navigate = useNavigate();

  const handleSubmitClick = useCallback(
    async (isSubmitted: boolean) => {
      if (isSubmitted) {
        setShowPointResult(true);
        setTimeout(() => {
          navigate('/competition');
        }, 5000);
        return;
      }

      setIsSubmitted(true);

      const correctCount = problems.filter(
        (_, index) => selectedAnswers[index] === problems[index].answer,
      ).length;
      const res = await safePost(`/api/v1/competitions/${competitionId}/results`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          solvedCount: correctCount,
          elapsedTime: 60000 - timeLeft,
        }),
      });

      if (res.status !== 200) {
        alert('제출에 실패했습니다.');
      }
    },
    [
      problems,
      selectedAnswers,
      timeLeft,
      token,
      competitionId,
      setIsSubmitted,
      setShowPointResult,
      navigate,
    ],
  );

  return { handleSubmitClick };
}
