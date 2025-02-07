"use client";
import React, { useState } from "react";
import Nav from "@/components/navbar";
import CombinedMap from "@/components/trackOverViewComponents/CombinedMap";
import TrackMaintenanceChart from "@/components/trackOverViewComponents/TrackMaintenanceChart";
import TrackDetailsTable from "@/components/trackOverViewComponents/TrackDetailsTable";
import TrackCapacityChart from "@/components/trackOverViewComponents/TrackCapacityChart";
import SearchBar from "@/components/trackOverViewComponents/SearchBar";
import { trackDetails, trackMaintenanceData, trackCapacityData } from "@/data/trackData";

export default function TrackOverview() {
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedTrack, setSelectedTrack] = useState<string>("Track 1");
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [favoriteTracks, setFavoriteTracks] = useState<string[]>([]);

  // Handle toggling favorites
  const toggleFavorite = () => {
    setFavoriteTracks((prev) =>
      prev.includes(selectedTrack)
        ? prev.filter((t) => t !== selectedTrack)
        : [...prev, selectedTrack]
    );
  };

  // Check if selected track is in favorites
  const isFavorite = favoriteTracks.includes(selectedTrack);

  // Handle favorite track selection
  const handleFavoriteSelect = (track: string) => {
    setSelectedTrack(track);
    setSearchTerm(""); // Clear the search bar
  };

  // Prepare maintenance history data for the selected track
  const selectedMaintenanceData = trackMaintenanceData[selectedTrack];
  const maintenanceHistoryData = {
    labels: [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ],
    datasets: [
      {
        label: `${selectedTrack} Maintenance Count`,
        data: selectedMaintenanceData,
        backgroundColor: [
          "#66B168", "#6060E1", "#66B168", "#6060E1", "#66B168",
          "#6060E1", "#66B168", "#6060E1", "#66B168", "#6060E1",
          "#66B168", "#6060E1",
        ],
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <div className="flex">
      <Nav />
      <div className="p-6 bg-background text-foreground">
        {/* Search Bar */}
        <div className="mb-4">
          <SearchBar
            tracks={Object.keys(trackDetails)}
            onTrackSelect={(track) => setSelectedTrack(track)}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </div>

        <div className="mb-4 flex gap-4 items-center">
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

          {/* Favorite Tracks Dropdown */}
          <div>
            <label htmlFor="favorites" className="block mb-1 text-darkgrey font-medium">
              Favorite Tracks:
            </label>
            <select
              id="favorites"
              className="p-2 border rounded-md text-black"
              value={favoriteTracks.includes(selectedTrack) ? selectedTrack : ""}
              onChange={(e) => handleFavoriteSelect(e.target.value)}
            >
              {!favoriteTracks.includes(selectedTrack) &&
                favoriteTracks.length > 0 && (
                  <option value="">Pick a Track</option>
                )}
              {favoriteTracks.length === 0 && <option value="">No fav track</option>}
              {favoriteTracks.map((track) => (
                <option key={track} value={track}>
                  {track}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <TrackMaintenanceChart data={maintenanceHistoryData} options={chartOptions} />
            {trackDetails[selectedTrack] ? (
              <TrackDetailsTable
                details={trackDetails[selectedTrack]}
                isFavorite={isFavorite}
                onToggleFavorite={toggleFavorite}
              />
            ) : (
              <div className="rounded-md p-4 bg-[#393A3E] text-center text-white">
                No track selected.
              </div>
            )}
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
