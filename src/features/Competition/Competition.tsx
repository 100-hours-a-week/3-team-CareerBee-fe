import { useEffect, useState } from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

export default function Competition() {
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
    <div className="flex-col justify-center items-center px-6 py-8">
      <div className="font-medium text-5xl px-8 mb-14">{formatTime(timeLeft)}</div>
      <div className="flex justify-between items-center w-full">
        <Tabs defaultValue="1" className="grow mt-4 w-full">
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
            <div className="flex-col items-center justify-center h-full">
              <>
                <div className="flex font-bold py-4">
                  <div>01.</div>
                  <div className="pl-3">CPU 스케줄링을 고르시오.</div>
                </div>
                <div className="w-full">타임 슬라이스(Time Slice)를 일정하게 설정하고 각 프로세스가 정해진 시간 동안 CPU를 사용한 뒤에는 큐의 맨 뒤로 이동하여 대기하도록 하는 선점형 스케줄링 알고리즘은 무엇인지 고르세요</div>
              </>
              <></>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
