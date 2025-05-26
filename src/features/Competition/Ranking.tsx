import { useState } from 'react';
import { motion } from 'motion/react';
import DailyBarChart from '@/features/Competition/dailyChart';
import WeeklyBarChart from '@/features/Competition/weeklyChart';
import MonthlyBarChart from '@/features/Competition/monthlyChart';
import { PiCaretLeft, PiCaretRight } from 'react-icons/pi';
import { Button } from '@/components/ui/button';
import { useAuthStore } from '../Member/store/auth';
import { cn } from '@/lib/utils';

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
        className={`h-full bg-[url('/assets/${bgImage}')] bg-no-repeat bg-[length:100%_100%] rounded-lg justify-between pt-2 pb-2`}
      >
        <img src="/assets/no-profile.png" className={`w-8 h-8 mx-auto ${marginTop}`} />
        <div className="flex items-center justify-center mx-auto">
          <img src="/assets/default.svg" className="w-4 h-4 mr-1" />
          <div>{nickname}</div>
        </div>
        <div className="text-[0.625rem] text-center">03.24.123</div>
        <div className="text-[0.625rem] text-center">5/5</div>
      </div>
    </div>
  );
};

export default function Ranking() {
  const token = useAuthStore((state) => state.token);
  const [rankingView, setRankingView] = useState<'daily' | 'weekly' | 'monthly'>('daily');

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
            <img src="/assets/no-profile.png" className="w-8 h-8 mx-1.5"></img>
            <img src="/assets/default.svg" className="w-4 h-4 mr-1"></img>
            <div className="mr-auto">김춘식1</div>
            <div className="text-[0.625rem] pr-6">03.24.123</div>
            <div className="text-[0.625rem] px-3">5/5</div>
          </div>
        </>
        <div className="my-4 mx-auto">
          <Button
            label="00 : 00 : 00"
            variant="secondary"
            className="w-64 h-12 text-2xl flex mx-auto rounded-xl font-normal"
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
