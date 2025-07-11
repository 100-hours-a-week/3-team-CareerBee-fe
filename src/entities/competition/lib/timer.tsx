'use client';

import { DURATION } from '@/src/entities/competition/config/competitionTime';
import { useEffect, useState } from 'react';

interface TimerProps {
  UTC_DUE_TIME_MS: number;
  mode?: 'hms' | 'msms'; // 기본값은 'hms'
  stopTimer?: boolean;
}

export function checkTime(mode: 'ms' | 's' = 'ms') {
  const now = new Date();
  const utcHours = now.getUTCHours();
  const utcMinutes = now.getUTCMinutes();
  const utcSeconds = now.getUTCSeconds();
  const utcMilliseconds = now.getUTCMilliseconds();
  const currMs =
    utcHours * 60 * 60 * 1000 + utcMinutes * 60 * 1000 + utcSeconds * 1000 + utcMilliseconds;
  const currS = utcHours * 60 * 60 + utcMinutes * 60 + utcSeconds;

  return mode === 'ms' ? currMs : currS;
}
function formatToHMS(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export function formatToMS(milliseconds: number, millipad: number = 2) {
  const m = String(Math.floor(milliseconds / 60000)).padStart(2, '0');
  const s = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
  const ms = String(Math.floor((milliseconds % 1000) / 10) % 100).padStart(millipad, '0');
  return `${m}:${s}:${ms}`;
}

function avoidMinus(rawDiff: number, base: number) {
  return ((rawDiff % base) + base) % base;
}

function useCompetitionTimer(
  UTC_DUE_TIME_MS: number,
  mode: 'hms' | 'msms',
  stopTimer: boolean = false,
) {
  const [time, setTime] = useState('');

  const calcTimer = () => {
    if (mode === 'msms') {
      const currMs = checkTime('ms');
      const remainingMs = avoidMinus(UTC_DUE_TIME_MS - currMs, 24 * 60 * 60 * 1000);
      if (remainingMs < 0 || remainingMs > DURATION) return setTime('00:00:00');
      setTime(formatToMS(remainingMs));
    } else {
      const currS = checkTime('s');
      const UTC_DUE_TIME_S = Math.floor(UTC_DUE_TIME_MS / 1000);
      const remainingSeconds = avoidMinus(UTC_DUE_TIME_S - currS, 24 * 60 * 60);
      setTime(formatToHMS(remainingSeconds));
    }
  };

  useEffect(() => {
    if (stopTimer) return;

    calcTimer();

    const interval = setInterval(calcTimer, mode === 'msms' ? 50 : 1000);
    return () => clearInterval(interval);
  }, [mode, stopTimer]);

  return time;
}

export default function Timer({ UTC_DUE_TIME_MS, mode = 'hms', stopTimer = false }: TimerProps) {
  const timeUntilStart = useCompetitionTimer(UTC_DUE_TIME_MS, mode, stopTimer);
  return <div>{timeUntilStart}</div>;
}
