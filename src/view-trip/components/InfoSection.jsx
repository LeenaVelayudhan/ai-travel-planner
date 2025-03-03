import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';

function InfoSection({ trip }) {
    const [photoUrl, setPhotoUrl] = useState(''); // Start with an empty URL
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (trip?.userSelection?.location) {
            GetPlacePhoto(); // Call the function when the trip is available
        }
    }, [trip]); // Ensure effect runs when 'trip' changes

    const GetPlacePhoto = async () => {
        const data = {
            textQuery: trip.userSelection.location // Use location from trip's userSelection
        };

        try {
            const resp = await GetPlaceDetails(data); // Await the response directly
            console.log(resp.data);

            // Check if photos exist
            const photos = resp.data?.places?.[0]?.photos;
            if (!photos || photos.length === 0) {
                console.warn("No photos found for this location.");
                return; // Do not set a fallback image
            }

            // Use the 3rd photo (index 3) if available, otherwise use the first photo
            const photoIndex = photos.length > 4 ? 4 : 0;
            const photoName = photos[photoIndex].name;
            const photoUrl = PHOTO_REF_URL.replace('{NAME}', photoName);
            setPhotoUrl(photoUrl);

        } catch (error) {
            console.error("Error fetching photo:", error);
        } finally {
            setLoading(false); // Stop loading
        }
    };

    return (
        <div className="relative w-full h-auto flex flex-col items-center">
            {/* Full-Width Background Image */}
            <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-2xl">
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
                            e.target.src = '/placeholder.jpeg'; // Fallback if image fails to load
                        }}
                    />
                )}
            </div>

            {/* Travel Info Section */}
            <div className="relative w-full max-w-5xl mt-[-50px] bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-3xl shadow-lg text-center text-white z-10">
                <h2 className="font-extrabold text-4xl md:text-5xl">{trip?.userSelection?.location}</h2>
                <div className="flex flex-wrap justify-center gap-6 mt-4">
                    <span className="bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg">🗓️ {trip?.userSelection?.totalDays} Days</span>
                    <span className="bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg">👩‍👧‍👦 {trip?.userSelection?.traveler} People</span>
                    <span className="bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg">💵 {trip?.userSelection?.budget} Budget</span>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;