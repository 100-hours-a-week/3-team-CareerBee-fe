import { useEffect, useState } from 'react';

interface TimerProps {
  KST_DUE_TIME_MS: number;
  mode?: 'hms' | 'msms'; // 기본값은 'hms'
}

function formatToHMS(seconds: number) {
  const h = String(Math.floor(seconds / 3600)).padStart(2, '0');
  const m = String(Math.floor((seconds % 3600) / 60)).padStart(2, '0');
  const s = String(seconds % 60).padStart(2, '0');
  return `${h}:${m}:${s}`;
}

function formatToMS(milliseconds: number) {
  const m = String(Math.floor(milliseconds / 60000)).padStart(2, '0');
  const s = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
  const ms = String(Math.floor((milliseconds % 1000) / 10) % 100).padStart(2, '0');
  return `${m}:${s}:${ms}`;
}

function useCompetitionTimer(KST_DUE_TIME_MS: number, mode: 'hms' | 'msms') {
  const [time, setTime] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const currentMs = now.getTime() % (24 * 60 * 60 * 1000);
      const startUTC = KST_DUE_TIME_MS - 9 * 60 * 60 * 1000;

      const remainingMs = startUTC - currentMs;

      if (mode === 'msms') {
        if (remainingMs < 0 || remainingMs > 10 * 60 * 1000) return setTime('00:00:00');
        setTime(formatToMS(remainingMs));
      } else {
        const utcHours = now.getUTCHours();
        const utcMinutes = now.getUTCMinutes();
        const utcSeconds = now.getUTCSeconds();
        const currentSeconds = utcHours * 3600 + utcMinutes * 60 + utcSeconds;
        let startUTCSeconds = Math.floor(startUTC / 1000);

        if (currentSeconds >= startUTCSeconds + 10 * 60) {
          startUTCSeconds += 24 * 3600;
        }

        const remainingSeconds = startUTCSeconds - currentSeconds;
        setTime(formatToHMS(remainingSeconds));
      }
    };

    checkTime();
    const interval = setInterval(checkTime, mode === 'msms' ? 50 : 1000);
    return () => clearInterval(interval);
  }, [KST_DUE_TIME_MS, mode]);

  return time;
}

export default function Timer({ KST_DUE_TIME_MS, mode = 'hms' }: TimerProps) {
  const timeUntilStart = useCompetitionTimer(KST_DUE_TIME_MS, mode);
  return <div>{timeUntilStart}</div>;
}
