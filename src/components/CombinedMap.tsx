import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.gridlayer.googlemutant";

const CombinedMap: React.FC = () => {
  useEffect(() => {
    // Initialize Leaflet map
    const map = L.map("combined-map").setView([51.0447, -114.0719], 10);

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

    return () => {
      map.remove(); // Clean up the map instance on component unmount
    };
  }, []);

  return (
    <div
      id="combined-map"
      style={{ height: "100%", width: "100%" }}
    ></div>
  );
};

export default CombinedMap;
