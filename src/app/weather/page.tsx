//By: Mark Bui

'use client';

import React, { JSX } from 'react';
import SelectLocation from '../../components/SelectLocation';
import useForecast from '../hooks/useForecast';

const App = (): JSX.Element => {
  const { selectedTrack, handleTrackChange, forecastData } = useForecast();

  return (
    <div className="bg-black text-white min-h-screen p-6">
      <SelectLocation
        track={selectedTrack}
        forecastData={forecastData}
        handleTrackChange={handleTrackChange}
      />
    </div>
  );
};

export default App;

