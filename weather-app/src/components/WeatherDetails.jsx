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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
            {details.map((item, index) => {
                const Icon = item.icon;
                return (
                    <div key={index} className="bg-white/40 dark:bg-dark-card/30 backdrop-blur-lg p-5 rounded-3xl flex flex-col sm:flex-row items-center sm:items-start gap-3 md:gap-4 shadow-soft dark:shadow-none border border-white/20 dark:border-white/5 transition-all hover:-translate-y-1 duration-300">
                        <div className={`p-2.5 rounded-2xl bg-gray-100/50 dark:bg-gray-800/50 ${item.color} flex-shrink-0`}>
                            <Icon className="w-5 h-5 md:w-6 md:h-6" />
                        </div>
                        <div className="text-center sm:text-left">
                            <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 font-medium mb-0.5">{item.label}</p>
                            <p className="text-lg md:text-xl font-bold text-gray-800 dark:text-gray-100">{item.value}</p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default WeatherDetails;
