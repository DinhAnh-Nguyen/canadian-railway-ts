import { ChangeEvent, JSX } from 'react';
import { forecastType } from '../app/types';
import { Line } from 'react-chartjs-2';
import { ChartData, ChartOptions } from 'chart.js';

type Props = {
    track: string;
    forecastData: { [key: string]: forecastType | null };
    handleTrackChange: (e: ChangeEvent<HTMLSelectElement>) => void;
    trackCapacityData: ChartData<'line'>;
    chartOptions: ChartOptions<'line'>;
};

<<<<<<< Updated upstream
const SelectLocation = ({ track, forecastData, handleTrackChange }: Props): JSX.Element => {
=======
const SelectLocation = ({ handleTrackChange, forecastData, trackCapacityData, chartOptions, track }: Props): JSX.Element => {
>>>>>>> Stashed changes
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
                                <h3 className="font-bold">{`Track ${i + 1} - ${trackName}`}</h3>
                                <p>Wind Speed: {forecast?.list[0].wind.speed ?? '-'} km/h</p>
                                <p>Wind Direction: {forecast?.list[0].wind.deg ?? '-'}°</p>
                                <p>Temperature: {forecast?.list[0].main.temp ?? '-'}°C</p>
                                <p>Humidity: {forecast?.list[0].main.humidity ?? '-'}%</p>
                            </div>
                        );
                    })}
                </div>

                {/* Detailed Information for Selected Track */}
                <div className="col-span-8 space-y-4">
                    <div className="flex justify-between items-center bg-emerald-950 p-4 rounded">
                        <h2>Select a Track</h2>
                        <select
                            name="track"
                            id="track"
                            className="bg-gray-800 text-white p-2 rounded"
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
                                {selectedForecast?.list[0].wind.deg !== undefined
                                    ? `${selectedForecast.list[0].wind.deg}°`
                                    : 'No data'}
                            </div>
                        </div>

<<<<<<< Updated upstream
                        <div className='col-span-6 row-span-2 p-4 rounded'>
                            <h2 className='text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-w2xl'>
                                Weather Map for Selected Track
                            </h2>
                            <div className='h-[435px] bg-gray-800 rounded mt-4 flex items-center justify-center'></div>
                        </div>
=======
                        < div className='col-span-6 row-span-2 h-full p-4 rounded' >
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Map View for Selected View
                            </h2>
                            <div className="h-[435px] bg-gray-800 rounded mt-4"></div>
                        </div >
>>>>>>> Stashed changes

                        {/* Wind Speed */}
                        <div className="col-span-6 row-span-1 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Wind Speed for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4 flex items-center justify-center">
                                {selectedForecast?.list[0].wind.speed !== undefined
                                    ? `${selectedForecast.list[0].wind.speed} km/h`
                                    : 'No data'}
                            </div>
                        </div>

                        {/* Temperature */}
                        <div className="col-span-12 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Temperature for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4 flex items-center justify-center">
                                {selectedForecast?.list[0].main.temp !== undefined
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

<<<<<<< Updated upstream
export default SelectLocation;
=======
export default SelectLocation;
>>>>>>> Stashed changes
