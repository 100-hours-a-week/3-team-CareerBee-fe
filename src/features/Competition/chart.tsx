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

const xScale = d3.scaleLinear([100, 0], [0, width])
const yScale = (data:number, paddingTop:number)=>{return (data-1)*barHeight+(data-1)*gap + paddingTop}

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
          const dataLength=data.length;
          const widthScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)!])
            .range([0, width]);
        bar = bar.data(data, data=>data.nickname)
          .join(
            (enter) => enter.append("rect")
              .attr("id", d => `bar-${d.rank}`)
              .attr('fill', 'transparent')
              .attr('y', (data)=>(data.rank-1)*barHeight+(data.rank-1)*gap)
              .attr('x', width)
              .attr("width", (data)=>widthScale(data.value))
              .attr('height', barHeight)
              .attr('rx', 8)
              .attr('ry', 8)
              .attr("id", d => `bar-${d.nickname}`)
              .transition()
                .duration(transTime)
                .attr('x', (data) => xScale(data.value))
              ,
            (update) => update
              // .attr('x', (data) => {
              //   const prevItem = prev.find(p => p.nickname === data.nickname);
              //   const prevValue = prevItem ? prevItem.value : 0;
              //   return xScale(prevValue);
              // })
              // .attr('y', (data) => {
              //   const prevItem = prev.find(p => p.nickname === data.nickname);
              //   const prevRank = prevItem ? prevItem.rank : dataLength;
              //   return (prevRank - 1) * barHeight + (prevRank - 1) * gap;
              // })
              .attr('width', (data) => {
                  const prevItem = prev.find(p => p.nickname === data.nickname);
                  const prevRank = prevItem ? prevItem.value : 0;
                  return widthScale(prevRank)
              })
              .transition()
                .duration(transTime)
                .attr('y', (data) => (data.rank-1)*barHeight+(data.rank-1)*gap)
                .attr('x', (data) => xScale(data.value))
                .attr('width', (data) => widthScale(data.value))
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
        const dataLength=data.length;
        image = image.data(data, data=>data.nickname)
        .join(
          (enter) => enter.append("image")
            .attr("preserveAspectRatio", "none")
            .attr("clip-path", d => `url(#clip-bar-${d.nickname})`)
            .attr('y', (data)=>yScale(data.rank, 0))
            .attr('x', width)
            .attr("width", width)
            .attr('height', barHeight)
            .attr("href", d => {
              if (d.rank === 1) return "/assets/red-rank.svg";
              if (d.rank === 2) return "/assets/green-rank.svg";
              if (d.rank === 3) return "/assets/blue-rank.svg";
              return "/assets/yellow-rank.svg"; // rank ≥ 4
            })
            .transition()
              .duration(transTime)
              .attr('x', (data) => xScale(data.value)),
          update => update
            .attr("preserveAspectRatio", "none")
            // .attr('x', (data) => {
            //   const prevItem = prev.find(p => p.nickname === data.nickname);
            //   const prevValue = prevItem ? prevItem.value : 0;
            //   return xScale(prevValue);
            // })
            // .attr('y', (data) => {
            //   const prevItem = prev.find(p => p.nickname === data.nickname);
            //   const prevRank = prevItem ? prevItem.rank : dataLength;
            //   return yScale(prevRank, 0);
            // })
            .attr("href", d => {
              if (d.rank === 1) return "/assets/red-rank.svg";
              if (d.rank === 2) return "/assets/green-rank.svg";
              if (d.rank === 3) return "/assets/blue-rank.svg";
              return "/assets/yellow-rank.svg"; // rank ≥ 4
            })
            .transition()
              .duration(transTime)
              .attr('y', (data) => yScale(data.rank, 0))
              .attr('x', (data) => xScale(data.value))
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
        const dataLength=data.length;
        const rankPadding=20;
        const yPaddingTop=(barHeight+gap*2)/2;
        rank = rank.data(data,  data=>data.rank)
        .join(
          (enter) => enter.append("text")
              .attr('y', (data)=>yScale(data.rank, yPaddingTop))
              .attr('x', xScale(0)+rankPadding)
              .text(d => d.rank)
              .transition()
                .duration(transTime)
                .attr('x', (data) => xScale(data.value)+rankPadding),
          update => update
            .attr('x', (data) => {
              const prevItem = prev.find(p => p.nickname === data.nickname);
              const prevValue = prevItem ? prevItem.value : 0;
              return xScale(prevValue)+rankPadding;
            })
            .attr('y', (data) => {
              const prevItem = prev.find(p => p.nickname === data.nickname);
              const prevRank = prevItem ? prevItem.rank : data.rank;
              return yScale(prevRank, yPaddingTop);
            })
            .transition()
              .duration(transTime)
              .attr('y', (data) => yScale(data.rank, yPaddingTop))
              .attr('x', (data) => xScale(data.value)+rankPadding)
            ,
          (exit) => exitTransition(exit)
        )
      }
    }

    
    const updateBars = bars(svg);
    const updateImages = images(svg);
    const updateRanks = ranks(svg);
    updateBars(mock[0]);
    updateImages(mock[0]);
    updateRanks(mock[0]);
    prev = mock[0]
    setTimeout(() => {
      updateBars(mock[1]);
      updateImages(mock[1]);
      updateRanks(mock[1]);
    }, 3000);

  }, []);

  return (
    <>
      <svg ref={svgRef}>    </svg>
    </>
  );
}
