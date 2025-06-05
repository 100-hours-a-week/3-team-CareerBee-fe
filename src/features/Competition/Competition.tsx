import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Question from './components/question';
import MoveLeft from '@/features/Competition/image/caret-left.svg';
import MoveRight from '@/features/Competition/image/caret-right.svg';
import PointPopup from '@/features/Competition/components/pointPopup';

import { safeGet } from '@/lib/request';

import { useAuthStore } from '../Member/auth/store/auth';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';

import { useEffect, useState } from 'react';

export interface Choice {
  order: number;
  content: string;
}
export interface Problem {
  number: number;
  title: string;
  description: string;
  solution: string;
  answer: number;
  choices: Choice[];
}

export default function Competition() {
  // TODO: 대회 남은 시간으로 바꾸기
  const [timeLeft, setTimeLeft] = useState(60000);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showPointResult, setShowPointResult] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (isSubmitted) {
          return prev;
        }
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 10);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 6000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, '0');
    const hundredths = String(time % 100).padStart(2, '0');
    return `${minutes} : ${seconds} : ${hundredths}`;
  };

  const [problems, setProblems] = useState<Problem[]>([]);
  const competitionId =
    import.meta.env.VITE_USE_MOCK === 'true' ? 1 : useCompetitionStore.getState().competitionId;
  const token = useAuthStore((state) => state.token);
  useEffect(() => {
    (async () => {
      if (import.meta.env.VITE_USE_MOCK === 'true') {
        const mock = await fetch('/mock/mock-problems.json');
        const res = await mock.json();
        setProblems(res.data.problems);
      } else {
        const res = await safeGet(`/api/v1/competitions/${competitionId}/problems`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.status === 200) {
          setProblems(res.data.problems);
        }
      }
    })();
  }, []);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([0, 0, 0, 0, 0]);
  const notAnswered = selectedAnswers.every((answer) => answer !== 0);
  const isSolved = (index: number) => selectedAnswers[index] !== 0;
  const isCorrect = (index: number) =>
    isSubmitted ? selectedAnswers[index] === problems[index].answer : undefined;

  return (
    <div className="flex flex-col justify-start items-center px-6 pt-8 min-h-[calc(100dvh-3.5rem)]">
      <div className="flex h-full min-h-[48px] max-h-[96px]">
        <div className="w-[20rem] mx-auto font-medium text-5xl px-8 mb-auto">
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="flex justify-between items-stretch mt-2 max-w-[552px] min-w-[352px] w-full h-full">
        <img src={MoveLeft} alt="뒤로가기" className="h-16 my-auto" />
        <div className="flex flex-col justify-between items-center max-w-[25rem] mx-auto min-h-[36rem] h-full">
          <Tabs defaultValue="1" className="mb-auto w-full">
            <TabsList>
              {problems.map((_problem, index: number) => (
                <TabsTrigger
                  key={index}
                  value={String(index + 1)}
                  variant="pill"
                  isSolved={isSolved(index)}
                  isCorrect={isCorrect(index)}
                >
                  {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>
            {problems.map((problem, index: number) => (
              <TabsContent key={index} value={String(index + 1)} className="grow px-0">
                <Question
                  value={String(index + 1)}
                  selectedValue={selectedAnswers[index]}
                  onChange={(val: string) => {
                    const next = [...selectedAnswers];
                    next[index] = +val;
                    setSelectedAnswers(next);
                  }}
                  showExplanation={isSubmitted}
                  problem={problem}
                />
              </TabsContent>
            ))}
          </Tabs>
          <Button
            variant="primary"
            label={isSubmitted ? '랭킹보러가기' : '제출하기'}
            fullWidth={true}
            disabled={!notAnswered}
            className="mt-4"
            onClick={() => {
              if (isSubmitted) {
                setShowPointResult(true);
                setTimeout(() => {
                  window.location.href = '/competition';
                }, 5000);
              } else {
                setIsSubmitted(true);
              }
            }}
          ></Button>
          <div className="h-12" />
        </div>
        <img src={MoveRight} alt="뒤로가기" className="h-16 my-auto" />
      </div>
      {showPointResult && <PointPopup points={5} />}
    </div>
  );
}
