import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function PlacesToVisit({ trip }) {
  const [photoUrls, setPhotoUrls] = useState({});
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const [loadingEvents, setLoadingEvents] = useState(true);
  const [place, setPlace] = useState("");
  const [weather, setWeather] = useState(null);
  const [loadingWeather, setLoadingWeather] = useState(false);
  const [weatherError, setWeatherError] = useState(null);

  // Set place and fetch photos when trip changes
  useEffect(() => {
    if (trip?.tripData) {
      setPlace(trip.tripData.location || ""); // Fallback to empty string if location is missing
      if (trip.tripData.itinerary) {
        fetchAllPlacePhotos();
      }
    }
  }, [trip]);

  // Fetch events and weather when place changes
  useEffect(() => {
    if (place) {
      fetchEvents();
      fetchWeather();
    }
  }, [place]);

  const fetchAllPlacePhotos = async () => {
    try {
      const photoUrlMap = {};
      const placeQueries = [];

      for (const dayKey of Object.keys(trip.tripData.itinerary)) {
        const day = trip.tripData.itinerary[dayKey];
        ["morning", "afternoon", "evening"].forEach((timeOfDay) => {
          if (day[timeOfDay]) {
            placeQueries.push(day[timeOfDay].placeName);
          }
        });
      }

      const placeDetailsPromises = placeQueries.map((placeName) =>
        GetPlaceDetails({ textQuery: placeName }).catch((error) => {
          console.error(`Error fetching details for: ${placeName}`, error);
          return null;
        })
      );

      const responses = await Promise.all(placeDetailsPromises);

      responses.forEach((resp, index) => {
        const placeName = placeQueries[index];
        const photos = resp?.data?.places?.[0]?.photos;
        photoUrlMap[placeName] = photos?.length
          ? PHOTO_REF_URL.replace('{NAME}', photos[0].name)
          : "/placeholder.jpeg";
      });

      setPhotoUrls(photoUrlMap);
    } catch (error) {
      console.error("Error fetching photos:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchEvents = async () => {
    setLoadingEvents(true);
    try {
      const response = await fetch(
        `https://app.ticketmaster.com/discovery/v2/events.json?apikey=n83AM4J5PNBrBwotEXYPusloFDAqulSG&city=${encodeURIComponent(place)}&startDateTime=2024-06-01T00:00:00Z`
      );
      const data = await response.json();

      if (data._embedded && data._embedded.events) {
        const uniqueEvents = [];
        const eventIds = new Set();

        data._embedded.events.forEach((event) => {
          if (!eventIds.has(event.id)) {
            eventIds.add(event.id);
            uniqueEvents.push(event);
          }
        });

        setEvents(uniqueEvents);
      } else {
        setEvents([]);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
      setEvents([]);
    } finally {
      setLoadingEvents(false);
    }
  };

  const fetchWeather = async () => {
    setLoadingWeather(true);
    setWeatherError(null);
    try {
      const apiKey = 'bdc1146c700b7ab3cbbd22c72a75063f'; // Replace with your OpenWeatherMap API key
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(place)}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error("Error fetching weather:", error);
      setWeatherError(error.message);
    } finally {
      setLoadingWeather(false);
    }
  };

  return (
    <div className="mt-16 p-12 rounded-3xl shadow-2xl bg-white text-black flex flex-col items-center">
      <h2 className="font-extrabold text-4xl text-center mb-10 text-purple-900">📍 Must-Visit Places</h2>

      {loading ? (
        <p className="text-gray-700">Loading places...</p>
      ) : (
        <div className="space-y-10 w-full">
          {trip?.tripData?.itinerary &&
            Object.keys(trip.tripData.itinerary)
              .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }))
              .map((dayKey, dayIndex) => {
                const day = trip.tripData.itinerary[dayKey];
                const places = ["morning", "afternoon", "evening"]
                  .map((timeOfDay) => day[timeOfDay])
                  .filter(Boolean);

                if (places.length === 0) return null;

                return (
                  <div key={dayIndex} className="p-8 border border-purple-400 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                    <h2 className="text-2xl font-extrabold text-purple-900 mb-4">🗓️ {dayKey.replace("day", "Day ")}</h2>
                    <div className="flex flex-col gap-8">
                      {places.map((place, index) => (
                        <a
                          key={index}
                          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.placeName)}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex flex-col md:flex-row items-center p-6 border border-purple-600 rounded-2xl bg-purple-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
                        >
                          <img
                            src={photoUrls[place.placeName] || "/placeholder.jpeg"}
                            alt={place.placeName}
                            onError={(e) => (e.target.src = "/placeholder.jpeg")}
                            className="rounded-2xl w-40 h-40 object-cover mb-4 md:mb-0 md:mr-6 shadow-md border-4 border-white hover:border-purple-300 transition-border duration-300"
                          />
                          
                          <div className="space-y-3 text-center md:text-left text-white">
                            <h3 className="font-bold text-xl text-white hover:text-gray-300 transition-colors duration-300">{place.placeName}</h3>
                            {place.time && <p className="text-orange-300 text-sm font-semibold">🕒 {place.time}</p>}
                            <p className="text-sm text-gray-200">{place.placeDetails || "No details available"}</p>
                            {place.ticketPricing && <p className="text-blue-300 text-sm font-medium">🎟️ {place.ticketPricing}</p>}
                            {place.rating && <p className="text-yellow-300 text-sm font-semibold">⭐ {place.rating}</p>}
                          </div>
                        </a>
                      ))}
                    </div>
                  </div>
                );
              })}
        </div>
      )}

      

      {/* Events Section */}
      <div className="mt-16 w-full">
        <h2 className="font-extrabold text-4xl text-center mb-10 text-blue-900">🎭 Events in {place || "Unknown Location"}</h2>

        {loadingEvents ? (
          <p className="text-gray-700 text-center">Loading events...</p>
        ) : events.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div key={event.id} className="p-6 border border-blue-400 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
                <img
                  src={event.images?.[0]?.url || "/placeholder.jpeg"}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded-2xl mb-4"
                />
                <h3 className="font-bold text-xl text-blue-900">{event.name}</h3>
                <p className="text-gray-700 text-sm">📅 {event.dates.start.localDate}</p>
                <p className="text-gray-700 text-sm">📍 {event._embedded?.venues?.[0]?.name || "Unknown Venue"}</p>
                <a
                  href={event.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-4 text-center text-white bg-blue-700 px-4 py-2 rounded-lg hover:bg-blue-800 transition-all"
                >
                  🎟️ Get Tickets
                </a>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-700 text-center">No events found for {place}.</p>
        )}
      </div>

      {/* Weather Info Section */}
      
    </div>
  );
}

export default PlacesToVisit;