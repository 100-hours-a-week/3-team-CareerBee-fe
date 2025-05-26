import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockChart } from './config/mock-chartdata';
import { mockChart2 } from './config/mock-chartdata2';

//목데이터
let prev = mockChart.slice(3, 10);
const mock = [mockChart.slice(3, 10), mockChart2.slice(3, 10)];

interface chartProps {
  rank: number;
  nickname: string;
  profileImgUrl: string;
  badgeImgUrl: string;
  elapsedTime: string;
  solvedCount: number;
}

const width = 440;
const height = 304;
const barHeight = 40;
const gap = 4;
const transTime = 1000;

const widthScale = () => {
  return 440;
};
const xScale = (data: number) => {
  return data === 0 ? width : 0;
};
const yScale = (data: number, paddingTop: number) => {
  return (data - 3 - 1) * barHeight + (data - 3 - 1) * gap + paddingTop;
};

const exitTransition = <El extends SVGElement, ParentEl extends d3.BaseType = SVGGElement>(
  sel: d3.Selection<El, chartProps, ParentEl, unknown>,
  xPadding: number,
) =>
  sel
    .transition()
    .duration(transTime / 2)
    .ease(d3.easeLinear)
    .attr('x', xScale(0) + xPadding)
    .attr('width', 0)
    .remove();

