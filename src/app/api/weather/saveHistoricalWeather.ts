import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

const saveHistoricalWeatherData = async (lat: number, lon: number): Promise<any> => {
    const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;

    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`Failed to fetch forecast data. Status: ${response.status}`);
    }
    return await response.json();
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'GET') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    try {
        const { lat, lon } = req.query;
        if (!lat || !lon) {
            return res.status(400).json({ message: 'Latitude and longitude are required' });
        }

        const forecastData = await saveHistoricalWeatherData(Number(lat), Number(lon));

        const dirPath = path.join(process.cwd(), 'data');
        const filePath = path.join(dirPath, 'weatherData.json');

        // Ensure the 'data' folder exists
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
        }

        // Save forecast data to JSON file
        fs.writeFileSync(filePath, JSON.stringify(forecastData, null, 2), 'utf-8');

        res.status(200).json({ message: 'Weather data saved successfully', data: forecastData });
    } catch (error: any) {
        console.error('Error saving forecast data:', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}
