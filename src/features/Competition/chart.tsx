import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockChart } from './chartdata';
import { mockChart2 } from './chartdata2';
import { chartProps } from './chartdata';

//목데이터
let prev = mockChart;
const mock = [mockChart, mockChart2]

const width = 440;
const height = 500;
const barHeight = 40;
const gap = 4;
const transTime = 1000;

const widthScale = (data: number) => {
  if (data === 1) return 440;
  if (data === 2) return 430;
  if (data === 3) return 420;
  return 410; // rank ≥ 4
}
const xScale = (data:number)=>{
  if (data === 0) return width;
  if (data === 1) return 0;
  if (data === 2) return 10;
  if (data === 3) return 20;
  return 30; // rank ≥ 4
}
const yScale = (data:number, paddingTop:number)=>{
  return (data-1)*barHeight+(data-1)*gap + paddingTop;
}

const exitTransition = <
  El extends SVGElement,
  ParentEl extends d3.BaseType = SVGGElement
>(
  sel: d3.Selection<El, chartProps, ParentEl, unknown>
) =>
  sel.transition()
    .duration(transTime/2)
    .ease(d3.easeLinear)
    .attr('x', width)
    .attr('width', 0)
    .remove();

const updateTransition = <
  El extends SVGElement,
  ParentEl extends d3.BaseType = SVGGElement
>(
  sel: d3.Selection<El, chartProps, ParentEl, unknown>,
  xPadding: number,
  yPaddingTop: number
) =>{
  sel
  .attr('x', (data) => {
    const prevItem = prev.find(p => p.nickname === data.nickname);
    const prevValue = prevItem ? prevItem.rank : 0;
    return xScale(prevValue)+xPadding;
  })
  .attr('y', (data) => {
    const prevItem = prev.find(p => p.nickname === data.nickname);
    const prevRank = prevItem ? prevItem.rank : data.rank;
    return yScale(prevRank, yPaddingTop);
  })
  .transition()
    .duration((data) => {
    const prevItem = prev.find(p => p.nickname === data.nickname);
    const double = prevItem ? 1 : 2;
    return transTime*double;
  })
    .attr('y', (data) => yScale(data.rank, yPaddingTop))
    .attr('x', (data) => xScale(data.rank)+xPadding)
}


