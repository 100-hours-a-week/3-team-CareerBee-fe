import noProfile from '/assets/no-profile.png';

import { useUserInfo } from '@/hooks/useUserInfo';
import { useMyRanking } from '@/features/Competition/hooks/useMyRanking';

interface MyRankCardProps {
  rankingView: 'daily' | 'weekly' | 'monthly';
}

export default function MyRankCard({ rankingView }: MyRankCardProps) {
  const { myRanking } = useMyRanking();
  const { data: userInfo } = useUserInfo();

  if (
    (rankingView === 'daily' && !myRanking.daily) ||
    (rankingView === 'weekly' && !myRanking.weekly) ||
    (rankingView === 'monthly' && !myRanking.monthly)
  ) {
    return <></>;
  }
  const rank =
    rankingView === 'daily'
      ? myRanking.daily?.rank
      : rankingView === 'weekly'
        ? myRanking.weekly?.rank
        : myRanking.monthly?.rank;

  const score =
    rankingView === 'daily'
      ? `${myRanking.daily?.solvedCount || 0} /5`
      : rankingView === 'weekly'
        ? `${myRanking.weekly?.correctRate}%`
        : `${myRanking.monthly?.correctRate}%`;

  const subInfo =
    rankingView === 'daily'
      ? myRanking.daily?.elapsedTime
      : rankingView === 'weekly'
        ? myRanking.weekly?.continuous
        : myRanking.monthly?.continuous;

  return (
    <>
      <div className="mb-1 text-sm font-bold tracking-tighter">. . .</div>
      <div className="w-[440px] h-[40px] rounded-md flex bg-[url('/assets/red-rank.svg')] bg-contain text-xs flex items-center px-2">
        <div className="pl-2 pr-3 font-bold">{rank}</div>
        <img
          src={userInfo?.profileUrl || noProfile}
          className="w-8 h-8 mx-1.5"
          alt="프로필 이미지"
        />
        <img src="/assets/default.svg" className="w-4 h-4 mr-1" alt="뱃지 이미지" />
        <div className="mr-auto">{userInfo?.nickname || '닉네임'}</div>
        <div className="text-[0.625rem] pr-6">{subInfo}</div>
        <div className="text-[0.625rem] px-3">{score}</div>
      </div>
    </>
  );
}
