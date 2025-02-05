"use client";

import React, { JSX } from "react";
import SelectLocation from "../../components/SelectLocation";
import useForecast from "../hooks/useForecast";
import Nav from "@/components/navbar";

const App = (): JSX.Element => {
  const {
    selectedTrack,
    handleTrackChange,
    forecastData,
    predictWeatherData,
  } = useForecast();

  return (
    <>
      <Nav />
      <div className="bg-black text-white min-h-screen p-6">
        <SelectLocation
          track={selectedTrack}
          forecastData={forecastData}
          handleTrackChange={handleTrackChange}
          predictWeatherData={predictWeatherData}

        />
      </div>
    </>
  );
};

export default App;
