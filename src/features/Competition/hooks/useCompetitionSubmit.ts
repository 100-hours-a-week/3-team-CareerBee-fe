import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { useAuthStore } from '@/features/Member/auth/store/auth';

import { safePost } from '@/lib/request';
import { toast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';

export function useCompetitionSubmit({
  problems,
  selectedAnswers,
  timeLeft,
  // setIsSubmitted,
  setShowPointResult,
}: {
  problems: any[];
  selectedAnswers: number[];
  timeLeft: number;
  // setIsSubmitted: (_value: boolean) => void;
  setShowPointResult: (_value: boolean) => void;
}) {
  const token = useAuthStore((state) => state.token);
  const { competitionId, joinedTime, setJoinedTime, setIsSubmitted } = useCompetitionStore();
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

      const now = new Date();
      const submitTime = now.getTime();
      const correctCount = problems.filter(
        (_, index) => selectedAnswers[index] === problems[index].answer,
      ).length;
      const res = await safePost(
        `/api/v1/competitions/${competitionId}/results`,
        {
          solvedCount: correctCount,
          elapsedTime: submitTime - joinedTime!,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (res.httpStatusCode >= 400) {
        toast({ title: '제출에 실패했습니다.', variant: 'destructive' });
      } else if (!res) {
        setIsSubmitted(true);
        setJoinedTime(null);
      }
    },
    [
      problems,
      selectedAnswers,
      timeLeft,
      token,
      competitionId,
      // setIsSubmitted,
      setShowPointResult,
      navigate,
    ],
  );

  return { handleSubmitClick };
}
