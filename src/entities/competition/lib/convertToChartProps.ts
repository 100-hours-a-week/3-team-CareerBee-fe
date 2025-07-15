import noProfile from '@/public/images/no-profile.png';
import { formatToMS } from '@/src/entities/competition/lib/timer';

import { ChartProps, MyChartProps } from '@/src/entities/competition/lib/chartProps';

export const convertToTopChartProps = (data: any[], isDaily: boolean): ChartProps[] => {
  return data.map((item: any, index: number) => ({
    rank: index + 1,
    nickname: item.nickname,
    profileUrl: item.profileUrl ? item.profileUrl : noProfile.src,
    elapsedTime: isDaily ? formatToMS(item.elapsedTime) : String(item.continuous),
    solvedCount: isDaily ? item.solvedCount : Math.round(item.correctRate * 1000) / 1000,
  }));
};

export const convertToMyChartProps = (item: any, isDaily: boolean): MyChartProps => {
  if (!item) {
    return {
      rank: -1,
      elapsedTime: '-',
      solvedCount: 0,
    };
  }
  return {
    rank: item?.rank ?? -1,
    elapsedTime: isDaily ? formatToMS(item.elapsedTime) : String(item.continuous),
    solvedCount: isDaily ? item.solvedCount : item.correctRate,
  };
};
