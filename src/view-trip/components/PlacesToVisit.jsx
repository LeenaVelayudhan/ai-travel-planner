import React from 'react';
import PlaceCardItem from './PlaceCardItem';

function PlacesToVisit({ trip }) {
  // Check if itinerary data is available
  if (!trip?.tripData?.itinerary || typeof trip.tripData.itinerary !== 'object') {
    return <p className="text-gray-500">No itinerary available</p>;
  }

  // Convert the itinerary object into an array of days
  const itineraryDays = Object.entries(trip.tripData.itinerary);

  return (
    <div className="my-4">
      <h2 className="font-bold text-xl">Places to Visit</h2>
      <div>
        {itineraryDays.map(([day, details], i) => (
          <div key={i} className="mt-5">
            <h2 className="font-medium text-lg">{day}</h2>
            <p className="text-sm text-gray-600">
              <strong>Region:</strong> {details.region}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Best Time to Visit:</strong> {details.bestTimeToVisit}
            </p>
            <div className="grid md:grid-cols-2 gap-4 mt-3">
              {details.activities?.map((place, index) => (
                <PlaceCardItem key={index} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;