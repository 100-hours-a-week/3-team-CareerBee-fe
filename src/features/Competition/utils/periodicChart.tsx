import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
// import { mockChart } from '@/features/Competition/config/mock-chartdata';

import {
  ScaleFns,
  imageElement,
  textElement,
  bars,
  background,
} from '@/features/Competition/utils/chartUtils';
import { ChartProps } from '@/features/Competition/hooks/useTopRanking';

// //목데이터
// let prev = mockChart.slice(3, 10);
// const mock = [mockChart.slice(3, 10)];

const width = 440;
const height = 304;
const barHeight = 40;
const gap = 4;

const scaleFns: ScaleFns = {
  xScale: (data: number) => {
    return data === 0 ? width : 0;
  },
  yScale: (rank: number, paddingTop: number) => {
    return (rank - 4) * barHeight + (rank - 4) * gap + paddingTop;
  },
};

export default function BarChart({ rankingData }: { rankingData: ChartProps[] }) {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const prev = useRef<ChartProps[]>([]);

  const updateBars = useRef<((_data: ChartProps[]) => void) | null>(null);
  const updateBackground = useRef<((_data: ChartProps[]) => void) | null>(null);
  const updateRanks = useRef<((_data: ChartProps[]) => void) | null>(null);
  const updateProfileImg = useRef<((_data: ChartProps[]) => void) | null>(null);
  const updateNickname = useRef<((_data: ChartProps[]) => void) | null>(null);
  const updateTime = useRef<((_data: ChartProps[]) => void) | null>(null);
  const updateSolved = useRef<((_data: ChartProps[]) => void) | null>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0,0,${width},${height}`)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    updateBars.current = bars(svg, defs, scaleFns, true);
    updateBackground.current = background(svg, scaleFns);
    updateRanks.current = textElement(
      svg,
      16,
      (barHeight + gap * 2) / 2,
      'rank',
      'bold',
      '12px',
      false,
      false,
      prev,
      scaleFns,
    );
    updateProfileImg.current = imageElement(svg, 40, 4, 32, 'profileUrl', prev, scaleFns);
    updateNickname.current = textElement(
      svg,
      96,
      (barHeight + gap * 2) / 2,
      'nickname',
      '400',
      '12px',
      false,
      false,
      prev,
      scaleFns,
    );
    updateTime.current = textElement(
      svg,
      width - 116,
      (barHeight + gap * 2) / 2,
      'elapsedTime',
      '400',
      '10px',
      true,
      false,
      prev,
      scaleFns,
      false,
      true,
    );
    updateSolved.current = textElement(
      svg,
      width - 36,
      (barHeight + gap * 2) / 2,
      'solvedCount',
      '400',
      '10px',
      true,
      true,
      prev,
      scaleFns,
      false,
    );
    updateBars.current?.(rankingData);
    updateBackground.current?.(rankingData);
    updateRanks.current?.(rankingData);
    updateProfileImg.current?.(rankingData);
    updateNickname.current?.(rankingData);
    updateTime.current?.(rankingData);
    updateSolved.current?.(rankingData);
  }, []);

  return (
    <>
      <svg ref={svgRef}> </svg>
    </>
  );
}
