import { ChartData } from 'chart.js';
import { useState, useEffect } from 'react';
import { locationType, forecastType } from '../types';

const useForecast = () => {

    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

    const [selectedTrack, setSelectedTrack] = useState(''); // use to track the currently selected track
    const [forecastData, setForecastData] = useState<{ [key: string]: forecastType | null }>({}); // stores weather data for multiple locations in an object, track is a key

    // predefined locations
    const locations: { [key: string]: locationType } = {
        Vancouver: { name: 'Vancouver', lat: 49.2827, lon: -123.1207 },
        Banff: { name: 'Banff', lat: 51.1784, lon: -115.5708 },
        Edmonton: { name: 'Edmonton', lat: 53.5461, lon: -113.4938 },
        Jasper: { name: 'Jasper', lat: 52.8734, lon: -118.0806 },
        Canmore: { name: 'Canmore', lat: 51.0899, lon: -115.3593 },
        'Red Deer': { name: 'Red Deer', lat: 52.2681, lon: -113.8112 },
    };

    // To fetch weather data for a single location, which take parameter location of type locationType and return a promise of forecastType
    const getWeatherData = async (location: locationType): Promise<forecastType | null> => {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API_KEY}`
        );
        const data = await response.json(); // fetch data from the response as a list 
        console.log(data);
        return {
            name: data.name,
            country: data.sys.country,
            sunrise: data.sys.sunrise,
            sunset: data.sys.sunset,
            list: [
                {
                    dt: data.dt,
                    main: data.main,
                    visibility: data.visibility,
                    wind: data.wind,
                    clouds: data.clouds,
                    weather: data.weather[0],
                },
            ],
        };

    };

    // To fetch weather data for all locations simultaneously
    const fetchAllWeatherData = async () => {
        const updatedData: { [key: string]: forecastType | null } = {};
        const locationKeys = Object.keys(locations); // Fetch the keys of the locations object

        for (const key of locationKeys) {
            const location = locations[key];
            const weatherData = await getWeatherData(location);
            updatedData[key] = weatherData;
        }

        setForecastData(updatedData);
    };

    // To handle the track change event (through track selection)
    const handleTrackChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const track = e.target.value.trim();
        setSelectedTrack(track);
    };

    // To fetch weather data for all locations when the component mounts
    useEffect(() => {
        fetchAllWeatherData();
    }, []);

    return { selectedTrack, handleTrackChange, forecastData, locations, };
};

export default useForecast;
