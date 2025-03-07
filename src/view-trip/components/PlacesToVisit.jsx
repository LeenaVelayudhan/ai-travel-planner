import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function PlacesToVisit({ trip }) {
  const [photoUrls, setPhotoUrls] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip?.tripData?.itinerary) {
      fetchAllPlacePhotos();
    }
  }, [trip]);

  const fetchAllPlacePhotos = async () => {
    try {
      const photoUrlMap = {};
      const placeQueries = [];

      // Collect all place names from morning, afternoon, and evening slots
      for (const dayKey of Object.keys(trip.tripData.itinerary)) {
        const day = trip.tripData.itinerary[dayKey];

        ["morning", "afternoon", "evening"].forEach((timeOfDay) => {
          if (day[timeOfDay]) {
            placeQueries.push(day[timeOfDay].placeName);
          }
        });
      }

      // Fetch place details in parallel
      const placeDetailsPromises = placeQueries.map((placeName) =>
        GetPlaceDetails({ textQuery: placeName }).catch((error) => {
          console.error(`Error fetching details for: ${placeName}`, error);
          return null;
        })
      );

      const responses = await Promise.all(placeDetailsPromises);

      // Store the images
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

                // Collect places from morning, afternoon, and evening
                const places = ["morning", "afternoon", "evening"]
                  .map((timeOfDay) => day[timeOfDay])
                  .filter(Boolean); // Remove undefined values

                if (places.length === 0) return null; // Skip empty days

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
    </div>
  );
}

export default PlacesToVisit;
