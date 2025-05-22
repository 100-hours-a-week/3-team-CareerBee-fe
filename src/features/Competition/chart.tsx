import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockChart } from './chartdata';
import { chartProps } from './chartdata';

const width = 440;
const height = 500;
const barHeight = 40;
const gap = 4;
const transTime = 1000;
const x = d3.scaleLinear([0, 1], [0, width])
const y = d3.scaleLinear([11, 1], [0, width])
  // .domain(mockChart.map((data) => data.rank) as Iterable<number>)
  .range([0, width])
  // .padding(0.3);

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0,0,${width},${height}`);

    svg.selectAll("*").remove();

    const defs = svg.append("defs");

    // Define a unique pattern per data item based on its rank/index
    mockChart.forEach((data, i) => {
      const color = data.rank <= 1 ? 'red' : data.rank <= 2 ? 'green' : data.rank <= 3 ? 'blue' : 'yellow';
      defs.append("pattern")
        .attr("id", `pattern-${i}`)
        .attr("patternUnits", "userSpaceOnUse")
        .attr("width", width)
        .attr("height", barHeight+gap)
        .attr("x", 0) // Ensure pattern x is explicitly set to 0
        .append("image")
        .attr("href", `/assets/${color}-rank.svg`)
        .attr("width", width)
        .attr("height", barHeight)
        .attr("preserveAspectRatio", "none")
        .attr("x", width)
        .transition()
          .duration(transTime)
          .attr("x", width - y(data.rank)); // Add 1px left margin to avoid cropping
    });

    const bars = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let bar = svg
        .append("g")
        .selectAll<SVGRectElement, chartProps>("rect")

      return (data: chartProps[]) => bar = bar
        .data(data)
        .join(
          (enter) => enter
            .append("rect")
            .attr('fill', (_, i) => `url(#pattern-${i})`)
            .attr('y', (data) => (data.rank-1)*barHeight+(data.rank-1)*gap)
            .attr('x', width)
            .attr("width", 0)
            .attr('height', barHeight)
            .attr('rx', 8)
            .attr('ry', 8)  
            .transition()
              .duration(transTime)
              .attr('x', (data) => width - y(data.rank))
              .attr('width', (data) => y(data.rank)),      
          (update) => update,
          (exit) => exit.transition()
            .duration(transTime)
            .ease(d3.easeLinear)
            .remove()
            .attr('x', width)
            .attr("width", 0)
        )
      }

    const bar = bars(svg);
    bar(mockChart);

  }, []);

  return (
    <>
      <svg ref={svgRef}>    </svg>
    </>
  );
}
