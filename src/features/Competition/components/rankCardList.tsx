import { motion } from 'motion/react';

const rankCardStyles = {
  green: { bgImage: 'week-green-rank.svg', height: '120px', marginTop: 'mt-5' },
  red: { bgImage: 'week-red-rank.svg', height: '128px', marginTop: 'mt-6' },
  blue: { bgImage: 'week-blue-rank.svg', height: '104px', marginTop: 'mt-[1.125rem]' },
};

type RankCardProps = {
  styleKey: keyof typeof rankCardStyles;
  nickname: string;
};

const RankCard = ({ styleKey, nickname }: RankCardProps) => {
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

type RankCardListProps = {
  styleKeys: ('green' | 'red' | 'blue')[];
  nicknames: string[];
};

export default function RankCardList({ styleKeys, nicknames }: RankCardListProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
      className="flex-col text-xs"
    >
      <div className="flex w-[440px] h-[128px] items-end mb-1">
        {styleKeys.map((key, idx) => (
          <RankCard key={idx} styleKey={key} nickname={nicknames[idx]} />
        ))}
      </div>
    </motion.div>
  );
}
