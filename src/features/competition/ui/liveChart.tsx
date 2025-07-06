import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { useState } from 'react';
import { useDailyTopPolling } from '@/src/features/competition/api/useDailyTopPolling';

import {
  imageElement,
  textElement,
  bars,
  background,
} from '@/src/entities/competition/model/chartUtils';
import { width, barHeight, gap, scaleConfigMap } from '@/src/entities/competition/lib/scaleConfig';
import ChartProps from '@/src/entities/competition/lib/chartProps';

const height = scaleConfigMap.daily.height;
const scaleFns = scaleConfigMap.daily.scaleFns;

export default function BarChart() {
  const { data: topRankings } = useDailyTopPolling();
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [rankingData, setRankingData] = useState<ChartProps[]>(topRankings?.daily ?? []);
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
      .select(svgRef.current!)
      .attr('viewBox', `0,0,${width},${height}`)
      .attr('width', width)
      .attr('height', height);

    const defs = svg.append('defs');

    updateBars.current = bars(svg, defs, scaleFns);
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
      true,
    );
  }, []);

  useEffect(() => {
    if (!rankingData) return;
    updateBars.current?.(rankingData);
    updateBackground.current?.(rankingData);
    updateRanks.current?.(rankingData);
    updateProfileImg.current?.(rankingData);
    updateNickname.current?.(rankingData);
    updateTime.current?.(rankingData);
    updateSolved.current?.(rankingData);
    prev.current = rankingData;
  }, [rankingData]);

  useEffect(() => {
    if (topRankings?.daily) {
      setRankingData(topRankings.daily);
    }
  }, [topRankings]);

  return (
    <>
      <svg ref={svgRef}></svg>
    </>
  );
}