const updateTransition = <El extends SVGElement, ParentEl extends d3.BaseType = SVGGElement>(
  sel: d3.Selection<El, chartProps, ParentEl, unknown>,
  xPadding: number,
  yPaddingTop: number,
  alignRight: boolean = false,
) => {
  sel
    .attr('x', (data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const prevValue = prevItem ? prevItem.rank : 0;
      return (alignRight ? 0 : xScale(prevValue)) + xPadding;
    })
    .attr('y', (data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const prevRank = prevItem ? prevItem.rank : data.rank;
      return yScale(prevRank, yPaddingTop);
    })
    .transition()
    .duration((data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const double = prevItem ? 1 : 2;
      return transTime * double;
    })
    .attr('y', (data) => yScale(data.rank, yPaddingTop))
    .attr('x', (data) => (alignRight ? 0 : xScale(data.rank)) + xPadding);
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

    const bars = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      let bar = svg.append('g').selectAll<SVGRectElement, chartProps>('rect');

      return (data: chartProps[]) => {
        bar = bar
          .data(data, (data) => data.nickname)
          .join(
            (enter) =>
              enter
                .append('rect')
                .attr('id', (d) => `bar-${d.rank}`)
                .attr('fill', 'transparent')
                .attr('y', (data) => yScale(data.rank, 0))
                .attr('x', width)
                .attr('width', widthScale())
                .attr('height', barHeight)
                .attr('rx', 8)
                .attr('ry', 8)
                .attr('id', (d) => `bar-${d.nickname}`)
                .transition()
                .duration(transTime * 2)
                .attr('x', (data) => xScale(data.rank)),
            (update) =>
              update
                .transition()
                .duration(transTime)
                .attr('y', (data) => yScale(data.rank, 0))
                .attr('x', (data) => xScale(data.rank))
                .attr('width', widthScale()),
            (exit) => exitTransition(exit, 0),
          );
        data.forEach((d) => {
          defs
            .append('clipPath')
            .attr('id', `clip-bar-${d.nickname}`)
            .append('use')
            .attr('xlink:href', `#bar-${d.nickname}`);
        });
      };
    };

    const background = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) => {
      let background = svg.append('g').selectAll<SVGImageElement, chartProps>('image');

      return (data: chartProps[]) => {
        background = background
          .data(data, (data) => data.nickname)
          .join(
            (enter) =>
              enter
                .append('image')
                .attr('preserveAspectRatio', 'none')
                .attr('clip-path', (d) => `url(#clip-bar-${d.nickname})`)
                .attr('x', width)
                .attr('y', (data) => yScale(data.rank, 0))
                .attr('width', width)
                .attr('height', barHeight)
                .attr('href', (d) => {
                  if (d.rank === 1) return '/assets/red-rank.svg';
                  if (d.rank === 2) return '/assets/green-rank.svg';
                  if (d.rank === 3) return '/assets/blue-rank.svg';
                  return '/assets/yellow-rank.svg'; // rank ≥ 4
                })
                .transition()
                .duration(transTime * 2)
                .attr('x', (data) => xScale(data.rank)),
            (update) =>
              update
                .attr('preserveAspectRatio', 'none')
                .attr('href', (d) => {
                  if (d.rank === 1) return '/assets/red-rank.svg';
                  if (d.rank === 2) return '/assets/green-rank.svg';
                  if (d.rank === 3) return '/assets/blue-rank.svg';
                  return '/assets/yellow-rank.svg'; // rank ≥ 4
                })
                .transition()
                .duration(transTime)
                .attr('x', (data) => xScale(data.rank))
                .attr('y', (data) => yScale(data.rank, 0)),
            (exit) => exitTransition(exit, 0),
          );
      };
    };

    const imageElement = (
      svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
      xPadding: number,
      yPaddingTop: number,
      size: number,
      elem: string,
    ) => {
      let badgeImg = svg.append('g').selectAll<SVGImageElement, chartProps>('image');

      return (data: chartProps[]) => {
        badgeImg = badgeImg
          .data(
            data.filter((d) => d[elem as keyof chartProps]),
            (d) => d.nickname,
          )
          .join(
            (enter) =>
              enter
                .append('image')
                .attr('preserveAspectRatio', 'none')
                .attr('y', (data) => yScale(data.rank, yPaddingTop))
                .attr('x', xScale(0) + xPadding)
                .attr('width', size)
                .attr('height', size)
                .attr('href', (d) => d[elem as keyof chartProps])
                .transition()
                .duration(transTime * 2)
                .attr('x', (data) => xScale(data.rank) + xPadding),
            (update) => {
              update.attr('href', (d) => d[elem as keyof chartProps]);
              updateTransition(update, xPadding, yPaddingTop);
              return update;
            },
            (exit) => exitTransition(exit, xPadding),
          );
      };
    };

    const textElement = (
      svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
      xPadding: number,
      yPaddingTop: number,
      elem: string,
      fontWeight: string,
      fontSize: string,
      base: string = 'nickname',
      alignRight: boolean = false,
      isSolved: boolean = false,
    ) => {
      let textElement = svg
        .append('g')
        .style('font', `${fontWeight} ${fontSize} var(--font-pretendard)`)
        .attr('text-anchor', 'start')
        .selectAll<SVGTextElement, chartProps>('text');

      return (data: chartProps[]) => {
        textElement = textElement
          .data(data, (data) => data[base as keyof chartProps])
          .join(
            (enter) =>
              enter
                .append('text')
                .attr('y', (data) => yScale(data.rank, yPaddingTop))
                .attr('x', xScale(0) + xPadding)
                .text((d) => d[elem as keyof chartProps] + (isSolved ? '/5' : ''))
                .transition()
                .duration(transTime * 2)
                .attr('x', (data) => (alignRight ? 0 : xScale(data.rank)) + xPadding),
            (update) => {
              update.text((d) => d[elem as keyof chartProps] + (isSolved ? '/5' : ''));
              updateTransition(update, xPadding, yPaddingTop, alignRight);
              return update;
            },
            (exit) => exitTransition(exit, xPadding),
          );
      };
    };

    const updateBars = bars(svg);
    const updateBackground = background(svg);
    const updateRanks = textElement(
      svg,
      16,
      (barHeight + gap * 2) / 2,
      'rank',
      'bold',
      '12px',
      'rank',
    );
    const updateProfileImg = imageElement(svg, 40, 4, 32, 'profileImgUrl');
    const updateBadgeImg = imageElement(svg, 76, 12, 16, 'badgeImgUrl');
    const updateNickname = textElement(
      svg,
      96,
      (barHeight + gap * 2) / 2,
      'nickname',
      '400',
      '12px',
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
