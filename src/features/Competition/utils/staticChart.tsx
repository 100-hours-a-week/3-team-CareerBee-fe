import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

import {
  imageElement,
  textElement,
  bars,
  background,
} from '@/features/Competition/utils/chartUtils';
import { ChartType, width, barHeight, gap, scaleConfigMap } from '../config/scaleConfig';
import { ChartProps } from '@/features/Competition/hooks/useTopRanking';

export default function BarChart({
  rankingData,
  type,
}: {
  rankingData: ChartProps[];
  type: ChartType;
}) {
  const height = scaleConfigMap[type].height;
  const scaleFns = scaleConfigMap[type].scaleFns;

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

    updateBars.current = bars(svg, defs, scaleFns, !scaleConfigMap[type].isDaily);
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
      scaleConfigMap[type].isDaily,
      !scaleConfigMap[type].isDaily,
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
      scaleConfigMap[type].isDaily,
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
