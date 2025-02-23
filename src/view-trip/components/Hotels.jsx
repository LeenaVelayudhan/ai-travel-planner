import React from "react";
import { Link } from "react-router-dom";  

function Hotels({ trip }) {
  return (
    <div className="mt-16 p-12 rounded-3xl shadow-2xl relative bg-gradient-to-r from-blue-100 to-teal-200 text-black flex flex-col items-center">
      <h2 className="font-extrabold text-4xl text-center mb-10">🏨 Hotel Recommendations</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 place-items-center">
        {trip?.tripData?.hotels?.length > 0 ? (
          trip.tripData.hotels.map((hotel, index) => (
            <Link
              key={index} 
              to={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName},${hotel.hotelAddress}`}
              target="_blank"
            >
              <div className="border rounded-3xl p-6 shadow-xl bg-white hover:shadow-2xl transition-all cursor-pointer w-80">
                <img src="/placeholder.jpeg" alt="Hotel" className="rounded-2xl w-full h-48 object-cover transition-transform duration-500 hover:scale-105" />
                <div className="mt-5 text-center">
                  <h2 className="font-bold text-xl">{hotel.hotelName}</h2>
                  <h3 className="text-gray-500 text-sm mt-1">📍 {hotel.hotelAddress}</h3>
                  <h3 className="font-medium mt-2">💰 {hotel.price}</h3>
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
