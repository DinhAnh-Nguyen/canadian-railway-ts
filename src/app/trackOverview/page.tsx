"use client";
import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";

export default function TrackOverview() {
  // State for filters
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");
  const [capacityLevel, setCapacityLevel] = useState<string>("");

  // Mock data for bar charts
  const trackCapacityData = {
    labels: ["Track 1", "Track 2", "Track 3", "Track 4", "Track 5"],
    datasets: [
      {
        label: "Capacity (km)",
        data: [40, 60, 80, 100, 120],
        backgroundColor: "rgba(75,192,192,0.6)",
      },
    ],
  };

  const timelineData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Track Capacity Over Time",
        data: [50, 60, 70, 80, 90, 100],
        backgroundColor: "rgba(153,102,255,0.6)",
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="p-6 bg-background text-foreground">
      {/* Filters Section */}
      <div className="mb-6 flex flex-wrap gap-4">
        <div>
          <label htmlFor="date" className="block mb-1 font-medium">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            className="p-2 border rounded-md"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="track" className="block mb-1 font-medium">
            Track Section:
          </label>
          <select
            id="track"
            className="p-2 border rounded-md"
            value={selectedTrack}
            onChange={(e) => setSelectedTrack(e.target.value)}
          >
            <option value="">Select Track</option>
            <option value="Track 1">Track 1</option>
            <option value="Track 2">Track 2</option>
            <option value="Track 3">Track 3</option>
          </select>
        </div>
        <div>
          <label htmlFor="capacity" className="block mb-1 font-medium">
            Capacity Level:
          </label>
          <select
            id="capacity"
            className="p-2 border rounded-md"
            value={capacityLevel}
            onChange={(e) => setCapacityLevel(e.target.value)}
          >
            <option value="">Select Level</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Blank Map Box */}
        <div className="border rounded-md h-80 flex items-center justify-center bg-gray-200">
          <p className="text-gray-500">Map will be displayed here</p>
        </div>

        {/* Track Capacity Chart */}
        <div className="border rounded-md p-4 h-80">
          <h3 className="text-lg font-medium mb-4">Track Capacity Visualization</h3>
          <Bar data={trackCapacityData} options={chartOptions} />
        </div>
      </div>

      {/* Timeline Chart */}
      <div className="mt-6 border rounded-md p-4 h-80">
        <h3 className="text-lg font-medium mb-4">Timeline Visualization</h3>
        <Bar data={timelineData} options={chartOptions} />
      </div>
    </div>
  );
}
