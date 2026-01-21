const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

if (!API_KEY) {
    console.warn('VITE_OPENWEATHER_API_KEY is not defined in .env');
}

/**
 * Fetch coordinates for a city name.
 * @param {string} query - City name (e.g., "London", "London,GB")
 * @returns {Promise<Array>} List of locations
 */
export const getCoordinates = async (query) => {
    try {
        const response = await fetch(`${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch coordinates');
        return await response.json();
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw error;
    }
};

/**
 * Fetch current weather data.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Weather data
 */
export const getCurrentWeather = async (lat, lon) => {
    try {
        const response = await fetch(`${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch current weather');
        return await response.json();
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw error;
    }
};

/**
 * Fetch 5-day / 3-hour forecast data.
 * @param {number} lat - Latitude
 * @param {number} lon - Longitude
 * @returns {Promise<Object>} Forecast data
 */
export const getForecast = async (lat, lon) => {
    try {
        const response = await fetch(`${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch forecast');
        return await response.json();
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw error;
    }
};

/**
 * Get city name from coordinates (Reverse Geocoding)
 * Useful when getting location from browser to show a nice name.
 */
export const getReverseGeocoding = async (lat, lon) => {
    try {
        const response = await fetch(`${GEO_URL}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${API_KEY}`);
        if (!response.ok) throw new Error('Failed to fetch location name');
        return await response.json();
    } catch (error) {
        console.error('Error fetching reverse geocoding:', error);
        throw error;
    }
}
