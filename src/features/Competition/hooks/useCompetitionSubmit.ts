import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { useAuthStore } from '@/features/Member/auth/store/auth';
import { useAnswerStore } from '@/features/Competition/store/answerStore';

import { safePost } from '@/lib/request';
import { toast } from '@/hooks/useToast';
import { useNavigate } from 'react-router-dom';

import { useCallback } from 'react';

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
  const navigate = useNavigate();

  const handleSubmitClick = useCallback(
    async (isSubmitted: boolean) => {
      if (isSubmitted) {
        setShowPointResult(true);
        setTimeout(() => {
          navigate('/competition');
        }, 3000);
        return;
      }

      const now = new Date();
      const submitTime = now.getTime();
      console.log("submitTime:", submitTime, " ", "joinedTime:", joinedTime, " ");

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
          console.log('Result posted successfully res', res);
          const { answers, setAnswers } = useAnswerStore.getState();

          const gradingResult = res.data?.gradingResults;
          if (gradingResult && gradingResult.length > 0) {
            console.log('💾 gradingResult:', gradingResult);
            setAnswers(gradingResult);
            console.log('🧪 채점 response:', answers);
          } else {
            console.warn('❗ gradingResult가 없음 또는 빈 배열:', gradingResult);
          }
          // if (res.data?.gradingResults) {
          // setAnswers(res.data?.gradingResults);
          // }
        }
      } catch {
        toast({ title: '제출에 실패했습니다.', variant: 'destructive' });
      }
    },
    [problems, selectedAnswers, timeLeft, token, competitionId, setShowPointResult, navigate],
  );

  return { handleSubmitClick };
}
