import { GetPlaceDetails, PHOTO_REF_URL } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Fallback image if no photo is available
const defaultImage = '/public/road-trip-vacation.jpg';

function HotelCardItem({ item }) {
    const [photoUrl, setPhotoUrl] = useState(null);

    useEffect(() => {
        if (item?.hotelName) {
            GetPlaceImg();
        }
    }, [item?.hotelName]);

    const GetPlaceImg = async () => {
        const data = {
            textQuery: item?.hotelName
        };
        try {
            const result = await GetPlaceDetails(data);
            console.log('API Response:', result.data); // Debugging

            // Check if the response contains photos
            if (result?.data?.places?.[0]?.photos?.length > 0) {
                const photoName = result.data.places[0].photos[0].name; // Use the first photo
                setPhotoUrl(PHOTO_REF_URL.replace('{NAME}', photoName));
            } else {
                console.error('No photos found for this hotel');
                setPhotoUrl(defaultImage); // Fallback to default image
            }
        } catch (error) {
            console.error('Error fetching place image:', error);
            setPhotoUrl(defaultImage); // Fallback to default image
        }
    };

    return (
        <div>
            <Link to={`https://www.google.com/maps/search/?api=1&query=${item?.hotelName},${item?.hotelAddress}`} target='_blank'>
                <div className='hover:scale-105 transition-all cursor-pointer'>
                    <img
                        src={photoUrl || defaultImage}
                        className='rounded-xl h-[180px] w-full object-cover'
                        alt={item?.hotelName || 'Hotel'}
                    />
                    <div className='my-3 py-2'>
                        <h2 className='font-medium'>{item?.hotelName}</h2>
                        <h2 className='text-xs text-gray-500'>📍{item?.hotelAddress}</h2>
                        <h2 className='text-sm'>💰{item?.price}</h2>
                        <h2 className='text-sm'>⭐{item?.rating}</h2>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default HotelCardItem;