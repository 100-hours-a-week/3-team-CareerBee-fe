import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Question from './components/question';
import MoveLeft from '@/features/Competition/image/caret-left.svg';
import MoveRight from '@/features/Competition/image/caret-right.svg';

export default function Competition() {
  // TODO: 대회 남은 시간으로 바꾸기
  const [timeLeft, setTimeLeft] = useState(60000);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
  return (
    <div className="flex flex-col justify-start items-center px-6 pt-8 min-h-[calc(100dvh-3.5rem)]">
      <div className="flex h-full min-h-[48px] max-h-[96px]">
        <div className="w-[20rem] mx-auto font-medium text-5xl px-8 mb-auto">
          {formatTime(timeLeft)}
        </div>
      </div>
      <div className="flex justify-between items-stretch mt-2 max-w-[552px] min-w-[352px] w-full h-full">
        <img src={MoveLeft} alt="뒤로가기" className="h-16 my-auto" />
        <div className="flex flex-col justify-between items-center max-w-[24rem] mx-auto min-h-[36rem] h-full">
          <Tabs defaultValue="1" className="mb-auto w-full">
            <TabsList>
              <TabsTrigger value="1" variant="pill" isSolved={isSolved(0)} isCorrect={undefined}>
                1
              </TabsTrigger>
              <TabsTrigger value="2" variant="pill" isSolved={isSolved(1)} isCorrect={undefined}>
                2
              </TabsTrigger>
              <TabsTrigger value="3" variant="pill" isSolved={isSolved(2)} isCorrect={undefined}>
                3
              </TabsTrigger>
              <TabsTrigger value="4" variant="pill" isSolved={isSolved(3)} isCorrect={undefined}>
                4
              </TabsTrigger>
              <TabsTrigger value="5" variant="pill" isSolved={isSolved(4)} isCorrect={undefined}>
                5
              </TabsTrigger>
            </TabsList>
            <TabsContent value="1" className="grow px-0">
              <Question
                value="1"
                selectedValue={selectedAnswers[0]}
                onChange={(val: string) => {
                  const next = [...selectedAnswers];
                  next[0] = val;
                  setSelectedAnswers(next);
                }}
                showExplanation={isSubmitted}
              />
            </TabsContent>
            <TabsContent value="2" className="grow px-0">
              <Question
                value="2"
                selectedValue={selectedAnswers[1]}
                onChange={(val: string) => {
                  const next = [...selectedAnswers];
                  next[1] = val;
                  setSelectedAnswers(next);
                }}
                showExplanation={isSubmitted}
              />
            </TabsContent>
            <TabsContent value="3" className="grow px-0">
              <Question
                value="3"
                selectedValue={selectedAnswers[2]}
                onChange={(val: string) => {
                  const next = [...selectedAnswers];
                  next[2] = val;
                  setSelectedAnswers(next);
                }}
                showExplanation={isSubmitted}
              />
            </TabsContent>
            <TabsContent value="4" className="grow px-0">
              <Question
                value="4"
                selectedValue={selectedAnswers[3]}
                onChange={(val: string) => {
                  const next = [...selectedAnswers];
                  next[3] = val;
                  setSelectedAnswers(next);
                }}
                showExplanation={isSubmitted}
              />
            </TabsContent>
            <TabsContent value="5" className="grow px-0">
              <Question
                value="5"
                selectedValue={selectedAnswers[4]}
                onChange={(val: string) => {
                  const next = [...selectedAnswers];
                  next[4] = val;
                  setSelectedAnswers(next);
                }}
                showExplanation={isSubmitted}
              />
            </TabsContent>
          </Tabs>
          <Button
            variant="primary"
            label={isSubmitted ? '랭킹보러가기' : '제출하기'}
            fullWidth={true}
            disabled={!notAnswered}
            className="mt-4"
            onClick={() => {
              setIsSubmitted(true);
            }}
          ></Button>
          <div className="h-12" />
        </div>
        <img src={MoveRight} alt="뒤로가기" className="h-16 my-auto" />
      </div>
    </div>
  );
}
