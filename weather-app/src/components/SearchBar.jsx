import React, { useState } from 'react';
import { Search, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const { searchLocation, fetchUserLocation, locationMode, loading } = useWeather();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            searchLocation(query);
            setQuery('');
        }
    };

    return (
        <div className="relative w-full flex items-center gap-2">
            <form onSubmit={handleSubmit} className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city..."
                    className="w-full pl-12 pr-4 py-3 rounded-2xl bg-white dark:bg-dark-card border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition-all dark:text-white shadow-sm placeholder:text-gray-400"
                />
            </form>
            <button
                onClick={fetchUserLocation}
                className={`p-3 rounded-2xl transition-all shadow-sm flex-shrink-0 ${locationMode === 'GPS'
                    ? 'bg-blue-500 text-white shadow-blue-500/30'
                    : 'bg-white dark:bg-dark-card text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700/50'
                    }`}
                title="Use Current Location"
                aria-label="Use Current Location"
            >
                <MapPin className={`w-5 h-5 ${loading && locationMode === 'GPS' ? 'animate-pulse' : ''}`} />
            </button>
        </div>
    );
};

export default SearchBar;
