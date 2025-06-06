import { useState, useEffect } from 'react';

export const useCompetitionTimer = (isSubmitted: boolean, setShowTimeOverModal: Function) => {
  const getInitialTimeLeft = () => {
    const now = new Date();
    const dueTime = new Date();
    dueTime.setHours(13, 10, 0, 0); //⏰ 대회 종료 시간
    const offset = 9 * 60 * 60 * 1000;
    return Math.max(0, dueTime.getTime() - offset - (now.getTime() - offset));
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (isSubmitted) return prev;
        if (prev <= 0) {
          clearInterval(interval);
          setShowTimeOverModal(true);
          return 0;
        }
        return prev - 50;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  return { timeLeft, setTimeLeft };
};
