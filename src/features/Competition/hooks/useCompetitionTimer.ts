import { COMPETITION_END_TIME } from '@/features/Competition/config/competitionTime';
import { checkTime } from '../components/timer';

import { useCompetitionStore } from '@/features/Competition/store/competitionStore';

import { useState, useEffect } from 'react';

export const useCompetitionTimer = (isSubmitted: boolean, setShowTimeOverModal: Function) => {
  const { joinedTime } = useCompetitionStore();
  const getInitialTimeLeft = () => {
    const curr = checkTime('ms');
    if (joinedTime === null) {
      return COMPETITION_END_TIME - curr;
    }
    return Math.max(0, COMPETITION_END_TIME - curr);
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
