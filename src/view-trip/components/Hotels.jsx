import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { GetPlaceDetails, PHOTO_REF_URL } from "@/service/GlobalApi";

function Hotels({ trip }) {
  const [hotelImages, setHotelImages] = useState({});

  useEffect(() => {
    if (trip?.tripData?.hotelOptions) {
      fetchHotelImages();
    }
  }, [trip]);

  const fetchHotelImages = async () => {
    const imageMap = {};

    await Promise.all(
      trip.tripData.hotelOptions.map(async (hotel) => {
        try {
          const data = { textQuery: hotel.hotelName };
          const result = await GetPlaceDetails(data);

          // Ensure we have valid photo data
          const photos = result.data?.places[0]?.photos;
          if (!photos || photos.length === 0) {
            console.warn("No photos found for:", hotel.hotelName);
            return;
          }

          // Get the first image
          const photoName = photos[0].name;
          const photoUrl = PHOTO_REF_URL.replace("{NAME}", photoName);

          imageMap[hotel.hotelName] = photoUrl;
        } catch (error) {
          console.error("Error fetching image for", hotel.hotelName, error);
        }
      })
    );

    setHotelImages(imageMap);
  };

  return (
    <div className="mt-16 p-12 rounded-3xl shadow-2xl relative bg-gradient-to-r from-blue-100 to-teal-200 text-black flex flex-col items-center">
      <h2 className="font-extrabold text-4xl text-center mb-10">🏨 Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {trip?.tripData?.hotelOptions?.length > 0 ? (
          trip.tripData.hotelOptions.map((hotel, index) => (
            <Link
              key={index}
              to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hotel.hotelName + ", " + hotel.hotelAddress
              )}`}
              target="_blank"
            >
              <div className="border rounded-3xl p-6 shadow-xl bg-white hover:shadow-2xl transition-all cursor-pointer w-80">
                <img
                  src={hotelImages[hotel.hotelName] || "/placeholder.jpeg"}
                  alt={hotel.hotelName}
                  onError={(e) => (e.target.src = "/placeholder.jpeg")} // Fallback in case of error
                  className="rounded-2xl w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="mt-5 text-center">
                  <h2 className="font-bold text-xl">{hotel.hotelName}</h2>
                  <h3 className="text-gray-500 text-sm mt-1">📍 {hotel.hotelAddress}</h3>
                  <h3 className="font-medium mt-2">💰 ${hotel.price} per night</h3>
                  <h3 className="font-medium text-yellow-500 mt-1">⭐ {hotel.rating}</h3>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p className="text-center text-gray-700">No hotels available</p>
        )}
      </div>
    </div>
  );
}

export default Hotels;
