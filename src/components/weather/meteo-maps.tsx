type WeathermapProps = {
    track: string
}

export const meteoMaps = [
    {
        "city": "Vancouver",
        "link": "https://www.meteoblue.com/en/weather/maps/widget/vancouver_canada_6173331?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
    },
    {
        "city": "Banff",
        "link": "https://www.meteoblue.com/en/weather/maps/widget/banff_canada_5892532?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
    },
    {
        "city": "Edmonton",
        "link": "https://www.meteoblue.com/en/weather/maps/widget/edmonton_canada_5946768?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
    },
    {
        "city": "Jasper",
        "link": "https://www.meteoblue.com/en/weather/maps/widget/jasper_canada_6354954?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
    },
    {
        "city": "Canmore",
        "link": "https://www.meteoblue.com/en/weather/maps/widget/canmore_canada_5914894?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
    },
    {
        "city": "Red Deer",
        "link": "https://www.meteoblue.com/en/weather/maps/widget/red-deer_canada_6118158?windAnimation=1&gust=1&satellite=1&cloudsAndPrecipitation=1&temperature=1&sunshine=1&extremeForecastIndex=1&geoloc=fixed&tempunit=C&windunit=km%252Fh&lengthunit=metric&zoom=5&autowidth=auto"
    }
];

export default function WeatherMap({ track }: WeathermapProps) {
    const selectedMap = meteoMaps.find((map) => map.city === track)?.link;

    return (
        <div className="col-span-6 h-full">
            <h2 className="text-lg font-semibold bg-emerald-950 px-4 py-2 rounded">
                Map View for Selected Track
            </h2>
            <div className="mt-4">
                {selectedMap ? (
                    <iframe
                        src={selectedMap}
                        frameBorder="0"
                        scrolling="no"
                        sandbox="allow-same-origin allow-scripts allow-popups allow-popups-to-escape-sandbox"
                        style={{ width: "100%", height: "420px", borderRadius: "10px" }}
                    ></iframe>
                ) : (
                    <p className="text-gray-500 text-center">No map available for the selected track.</p>
                )}
            </div>
        </div>
    );
}


