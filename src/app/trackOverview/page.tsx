"use client";
import React, { useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import "chart.js/auto";
import Nav from "@/components/navbar";
import CombinedMap from "@/components/CombinedMap"; 

export default function TrackOverview() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  // Mock data for track maintenance history
  const trackMaintenanceData = {
    "Track 1": [5, 8, 6, 10, 9, 7, 8, 6, 10, 12, 11, 9],
    "Track 2": [4, 7, 5, 9, 8, 6, 7, 5, 9, 11, 10, 8],
    "Track 3": [6, 9, 7, 11, 10, 8, 9, 7, 11, 13, 12, 10],
    "Track 4": [3, 6, 4, 8, 7, 5, 6, 4, 8, 10, 9, 7],
    "Track 5": [7, 10, 8, 12, 11, 9, 10, 8, 12, 14, 13, 11],
  };

// Mock data for track details
  const trackDetails = {
    "Track 1": {
      name: "Main - Operational - Freight and Tourist",
      location: "Alberta, Laggan, Canadian Pacific",
      identifier: "0b345a08a0db4a3eb944443b259396cb",
      mode: "Train",
      subdivision1: "Laggan",
      subdivision2: "Calgary",
      length: "136.60 Mile",
    },
    "Track 2": {
      name: "Secondary - Operational - Passenger",
      location: "Ontario, Toronto, Canadian National",
      identifier: "0a234b06a1cb4b3fb945533b269396cc",
      mode: "Train",
      subdivision1: "Toronto",
      subdivision2: "Niagara",
      length: "120.45 Mile",
    },
    "Track 3": {
      name: "Light Rail - Urban Transport",
      location: "British Columbia, Vancouver, TransLink",
      identifier: "1c456d09c2dc5c4fc946623c379397cd",
      mode: "Light Rail",
      subdivision1: "Vancouver",
      subdivision2: "Richmond",
      length: "85.20 Mile",
    },
    "Track 4": {
      name: "Cargo - Industrial Use",
      location: "Quebec, Montreal, VIA Rail",
      identifier: "2d567e12d3ed6d5fd957713d489398de",
      mode: "Train",
      subdivision1: "Montreal",
      subdivision2: "Quebec City",
      length: "150.30 Mile",
    },
    "Track 5": {
      name: "High Speed Rail",
      location: "Ontario, Ottawa, Canadian National",
      identifier: "3e678f13e4fe7e6ge968823e599399ef",
      mode: "High Speed Train",
      subdivision1: "Ottawa",
      subdivision2: "Toronto",
      length: "200.00 Mile",
    },
  };

  
  // Get maintenance data for the selected track
const selectedMaintenanceData = selectedTrack
? trackMaintenanceData[selectedTrack]
: trackMaintenanceData["Track 1"];

// Update maintenance history chart data
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

// Get selected track details
const selectedTrackDetails = selectedTrack
? trackDetails[selectedTrack]
: trackDetails["Track 1"];


// Setup Data for Track Capacity
const trackCapacityData = {
  labels: [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ],
  datasets: [
    {
      label: "Track 1",
      data: [200, 220, 210, 250, 240, 230, 260, 300, 320, 350, 370, 400],
      borderColor: "rgba(255, 99, 132, 1)",
      fill: false,
    },
    {
      label: "Track 2",
      data: [170, 190, 220, 230, 250, 240, 250, 260, 270, 320, 330, 370],
      borderColor: "rgba(54, 162, 235, 1)",
      fill: false,
    },
    {
      label: "Track 3",
      data: [130, 170, 180, 200, 210, 180, 190, 220, 270, 300, 320, 340],
      borderColor: "rgba(255, 206, 86, 1)",
      fill: false,
    },
    {
      label: "Track 4",
      data: [150, 150, 160, 180, 190, 200, 220, 230, 250, 270, 290, 310],
      borderColor: "rgba(75, 192, 192, 1)",
      fill: false,
    },
    {
      label: "Track 5",
      data: [150, 145, 150, 160, 170, 190, 210, 230, 240, 260, 280, 300],
      borderColor: "rgba(153, 102, 255, 1)",
      fill: false,
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
        {/* Filters Section */}
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

        {/* Main Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-1 space-y-6">
            <div className="h-80 rounded-md p-12 bg-[#393A3E]">
              <h3 className="text-center text-lg font-bold mb-4">Track Maintenance History</h3>
              <Bar data={maintenanceHistoryData} options={chartOptions} />
            </div>
            <div className="rounded-md p-2 bg-[#393A3E]">
              <h3 className="text-center text-lg font-bold mb-4">Selected Track Details</h3>
              <div className="overflow-hidden rounded-md border">
                <table className="w-full text-sm">
                <tbody>
                      <tr className="bg-black text-white">
                        <td className="p-2 font-medium">Railway Track</td>
                        <td className="p-2">{selectedTrackDetails.name}</td>
                      </tr>
                      <tr className="bg-gray-800 text-gray-200">
                        <td className="p-2 font-medium">Location</td>
                        <td className="p-2">{selectedTrackDetails.location}</td>
                      </tr>
                      <tr className="bg-black text-white">
                        <td className="p-2 font-medium">Identifier</td>
                        <td className="p-2">{selectedTrackDetails.identifier}</td>
                      </tr>
                      <tr className="bg-gray-800 text-gray-200">
                        <td className="p-2 font-medium">Track Mode</td>
                        <td className="p-2">{selectedTrackDetails.mode}</td>
                      </tr>
                      <tr className="bg-black text-white">
                        <td className="p-2 font-medium">Subdivision 1</td>
                        <td className="p-2">{selectedTrackDetails.subdivision1}</td>
                      </tr>
                      <tr className="bg-gray-800 text-gray-200">
                        <td className="p-2 font-medium">Subdivision 2</td>
                        <td className="p-2">{selectedTrackDetails.subdivision2}</td>
                      </tr>
                      <tr className="bg-gray-800 text-gray-200">
                        <td className="p-2 font-medium">Length</td>
                        <td className="p-2">{selectedTrackDetails.length}</td>
                      </tr>
                    </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-2 space-y-6">
            <div className="h-80 rounded-md bg-gray-200">
              <CombinedMap /> {/* Combined map */}
            </div>
            <div className="rounded-md p-2 bg-[#393A3E] h-80">
              <h3 className="text-center text-lg font-bold mb-4">Track Capacity</h3>
              <Line data={trackCapacityData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
