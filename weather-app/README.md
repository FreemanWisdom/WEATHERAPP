> A modern, state-aware weather application focused on clarity, performance, and user intent.
🌌 WEATHERAPP

The WEATHERAPP is a modern, high-performance weather application focused on clarity, speed, and intelligent state handling. It delivers real-time weather data with a polished UI that adapts seamlessly across light and dark themes, while respecting user intent when switching between locations.

✨ Features
🎨 Adaptive UI (Light & Dark Themes)

Fully visible and accessible light theme (fixed contrast, icons, and text issues)

Soft shadows and depth in light mode (no washed-out UI)

Smooth transitions and micro-interactions

Weather-reactive backgrounds (clear, cloudy, rainy, etc.)

📍 Smart Location Handling

Current Location Weather (GPS-based)

Searched City Weather (manual search)

Two distinct refresh actions:

📍 Refresh current location weather

🔄 Refresh searched city weather

Clear separation between GPS location and searched locations

🔄 Persistent State Management

Remembers the user’s exact last context

On page refresh:

Restores the last active mode (current location or searched city)

Does not override user choice

First-time users default to current location weather

⚡ Performance-Focused

Fast load times

Minimal re-renders

Optimized animations for smooth UX

🧠 App Behavior Summary

On first load → fetch weather using current location

When a city is searched → switch to searched-location mode

Refresh buttons behave independently and intentionally

Browser refresh restores the previous session state exactly

🛠️ Tech Stack

Frontend: HTML, CSS, JavaScript

Build Tool: Vite

API: OpenWeather API

State Persistence: LocalStorage

Geolocation: Browser Geolocation API