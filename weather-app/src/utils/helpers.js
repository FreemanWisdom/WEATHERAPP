import { format } from 'date-fns';

export const formatTime = (timestamp, timezoneOffset) => {
    // timestamp is in seconds, timezoneOffset is in seconds
    // Note: Creating a date with offset manually is tricky because JS Date is local. 
    // A simpler way for display is usually just local time or using UTC + offset.
    // However, OpenWeatherMap returns unix time (UTC). 
    // We want to display the time at the location.

    // We can use UTC methods + offset
    const userOffset = new Date().getTimezoneOffset() * 60; // in seconds
    const localDate = new Date((timestamp + timezoneOffset + userOffset) * 1000);
    return format(localDate, 'HH:mm');
};

export const formatDate = (timestamp) => {
    return format(new Date(timestamp * 1000), 'EEE, d MMM');
};

export const capitalizeWords = (str) => {
    return str.replace(/\b\w/g, l => l.toUpperCase());
};

export const getWindDirection = (deg) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    return directions[Math.round(deg / 45) % 8];
};

export const getWeatherBackground = (weatherId, isDark) => {
    if (!weatherId) return isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-blue-100 to-white';

    // 2xx Thunderstorm
    if (weatherId >= 200 && weatherId < 300) {
        return isDark
            ? 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'
            : 'bg-gradient-to-br from-slate-700 via-slate-600 to-slate-500';
    }
    // 3xx Drizzle, 5xx Rain
    if (weatherId >= 300 && weatherId < 600) {
        return isDark
            ? 'bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900'
            : 'bg-gradient-to-br from-blue-300 via-blue-200 to-slate-300';
    }
    // 6xx Snow
    if (weatherId >= 600 && weatherId < 700) {
        return isDark
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-800'
            : 'bg-gradient-to-br from-blue-50 via-white to-blue-100';
    }
    // 7xx Atmosphere
    if (weatherId >= 700 && weatherId < 800) {
        return isDark
            ? 'bg-gradient-to-br from-slate-800 to-gray-900'
            : 'bg-gradient-to-br from-gray-300 via-gray-200 to-gray-300';
    }
    // 800 Clear
    if (weatherId === 800) {
        return isDark
            ? 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900'
            : 'bg-gradient-to-br from-blue-400 via-sky-300 to-blue-200';
    }
    // 80x Clouds
    if (weatherId > 800) {
        return isDark
            ? 'bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900'
            : 'bg-gradient-to-br from-blue-200 via-gray-200 to-gray-300';
    }

    return isDark ? 'bg-gradient-to-br from-slate-900 to-slate-800' : 'bg-gradient-to-br from-blue-100 to-white';
};
