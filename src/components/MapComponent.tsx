"use client";
import React, { useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface MapComponentProps {
  apiKey: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
  const mapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const loader = new Loader({
      apiKey: apiKey,
      version: "weekly",
    });

    loader.load().then(() => {
      if (mapRef.current) {
        const map = new google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 }, // Default coordinates
          zoom: 8, // Default zoom level
        });
      }
    });
  }, [apiKey]);

  return (
    <div
      ref={mapRef}
      style={{
        height: "100%",
        width: "100%",
      }}
    ></div>
  );
};

export default MapComponent;
