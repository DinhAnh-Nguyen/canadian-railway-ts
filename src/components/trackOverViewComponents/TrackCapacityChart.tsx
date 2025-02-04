"use client";
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// Register required Chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, PointElement, Title, Tooltip, Legend);

export default function TrackCapacityChart({
  data,
  options,
}: {
  data: any;
  options: any;
}) {
  return (
    <div className="rounded-md p-2 bg-[#393A3E] h-80">
      <h3 className="text-center text-lg font-bold mb-4">Track Capacity</h3>
      <Line data={data} options={options} />
    </div>
  );
}
