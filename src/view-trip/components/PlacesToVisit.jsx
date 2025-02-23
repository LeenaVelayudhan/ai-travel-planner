import React from 'react';

function PlacesToVisit({ trip }) {
  return (
    <div className="mt-16 p-12 rounded-3xl shadow-2xl relative bg-gradient-to-r from-blue-100 to-teal-200 text-black flex flex-col items-center">
      <h2 className='font-extrabold text-4xl text-center mb-10'>📍 Must-Visit Places</h2>
      <div className='space-y-10 w-full'>
        {trip?.tripData?.itinerary &&
          Object.entries(trip.tripData.itinerary).map(([dayKey, day], dayIndex) => (
            <div key={dayIndex} className='p-6 border border-gray-300 rounded-2xl shadow-lg bg-white'>
              <h2 className='text-2xl font-extrabold text-purple-900 mb-4'>🗓️ Day {dayIndex + 1}</h2>
              <p className='text-lg font-medium text-gray-800 mb-4'>🌞 Best Time to Visit: <span className='font-semibold text-purple-700'>{day.bestTimeToVisit}</span></p>
              <div className='grid md:grid-cols-2 gap-6 bg-gradient-to-r from-purple-200 to-purple-300 p-6 rounded-xl shadow-md'>
                {day.activities.map((activity, index) => (
                  <a
                    key={index}
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(activity.placeName)}`}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='flex items-center p-5 border border-gray-300 rounded-xl bg-white shadow-md transition-transform transform hover:scale-105 hover:shadow-xl'
                  >
                    <img src={activity.image || '/placeholder.jpeg'} alt={activity.placeName} className='rounded-xl w-36 h-36 object-cover mr-5 shadow-lg border-4 border-purple-500' />
                    <div className='space-y-2'>
                      <h3 className='font-bold text-lg text-purple-900'>{activity.placeName}</h3>
                      {activity.time && <p className='text-orange-700 text-sm font-semibold'>🕒 {activity.time}</p>}
                      <p className='text-sm text-gray-700 italic'>{activity.timeTravel || activity.duration}</p>
                      <p className='text-sm text-gray-900'>{activity.placeDetails}</p>
                      {activity.ticketPricing && <p className='text-blue-700 text-sm font-medium'>🎟️ {activity.ticketPricing}</p>}
                      {activity.rating && <p className='text-yellow-700 text-sm font-semibold'>⭐ {activity.rating}</p>}
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
