import { ChangeEvent, JSX } from 'react';
import { forecastType, locationType } from '../app/types';
import { getWindDirection } from '@/app/helpers';

type Props = {
    track: string;
    forecastData: { [key: string]: forecastType | null };
    handleTrackChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    getHistoricalWeatherData: (location: locationType) => Promise<forecastType | null>;
    saveForecastData: (lat: number, lon: number) => void;
};

const SelectLocation = ({ handleTrackChange, forecastData, track, getHistoricalWeatherData, saveForecastData }: Props): JSX.Element => {
    const selectedForecast = track ? forecastData[track] : null;

    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className="text-2xl font-bold mb-6">Weather Dashboard</div>

            <div className="grid grid-cols-12 gap-6">
                {/* Current Forecast Per Track */}
                <div className="col-span-4 space-y-4">
                    <div className="bg-emerald-950 p-4 rounded">
                        <h2 className="text-lg font-semibold">Current Forecast Per Track</h2>
                    </div>

                    {["Vancouver", "Banff", "Edmonton", "Jasper", "Canmore", "Red Deer"].map((trackName, i) => {
                        const forecast = forecastData[trackName];
                        return (
                            <div key={i} className="bg-gray-800 p-4 rounded">
                                <h3 className="font-bold">{`Track ${i + 1} - ${trackName} (${forecast?.list[0].weather.main ?? '-'})`}</h3>
                                <p>Wind Speed: {forecast?.list?.[0]?.wind?.speed ?? '-'} km/h</p>
                                <p>Temperature: {forecast?.list?.[0]?.main?.temp ?? '-'}°C</p>
                                <p>Feels Like: {forecast?.list?.[0]?.main?.feels_like ?? '-'}°C</p>
                                <p>Humidity: {forecast?.list?.[0]?.main?.humidity ?? '-'}%</p>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Information for Selected Track */}
                <div className="col-span-8 space-y-4">
                    <div className="flex justify-between items-center bg-emerald-950 p-4 rounded">
                        <h2 className='text-lg font-semibold'>Select a Track</h2>
                        <select
                            name="track"
                            id="track"
                            className="bg-gray-800 text-white p-2 rounded cursor-pointer hover:bg-gray-700 transition"
                            value={track}
                            onChange={handleTrackChange}
                        >
                            <option value="">Select a Track</option>
                            {["Vancouver", "Banff", "Edmonton", "Jasper", "Canmore", "Red Deer"].map((trackName, i) => (
                                <option key={i} value={trackName}>
                                    {`Track ${i + 1} - ${trackName}`}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="grid grid-cols-12 grid-rows-3 gap-6">
                        {/* Wind Direction */}
                        <div className="col-span-6 row-span-1 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Wind Direction for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4 flex items-center justify-center">
                                {selectedForecast?.list?.[0]?.wind?.deg !== undefined
                                    ? `${getWindDirection(Math.round(selectedForecast.list[0].wind.deg))}`
                                    : 'No data'}
                            </div>
                        </div>

                        {/* Map View */}
                        <div className='col-span-6 row-span-2 h-full p-4 rounded'>
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Map View for Selected Track
                            </h2>
                            <div>
                                <iframe
                                    src="https://www.meteoblue.com/en/weather/maps/widget/calgary_canada_5913490?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
                                    frameBorder="0"
                                    scrolling="no"
                                    sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                                    style={{ width: '100%', height: '420px' }}
                                ></iframe>
                            </div>
                        </div>

                        {/* Wind Speed */}
                        <div className="col-span-6 row-span-1 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Wind Speed for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4 flex items-center justify-center">
                                {selectedForecast?.list?.[0]?.wind?.speed !== undefined
                                    ? `${selectedForecast.list[0].wind.speed} km/h`
                                    : 'No data'}
                            </div>
                            <button
                                onClick={() => saveForecastData(53.5461, -113.4938)}
                                className="mt-4 bg-blue-600 px-4 py-2 rounded text-white hover:bg-blue-500 transition"
                            >
                                Save Forecast Data
                            </button>
                        </div>

                        {/* Temperature */}
                        <div className="col-span-12 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Temperature for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4 flex items-center justify-center">
                                {selectedForecast?.list?.[0]?.main?.temp !== undefined
                                    ? `${selectedForecast.list[0].main.temp}°C`
                                    : 'No data'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectLocation;
