import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatDate } from '../utils/helpers';
import RefreshButton from './RefreshButton';

const CurrentWeather = () => {
    const { weather, locationName } = useWeather();

    if (!weather) return null;

    const { main, weather: details, wind, dt } = weather;
    const current = details[0];
    const iconUrl = `https://openweathermap.org/img/wn/${current.icon}@4x.png`;

    return (
        <div className="bg-white/40 dark:bg-dark-card/30 backdrop-blur-md rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-soft dark:shadow-none border border-white/20 dark:border-white/5 transition-all hover:-translate-y-1 hover:shadow-soft-lg duration-500">
            <div className="space-y-2 text-center md:text-left">
                <div className="flex items-center gap-2 justify-center md:justify-start">
                    <h2 className="text-2xl md:text-3xl font-bold tracking-tight">{locationName || weather.name}</h2>
                    <RefreshButton />
                </div>
                <p className="text-gray-500 dark:text-gray-400 font-medium tracking-wide">
                    {formatDate(dt)}
                </p>
                <div className="flex flex-col">
                    <span className="text-6xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-br from-gray-900 to-gray-500 dark:from-white dark:to-gray-500">
                        {Math.round(main.temp)}°
                    </span>
                    <p className="text-xl text-gray-600 dark:text-gray-300 font-medium capitalize mt-[-8px]">
                        {current.description}
                    </p>
                </div>
            </div>

            <div className="flex-shrink-0">
                <img
                    src={iconUrl}
                    alt={current.description}
                    className="w-40 h-40 object-contain drop-shadow-2xl"
                />
            </div>

        </div>
    );
};

export default CurrentWeather;
