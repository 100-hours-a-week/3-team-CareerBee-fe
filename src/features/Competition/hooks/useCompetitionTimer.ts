import { useState, useEffect } from 'react';
import {
  // COMPETITION_START_TIME,
  COMPETITION_END_TIME,
} from '@/features/Competition/config/competitionTime';

export const useCompetitionTimer = (isSubmitted: boolean, setShowTimeOverModal: Function) => {
  const getInitialTimeLeft = () => {
    const now = new Date().getTime();
    return Math.max(0, COMPETITION_END_TIME - now);
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
