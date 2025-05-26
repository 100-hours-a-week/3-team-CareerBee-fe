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
    </div>
  );
}
