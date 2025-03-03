import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


function HotelCardItem({ hotel }) {
    const [photoUrl, setPhotoUrl] = useState('/placeholder.jpeg'); // Default to placeholder

    useEffect(() => {
        if (hotel) {
            GetPlacePhoto();
        }
    }, [hotel]);

    const GetPlacePhoto = async () => {
        try {
            const data = { textQuery: hotel?.hotelName }; // Ensure correct property name
            const result = await GetPlaceDetails(data);
            
            if (result?.data?.places?.[0]?.photos?.length > 0) {
                const photoRef = result.data.places[0].photos[0].name; // Use first available photo
                const PhotoUrl = PHOTO_REF_URL.replace('{NAME}', photoRef);
                setPhotoUrl(PhotoUrl);
            }
        } catch (error) {
            console.error("Failed to fetch hotel image:", error);
        }
    };

    return (
        <Link
            to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                hotel?.hotelName + ", " + hotel?.hotelAddress
            )}`}
            target='_blank'
        >
            <div className='hover:scale-110 transition-all cursor-pointer mt-5 mb-8 border rounded-3xl p-6 shadow-xl bg-white hover:shadow-2xl'>
                <img
                    src={photoUrl}
                    alt={hotel?.hotelName}
                    onError={(e) => {
                        console.error("Image failed to load:", e.target.src);
                        e.target.src = "/placeholder.jpeg"; // Ensure fallback
                    }}
                    className='rounded-xl h-[180px] w-full object-cover'
                />
                <div className='my-2 text-center'>
                    <h2 className='font-medium text-lg'>{hotel?.hotelName}</h2>
                    <h2 className='text-xs text-gray-500'>📍 {hotel?.hotelAddress}</h2>
                    <h2 className='text-sm font-semibold mt-1'>💰 ${hotel?.price} per night</h2>
                    <h2 className='text-sm text-yellow-500 mt-1'>⭐ {hotel?.rating}</h2>
                </div>
            </div>
        </Link>
    );
}

export default HotelCardItem;
