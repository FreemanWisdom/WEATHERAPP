import React from 'react';
import { useWeather } from '../context/WeatherContext';
import { Droplets, Wind, Thermometer, Gauge } from 'lucide-react';

const WeatherDetails = () => {
    const { weather } = useWeather();

    if (!weather) return null;

    const { main, wind } = weather;

    const details = [
        {
            label: 'Feels Like',
            value: `${Math.round(main.feels_like)}°`,
            icon: Thermometer,
            color: 'text-orange-500'
        },
        {
            label: 'Humidity',
            value: `${main.humidity}%`,
            icon: Droplets,
            color: 'text-blue-500'
        },
        {
            label: 'Wind Speed',
            value: `${Math.round(wind.speed)} m/s`,
            icon: Wind,
            color: 'text-teal-500'
        },
        {
            label: 'Pressure',
            value: `${main.pressure} hPa`,
            icon: Gauge,
            color: 'text-purple-500'
        },
    ];

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {details.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div key={index} className="bg-white/40 dark:bg-dark-card/30 backdrop-blur-md p-4 rounded-2xl flex items-center gap-4 shadow-soft dark:shadow-none border border-white/20 dark:border-white/5 transition-all hover:-translate-y-1 duration-300">
                        <div className={`p-2 rounded-xl bg-gray-100 dark:bg-gray-800 ${item.color}`}>
                            <Icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{item.label}</p>
                            <p className="text-lg font-bold text-gray-800 dark:text-gray-100">{item.value}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherDetails;
