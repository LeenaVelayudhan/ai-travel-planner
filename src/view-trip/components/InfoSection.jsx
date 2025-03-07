import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(''); // URL for the background image
    const [weather, setWeather] = useState(null); // Weather data
    const [loading, setLoading] = useState(true); // Loading state for both photo and weather

    useEffect(() => {
        if (trip?.userSelection?.location) {
            fetchData(); // Fetch both photo and weather data when trip is available
        }
    }, [trip]);

    const fetchData = async () => {
        setLoading(true);
        try {
            if (trip?.userSelection?.location) {
                const location = trip.userSelection.location.split(","); // e.g., "New York" from "New York, USA"
                console.log(location);
    
                // Construct the weather API URL using the place name
                const apiKey = "bdc1146c700b7ab3cbbd22c72a75063f"; // Replace with your actual API key
                const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location[0]}&appid=${apiKey}&units=metric`;
                
                // Fetch weather data
                const weatherResp = await fetch(weatherUrl);
                const weatherData = await weatherResp.json();
    
                // Check if the data is valid and update the weather state
                if (weatherData.main && weatherData.weather) {
                    setWeather({
                        temp: weatherData.main.temp,           // Temperature in Celsius
                        description: weatherData.weather[0].description, // Weather description (e.g., "clear sky")
                        icon: weatherData.weather[0].icon      // Weather icon code (e.g., "01d")
                    });
                } else {
                    console.error("Invalid weather data:", weatherData);
                }
            }
        } catch (error) {
            console.error("Error fetching weather:", error);
        } finally {
            setLoading(false); // Ensure loading is set to false after fetch completes
        }
    };

    return (
        <div className="relative w-full h-auto flex flex-col items-center">
            {/* Full-Width Background Image with Weather Overlay */}
            <div className="relative w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-2xl">
                {loading ? (
                    <div className="flex items-center justify-center h-full bg-gray-100">
                        <p className="text-gray-500 text-lg">Loading image...</p>
                    </div>
                ) : (
                    <img
                        src={photoUrl}
                        className="w-full h-full object-cover rounded-3xl"
                        alt="Destination"
                        onError={(e) => {
                            console.error("Image failed to load:", photoUrl);
                            e.target.src = '/placeholder.jpeg'; // Fallback image
                        }}
                    />
                )}
                {/* Weather Info Overlay */}
                <div className="absolute top-4 right-4 bg-white bg-opacity-75 p-4 rounded-lg shadow-lg">
                    {weather ? (
                        <div className="flex items-center gap-2">
                            <img
                                src={`http://openweathermap.org/img/wn/${weather.icon}.png`}
                                alt="Weather icon"
                                className="w-8 h-8"
                            />
                            <div>
                                <p className="text-gray-800 font-semibold">{weather.temp}°C</p>
                                <p className="text-gray-600 capitalize text-sm">{weather.description}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-500">Loading weather...</p>
                    )}
                </div>
            </div>

            {/* Travel Info Section */}
            <div className="relative w-full max-w-5xl mt-[-50px] bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-3xl shadow-lg text-center text-white z-10">
                <h2 className="font-extrabold text-4xl md:text-5xl">{trip?.userSelection?.location}</h2>
                <div className="flex flex-wrap justify-center gap-6 mt-4">
                    <span className="bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg">
                        🗓️ {trip?.userSelection?.totalDays} Days
                    </span>
                    <span className="bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg">
                        👩‍👧‍👦 {trip?.userSelection?.traveler} People
                    </span>
                    <span className="bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg">
                        💵 {trip?.userSelection?.budget} Budget
                    </span>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;