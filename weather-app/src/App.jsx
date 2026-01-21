import React from 'react';
import { useWeather } from './context/WeatherContext';
import Loader from './components/Loader';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import HourlyForecast from './components/HourlyForecast';
import DailyForecast from './components/DailyForecast';
import WeatherDetails from './components/WeatherDetails';
import { AlertCircle } from 'lucide-react';

import { getWeatherBackground } from './utils/helpers';

function App() {
  const { weather, forecast, loading, error, theme } = useWeather();
  const weatherId = weather?.weather?.[0]?.id;
  const isDark = theme === 'dark';
  const bgClass = getWeatherBackground(weatherId, isDark);

  return (
    <div className={`min-h-screen ${bgClass} text-gray-900 dark:text-dark-text transition-all duration-700 font-sans p-4 md:p-8`}>
      <div className="max-w-4xl mx-auto space-y-6">
        <Header />

        <SearchBar />

        {error && (
          <div className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 p-4 rounded-xl flex items-center gap-2 justify-center animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {loading && !weather ? (
          <div className="py-20">
            <Loader />
          </div>
        ) : (
          <>
            {weather && <CurrentWeather />}

            {/* Weather Details (Grid) */}
            {weather && <WeatherDetails />}

            {forecast && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <HourlyForecast />
                </div>
                <div>
                  <DailyForecast />
                </div>
              </div>
            )}

            {!weather && !loading && !error && (
              <div className="text-center text-gray-500 py-20 bg-white/40 dark:bg-dark-card/50 backdrop-blur-md rounded-3xl border-dashed border-2 border-gray-200 dark:border-gray-800">
                <p className="text-lg">Allow location access or search for a city to start.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default App;
