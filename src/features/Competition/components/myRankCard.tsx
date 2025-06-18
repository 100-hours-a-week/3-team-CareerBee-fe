import { motion } from 'motion/react';
import noProfile from '/assets/no-profile.png';

import { useUserInfo } from '@/hooks/useUserInfo';
import { useMyRanking, useDailyMyPolling } from '@/features/Competition/hooks/useMyRanking';

const rankCardStyles = {
  1: { bgImage: 'red-rank.svg', width: '440px' },
  2: { bgImage: 'green-rank.svg', width: '432px' },
  3: { bgImage: 'blue-rank.svg', width: '424px' },
  default: { bgImage: 'yellow-rank.svg', width: '416px' },
};

interface MyRankCardProps {
  rankingView: 'daily' | 'weekly' | 'monthly';
  competitionTime: boolean;
}

export default function MyRankCard({ rankingView, competitionTime }: MyRankCardProps) {
  const { myRanking } = useMyRanking();
  useDailyMyPolling(competitionTime);

  const { data: userInfo } = useUserInfo();
  const currentRanking =
    rankingView === 'daily'
      ? myRanking?.daily
      : rankingView === 'weekly'
        ? myRanking?.weekly
        : myRanking?.monthly;

  if (!currentRanking) return null;

  const rank =
    rankingView === 'daily'
      ? myRanking?.daily?.rank
      : rankingView === 'weekly'
        ? myRanking?.weekly?.rank
        : myRanking?.monthly?.rank;
  const { bgImage, width } = rankCardStyles[rank as 1 | 2 | 3] ?? rankCardStyles.default;

  const score =
    rankingView === 'daily'
      ? `${myRanking?.daily?.solvedCount || 0}/5`
      : rankingView === 'weekly'
        ? `${myRanking?.weekly?.solvedCount}%`
        : `${myRanking?.monthly?.solvedCount}%`;

  const subInfo =
    rankingView === 'daily'
      ? myRanking?.daily?.elapsedTime
      : rankingView === 'weekly'
        ? `${myRanking?.weekly?.elapsedTime}일 연속 참여`
        : `${myRanking?.weekly?.elapsedTime}일 연속 참여`;

  return (
    <>
      <div className="mb-1 text-sm font-bold tracking-tighter">. . .</div>
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        transition={{ duration: 2, ease: [0.4, 0, 0.7, 1] }}
        className="h-10 rounded-md flex text-xs items-center bg-cover"
        style={{
          width,
          backgroundImage: `url('/assets/${bgImage}')`,
        }}
        key={rankingView}
      >
        <div className="pl-2 pr-3 font-bold">{rank}</div>
        <img
          src={userInfo?.profileUrl || noProfile}
          className="w-8 h-8 mx-1.5"
          alt="프로필 이미지"
        />
        <div className="mr-auto">{userInfo?.nickname || '닉네임'}</div>
        <div className="text-[0.625rem] pr-6">{subInfo}</div>
        <div className="text-[0.625rem] px-3">{score}</div>
      </motion.div>
    </>
  );
}
