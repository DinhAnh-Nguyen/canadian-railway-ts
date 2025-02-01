// components/TrackMaintenanceChart.tsx
import React from "react";
import { Bar } from "react-chartjs-2";

export default function TrackMaintenanceChart({ data, options }: { data: any; options: any }) {
  return (
    <div className="h-80 rounded-md p-12 bg-[#393A3E]">
      <h3 className="text-center text-lg font-bold mb-4">Track Maintenance History</h3>
      <Bar data={data} options={options} />
    </div>
  );
}
