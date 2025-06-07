import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

import { Button } from '@/components/ui/button';
import DailyBarChart from '@/features/Competition/utils/dailyChart';
import WeeklyBarChart from '@/features/Competition/utils/weeklyChart';
import MonthlyBarChart from '@/features/Competition/utils/monthlyChart';
import Timer from '@/features/Competition/components/timer';
import RankCardList from './components/rankCardList';
import MyRankCard from '@/features/Competition/components/myRankCard';

import { useTopRankings } from './hooks/useTopRanking';
import { useAuthStore } from '../Member/auth/store/auth';
import { safeGet } from '@/lib/request';

import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';
import { useCompetitionStore } from '@/features/Competition/store/competitionStore';

export default function Ranking() {
  const { competitionId, setCompetitionId } = useCompetitionStore();
  useEffect(() => {
    (async () => {
      const res = await safeGet('/api/v1/competitions/ids');
      if (res.status === 200) {
        setCompetitionId(res.data.competitionId);
      }
    })();
  }, [setCompetitionId]);

  const token = useAuthStore((state) => state.token);
  const [rankingView, setRankingView] = useState<'daily' | 'weekly' | 'monthly'>('daily');
  const [alreadyEntered, setAlreadyEntered] = useState(false);
  const { topRankings } = useTopRankings();

  const joined = async () => {
    const res = await safeGet(`/api/v1/competitions/${competitionId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (res.status === 200) {
      setAlreadyEntered(res.data.isParticipant);
    }
  };

  useEffect(() => {
    if (competitionId != null) {
      joined();
    }
  }, [competitionId]);

  const [competitionTime, setCompetitionTime] = useState(false);
  useEffect(() => {
    const now = new Date();
    const utcHours = now.getUTCHours();
    const utcMinutes = now.getUTCMinutes();
    const utcSeconds = now.getUTCSeconds();
    const currentSeconds = utcHours * 3600 + utcMinutes * 60 + utcSeconds;

    // 대회 운영 시간 여부
    const isCompetitionTime = currentSeconds >= 4 * 3600 && currentSeconds < 4 * 3600 + 10 * 60;
    setCompetitionTime(isCompetitionTime);
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

      {/* 랭킹 */}
      <div className="flex flex-col justify-center items-center mt-6">
        <>
          <div className="flex mx-auto">
            {rankingView === 'daily' ? (
              <DailyBarChart rankingData={topRankings.daily} />
            ) : (
              <>
                {rankingView === 'weekly' && (
                  <div className="flex-col">
                    <RankCardList
                      styleKeys={['green', 'red', 'blue']}
                      nicknames={['김춘식1', '김춘식2', '김춘식3']}
                    />
                    <MonthlyBarChart rankingData={topRankings.weekly} />
                  </div>
                )}
                {rankingView === 'monthly' && (
                  <div className="flex-col">
                    <RankCardList
                      styleKeys={['green', 'red', 'blue']}
                      nicknames={['김춘식1', '김춘식2', '김춘식3']}
                    />
                    <MonthlyBarChart rankingData={topRankings.monthly} />
                  </div>
                )}
              </>
            )}
          </div>

          {/* 내 랭킹 */}
          {token && <MyRankCard rankingView={rankingView} />}
        </>

        {/* 대회 입장 버튼 */}
        <div className="my-4 mx-auto">
          <Button
            label={
              competitionTime ? (
                alreadyEntered ? (
                  '이미 참여한 대회입니다.'
                ) : (
                  '대회 입장'
                )
              ) : (
                <Timer KST_DUE_TIME_MS={13 * 60 * 60 * 1000} />
              )
            }
            variant={competitionTime ? 'primary' : 'secondary'}
            disabled={!competitionTime || alreadyEntered || !token}
            onClick={() => {
              if (!token) {
                window.location.href = '/login';
                return;
              }
            }}
            className={`w-64 h-12 ${competitionTime ? 'text-xl text-text-primary ' : 'text-2xl disabled:opacity-100'} flex mx-auto rounded-xl font-normal`}
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
