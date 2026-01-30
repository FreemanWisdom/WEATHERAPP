import React from 'react';
import { Moon, Sun, MapPin } from 'lucide-react';
import { useWeather } from '../context/WeatherContext';

const Header = () => {
    const { theme, toggleTheme, refreshWeather, weather } = useWeather();

    return (
        <header className="flex justify-between items-center py-4">
            <div className="flex items-center gap-3">
                <div className="bg-blue-500 rounded-xl p-2 md:p-2.5 shadow-lg shadow-blue-500/20">
                    <MapPin className="w-5 h-5 md:w-6 md:h-6 text-white" />
                </div>
                <h1 className="text-lg md:text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-400 dark:to-cyan-300 tracking-tight">
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
