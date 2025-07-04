import * as d3 from 'd3';
import { ChartProps } from '@/src/entities/competition/lib/chartProps';

import React from 'react';

const width = 440;
const barHeight = 40;
const transTime = 1000;

export const widthScale = (data: number) => {
  return data === 1 ? 440 : data === 2 ? 430 : data === 3 ? 420 : 410;
};

export interface ScaleFns {
  xScale: (_rank: number) => number;
  yScale: (_rank: number, _paddingTop: number) => number;
}

export const exitTransition = <El extends SVGElement, ParentEl extends d3.BaseType = SVGGElement>(
  sel: d3.Selection<El, ChartProps, ParentEl, unknown>,
  xPadding: number,
  scaleFns: ScaleFns,
) =>
  sel
    .transition()
    .duration(transTime / 2)
    .ease(d3.easeLinear)
    .attr('x', scaleFns.xScale(0) + xPadding)
    .attr('width', 0)
    .remove();

export const updateTransition = <El extends SVGElement, ParentEl extends d3.BaseType = SVGGElement>(
  sel: d3.Selection<El, ChartProps, ParentEl, unknown>,
  xPadding: number,
  yPaddingTop: number,
  alignRight: boolean = false,
  prev: ChartProps[],
  scaleFns: ScaleFns,
) => {
  sel
    .attr('x', (data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const prevValue = prevItem ? prevItem.rank : 0;
      return (alignRight ? 0 : scaleFns.xScale(prevValue)) + xPadding;
    })
    .attr('y', (data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const prevRank = prevItem ? prevItem.rank : data.rank;
      return scaleFns.yScale(prevRank, yPaddingTop);
    })
    .transition()
    .duration((data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const double = prevItem ? 1 : 2;
      return transTime * double;
    })
    .attr('y', (data) => scaleFns.yScale(data.rank, yPaddingTop))
    .attr('x', (data) => (alignRight ? 0 : scaleFns.xScale(data.rank)) + xPadding);
};

export const imageElement = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  xPadding: number,
  yPaddingTop: number,
  size: number,
  elem: string,
  prev: React.RefObject<ChartProps[]>,
  scaleFns: ScaleFns,
) => {
  let ImgElement = svg.append('g').selectAll<SVGImageElement, ChartProps>('image');

  return (data: ChartProps[]) => {
    ImgElement = ImgElement.data(data, (data) => data.nickname).join(
      (enter) =>
        enter
          .append('image')
          .attr('preserveAspectRatio', 'none')
          .attr('y', (data) => scaleFns.yScale(data.rank, yPaddingTop))
          .attr('x', scaleFns.xScale(0) + xPadding)
          .attr('width', size)
          .attr('height', size)
          .attr('href', (d) => d[elem as keyof ChartProps])
          .transition()
          .duration(transTime * 2)
          .attr('x', (data) => scaleFns.xScale(data.rank) + xPadding),
      (update) => {
        update.each(function (d) {
          if (prev.current === undefined || prev.current === null) {
            return;
          } else {
            const prevItem = prev.current.find((p) => p.nickname === d.nickname);
            if (prevItem!.rank !== d.rank) {
              update.attr('href', (d) => d[elem as keyof ChartProps]);
              updateTransition(update, xPadding, yPaddingTop, false, prev.current ?? [], scaleFns);
            }
          }
        });

        return update;
      },
      (exit) => exitTransition(exit, xPadding, scaleFns),
    );
  };
};

