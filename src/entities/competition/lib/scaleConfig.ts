// 타입 정의
type ScaleFns = {
  xScale: (_data: number) => number;
  yScale: (_rank: number, _paddingTop: number) => number;
};

interface ScaleConfig {
  isDaily: boolean;
  height: number;
  scaleFns: ScaleFns;
}

export type ChartType = 'daily' | 'periodic';

export const width = 440;
export const barHeight = 40;
export const gap = 4;

export const scaleConfigMap: Record<ChartType, ScaleConfig> = {
  daily: {
    isDaily: true,
    height: 436,
    scaleFns: {
      xScale: (data: number) => {
        return data === 0 ? width : data === 1 ? 0 : data === 2 ? 10 : data === 3 ? 20 : 30;
      },
      yScale: (rank: number, paddingTop: number) => {
        return (rank - 1) * barHeight + (rank - 1) * gap + paddingTop;
      },
    },
  },
  periodic: {
    isDaily: false,
    height: 304,
    scaleFns: {
      xScale: (data: number) => {
        return data === 0 ? width : 0;
      },
      yScale: (rank: number, paddingTop: number) => {
        return (rank - 4) * barHeight + (rank - 4) * gap + paddingTop;
      },
    },
  },
};
