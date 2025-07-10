import { COMPETITION_END_TIME } from '@/src/entities/competition/config/competitionTime';
import { checkTime } from '@/src/entities/competition/lib/timer';

import { useCompetitionStore } from '@/src/features/competition/model/competitionStore';

import { useState, useEffect } from 'react';

type UseCompetitionTimerProps = {
  isSubmitted: boolean;
  setShowTimeOverModal: (_val: boolean) => void;
};

export const useCompetitionTimer = ({
  isSubmitted,
  setShowTimeOverModal,
}: UseCompetitionTimerProps) => {
  const { setJoinedTime } = useCompetitionStore();
  const getInitialTimeLeft = () => {
    const curr = checkTime('ms');
    return Math.max(0, COMPETITION_END_TIME - curr);
  };

  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft());

  useEffect(() => {
    const now = new Date();
    const time = now.getTime();
    setJoinedTime(time);
  }, []);

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
