import React from 'react';
import { RefreshCw } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const RefreshButton = () => {
    const { refreshWeather, loading } = useWeather();

    return (
        <button
            onClick={refreshWeather}
            disabled={loading}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Refresh weather"
        >
            <RefreshCw className={`w-5 h-5 text-gray-700 dark:text-gray-200 ${loading ? 'animate-spin' : ''}`} />
        </button>
    );
};

export default RefreshButton;
