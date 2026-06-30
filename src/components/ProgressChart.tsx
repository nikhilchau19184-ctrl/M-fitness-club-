import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface DataPoint {
  date: Date;
  weight: number;
  bodyFat: number;
  strength: number;
}

const data: DataPoint[] = [
  { date: new Date(2026, 0, 1), weight: 82, bodyFat: 24, strength: 100 },
  { date: new Date(2026, 1, 1), weight: 80, bodyFat: 22, strength: 110 },
  { date: new Date(2026, 2, 1), weight: 78, bodyFat: 21, strength: 115 },
  { date: new Date(2026, 3, 1), weight: 77, bodyFat: 20, strength: 125 },
  { date: new Date(2026, 4, 1), weight: 75, bodyFat: 19, strength: 135 },
  { date: new Date(2026, 5, 1), weight: 74, bodyFat: 18, strength: 140 },
];

export function ProgressChart() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    // Clear previous chart
    d3.select(chartRef.current).selectAll('*').remove();

    const margin = { top: 20, right: 30, bottom: 30, left: 40 };
    const width = chartRef.current.clientWidth - margin.left - margin.right;
    const height = 300 - margin.top - margin.bottom;

    const svg = d3.select(chartRef.current)
      .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', `translate(${margin.left},${margin.top})`);

    // X axis
    const x = d3.scaleTime()
      .domain(d3.extent(data, d => d.date) as [Date, Date])
      .range([0, width]);
    
    svg.append('g')
      .attr('transform', `translate(0,${height})`)
      .call(d3.axisBottom(x).ticks(6).tickFormat(d3.timeFormat("%b") as any))
      .attr('color', '#52525b') // zinc-500
      .selectAll('text')
      .attr('class', 'text-xs font-mono');

    // Y axes
    const yLeft = d3.scaleLinear()
      .domain([60, 90])
      .range([height, 0]);
    
    const yRight = d3.scaleLinear()
      .domain([80, 160])
      .range([height, 0]);

    svg.append('g')
      .call(d3.axisLeft(yLeft).ticks(5))
      .attr('color', '#52525b')
      .selectAll('text')
      .attr('class', 'text-xs font-mono');

    // Add Grid lines
    svg.append('g')
      .attr('class', 'grid')
      .attr('color', '#1f1f1f')
      .style('stroke-dasharray', '3,3')
      .call(d3.axisLeft(yLeft)
        .tickSize(-width)
        .tickFormat(() => "")
      );

    // Line generators
    const weightLine = d3.line<DataPoint>()
      .x(d => x(d.date))
      .y(d => yLeft(d.weight))
      .curve(d3.curveMonotoneX);

    const bodyFatLine = d3.line<DataPoint>()
      .x(d => x(d.date))
      .y(d => yLeft(d.bodyFat))
      .curve(d3.curveMonotoneX);

    const strengthLine = d3.line<DataPoint>()
      .x(d => x(d.date))
      .y(d => yRight(d.strength))
      .curve(d3.curveMonotoneX);

    // Draw lines
    // Weight (Red)
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#ef4444') // red-500
      .attr('stroke-width', 3)
      .attr('d', weightLine);

    // Body Fat (Blue)
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#3b82f6') // blue-500
      .attr('stroke-width', 3)
      .attr('d', bodyFatLine);

    // Strength (Yellow)
    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', '#eab308') // yellow-500
      .attr('stroke-width', 3)
      .attr('d', strengthLine);

    // Add data points
    svg.selectAll('.dot-weight')
      .data(data)
      .enter().append('circle')
      .attr('class', 'dot-weight')
      .attr('cx', d => x(d.date))
      .attr('cy', d => yLeft(d.weight))
      .attr('r', 4)
      .attr('fill', '#ef4444')
      .attr('stroke', '#141414')
      .attr('stroke-width', 2);

  }, []);

  return (
    <div className="w-full">
      <div className="flex justify-center gap-6 mb-4">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Weight (kg)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-blue-500" />
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Body Fat %</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <span className="text-xs text-zinc-400 font-bold uppercase tracking-wider">Strength Gain</span>
        </div>
      </div>
      <div ref={chartRef} className="w-full h-[300px]" />
    </div>
  );
}
