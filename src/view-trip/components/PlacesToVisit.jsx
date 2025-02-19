import React from "react";
import PlaceCardItem from "./PlaceCardItem";

function PlacesToVisit({ trip }) {
  // Ensure itinerary exists and is an array before mapping
  if (!trip?.tripData?.itinerary || !Array.isArray(trip.tripData.itinerary)) {
    return <p className="text-gray-500">No itinerary available</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-xl">Places to Visit</h2>
      <div>
        {trip.tripData.itinerary.map((item, index) => (
          <div key={index} className="mt-5">
            <h2 className="font-bold text-lg">{item?.day || `Day ${index + 1}`}</h2>
            <div className="grid md:grid-cols-2 gap-5">
              {Array.isArray(item.plan) && item.plan.length > 0 ? (
                item.plan.map((place, i) => (
                  <div key={i} className="my-2">
                    <h2 className="font-medium text-sm text-orange-600">
                      {place?.time || "Time not specified"}
                    </h2>
                    <PlaceCardItem place={place} />
                  </div>
                ))
              ) : (
                <p className="text-gray-400">No places planned for this day.</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
