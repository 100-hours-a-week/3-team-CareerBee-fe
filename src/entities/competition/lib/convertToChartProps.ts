import noProfile from '/assets/no-profile.png';
import { formatToMS } from '@/src/entities/competition/lib/timer';

import ChartProps from '@/src/entities/competition/lib/chartProps';

export const convertToTopChartProps = (data: any[], isDaily: boolean): ChartProps[] => {
  return data.map((item: any, index: number) => ({
    rank: index + 1,
    nickname: item.nickname,
    profileUrl: item.profileUrl ? item.profileUrl : noProfile,
    elapsedTime: isDaily ? formatToMS(item.elapsedTime) : String(item.continuous),
    solvedCount: isDaily ? item.solvedCount : Math.round(item.correctRate * 1000) / 1000,
  }));
};