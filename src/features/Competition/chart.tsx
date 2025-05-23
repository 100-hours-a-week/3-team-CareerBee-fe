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
        bar = bar.data(data)
          .join(
            (enter) => enter.append("rect")
              .attr("id", d => `bar-${d.rank}`)
              .attr('fill', 'transparent')
              .attr('y', (data)=>(data.rank-1)*barHeight+(data.rank-1)*gap)
              .attr('x', width)
              .attr("width", width)
              .attr('height', barHeight)
              .attr('rx', 8)
              .attr('ry', 8)
              .attr("id", d => `bar-${d.nickname}`)
              .transition()
                .duration(transTime)
                .attr('x', (data) => xScale(data.value))
              ,
            (update) => update
              .attr('x', (data) => {
                const prevItem = prev.find(p => p.nickname === data.nickname);
                const prevValue = prevItem ? prevItem.value : 0;
                return xScale(prevValue);
              })
              .attr('y', (data) => {
                const prevItem = prev.find(p => p.nickname === data.nickname);
                const prevRank = prevItem ? prevItem.rank : dataLength;
                return (prevRank - 1) * barHeight + (prevRank - 1) * gap;
              })
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
            (exit) => exit.transition()
              .duration(transTime)
              .ease(d3.easeLinear)
              .remove()
              .attr('x', width)
              .attr("width", 0)
          )
          data.forEach(d => {
            defs.append("clipPath")
              .attr("id", `clip-bar-${d.nickname}`)
              .append("use")
              .attr("xlink:href", `#bar-${d.nickname}`);
          });
        }
    }

    function labels(svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>) {
      let label = svg.append("g")
          .style("font", "bold 12px var(--font-pretendard)")
          .attr("text-anchor", "end")
          .selectAll<SVGImageElement, chartProps>("image");

      return (data: chartProps[]) => {
        const dataLength=data.length;
        label = label.data(data)
        .join(
          (enter) => enter.append("image")
            .attr("preserveAspectRatio", "none")
            .attr("clip-path", d => `url(#clip-bar-${d.nickname})`)
            .attr('y', (data)=>(data.rank-1)*barHeight+(data.rank-1)*gap)
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
            .attr('x', (data) => {
              const prevItem = prev.find(p => p.nickname === data.nickname);
              const prevValue = prevItem ? prevItem.value : 0;
              return xScale(prevValue);
            })
            .attr('y', (data) => {
              const prevItem = prev.find(p => p.nickname === data.nickname);
              const prevRank = prevItem ? prevItem.rank : dataLength;
              return (prevRank - 1) * barHeight + (prevRank - 1) * gap;
            })
            .transition()
              .duration(transTime)
              .attr('y', (data) => (data.rank-1)*barHeight+(data.rank-1)*gap)
              .attr('x', (data) => xScale(data.value))
            ,
          (exit) => exit.transition()
              .duration(transTime)
              .ease(d3.easeLinear)
              .remove()
              .attr('x', width)
              .attr("width", 0)
        )
      }
  }
    const updateBars = bars(svg);
    const updateLabels = labels(svg);
    updateBars(mock[0]);
    updateLabels(mock[0]);
    prev = mock[0]
    setTimeout(() => {
      updateBars(mock[1]);
      updateLabels(mock[1]);

    }, 5000);

  }, []);

  return (
    <>
      <svg ref={svgRef}>    </svg>
    </>
  );
}
