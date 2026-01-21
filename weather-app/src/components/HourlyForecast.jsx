import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatTime } from '../utils/helpers';

const HourlyForecast = () => {
    const { forecast, weather } = useWeather();

    if (!forecast || !forecast.list) return null;

    // Take first 8 items (approx 24 hours)
    const hourlyData = forecast.list.slice(0, 8);
    const timezoneOffset = forecast.city.timezone;

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Hourly Forecast</h3>
            <div className="flex overflow-x-auto pb-4 gap-4 no-scrollbar -mx-4 px-4 md:mx-0 md:px-0">
                {hourlyData.map((item, index) => (
                    <div
                        key={item.dt}
                        className="min-w-[80px] flex flex-col items-center p-4 bg-white/40 dark:bg-dark-card/30 backdrop-blur-md rounded-2xl shadow-soft dark:shadow-none border border-white/20 dark:border-white/5 hover:border-blue-500/20 transition-all hover:-translate-y-1"
                    >
                        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
                            {index === 0 ? 'Now' : formatTime(item.dt, timezoneOffset)}
                        </p>
                        <img
                            src={`https://openweathermap.org/img/wn/${item.weather[0].icon}.png`}
                            alt={item.weather[0].description}
                            className="w-12 h-12 my-1"
                        />
                        <p className="text-lg font-bold text-gray-800 dark:text-gray-100">
                            {Math.round(item.main.temp)}°
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HourlyForecast;
