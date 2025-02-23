import React from 'react';

function InfoSection({ trip }) {
    return (
        <div className="relative w-full h-auto flex flex-col items-center"> 
            {/* Full-Width Background Image */}
            <div className="w-full h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden rounded-3xl shadow-2xl">
                <img 
                    src='/placeholder.jpeg' 
                    className='w-full h-full object-cover rounded-3xl' 
                    alt="Destination" 
                />
            </div>
            
            {/* Travel Info Section */}
            <div className='relative w-full max-w-5xl mt-[-50px] bg-gradient-to-r from-blue-500 to-teal-400 p-8 rounded-3xl shadow-lg text-center text-white z-10'>
                <h2 className='font-extrabold text-4xl md:text-5xl'>{trip?.userSelection?.location}</h2>
                <div className='flex flex-wrap justify-center gap-6 mt-4'>
                    <span className='bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg'>🗓️ {trip?.userSelection?.totalDays} Days</span>
                    <span className='bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg'>👩‍👧‍👦 {trip?.userSelection?.traveler} People</span>
                    <span className='bg-white text-gray-800 font-semibold rounded-full px-6 py-3 shadow-md text-lg'>💵 {trip?.userSelection?.budget} Budget</span>
                </div>
            </div>
        </div>
    );
}

export default InfoSection;