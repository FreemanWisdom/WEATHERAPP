import React from 'react';
import { Moon, Sun, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
    const { theme, toggleTheme, refreshWeather, weather } = useWeather();

    return (
        <header className="flex justify-between items-center py-4">
            <div className="flex items-center gap-2">
                <div className="bg-blue-500 rounded-lg p-2">
                    <MapPin className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-xl md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300">
                    WeatherNow
                </h1>
            </div>

            <button
                onClick={toggleTheme}
                className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
                aria-label="Toggle theme"
            >
                {theme === 'dark' ? (
                    <Sun className="w-6 h-6 text-yellow-500" />
                ) : (
                    <Moon className="w-6 h-6 text-slate-700" />
                )}
            </button>
        </header>
    );
};

export default Header;