export const textElement = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  xPadding: number,
  yPaddingTop: number,
  elem: string,
  fontWeight: string,
  fontSize: string,
  alignRight: boolean = false,
  isSolved: boolean = false,
  prev: React.RefObject<ChartProps[]>,
  scaleFns: ScaleFns,
  isDaily: boolean = true,
  showContinuous: boolean = false,
) => {
  let textElement = svg
    .append('g')
    .style('font', `${fontWeight} ${fontSize} var(--font-pretendard)`)
    .attr('text-anchor', 'start')
    .selectAll<SVGTextElement, ChartProps>('text');

  return (data: ChartProps[]) => {
    textElement = textElement
      .data(data, (data) => data.nickname)
      .join(
        (enter) => {
          return enter
            .append('text')
            .attr('y', (data) => scaleFns.yScale(data.rank, yPaddingTop))
            .attr('x', scaleFns.xScale(0) + xPadding)
            .text(
              (d) =>
                d[elem as keyof ChartProps] +
                (isDaily
                  ? isSolved
                    ? '/5'
                    : ''
                  : isSolved
                    ? '%'
                    : showContinuous
                      ? '일 연속 참여'
                      : ''),
            )
            .transition()
            .duration(transTime * 2)
            .attr('x', (data) => (alignRight ? 0 : scaleFns.xScale(data.rank)) + xPadding);
        },
        (update) => {
          update.each(function (d) {
            if (prev.current === undefined || prev.current === null) {
              return;
            } else {
              const prevItem = prev.current.find((p) => p.nickname === d.nickname);
              const newValue =
                d[elem as keyof ChartProps] +
                (isDaily
                  ? isSolved
                    ? '/5'
                    : ''
                  : isSolved
                    ? '%'
                    : showContinuous
                      ? '일 연속 참여'
                      : '');
              if (prevItem!.rank !== d.rank) {
                d3.select(this).text(newValue);
                updateTransition(
                  update,
                  xPadding,
                  yPaddingTop,
                  alignRight,
                  prev.current ?? undefined,
                  scaleFns,
                );
              }
            }
          });

          return update;
        },
        (exit) => exitTransition(exit, xPadding, scaleFns),
      );
  };
};

export const bars = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  scaleFns: ScaleFns,
  isPeriodic: boolean = false,
) => {
  let bar = svg.append('g').selectAll<SVGRectElement, ChartProps>('rect');

  return (data: ChartProps[]) => {
    bar = bar
      .data(data, (data) => data.nickname)
      .join(
        (enter) =>
          enter
            .append('rect')
            .attr('id', (d) => `bar-${d.rank}`)
            .attr('fill', 'transparent')
            .attr('y', (data) => scaleFns.yScale(data.rank, 0))
            .attr('x', width)
            .attr('width', (data) => (isPeriodic ? 440 : widthScale(data.rank)))
            .attr('height', barHeight)
            .attr('rx', 8)
            .attr('ry', 8)
            .attr('id', (d) => `bar-${d.nickname}`)
            .transition()
            .duration(transTime * 2)
            .attr('x', (data) => scaleFns.xScale(data.rank)),
        (update) =>
          update
            .transition()
            .duration(transTime)
            .attr('y', (data) => scaleFns.yScale(data.rank, 0))
            .attr('x', (data) => scaleFns.xScale(data.rank))
            .attr('width', (data) => widthScale(data.rank)),
        (exit) => exitTransition(exit, 0, scaleFns),
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

export const background = (
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>,
  scaleFns: ScaleFns,
) => {
  let background = svg.append('g').selectAll<SVGImageElement, ChartProps>('image');

  return (data: ChartProps[]) => {
    background = background
      .data(data, (data) => data.nickname)
      .join(
        (enter) =>
          enter
            .append('image')
            .attr('preserveAspectRatio', 'none')
            .attr('clip-path', (d) => `url(#clip-bar-${d.nickname})`)
            .attr('x', width)
            .attr('y', (data) => scaleFns.yScale(data.rank, 0))
            .attr('width', width)
            .attr('height', barHeight)
            .attr('href', (d) => {
              if (d.rank === 1) return '/images/red-rank.svg';
              if (d.rank === 2) return '/images/green-rank.svg';
              if (d.rank === 3) return '/images/blue-rank.svg';
              return '/images/yellow-rank.svg'; // rank ≥ 4
            })
            .transition()
            .duration(transTime * 2)
            .attr('x', (data) => scaleFns.xScale(data.rank)),
        (update) =>
          update
            .attr('preserveAspectRatio', 'none')
            .attr('href', (d) => {
              if (d.rank === 1) return '/images/red-rank.svg';
              if (d.rank === 2) return '/images/green-rank.svg';
              if (d.rank === 3) return '/images/blue-rank.svg';
              return '/images/yellow-rank.svg'; // rank ≥ 4
            })
            .transition()
            .duration(transTime)
            .attr('x', (data) => scaleFns.xScale(data.rank))
            .attr('y', (data) => scaleFns.yScale(data.rank, 0)),
        (exit) => exitTransition(exit, 0, scaleFns),
      );
  };
};
