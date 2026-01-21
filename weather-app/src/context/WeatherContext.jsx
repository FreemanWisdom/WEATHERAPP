import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { getCoordinates, getCurrentWeather, getForecast } from '../services/weatherService';

const WeatherContext = createContext();

export const useWeather = () => {
    return useContext(WeatherContext);
};

export const WeatherProvider = ({ children }) => {
    const [weather, setWeather] = useState(null);
    const [forecast, setForecast] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
    const [locationName, setLocationName] = useState('');

    // New State for Location Mode
    const [locationMode, setLocationMode] = useState(() => localStorage.getItem('locationMode') || 'GPS'); // 'GPS' or 'SEARCH'
    const [lastSearched, setLastSearched] = useState(() => {
        const saved = localStorage.getItem('lastSearched');
        return saved ? JSON.parse(saved) : null;
    });

    // Load theme on startup
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'light' ? 'dark' : 'light');
    };

    const fetchWeatherData = useCallback(async (lat, lon) => {
        setLoading(true);
        setError(null);
        try {
            const [currentData, forecastData] = await Promise.all([
                getCurrentWeather(lat, lon),
                getForecast(lat, lon)
            ]);
            setWeather(currentData);
            setForecast(forecastData);
            setLocationName(currentData.name);
        } catch (err) {
            setError(err.message || 'Failed to fetch weather data');
        } finally {
            setLoading(false);
        }
    }, []);

    const searchLocation = useCallback(async (query) => {
        setLoading(true);
        setError(null);
        try {
            const results = await getCoordinates(query);
            if (!results || results.length === 0) {
                throw new Error('Location not found');
            }
            const { lat, lon, name, state, country } = results[0];
            const displayName = [name, state, country].filter(Boolean).join(', ');

            // Update Mode and Persistence
            setLocationMode('SEARCH');
            localStorage.setItem('locationMode', 'SEARCH');

            const searchData = { lat, lon, name: displayName };
            setLastSearched(searchData);
            localStorage.setItem('lastSearched', JSON.stringify(searchData));

            setLocationName(displayName);
            await fetchWeatherData(lat, lon);

        } catch (err) {
            setError(err.message || 'Error searching location');
            setLoading(false);
        }
    }, [fetchWeatherData]);

    const fetchUserLocation = useCallback(() => {
        if (!navigator.geolocation) {
            setError('Geolocation is not supported by your browser');
            return;
        }
        setLoading(true);
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                // Update Mode and Persistence
                setLocationMode('GPS');
                localStorage.setItem('locationMode', 'GPS');
                // Clear separate search persistence if strictly enforcing mutual exclusivity, 
                // but keeping it might be useful for history. 
                // modifying 'lastLocation' might be redundant now.

                await fetchWeatherData(latitude, longitude);
            },
            (err) => {
                setError('Location permission denied. Please search manually.');
                setLoading(false);
            }
        );
    }, [fetchWeatherData]);

    // Initial load based on persisted mode
    useEffect(() => {
        // We look at the state initialization values which already read from localStorage
        if (locationMode === 'SEARCH' && lastSearched) {
            fetchWeatherData(lastSearched.lat, lastSearched.lon);
            setLocationName(lastSearched.name);
        } else {
            // Default to GPS if mode is GPS or if some state is missing
            fetchUserLocation();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Run once on mount

    const refreshWeather = useCallback(() => {
        if (locationMode === 'SEARCH' && lastSearched) {
            fetchWeatherData(lastSearched.lat, lastSearched.lon);
        } else {
            // Retrieve fresh GPS position
            fetchUserLocation();
        }
    }, [locationMode, lastSearched, fetchWeatherData, fetchUserLocation]);

    return (
        <WeatherContext.Provider value={{
            weather,
            forecast,
            loading,
            error,
            theme,
            toggleTheme,
            searchLocation,
            refreshWeather,
            locationName,
            fetchUserLocation,
            locationMode
        }}>
            {children}
        </WeatherContext.Provider>
    );
};
