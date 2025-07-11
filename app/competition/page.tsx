'use client';

import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';

import { Button } from '@/src/widgets/ui/button';
import LiveBarChart from '@/src/features/competition/ui/liveChart';
import StaticBarChart from '@/src/entities/competition/ui/staticChart';
import Timer, { checkTime } from '@/src/entities/competition/lib/timer';
import RankCardList from '@/src/entities/competition/ui/rankCardList';
import MyRankCard from '@/src/features/competition/ui/myRankCard';
import {
  COMPETITION_START_TIME,
  COMPETITION_END_TIME,
  AGGREGATE_TIME,
} from '@/src/entities/competition/config/competitionTime';
import AggregationNotice from '@/src/entities/competition/ui/aggregationNotice';

import { useTopRankings } from '@/src/entities/competition/api/useTopRanking';
import { useAuthStore } from '@/src/entities/auth/model/auth';
import { safeGet } from '@/src/shared/api/request';
import { useCompetitionStore } from '@/src/entities/competition/model/competitionStore';

import { cn } from '@/src/shared/lib/utils';
import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
  // 랭킹 데이터 가져오기
  const { data: topRankings } = useTopRankings();

  // 대회 운영 시간 여부
  const [competitionTime, setCompetitionTime] = useState(false);
  const [isAggregationTime, setIsAggregationTime] = useState(false);
  useEffect(() => {
    const check = () => {
      const curr = checkTime('ms');
      const isCompetitionTime = curr >= COMPETITION_START_TIME && curr < COMPETITION_END_TIME;
      setCompetitionTime(isCompetitionTime);
      setIsAggregationTime(
        curr < COMPETITION_END_TIME + AGGREGATE_TIME && curr > COMPETITION_END_TIME,
      );
    };

    check();

    const timer = setInterval(check, 1000);

    return () => clearInterval(timer);
  }, []);

  const [rankingView, setRankingView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

  const router = useRouter();
  // 일일 대회 id 조회
  const { competitionId, setCompetitionId, setIsSubmitted } = useCompetitionStore();
  useEffect(() => {
    const fetchCompetitionId = async () => {
      try {
        const res = await safeGet('/api/v1/competitions/ids');
        if (res.httpStatusCode === 200) {
          setCompetitionId(res.data.competitionId as number);
        }
      } catch (error) {
        console.error('Failed to fetch competition ID', error);
      }
    };
    void fetchCompetitionId();
  }, [setCompetitionId]);

  // 멤버별 대회 참가 여부 조회
  const [alreadyEntered, setAlreadyEntered] = useState(false);
  const token = useAuthStore((state) => state.token);
  const hasJoinedCompetition = useCallback(async () => {
    try {
      const res = await safeGet(`/api/v1/members/competitions/${competitionId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.httpStatusCode === 200) {
        setAlreadyEntered(res.data.isParticipant as boolean);
        setIsSubmitted(res.data.isParticipant as boolean);
      }
    } catch (error) {
      console.error('Failed to check competition participation', error);
    }
  }, [competitionId, token, setIsSubmitted]);

  useEffect(() => {
    if (competitionId != null && token) {
      void hasJoinedCompetition();
    }
  }, [competitionId, token, hasJoinedCompetition]);

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
              competitionTime ? (
                <LiveBarChart />
              ) : isAggregationTime ? (
                <AggregationNotice />
              ) : topRankings?.daily && topRankings?.daily.length > 0 ? (
                <StaticBarChart rankingData={topRankings?.daily} type="daily" />
              ) : (
                <div className="flex items-center h-[436px]">아직 랭킹 데이터가 없어요.</div>
              )
            ) : (
              <>
                {rankingView === 'weekly' && (
                  <div className="flex-col">
                    {topRankings?.weekly && topRankings?.weekly.length > 0 ? (
                      <>
                        <RankCardList
                          styleKeys={['green', 'red', 'blue']}
                          rankingData={[
                            topRankings?.weekly?.[1],
                            topRankings?.weekly?.[0],
                            topRankings?.weekly?.[2],
                          ]}
                        />
                        <StaticBarChart
                          rankingData={topRankings?.weekly?.slice(3)}
                          type="periodic"
                        />
                      </>
                    ) : isAggregationTime ? (
                      <AggregationNotice />
                    ) : (
                      <div className="flex items-center h-[436px]">아직 랭킹 데이터가 없어요.</div>
                    )}
                  </div>
                )}
                {rankingView === 'monthly' && (
                  <div className="flex-col">
                    {topRankings?.monthly && topRankings?.monthly.length > 0 ? (
                      <>
                        <RankCardList
                          styleKeys={['green', 'red', 'blue']}
                          rankingData={[
                            topRankings?.monthly?.[1],
                            topRankings?.monthly?.[0],
                            topRankings?.monthly?.[2],
                          ]}
                        />
                        <StaticBarChart
                          rankingData={topRankings?.monthly?.slice(3)}
                          type="periodic"
                        />
                      </>
                    ) : isAggregationTime ? (
                      <AggregationNotice />
                    ) : (
                      <div className="flex items-center h-[436px]">아직 랭킹 데이터가 없어요.</div>
                    )}
                  </div>
                )}
              </>
            )}
          </div>

          {/* 내 랭킹 */}
          {token && <MyRankCard rankingView={rankingView} competitionTime={competitionTime} />}
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
                <Timer UTC_DUE_TIME_MS={COMPETITION_START_TIME} />
              )
            }
            variant={competitionTime ? 'primary' : 'secondary'}
            disabled={!competitionTime || alreadyEntered || !token}
            onClick={() => {
              if (!token) {
                router.push('/login');
                return;
              }
              router.push('/competition/entry');
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
