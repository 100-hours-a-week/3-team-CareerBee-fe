'use client';

import { motion } from 'motion/react';
import noProfile from '@/public/images/no-profile.png';

import { useUserInfo } from '@/src/features/member/model/useUserInfo';
import { useMyRanking } from '@/src/entities/competition/api/useMyRanking';
import { useDailyMyPolling } from '@/src/features/competition/api/useDailyMyPolling';

import { useEffect, useState } from 'react';

const rankCardStyles = {
  1: { bgImage: 'red-rank.svg', width: '440px' },
  2: { bgImage: 'green-rank.svg', width: '430px' },
  3: { bgImage: 'blue-rank.svg', width: '420px' },
  default: { bgImage: 'yellow-rank.svg', width: '410px' },
};

interface MyRankCardProps {
  rankingView: 'daily' | 'weekly' | 'monthly';
  competitionTime: boolean;
}

export default function MyRankCard({ rankingView, competitionTime }: MyRankCardProps) {
  let { myRanking } = useMyRanking();
  const polling = useDailyMyPolling(competitionTime);

  const [dailyRanking, setDailyRanking] = useState(myRanking?.daily);

  useEffect(() => {
    if (!polling) return;
    setDailyRanking(polling);
  }, [polling]);

  useEffect(() => {
    if (!myRanking?.daily) return;
    setDailyRanking(myRanking?.daily);
  }, [myRanking?.daily]);

  const { data: userInfo } = useUserInfo();
  const currentRanking =
    rankingView === 'daily'
      ? dailyRanking
      : rankingView === 'weekly'
        ? myRanking?.weekly
        : myRanking?.monthly;

  if (!currentRanking) return null;

  const rank =
    rankingView === 'daily'
      ? dailyRanking?.rank
      : rankingView === 'weekly'
        ? myRanking?.weekly?.rank
        : myRanking?.monthly?.rank;
  const { bgImage, width } = rankCardStyles[rank as 1 | 2 | 3] ?? rankCardStyles.default;

  const score =
    rankingView === 'daily'
      ? `${dailyRanking?.solvedCount || 0}/5`
      : rankingView === 'weekly'
        ? `${myRanking?.weekly?.solvedCount}%`
        : `${myRanking?.monthly?.solvedCount}%`;

  const subInfo =
    rankingView === 'daily'
      ? dailyRanking?.elapsedTime
      : rankingView === 'weekly'
        ? `${myRanking?.weekly?.elapsedTime}일 연속 참여`
        : `${myRanking?.monthly?.elapsedTime}일 연속 참여`;

  return (
    <>
      <div className="mb-1 text-sm font-bold tracking-tighter">. . .</div>
      <div className="overflow-x-hidden w-[440px] justify-items-end">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          transition={{ duration: 2, ease: [0.4, 0, 0.7, 1] }}
          className="h-10 rounded-md flex text-xs items-center px-2 bg-cover"
          style={{
            width: rankingView === 'daily' ? width : '440px',
            backgroundImage: `url('/images/${bgImage}')`,
          }}
          key={rankingView}
        >
          <div className="pl-2 pr-3 font-bold">{rank}</div>
          <img
            src={userInfo?.profileUrl || noProfile.src}
            className="w-8 h-8 mx-1.5"
            alt="프로필 이미지"
          />
          <div className="mr-auto">{userInfo?.nickname || '닉네임'}</div>
          <div className="text-[0.625rem] pr-6">{subInfo}</div>
          <div className="text-[0.625rem] px-3">{score}</div>
        </motion.div>
      </div>
    </>
  );
}
