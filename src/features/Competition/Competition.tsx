import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { StateBasedModal } from '@/components/ui/modal';
import Question from './components/question';
import MoveLeft from '@/features/Competition/image/caret-left.svg';
import MoveRight from '@/features/Competition/image/caret-right.svg';
import PointPopup from '@/features/Competition/components/pointPopup';
import Timer from '@/features/Competition/components/timer';
import { COMPETITION_END_TIME } from '@/features/Competition/config/competitionTime';

import { useCompetitionSubmit } from '@/features/Competition/hooks/useCompetitionSubmit';
import { useCompetitionTimer } from '@/features/Competition/hooks/useCompetitionTimer';
import { useCompetitionData } from '@/features/Competition/hooks/useCompetitionData';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';
import { useAnswerStore } from '@/features/Competition/store/answerStore';

import { useEffect, useState } from 'react';

export interface Choice {
  order: number;
  content: string;
}
export interface Problem {
  id: number;
  number: number;
  title: string;
  description: string;
  choices: Choice[];
}

export default function Competition() {
  const { isSubmitted } = useCompetitionStore();
  const [showPointResult, setShowPointResult] = useState(false);
  const [currentTab, setCurrentTab] = useState(1);
  const [showTimeOverModal, setShowTimeOverModal] = useState(false);

  const { timeLeft } = useCompetitionTimer(isSubmitted, setShowTimeOverModal);
  useEffect(() => {
    if (isSubmitted === false && timeLeft <= 0) setShowTimeOverModal(true);
  }, [timeLeft]);

  const { competitionId } = useCompetitionStore();
  const { problems } = useCompetitionData(competitionId);

  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([0, 0, 0, 0, 0]);
  const notAnswered = selectedAnswers.every((answer) => answer !== 0);
  const isSolved = (index: number) => selectedAnswers[index] !== 0;

  const { answers } = useAnswerStore();

  const isCorrect = (index: number) => {
    // if (!isSubmitted) return undefined;
    // console.log("isCorrect index", index);
    const problemId = problems[index].id;
    return answers.find((a) => a.problemId === problemId)?.isCorrect;
  };
  useEffect(() => {
    console.log(problems);
    console.log("주스탠드에 저장된 answers: ", answers);
    const results = problems.map((_, idx) => isCorrect(idx));
    console.log('🧪 채점 결과:', results);
  }, [answers]);

  const { handleSubmitClick } = useCompetitionSubmit({
    problems,
    selectedAnswers,
    timeLeft,
    // setIsSubmitted,
    setShowPointResult,
  });

  return (
    <div className="flex flex-col justify-start items-center px-6 pt-8 min-h-[calc(100dvh-3.5rem)]">
      {/* 타이머 */}
      <div className="flex h-full min-h-[48px] max-h-[96px]">
        <div className="w-[17rem] mx-auto font-medium text-5xl px-8 mb-auto">
          <Timer UTC_DUE_TIME_MS={COMPETITION_END_TIME} mode="msms" stopTimer={isSubmitted}></Timer>
        </div>
      </div>
      <div className="flex justify-between items-stretch mt-2 w-full h-full">
        {/* 이전 버튼 */}
        {currentTab > 1 ? (
          <img
            src={MoveLeft}
            alt="이전 문제"
            className="h-16 my-auto cursor-pointer"
            onClick={() => setCurrentTab((prev) => Math.max(1, prev - 1))}
          />
        ) : (
          <div className="h-16 w-8 my-auto"></div>
        )}
        <div className="flex flex-col justify-between items-center w-[25rem] mx-auto min-h-[36rem] h-full">
          {/* 문제 */}
          <Tabs
            value={String(currentTab)}
            onValueChange={(val) => setCurrentTab(Number(val))}
            className="mb-auto w-full"
          >
            <TabsList>
              {problems.map((_problem, index: number) => (
                <TabsTrigger
                  key={index}
                  value={String(index + 1)}
                  variant="pill"
                  isSolved={isSolved(index)}
                  isCorrect={isSubmitted ? isCorrect(index) : undefined}
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
          {/* 제출 버튼 */}
          <Button
            variant="primary"
            label={isSubmitted ? '랭킹보러가기' : '제출하기'}
            fullWidth={true}
            disabled={!notAnswered}
            className="mt-4"
            onClick={() => handleSubmitClick(isSubmitted)}
          ></Button>
          <div className="h-12" />
        </div>
        {/* 다음 문제 */}
        {currentTab < 5 ? (
          <img
            src={MoveRight}
            alt="다음 문제"
            className="h-16 my-auto cursor-pointer"
            onClick={() => setCurrentTab((prev) => Math.min(5, prev + 1))}
          />
        ) : (
          <div className="h-16 w-8 my-auto"></div>
        )}
      </div>
      {showPointResult && <PointPopup points={5} />}
      <StateBasedModal
        open={showTimeOverModal}
        onOpenChange={setShowTimeOverModal}
        title="대회가 종료되었어요."
        description={<>곧 랭킹 페이지로 이동할게요.</>}
        actionText="바로 이동하기"
        cancelButton={false}
        onAction={() => {
          setShowTimeOverModal(false);
          window.location.href = '/competition';
        }}
      />
    </div>
  );
}
