"use client";
import React, { useState } from "react";
import Nav from "@/components/navbar";
import CombinedMap from "@/components/trackOverViewComponents/CombinedMap";
import { getSelectedTrackMaintenance, getSelectedTrackDetails } from "@/app/_utils/trackUtils";
import TrackMaintenanceChart from "@/components/trackOverViewComponents/TrackMaintenanceChart";
import TrackDetailsTable from "@/components/trackOverViewComponents/TrackDetailsTable";
import TrackCapacityChart from "@/components/trackOverViewComponents/TrackCapacityChart";
import SearchBar from "@/components/trackOverViewComponents/SearchBar";
import { trackDetails, trackCapacityData } from "@/data/trackData";

export default function TrackOverview() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  // Maintenance and details data
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
        {/* SearchBar Component */}
        <div className="mb-4">
        <SearchBar
          tracks={Object.keys(trackDetails)} // Pass track names
          onTrackSelect={(track) => setSelectedTrack(track)} // Update selected track
        />
        </div>

        <div className="mb-4 flex gap-4">
          {/* Select Date */}
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
        </div>

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <TrackMaintenanceChart data={maintenanceHistoryData} options={chartOptions} />
            <TrackDetailsTable details={selectedTrackDetails} />
          </div>

          {/* Right Column */}
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
