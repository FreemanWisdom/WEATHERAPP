import React, { useMemo } from 'react';
import { useWeather } from '../context/WeatherContext';
import { formatDate } from '../utils/helpers';
import { CalendarDays } from 'lucide-react';

const DailyForecast = () => {
    const { forecast } = useWeather();

    const dailyData = useMemo(() => {
        if (!forecast || !forecast.list) return [];

        // Group by day (YYYY-MM-DD)
        const groups = {};

        forecast.list.forEach(item => {
            const date = new Date(item.dt * 1000).toISOString().split('T')[0];
            if (!groups[date]) {
                groups[date] = {
                    dt: item.dt,
                    temps: [],
                    weather: item.weather[0] // Use first item's icon/desc (usually 00:00 or current)
                    // Better: pick item around noon for icon
                };
            }
            groups[date].temps.push(item.main.temp);

            // Try to pick icon from midday (12:00)
            const hour = new Date(item.dt * 1000).getUTCHours();
            if (hour >= 11 && hour <= 14) {
                groups[date].weather = item.weather[0];
            }
        });

        const result = Object.values(groups).map(group => ({
            dt: group.dt,
            min: Math.min(...group.temps),
            max: Math.max(...group.temps),
            weather: group.weather
        }));

        // Skip today if it's incomplete or handle 5 days properly
        // Forecast API includes today + 5 days mostly.
        return result.slice(1, 6); // Show next 5 days
    }, [forecast]); // Depend on forecast instead of non-existent query

    if (!forecast) return null;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-2">
                <CalendarDays className="w-5 h-5 text-gray-500" />
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">5-Day Forecast</h3>
            </div>
            <div className="bg-white/40 dark:bg-dark-card/30 backdrop-blur-md rounded-3xl p-4 md:p-6 shadow-soft dark:shadow-none border border-white/20 dark:border-white/5">
                <div className="divide-y divide-gray-100 dark:divide-gray-800">
                    {dailyData.map((item) => (
                        <div key={item.dt} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <p className="w-24 font-medium text-gray-600 dark:text-gray-300">
                                {formatDate(item.dt)}
                            </p>

                            <div className="flex items-center gap-2 flex-1 justify-center">
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather.icon}.png`}
                                    alt={item.weather.description}
                                    className="w-10 h-10"
                                />
                                <span className="text-sm text-gray-400 capitalize hidden sm:block">
                                    {item.weather.description}
                                </span>
                            </div>

                            <div className="flex gap-4 w-24 justify-end">
                                <span className="font-bold text-gray-800 dark:text-gray-100">
                                    {Math.round(item.max)}°
                                </span>
                                <span className="text-gray-400 font-medium">
                                    {Math.round(item.min)}°
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DailyForecast;
