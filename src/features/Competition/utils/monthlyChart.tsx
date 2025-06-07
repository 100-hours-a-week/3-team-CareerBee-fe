import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockChart } from '@/features/Competition/config/mock-chartdata';

import {
  ScaleFns,
  imageElement,
  textElement,
  bars,
  background,
} from '@/features/Competition/utils/chartUtils';

//목데이터
let prev = mockChart.slice(3, 10);
const mock = [mockChart.slice(3, 10)];

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

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0,0,${width},${height}`)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    const updateBars = bars(svg, defs, scaleFns);
    const updateBackground = background(svg, scaleFns);
    const updateRanks = textElement(
      svg,
      16,
      (barHeight + gap * 2) / 2,
      'rank',
      'bold',
      '12px',
      'rank',
      false,
      false,
      prev,
      scaleFns,
    );
    const updateProfileImg = imageElement(svg, 40, 4, 32, 'profileImgUrl', prev, scaleFns);
    const updateBadgeImg = imageElement(svg, 76, 12, 16, 'badgeImgUrl', prev, scaleFns);
    const updateNickname = textElement(
      svg,
      96,
      (barHeight + gap * 2) / 2,
      'nickname',
      '400',
      '12px',
      'nickname',
      false,
      false,
      prev,
      scaleFns,
    );
    const updateTime = textElement(
      svg,
      width - 116,
      (barHeight + gap * 2) / 2,
      'elapsedTime',
      '400',
      '10px',
      undefined,
      true,
      false,
      prev,
      scaleFns,
    );
    const updateSolved = textElement(
      svg,
      width - 36,
      (barHeight + gap * 2) / 2,
      'solvedCount',
      '400',
      '10px',
      undefined,
      true,
      true,
      prev,
      scaleFns,
    );
    updateBars(mock[0]);
    updateBackground(mock[0]);
    updateRanks(mock[0]);
    updateProfileImg(mock[0]);
    updateBadgeImg(mock[0]);
    updateNickname(mock[0]);
    updateTime(mock[0]);
    updateSolved(mock[0]);
    prev = mock[0];
  }, []);

  return (
    <>
      <svg ref={svgRef}> </svg>
    </>
  );
}
