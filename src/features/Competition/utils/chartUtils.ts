import * as d3 from 'd3';

interface chartProps {
  rank: number;
  nickname: string;
  profileImgUrl: string;
  badgeImgUrl: string;
  elapsedTime: string;
  solvedCount: number;
}

const width = 440;
// const height = 436;
const barHeight = 40;
const gap = 4;
const transTime = 1000;

export const widthScale = (data: number) => {
  return data === 1 ? 440 : data === 2 ? 430 : data === 3 ? 420 : 410;
};
const xScale = (data: number) => {
  return data === 0 ? width : data === 1 ? 0 : data === 2 ? 10 : data === 3 ? 20 : 30;
};
const yScale = (data: number, paddingTop: number, scale: number) => {
  return (data - scale) * barHeight + (data - scale) * gap + paddingTop;
};

export const exitTransition = <El extends SVGElement, ParentEl extends d3.BaseType = SVGGElement>(
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

export const updateTransition = <El extends SVGElement, ParentEl extends d3.BaseType = SVGGElement>(
  sel: d3.Selection<El, chartProps, ParentEl, unknown>,
  xPadding: number,
  yPaddingTop: number,
  alignRight: boolean = false,
  prev: chartProps[],
  scale: number,
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
      return yScale(prevRank, yPaddingTop, scale);
    })
    .transition()
    .duration((data) => {
      const prevItem = prev.find((p) => p.nickname === data.nickname);
      const double = prevItem ? 1 : 2;
      return transTime * double;
    })
    .attr('y', (data) => yScale(data.rank, yPaddingTop, scale))
    .attr('x', (data) => (alignRight ? 0 : xScale(data.rank)) + xPadding);
};

export const imageElement = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  xPadding: number,
  yPaddingTop: number,
  size: number,
  elem: string,
  prev: chartProps[],
  scale: number,
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
            .attr('y', (data) => yScale(data.rank, yPaddingTop, scale))
            .attr('x', xScale(0) + xPadding)
            .attr('width', size)
            .attr('height', size)
            .attr('href', (d) => d[elem as keyof chartProps])
            .transition()
            .duration(transTime * 2)
            .attr('x', (data) => xScale(data.rank) + xPadding),
        (update) => {
          update.attr('href', (d) => d[elem as keyof chartProps]);
          updateTransition(update, xPadding, yPaddingTop, false, prev, scale);
          return update;
        },
        (exit) => exitTransition(exit, xPadding),
      );
  };
};

export const textElement = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  xPadding: number,
  yPaddingTop: number,
  elem: string,
  fontWeight: string,
  fontSize: string,
  base: string = 'nickname',
  alignRight: boolean = false,
  isSolved: boolean = false,
  prev: chartProps[],
  scale: number,
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
            .attr('y', (data) => yScale(data.rank, yPaddingTop, scale))
            .attr('x', xScale(0) + xPadding)
            .text((d) => d[elem as keyof chartProps] + (isSolved ? '/5' : ''))
            .transition()
            .duration(transTime * 2)
            .attr('x', (data) => (alignRight ? 0 : xScale(data.rank)) + xPadding),
        (update) => {
          update.text((d) => d[elem as keyof chartProps] + (isSolved ? '/5' : ''));
          updateTransition(update, xPadding, yPaddingTop, alignRight, prev, scale);
          return update;
        },
        (exit) => exitTransition(exit, xPadding),
      );
  };
};

export const bars = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
  scale: number,
) => {
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
            .attr('y', (data) => yScale(data.rank, 0, scale))
            .attr('x', width)
            .attr('width', (data) => widthScale(data.rank))
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
            .attr('y', (data) => yScale(data.rank, 0, scale))
            .attr('x', (data) => xScale(data.rank))
            .attr('width', (data) => widthScale(data.rank)),
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

export const background = (
  svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>,
  scale: number,
) => {
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
            .attr('y', (data) => yScale(data.rank, 0, scale))
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
            .attr('y', (data) => yScale(data.rank, 0, scale)),
        (exit) => exitTransition(exit, 0),
      );
  };
};
