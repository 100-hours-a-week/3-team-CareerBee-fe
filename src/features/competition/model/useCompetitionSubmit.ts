import { useAnswerStore } from '@/src/features/competition/model/answerStore';
import { useCompetitionStore } from '@/src/features/competition/model/competitionStore';
import { useAuthStore } from '@/src/entities/auth/model/auth';

import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { safePost } from '@/src/shared/api/request';
import { toast } from '@/src/shared/model/useToast';

const now = new Date();
const submitTime = now.getTime();

export function useCompetitionSubmit({
  problems,
  selectedAnswers,
  timeLeft,
  setShowPointResult,
}: {
  problems: any[];
  selectedAnswers: number[];
  timeLeft: number;
  setShowPointResult: (_value: boolean) => void;
}) {
  const token = useAuthStore((state) => state.token);
  const { competitionId, joinedTime, setJoinedTime, setIsSubmitted } = useCompetitionStore();
  const router = useRouter();

  const handleSubmitClick = useCallback(
    async (isSubmitted: boolean) => {
      if (isSubmitted) {
        setShowPointResult(true);
        setTimeout(() => {
          router.push('/competition');
        }, 3000);
        return;
      }

      const submittedAnswers = problems.map((problem, index) => ({
        problemId: problem.id,
        userChoice: selectedAnswers[index],
      }));

      try {
        const res = await safePost(
          `/api/v1/competitions/${competitionId}/results`,
          {
            elapsedTime: submitTime - joinedTime!,
            submittedAnswers,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (res.httpStatusCode === 200) {
          setIsSubmitted(true);
          setJoinedTime(null);
          const { setAnswers } = useAnswerStore.getState();

          const gradingResult = res.data?.gradingResults;
          if (gradingResult && gradingResult.length > 0) {
            setAnswers(gradingResult);
          }
        }
      } catch {
        toast({ title: '제출에 실패했습니다.', variant: 'destructive' });
      }
    },
    [problems, selectedAnswers, timeLeft, token, competitionId, setShowPointResult],
  );

  return { handleSubmitClick };
}
