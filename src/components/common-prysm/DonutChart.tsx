"use client";

import { useState, useMemo } from "react";
import { PieChart, Pie, Cell, Sector } from "recharts";

type DonutData = {
  name: string;
  value: number;
  color?: string;
};

interface DonutChartProps {
  data: DonutData[];
}

const COLORS = [
  "#6366F1",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
  "#F97316",
];

export default function DonutChart({ data }: DonutChartProps) {
  const coloredData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      value: d.value,
      color: d.color || COLORS[Math.floor(Math.random() * COLORS.length)],
    }));
  }, [data]);

  const [active, setActive] = useState(coloredData[0]);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="relative flex items-center justify-center h-48 w-48 rounded-xl">
      <PieChart width={180} height={180}>
        <Pie
          data={coloredData}
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={80}
          paddingAngle={3}
          activeIndex={activeIndex}
          activeShape={(props: any) => (
            <Sector
              {...props}
              outerRadius={90} // hovered slice is bigger
            />
          )}
          dataKey="value"
          onMouseLeave={() => setActive(coloredData[0])}
        >
          {coloredData.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={entry.color}
              stroke={entry.color}
              className="border-none"
              onMouseEnter={() => {
                setActive(entry);
                setActiveIndex(index);
              }}
              style={{ cursor: "pointer" }}
            />
          ))}
        </Pie>
      </PieChart>

      {/* Center Text Overlay */}
      <div className="absolute text-center text-white">
        <p className="text-sm text-gray-400">{active.name}</p>
        <p className="text-2xl font-bold">{active.value}%</p>
      </div>
    </div>
  );
}
