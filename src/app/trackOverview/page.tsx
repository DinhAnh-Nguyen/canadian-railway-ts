"use client";
import React, { useState, useRef, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import { Loader } from "@googlemaps/js-api-loader";
import "chart.js/auto";
import Nav from "@/components/navbar";

export default function TrackOverview() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("");

  // Reference for the map container
  const mapRef = useRef<HTMLDivElement | null>(null);

  // Retrieve the API key from the environment variable
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    const loader = new Loader({
      apiKey: googleMapsApiKey || "", // Use API key from the .env.local file
    });

    loader.load().then(() => {
        new google.maps.Map(mapRef.current, {
          center: { lat: 51.0447, lng: -114.0719 }, // get the location for Calgary, Alberta
          zoom: 13,
        });
    });
  }, [googleMapsApiKey]);

  // Setup Data for Maintenance History
  const maintenanceHistoryData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: "Maintenance Count",
        data: [5, 8, 6, 10, 9, 7, 8, 6, 10, 12, 11, 9],
        backgroundColor: [
          "#66B168", "#6060E1", "#66B168", "#6060E1", "#66B168",
          "#6060E1", "#66B168", "#6060E1", "#66B168", "#6060E1",
          "#66B168", "#6060E1",
        ],
      },
    ],
  };

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
      {/* Filters */}
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

 
          <div className=" rounded-md p-4 bg-[#393A3E]">
            <h3 className="text-center text-lg font-bold mb-4">Selected Track Details</h3>
            <div className="overflow-hidden rounded-md border">
              <table className="w-full text-sm">
                <tbody>
                  <tr className="bg-black text-white">
                    <td className="p-2 font-medium">Railway Track</td>
                    <td className="p-2">Main - Operational - Freight and Tourist</td>
                  </tr>
                  <tr className="bg-gray-800 text-gray-200">
                    <td className="p-2 font-medium">Location</td>
                    <td className="p-2">Alberta, Laggan, Canadian Pacific</td>
                  </tr>
                  <tr className="bg-black text-white">
                    <td className="p-2 font-medium">Identifier</td>
                    <td className="p-2">0b345a08a0db4a3eb944443b259396cb</td>
                  </tr>
                  <tr className="bg-gray-800 text-gray-200">
                    <td className="p-2 font-medium">Track Mode</td>
                    <td className="p-2">Train</td>
                  </tr>
                  <tr className="bg-black text-white">
                    <td className="p-2 font-medium">Subdivision 1</td>
                    <td className="p-2">Laggan</td>
                  </tr>
                  <tr className="bg-gray-800 text-gray-200">
                    <td className="p-2 font-medium">Subdivision 2</td>
                    <td className="p-2">Calgary</td>
                  </tr>
                  <tr className="bg-black text-white">
                    <td className="p-2 font-medium">Start</td>
                    <td className="p-2">0.00 Mile</td>
                  </tr>
                  <tr className="bg-gray-800 text-gray-200">
                    <td className="p-2 font-medium">End</td>
                    <td className="p-2">136.60 Mile</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="lg:col-span-2 space-y-6">
          <div className="h-80 rounded-md bg-gray-200">
            <div ref={mapRef} className="h-full w-full"></div>
          </div>

          <div className="space-y-6 rounded-md p-2 bg-[#393A3E] h-80">
            <h3 className="text-center text-lg font-bold mb-4">Track Capacity</h3>
            <Line data={trackCapacityData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}
