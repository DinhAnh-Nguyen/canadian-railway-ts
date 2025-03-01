"use client";

import dynamic from "next/dynamic";
import { useEffect, useState, useMemo } from "react";
import "leaflet/dist/leaflet.css";

const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const GeoJSON = dynamic(() => import("react-leaflet").then((mod) => mod.GeoJSON), { ssr: false });
const Popup = dynamic(() => import("react-leaflet").then((mod) => mod.Popup), { ssr: false });

let L;
if (typeof window !== "undefined") {
  L = require("leaflet");
  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    iconUrl: "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=",
    shadowUrl: "",
  });
}

const DEFAULT_POSITION = [51.0447, -114.0719];

export default function RailwayMap() {
  const [railwayData, setRailwayData] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/Alberta.geojson")
      .then((response) => {
        if (!response.ok) throw new Error("Failed to fetch GeoJSON data");
        return response.json();
      })
      .then((data) => {
        setRailwayData(data);
        setIsLoading(false);
        setError(null);
      })
      .catch((error) => {
        console.error("Error fetching GeoJSON data:", error);
        setIsLoading(false);
        setError("Failed to load railway data. Please try again later.");
      });
  }, []);

  const getMidpoint = (geometry) => {
    if (!geometry || !geometry.coordinates) return DEFAULT_POSITION;

    if (geometry.type === "LineString") {
      const coords = geometry.coordinates;
      if (coords.length === 0) return DEFAULT_POSITION;
      const midIndex = Math.floor(coords.length / 2);
      return [coords[midIndex][1], coords[midIndex][0]];
    }

    if (geometry.type === "MultiLineString") {
      const firstLine = geometry.coordinates[0];
      if (!firstLine || firstLine.length === 0) return DEFAULT_POSITION;
      const midIndex = Math.floor(firstLine.length / 2);
      return [firstLine[midIndex][1], firstLine[midIndex][0]];
    }

    if (geometry.type === "Point") {
      return [geometry.coordinates[1], geometry.coordinates[0]];
    }

    console.warn("Unknown geometry type:", geometry.type);
    return DEFAULT_POSITION;
  };

  const railwayStyle = (feature) => {
    return {
      color: selectedFeature && selectedFeature.id === feature.id ? "blue" : "red",
      weight: 3,
      opacity: 0.8,
    };
  };

  const onEachFeature = (feature, layer) => {
    layer.on({
      click: () => {
        setSelectedFeature(feature);
      },
    });
  };

  const geoJsonLayer = useMemo(() => {
    if (!railwayData || !railwayData.features || railwayData.features.length === 0) {
      return null;
    }
    return <GeoJSON data={railwayData} style={railwayStyle} onEachFeature={onEachFeature} />;
  }, [railwayData, selectedFeature]);

  return (
    <div>
      {isLoading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      <MapContainer center={DEFAULT_POSITION} zoom={11} style={{ height: "500px", width: "100%" }} aria-label="Railway Map">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OSM</a>'
        />
        {geoJsonLayer}
        {selectedFeature && selectedFeature.geometry && (
          <Popup position={getMidpoint(selectedFeature.geometry)} onClose={() => setSelectedFeature(null)}>
            <div>
              <h3>Railway Details</h3>
              <ul>
                {Object.entries(selectedFeature.properties).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
          </Popup>
        )}
      </MapContainer>
    </div>
  );
}