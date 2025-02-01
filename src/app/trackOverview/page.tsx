// pages/trackOverview/page.tsx
"use client";
import React, { useState } from "react";
import Nav from "@/components/navbar";
import CombinedMap from "@/components/trackOverViewComponents/CombinedMap";
import { getSelectedTrackMaintenance, getSelectedTrackDetails } from "@/app/_utils/trackUtils";
import TrackMaintenanceChart from "@/components/trackOverViewComponents/TrackMaintenanceChart";
import TrackDetailsTable from "@/components/trackOverViewComponents/TrackDetailsTable";
import TrackCapacityChart from "@/components/trackOverViewComponents/TrackCapacityChart";
import { trackCapacityData } from "@/data/trackData";

export default function TrackOverview() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  const selectedMaintenanceData = getSelectedTrackMaintenance(selectedTrack);
  const selectedTrackDetails = getSelectedTrackDetails(selectedTrack);

  const maintenanceHistoryData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Maintenance Count",
        data: selectedMaintenanceData,
        backgroundColor: [
          "#66B168", "#6060E1", "#66B168", "#6060E1", "#66B168",
          "#6060E1", "#66B168", "#6060E1", "#66B168", "#6060E1",
          "#66B168", "#6060E1",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div>
      <Nav />
      <div className="p-6 bg-background text-foreground">
        <div className="mb-4 flex gap-4">
          <div>
            <label htmlFor="date" className="block mb-1 text-darkgrey font-medium">
              Select Date:
            </label>
            <input
              type="date"
              id="date"
              className="p-1.5 border rounded-md text-black"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="track" className="block mb-1 text-darkgrey font-medium">
              Select Track:
            </label>
            <select
              id="track"
              className="p-2 border rounded-md text-black"
              value={selectedTrack}
              onChange={(e) => setSelectedTrack(e.target.value)}
            >
              <option value="">Select Track</option>
              <option value="Track 1">Track 1</option>
              <option value="Track 2">Track 2</option>
              <option value="Track 3">Track 3</option>
              <option value="Track 4">Track 4</option>
              <option value="Track 5">Track 5</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <TrackMaintenanceChart data={maintenanceHistoryData} options={chartOptions} />
            <TrackDetailsTable details={selectedTrackDetails} />
          </div>
          <div className="lg:col-span-2 space-y-6">
            <div className="h-80 rounded-md bg-gray-200">
              <CombinedMap />
            </div>
            <TrackCapacityChart data={trackCapacityData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
}
