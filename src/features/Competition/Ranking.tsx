import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import DailyBarChart from '@/features/Competition/utils/dailyChart';
import WeeklyBarChart from '@/features/Competition/utils/weeklyChart';
import MonthlyBarChart from '@/features/Competition/utils/monthlyChart';

import { toast } from '@/hooks/useToast';
import { useAuthStore } from '../Member/auth/store/auth';
import { instance as axios } from '../Member/auth/utils/axios';
import { safeGet, safePost } from '@/lib/request';

import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

const rankCardStyles = {
  green: { bgImage: 'week-green-rank.svg', height: '120px', marginTop: 'mt-5' },
  red: { bgImage: 'week-red-rank.svg', height: '128px', marginTop: 'mt-6' },
  blue: { bgImage: 'week-blue-rank.svg', height: '104px', marginTop: 'mt-[1.125rem]' },
};
const RankCard = ({
  styleKey,
  nickname,
}: {
  styleKey: keyof typeof rankCardStyles;
  nickname: string;
}) => {
  const { bgImage, height, marginTop } = rankCardStyles[styleKey];
  return (
    <div className={`w-1/3 h-[${height}] px-0.5`}>
      <div
        className={`h-full bg-no-repeat bg-[length:100%_100%] rounded-lg justify-between pt-2 pb-2`}
        style={{ backgroundImage: `url(/assets/${bgImage})` }}
      >
        <img
          src="/assets/no-profile.png"
          className={`w-8 h-8 mx-auto ${marginTop}`}
          alt="프로필 이미지"
        />
        <div className="flex items-center justify-center mx-auto">
          <img src="/assets/default.svg" className="w-4 h-4 mr-1" alt="뱃지 이미지" />
          <div>{nickname}</div>
        </div>
        <div className="text-[0.625rem] text-center">03.24.123</div>
        <div className="text-[0.625rem] text-center">5/5</div>
      </div>
    </div>
  );
};

