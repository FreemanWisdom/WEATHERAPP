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
            <div className="flex items-center gap-2 px-1">
                <CalendarDays className="w-5 h-5 text-blue-500" />
                <h3 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-gray-100">5-Day Forecast</h3>
            </div>
            <div className="bg-white/40 dark:bg-dark-card/30 backdrop-blur-lg rounded-3xl p-5 md:p-8 shadow-soft dark:shadow-none border border-white/20 dark:border-white/5">
                <div className="divide-y divide-gray-100/30 dark:divide-white/5">
                    {dailyData.map((item) => (
                        <div key={item.dt} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                            <p className="w-16 md:w-24 font-bold text-gray-700 dark:text-gray-200 text-sm md:text-base">
                                {formatDate(item.dt).split(',')[0]}
                            </p>

                            <div className="flex items-center gap-2 flex-1 justify-center">
                                <img
                                    src={`https://openweathermap.org/img/wn/${item.weather.icon}@2x.png`}
                                    alt={item.weather.description}
                                    className="w-10 h-10 md:w-12 md:h-12 drop-shadow-sm"
                                />
                                <span className="text-sm text-gray-400 dark:text-gray-500 capitalize hidden md:block">
                                    {item.weather.description}
                                </span>
                            </div>

                            <div className="flex gap-4 w-20 md:w-24 justify-end">
                                <span className="font-bold text-gray-800 dark:text-gray-100 text-base md:text-lg">
                                    {Math.round(item.max)}°
                                </span>
                                <span className="text-gray-400 dark:text-gray-500 font-medium text-base md:text-lg">
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
