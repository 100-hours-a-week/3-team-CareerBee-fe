import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { mockChart } from './chartdata';
import { chartProps } from './chartdata';

const width = 440;
const height = 500;
const barSize = 40;

const x = d3.scaleLinear([0, 1], [0, width])
const y = d3.scaleBand()
  // .domain(mockChart.map((data) => data.rank) as Iterable<number>)
  .range([0, width])
  .padding(0.3);

export default function BarChart() {
  const svgRef = useRef<SVGSVGElement | null>(null);

  useEffect(() => {
    const svg = d3
      .select(svgRef.current)
      .attr('viewBox', `0,0,${width},${height}`);

    const bars = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let bar = svg
        .append("g")
        .selectAll<SVGRectElement, chartProps>("rect")

      return (data: chartProps[]) => bar = bar
        .data(data)
        .join(
          (enter) => enter
            .append("rect")
            .attr('fill', 'steelblue')
            .attr('y', (data) => (data.rank-1)*40+(data.rank-1)*2)
            .attr('x', 0)
            .attr("width", (data) => data.value)
            .attr('height', barSize),
          (update) => update,
          (exit) => exit.transition()
            .duration(250)
            .ease(d3.easeLinear)
            .remove()
            .attr('y', 440)
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
