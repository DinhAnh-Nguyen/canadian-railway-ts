import { ChangeEvent, JSX } from 'react';
import { forecastType } from '../app/types';

type Props = {
    track: string;
    forecastData: { [key: string]: forecastType | null };
    handleTrackChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const SelectLocation = ({ track, forecastData, handleTrackChange }: Props): JSX.Element => {
    return (
        <div className="bg-black text-white min-h-screen p-6">
            <div className="text-2xl font-bold mb-6">Weather Dashboard</div>

            <div className="grid grid-cols-12 gap-6">
                <div className="col-span-4 space-y-4">
                    <div className="bg-emerald-950 p-4 rounded">
                        <h2 className="text-lg font-semibold">Current Forecast Per Track</h2>
                    </div>

                    {Array.from({ length: 6 }).map((_, i) => {
                        const trackName = ["Vancouver", "Banff", "Edmonton", "Jasper", "Canmore", "Red Deer"][i];
                        const forecast = forecastData[trackName];
                        return (
                            <div key={i} className="bg-gray-800 p-4 rounded">
                                <h3>{trackName}</h3>
                                <p>Wind: {forecast?.list[0].wind.speed ?? '-'} km/h</p>
                                <p>Temperature: {forecast?.list[0].main.temp ?? '-'}°C</p>
                                <p>Humidity: {forecast?.list[0].main.humidity ?? '-'}%</p>
                            </div>
                        );
                    })}
                </div>

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
                            <option value="Vancouver">Track 1 - Vancouver</option>
                            <option value="Banff">Track 2 - Banff</option>
                            <option value="Edmonton">Track 3 - Edmonton</option>
                            <option value="Jasper">Track 4 - Jasper</option>
                            <option value="Canmore">Track 5 - Canmore</option>
                            <option value="Red Deer">Track 6 - Red Deer</option>
                        </select>
                    </div>

                    <div className="grid grid-cols-12 grid-rows-3 gap-6">
                        <div className="col-span-6 row-span-1 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Wind Direction for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4"></div>
                        </div>

                        <div className='col-span-6 row-span-2 h-full p-4 rounded'>
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Map View for Selected View
                            </h2>
                            <div className="h-5/6 bg-gray-800 rounded mt-4"></div>
                        </div>

                        <div className="col-span-6 row-span-1 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Wind Speed for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4"></div>
                        </div>

                        <div className="col-span-12 p-4 rounded">
                            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded-2xl">
                                Temperature for Selected Track
                            </h2>
                            <div className="h-40 bg-gray-800 rounded mt-4"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelectLocation