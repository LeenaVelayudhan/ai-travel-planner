import React from 'react';

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-16 p-12 rounded-3xl shadow-2xl relative bg-white text-black flex flex-col items-center">
      <h2 className='font-extrabold text-4xl text-center mb-10 text-purple-900'>
        📍 Must-Visit Places
      </h2>
      <div className='space-y-10 w-full'>
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([dayKey, day], dayIndex) => (
            <div key={dayIndex} className='p-8 border border-purple-400 rounded-3xl shadow-lg bg-white hover:shadow-xl transition-shadow duration-300'>
              <h2 className='text-2xl font-extrabold text-purple-900 mb-4'>🗓️ Day {dayIndex + 1}</h2>
              <p className='text-lg font-medium text-gray-800 mb-6'>
                🌞 Best Time to Visit: <span className='font-semibold text-purple-700'>{day.bestTimeToVisit}</span>
              </p>
              
              {/* Column Layout for Activities */}
              <div className='flex flex-col gap-8'>
                {day.activities.map((activity, index) => (
                  <a
                    key={index}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.placeName)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex flex-col md:flex-row items-center p-6 border border-purple-600 rounded-2xl bg-purple-700 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl'
                  >
                    <img 
                      src={activity.image || '/placeholder.jpeg'} 
                      alt={activity.placeName} 
                      className='rounded-2xl w-40 h-40 object-cover mb-4 md:mb-0 md:mr-6 shadow-md border-4 border-white hover:border-purple-300 transition-border duration-300' 
                    />
                    <div className='space-y-3 text-center md:text-left text-white'>
                      <h3 className='font-bold text-xl text-white hover:text-gray-300 transition-colors duration-300'>
                        {activity.placeName}
                      </h3>
                      {activity.time && (
                        <p className='text-orange-300 text-sm font-semibold'>🕒 {activity.time}</p>
                      )}
                      <p className='text-sm text-gray-300 italic'>{activity.timeTravel || activity.duration}</p>
                      <p className='text-sm text-gray-200'>{activity.placeDetails}</p>
                      {activity.ticketPricing && (
                        <p className='text-blue-300 text-sm font-medium'>🎟️ {activity.ticketPricing}</p>
                      )}
                      {activity.rating && (
                        <p className='text-yellow-300 text-sm font-semibold'>⭐ {activity.rating}</p>
                      )}
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default PlacesToVisit;
