import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function UserTripCard({ trip }) {
  const [photoUrl, setPhotoUrl] = useState('/placeholder.jpeg'); // Fallback image
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (trip) {
      GetPlaceImg();
    }
  }, [trip]);

  const GetPlaceImg = async () => {
    const data = {
      textQuery: trip?.userSelection?.location,
    };

    try {
      const resp = await GetPlaceDetails(data);
      console.log("API Response:", resp.data); // Log the API response for debugging

      // Check if photos exist
      const photos = resp.data?.places?.[0]?.photos;
      if (!photos || photos.length === 0) {
        console.warn("No photos found for:", trip?.userSelection?.location);
        setPhotoUrl('/placeholder.jpeg'); // Fallback image
        return;
      }

      // Use the first photo (index 0)
      const photoName = photos[0].name;
      const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
      console.log("Photo URL:", photoUrl); // Log the photo URL for debugging
      setPhotoUrl(photoUrl);
    } catch (error) {
      console.error("Error fetching photo:", error);
      setPhotoUrl('/placeholder.jpeg'); // Fallback on error
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Link to={'/view-trip/' + trip?.id}>
      <div className="hover:scale-105 transition-all hover:shadow-sm">
        {loading ? (
          <div className="h-[200px] w-full bg-slate-200 animate-pulse rounded-xl"></div>
        ) : (
          <img
            src={photoUrl}
            className="rounded-xl h-[200px] w-full object-cover"
            alt={trip?.userSelection?.location}
            onError={(e) => {
              console.error("Image failed to load:", photoUrl);
              e.target.src = '/placeholder.jpeg'; // Fallback if image fails to load
            }}
          />
        )}
        <div>
          <h2 className="font-medium text-lg">{trip?.userSelection?.location}</h2>
          <h2 className="text-sm text-gray-600">
            {trip?.userSelection?.totalDays} Days trip with {trip?.userSelection?.budget}
          </h2>
        </div>
      </div>
    </Link>
  );
}

export default UserTripCard;