export default function BarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0,0,${width},${height}`)
      .attr("width", width)
      .attr("height", height);

    const defs = svg.append("defs");

    const bars = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let bar = svg
        .append("g")
        .selectAll<SVGRectElement, chartProps>("rect")
        
        return (data: chartProps[]) => {
        bar = bar.data(data, data=>data.nickname)
          .join(
            (enter) => enter.append("rect")
              .attr("id", d => `bar-${d.rank}`)
              .attr('fill', 'transparent')
              .attr('y', (data)=>yScale(data.rank, 0))
              .attr('x', width)
              .attr("width", (data)=>widthScale(data.rank))
              .attr('height', barHeight)
              .attr('rx', 8)
              .attr('ry', 8)
              .attr("id", d => `bar-${d.nickname}`)
              .transition()
                .duration(transTime*2)
                .attr('x', (data) => xScale(data.rank))
              ,
            (update) => update
              .transition()
                .duration(transTime)
                .attr('y', (data)=>yScale(data.rank, 0))
                .attr('x', (data) => xScale(data.rank))
                .attr('width', (data) => widthScale(data.rank))
              ,
            (exit) => exitTransition(exit)
          )
          data.forEach(d => {
            defs.append("clipPath")
              .attr("id", `clip-bar-${d.nickname}`)
              .append("use")
              .attr("xlink:href", `#bar-${d.nickname}`);
          });
        }
    }

    const images = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let image = svg.append("g")
          .selectAll<SVGImageElement, chartProps>("image");

      return (data: chartProps[]) => {
        image = image.data(data, data=>data.nickname)
        .join(
          (enter) => enter.append("image")
            .attr("preserveAspectRatio", "none")
            .attr("clip-path", d => `url(#clip-bar-${d.nickname})`)
            .attr('x', width)
            .attr('y', (data)=>yScale(data.rank, 0))
            .attr("width", width)
            .attr('height', barHeight)
            .attr("href", d => {
              if (d.rank === 1) return "/assets/red-rank.svg";
              if (d.rank === 2) return "/assets/green-rank.svg";
              if (d.rank === 3) return "/assets/blue-rank.svg";
              return "/assets/yellow-rank.svg"; // rank ≥ 4
            })
            .transition()
              .duration(transTime*2)
              .attr('x', (data) => xScale(data.rank)),
          update => update
            .attr("preserveAspectRatio", "none")
            .attr("href", d => {
              if (d.rank === 1) return "/assets/red-rank.svg";
              if (d.rank === 2) return "/assets/green-rank.svg";
              if (d.rank === 3) return "/assets/blue-rank.svg";
              return "/assets/yellow-rank.svg"; // rank ≥ 4
            })
            .transition()
              .duration(transTime)
              .attr('x', (data) => xScale(data.rank))
              .attr('y', (data) => yScale(data.rank, 0))
            ,
            (exit) => exitTransition(exit)
        )
      }
    }

    const ranks = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let rank = svg.append("g")
          .style("font", "bold 12px var(--font-pretendard)")
          .attr("text-anchor", "end")
          .selectAll<SVGTextElement, chartProps>("text");

      return (data: chartProps[]) => {
        const xPadding=20;
        const yPaddingTop=(barHeight+gap*2)/2;
        rank = rank.data(data,  data=>data.rank)
        .join(
          (enter) => enter.append("text")
              .attr('y', (data)=>yScale(data.rank, yPaddingTop))
              .attr('x', xScale(0)+xPadding)
              .text(d => d.rank)
              .transition()
                .duration(transTime*2)
                .attr('x', (data) => xScale(data.rank)+xPadding),
          (update) => {
            updateTransition(update, xPadding, yPaddingTop);
            return update;
          },
          (exit) => exitTransition(exit)
        )
      }
    }

    const profileImg = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let profileImg = svg.append("g")
          .selectAll<SVGImageElement, chartProps>("image");

      return (data: chartProps[]) => {
        const xPadding=32;
        const yPaddingTop=4;
        profileImg = profileImg.data(data, data=>data.nickname)
        .join(
          (enter) => enter.append("image")
            .attr("preserveAspectRatio", "none")
            .attr('y', (data)=>yScale(data.rank, yPaddingTop))
            .attr('x', xScale(0)+xPadding)
            .attr("width", 32)
            .attr('height', 32)
            .attr("href", d => d.profileImgUrl)
            .transition()
              .duration(transTime*2)
              .attr('x', (data) => xScale(data.rank)+xPadding),
          (update) => {
            updateTransition(update, xPadding, yPaddingTop);
            return update;
          },
          (exit) => exitTransition(exit)
        )
      }
    }
    
    const badgeImg = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let badgeImg = svg.append("g")
          .selectAll<SVGImageElement, chartProps>("image");

      return (data: chartProps[]) => {
        const xPadding=68;
        const yPaddingTop=12;
        badgeImg = badgeImg.data(data.filter(d => d.badgeImgUrl), d => d.nickname)
        .join(
          (enter) => enter.append("image")
            .attr("preserveAspectRatio", "none")
            .attr('y', (data)=>yScale(data.rank, yPaddingTop))
            .attr('x', xScale(0)+xPadding)
            .attr("width", 16)
            .attr('height', 16)
            .attr("href", d => d.badgeImgUrl)
            .transition()
              .duration(transTime*2)
              .attr('x', (data) => xScale(data.rank)+xPadding),
          (update) => {
            updateTransition(update, xPadding, yPaddingTop);
            return update;
          },
          (exit) => exitTransition(exit)
        )
      }
    }
    
    const nickname = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let nickname = svg.append("g")
          .style("font", "bold 12px var(--font-pretendard)")
          .attr("text-anchor", "end")
          .selectAll<SVGTextElement, chartProps>("text");

      return (data: chartProps[]) => {
        const xPadding=124;
        const yPaddingTop=(barHeight+gap*2)/2;
        nickname = nickname.data(data,  data=>data.nickname)
        .join(
          (enter) => enter.append("text")
              .attr('y', (data)=>yScale(data.rank, yPaddingTop))
              .attr('x', xScale(0)+xPadding)
              .text(d => d.nickname)
              .transition()
                .duration(transTime*2)
                .attr('x', (data) => xScale(data.rank)+xPadding),
          (update) => {
            updateTransition(update, xPadding, yPaddingTop);
            return update;
          },
          (exit) => exitTransition(exit)
        )
      }
    }

    const updateBars = bars(svg);
    const updateImages = images(svg);
    const updateRanks = ranks(svg);
    const updateProfileImg = profileImg(svg);
    const updateBadgeImg = badgeImg(svg);
    const updateNickname = nickname(svg);
    updateBars(mock[0]);
    updateImages(mock[0]);
    updateRanks(mock[0]);
    updateProfileImg(mock[0]);
    updateBadgeImg(mock[0]);
    updateNickname(mock[0]);
    prev = mock[0]
    setTimeout(() => {
      updateBars(mock[1]);
      updateImages(mock[1]);
      updateRanks(mock[1]);
      updateProfileImg(mock[1]);
      updateBadgeImg(mock[1]);
      updateNickname(mock[1]);
    }, 3000);

  }, []);

  return (
    <>
      <svg ref={svgRef}>    </svg>
    </>
  );
}