const enterCompetition = async (token: string | null) => {
  try {
    const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/competitions`, null, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 204) {
      window.location.href = '/competition/entry';
    }
  } catch {
    toast({ title: '대회 참가에 실패했습니다.' });
  }
};

export default function Ranking() {
  const [competitionId, setCompetitionId] = useState<number | null>(null);
  useEffect(() => {
    (async () => {
      const res = await safeGet('/api/v1/competitions/ids');
      if (res.status === 200) {
        setCompetitionId(res.data.competitionId);
      }
    })();
  }, []);

  const token = useAuthStore((state) => state.token);
  const [rankingView, setRankingView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [enter, setEnter] = useState(false);

  const joined = async () => {
    const res = await safeGet(`/api/v1/competitions/${competitionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setEnter(!res.data.isParticipant);
    }
  };

  useEffect(() => {
    if (competitionId != null) {
      joined();
    }
  }, [competitionId]);

  const [competitionTime, setCompetitionTime] = useState(false);
  const [timeUntilStart, setTimeUntilStart] = useState('');

  useEffect(() => {
    const checkTime = () => {
      const now = new Date();
      const utcHours = now.getUTCHours();
      const utcMinutes = now.getUTCMinutes();
      const utcSeconds = now.getUTCSeconds();
      const currentSeconds = utcHours * 3600 + utcMinutes * 60 + utcSeconds;
      const startSeconds = (13 - 9) * 3600; // 13:00 KST = 04:00 UTC
      const endSeconds = startSeconds + 10 * 60; // 13:10 KST

      const isCompetitionTime = currentSeconds >= startSeconds && currentSeconds < endSeconds;
      setCompetitionTime(isCompetitionTime);

      const remainingSeconds = Math.max(currentSeconds - startSeconds, 0);
      const hours = String(Math.floor(remainingSeconds / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((remainingSeconds % 3600) / 60)).padStart(2, '0');
      const seconds = String(remainingSeconds % 60).padStart(2, '0');
      setTimeUntilStart(`${hours}:${minutes}:${seconds}`);
      // console.log(startSeconds, endSeconds);
      // console.log(remainingSeconds, minutes, seconds, `${minutes}:${seconds}`);
      // console.log(timeUntilStart);
    };

    checkTime();
    const interval = setInterval(checkTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="py-5">
      <div className="flex justify-between items-center px-6">
        <PiCaretLeft
          className={cn('w-7 h-7 cursor-pointer', rankingView === 'daily' && 'invisible')}
          onClick={() => setRankingView((prev) => (prev === 'weekly' ? 'daily' : 'weekly'))}
        />
        <div className="font-ria font-bold text-[2rem]">
          {rankingView === 'daily'
            ? '오늘의 TOP10'
            : rankingView === 'weekly'
              ? '주간 TOP10'
              : '월간 TOP10'}
        </div>
        <PiCaretRight
          className={cn('w-7 h-7 cursor-pointer', rankingView === 'monthly' && 'invisible')}
          onClick={() => setRankingView((prev) => (prev === 'daily' ? 'weekly' : 'monthly'))}
        />
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <>
          <div className="flex mx-auto">
            {rankingView === 'daily' ? (
              <DailyBarChart></DailyBarChart>
            ) : (
              <>
                {rankingView === 'weekly' && (
                  <div className="flex-col">
                    <motion.div
                      key="weekly"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="flex-col text-xs"
                    >
                      <div className="flex w-[440px] h-[128px] items-end mb-1">
                        <RankCard styleKey="green" nickname="김춘식1" />
                        <RankCard styleKey="red" nickname="김춘식1" />
                        <RankCard styleKey="blue" nickname="김춘식1" />
                      </div>
                    </motion.div>
                    <WeeklyBarChart />
                  </div>
                )}
                {rankingView === 'monthly' && (
                  <div className="flex-col">
                    <motion.div
                      key="monthly"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 1 }}
                      className="flex-col text-xs"
                    >
                      <div className="flex w-[440px] h-[128px] items-end mb-1">
                        <RankCard styleKey="green" nickname="김춘식1" />
                        <RankCard styleKey="red" nickname="김춘식3" />
                        <RankCard styleKey="blue" nickname="김춘식1" />
                      </div>
                    </motion.div>
                    <MonthlyBarChart />
                  </div>
                )}
              </>
            )}
          </div>

          {/* 내 랭킹 */}
          <div className="mb-1 text-sm font-bold tracking-tighter">. . .</div>
          <div className="w-[440px] h-[40px] rounded-md flex bg-[url('/assets/red-rank.svg')] bg-contain text-xs flex items-center px-2">
            <div className="pl-2 pr-3 font-bold">1</div>
            <img src="/assets/no-profile.png" className="w-8 h-8 mx-1.5" alt="프로필 이미지"></img>
            <img src="/assets/default.svg" className="w-4 h-4 mr-1" alt="뱃지 이미지"></img>
            <div className="mr-auto">김춘식1</div>
            <div className="text-[0.625rem] pr-6">03.24.123</div>
            <div className="text-[0.625rem] px-3">5/5</div>
          </div>
        </>

        {/* 대회 입장 버튼 */}
        <div className="my-4 mx-auto">
          <Button
            label={
              competitionTime
                ? enter
                  ? '대회 입장'
                  : '이미 참여한 대회입니다.'
                : `${timeUntilStart}`
            }
            variant="primary"
            disabled={!enter && !token}
            onClick={() => {
              if (!token) {
                window.location.href = '/login';
                return;
              }
              enterCompetition(token);
            }}
            className={`w-64 h-12 ${competitionTime ? 'text-xl' : 'text-2xl'} flex mx-auto rounded-xl font-normal`}
          />
          <div className="flex-col items-center m-2">
            {!token ? (
              <div className="flex text-text-secondary text-sm">
                <div>회원만 참여할 수 있어요. &nbsp;</div>
                <a href="/login" className="underline">
                  로그인하러가기
                </a>
              </div>
            ) : (
              <>
                <div className="text-text-primary text-sm text-center">
                  <b>🚨 제출하기 버튼</b>을 꼭 눌러주세요!
                </div>
                <div className="text-text-secondary text-xs text-center">
                  제출하기 버튼을 누르지 않은 경우 랭킹에 반영되지 않습니다.
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
