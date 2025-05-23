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
      .attr("fill-opacity", 0.6)
      .attr("width", width)
      .attr("height", height);
    // svg.selectAll("*").remove();

    const defs = svg.append("defs");
    
    const setBackground = (
      defs: d3.Selection<SVGDefsElement, unknown, null, undefined>,
      data: chartProps[]
    )=>{
      defs.selectAll("*").remove();
      const dataLength=mock.length;
      data.forEach((data, i) => {
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
          // .attr("x", width)
            .attr("x", xScale(data.value))

          .attr('y', (data.rank-1)*barHeight+(data.rank-1)*gap)

          // .attr('y', (dataLength-1)*barHeight+(dataLength-1)*gap)
          // .transition()
          //   .duration(transTime)
          //   // .attr("x", y(data.value))
          //   .attr("y", 0);
      });
    }
    
    const bars = (svg: d3.Selection<SVGSVGElement | null, unknown, null, undefined>)=>{
      let bar = svg
        .append("g")
        .selectAll<SVGRectElement, chartProps>("rect")
        
        
        return (data: chartProps[]) => {
          const dataLength=data.length;
          const widthScale = d3.scaleLinear()
            .domain([0, d3.max(data, d => d.value)!])
            .range([0, width]);
        // setBackground(defs);   //🖌️배경 적용 시 크기
        bar = bar.data(data)
          .join(
            (enter) => enter
              .append("rect")
              // .attr('fill', (_, i) => `url(#pattern-${i})`)
              .attr('fill',  'red')
              .attr('y', (data)=>(data.rank-1)*barHeight+(data.rank-1)*gap)
              .attr('x', width)
              .attr("width", 0)
              .attr('height', barHeight)
              .attr('rx', 8)
              .attr('ry', 8)
              .transition()
                .duration(transTime)
                .attr('x', (data) => xScale(data.value))
                .attr('width', (data) => widthScale(data.value))
              ,
            (update) => update
              .attr('fill', 'blue')
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
        }
      }

    const bar = bars(svg);
    bar(mock[0]);

    prev = mock[0]
    setTimeout(() => {
        bar(mock[1]);
    }, 5000);

  }, []);

  return (
    <>
      <svg ref={svgRef}>    </svg>
    </>
  );
}
