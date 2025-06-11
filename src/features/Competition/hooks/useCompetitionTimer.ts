import { COMPETITION_END_TIME } from '@/features/Competition/config/competitionTime';

import { useCompetitionStore } from '@/features/Competition/store/competitionStore';

import { useState, useEffect } from 'react';

export const useCompetitionTimer = (isSubmitted: boolean, setShowTimeOverModal: Function) => {
  const { joinedTime, setJoinedTime } = useCompetitionStore();
  const getInitialTimeLeft = () => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    const utcMilliseconds = now.getUTCMilliseconds();
    const curr =
      utcHours * 60 * 60 * 1000 + utcMinutes * 60 * 1000 + utcSeconds * 1000 + utcMilliseconds;

    if (joinedTime === null) {
      setJoinedTime(COMPETITION_END_TIME - curr);
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
