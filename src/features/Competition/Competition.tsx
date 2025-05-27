import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import Question from './components/question';
import MoveLeft from '@/features/Competition/image/caret-left.svg';
import MoveRight from '@/features/Competition/image/caret-right.svg';

export default function Competition() {
  // TODO: 대회 남은 시간으로 바꾸기
  const [timeLeft, setTimeLeft] = useState(60000);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 0) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 10);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (time: number) => {
    const minutes = String(Math.floor(time / 6000)).padStart(2, '0');
    const seconds = String(Math.floor((time % 6000) / 100)).padStart(2, '0');
    const hundredths = String(time % 100).padStart(2, '0');
    return `${minutes} : ${seconds} : ${hundredths}`;
  };

  return (
    <div className="flex flex-col justify-start items-center px-6 py-8 ">
      <div className="w-[330px] mx-auto font-medium text-5xl px-8 mb-16">
        {formatTime(timeLeft)}
      </div>
      <div className="flex justify-between items-center space-x-16">
        <img src={MoveLeft} alt="뒤로가기" className="h-18" />
        <div className="flex-col justify-between items-center w-full">
          <Tabs defaultValue="1" className="grow mb-16 w-full">
            <TabsList>
              <TabsTrigger value="1" variant="pill" isSolved={false} isCorrect={undefined}>
                1
              </TabsTrigger>
              <TabsTrigger value="2" variant="pill" isSolved={false} isCorrect={undefined}>
                2
              </TabsTrigger>
              <TabsTrigger value="3" variant="pill" isSolved={false} isCorrect={undefined}>
                3
              </TabsTrigger>
              <TabsTrigger value="4" variant="pill" isSolved={false} isCorrect={undefined}>
                4
              </TabsTrigger>
              <TabsTrigger value="5" variant="pill" isSolved={false} isCorrect={undefined}>
                5
              </TabsTrigger>
            </TabsList>
            <TabsContent value="1" className="grow">
              <Question value="1" />
            </TabsContent>
            <TabsContent value="2" className="grow">
              <Question value="2" />
            </TabsContent>
            <TabsContent value="3" className="grow">
              <Question value="3" />
            </TabsContent>
            <TabsContent value="4" className="grow">
              <Question value="4" />
            </TabsContent>
            <TabsContent value="5" className="grow">
              <Question value="5" />
            </TabsContent>
          </Tabs>
          <Button variant="secondary" label="제출하기" fullWidth={true}></Button>
        </div>
        <img src={MoveRight} alt="뒤로가기" className="h-18" />
      </div>
    </div>
  );
}
