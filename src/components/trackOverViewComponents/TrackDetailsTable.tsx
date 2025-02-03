"use client";
import React from "react";

interface TrackDetailsTableProps {
  details: any; // Replace `any` with the actual type for track details
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const TrackDetailsTable: React.FC<TrackDetailsTableProps> = ({ details, isFavorite, onToggleFavorite }) => {
  return (
    <div className="rounded-md p-2 bg-[#393A3E]">
      <h3 className="text-center text-lg font-bold mb-4">Selected Track Details</h3>
      <div className="overflow-hidden rounded-md border">
        <table className="w-full text-sm">
          <tbody>
            <tr className="bg-black text-white">
              <td className="p-2 font-medium">Railway Track</td>
              <td className="p-2">{details.name}</td>
            </tr>
            <tr className="bg-gray-800 text-gray-200">
              <td className="p-2 font-medium">Location</td>
              <td className="p-2">{details.location}</td>
            </tr>
            <tr className="bg-black text-white">
              <td className="p-2 font-medium">Identifier</td>
              <td className="p-2">{details.identifier}</td>
            </tr>
            <tr className="bg-gray-800 text-gray-200">
              <td className="p-2 font-medium">Track Mode</td>
              <td className="p-2">{details.mode}</td>
            </tr>
            <tr className="bg-black text-white">
              <td className="p-2 font-medium">Subdivision 1</td>
              <td className="p-2">{details.subdivision1}</td>
            </tr>
            <tr className="bg-gray-800 text-gray-200">
              <td className="p-2 font-medium">Subdivision 2</td>
              <td className="p-2">{details.subdivision2}</td>
            </tr>
            <tr className="bg-gray-800 text-gray-200">
              <td className="p-2 font-medium">Length</td>
              <td className="p-2">{details.length}</td>
            </tr>
          </tbody>
        </table>
        {/* Add to Favorite or Remove from Favorite Button */}
        <div className="mt-4 text-center">
          <button
            className={`px-4 py-2 rounded-md ${
              isFavorite ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
            } text-white`}
            onClick={onToggleFavorite}
          >
            {isFavorite ? "Remove from Favorite" : "Add to Favorite"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TrackDetailsTable;
