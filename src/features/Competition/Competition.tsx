import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Question from './components/question';
import MoveLeft from '@/features/Competition/image/caret-left.svg';
import MoveRight from '@/features/Competition/image/caret-right.svg';
import PointPopup from '@/features/Competition/components/pointPopup';

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

  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(['', '', '', '', '']);
  const notAnswered = selectedAnswers.every((answer) => answer !== '');
  const isSolved = (index: number) => selectedAnswers[index] !== '';
  const isCorrect = (index: number) =>
    isSubmitted ? selectedAnswers[index] === 'radio1' : undefined;
  return (
    <div className="flex flex-col justify-start items-center px-6 pt-8 min-h-[calc(100dvh-3.5rem)]">
      <div className="flex h-full min-h-[48px] max-h-[96px]">
        <div className="w-[20rem] mx-auto font-medium text-5xl px-8 mb-auto">
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="flex justify-between items-stretch mt-2 w-full h-full">
        <img src={MoveLeft} alt="뒤로가기" className="h-16 my-auto" />
        <div className="flex flex-col justify-between items-center w-[25rem] mx-auto min-h-[36rem] h-full">
          <Tabs defaultValue="1" className="mb-auto w-full">
            <TabsList>
              {[1, 2, 3, 4, 5].map((num, index) => (
                <TabsTrigger
                  key={num}
                  value={String(num)}
                  variant="pill"
                  isSolved={isSolved(index)}
                  isCorrect={isCorrect(index)}
                >
                  {num}
                </TabsTrigger>
              ))}
            </TabsList>
            {[1, 2, 3, 4, 5].map((num, index) => (
              <TabsContent key={num} value={String(num)} className="h-[31.25rem] px-0">
                <Question
                  value={String(num)}
                  selectedValue={selectedAnswers[index]}
                  onChange={(val: string) => {
                    const next = [...selectedAnswers];
                    next[index] = val;
                    setSelectedAnswers(next);
                  }}
                  showExplanation={isSubmitted}
                  answer="radio1"
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
