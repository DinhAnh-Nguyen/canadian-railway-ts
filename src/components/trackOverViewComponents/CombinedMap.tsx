"use client";
import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";

const CombinedMap: React.FC = () => {
  useEffect(() => {
    let map: L.Map | null = null;

    try {
      // Initialize Leaflet map
      map = L.map("combined-map", {
        center: [51.0447, -114.0719], // Centered at Calgary
        zoom: 10,
      });

      // Add Google Maps layer
      const googleLayer = L.gridLayer.googleMutant({
        type: "roadmap", // Options: roadmap, satellite, terrain, hybrid
      });

      googleLayer.addTo(map);

      // Add railway WMS layer
      L.tileLayer.wms("https://maps.geogratis.gc.ca/wms/railway_en?", {
        layers: "railway.track",
        format: "image/png",
        transparent: true,
        attribution:
          "Map data © <a href='https://open.canada.ca/'>Government of Canada</a>",
      }).addTo(map);
    } catch (error) {
      console.error("Error initializing the map:", error);
    }

    return () => {
      if (map) {
        map.remove(); // Clean up map on unmount
      }
    };
  }, []);

  return (
    <div
      id="combined-map"
      style={{ height: "100%", width: "100%", borderRadius: "10px" }}
    ></div>
  );
};

export default CombinedMap;
