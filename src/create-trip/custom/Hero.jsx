import React from 'react';
import { Button } from '../../components/ui/button'; // Adjust path as necessary
import { Link } from 'react-router-dom';
import t2 from '../../assets/t2.png';

function Hero() {
  return (
    <div className="flex flex-col items-center justify-center px-6 py-16 bg-gradient-to-r from-blue-100 to-purple-50 min-h-screen text-gray-800">
      {/* Hero Title */}
      <h1 className="font-extrabold text-[56px] leading-tight text-center mb-6">
        <span className="text-[#5d04f8]">Discover Your Next Adventure with AI</span> <br />
        Personalized Itineraries at Your Fingertips
      </h1>

      {/* Subtitle */}
      <p className="text-lg md:text-xl text-gray-600 text-center max-w-2xl mb-8">
        Your personal trip planner and travel curator, creating custom itineraries tailored to your interests and budget.
      </p>

            {/* Call to Action */}
            <Link to={'/create-trip'}>
        <button
          type="button"
          className="flex justify-center gap-2 items-center mx-auto shadow-xl text-lg bg-gray-50 backdrop-blur-md lg:font-semibold isolation-auto border-gray-50 relative z-10 px-4 py-2 overflow-hidden border-2 rounded-full group before:absolute before:w-full before:transition-all before:duration-700 before:hover:w-full before:-left-full before:hover:left-0 before:rounded-full before:bg-emerald-500 hover:text-gray-50 before:-z-10 before:aspect-square before:hover:scale-150 before:hover:duration-700"
        >
          Get Started, It's Free
          <svg
            className="w-8 h-8 justify-end group-hover:rotate-90 group-hover:bg-gray-50 text-gray-50 ease-linear duration-300 rounded-full border border-gray-700 group-hover:border-none p-2 rotate-45"
            viewBox="0 0 16 19"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7 18C7 18.5523 7.44772 19 8 19C8.55228 19 9 18.5523 9 18H7ZM8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.29289 0.292893L0.928932 6.65685C0.538408 7.04738 0.538408 7.68054 0.928932 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 18L9 1H7L7 18H9Z"
              className="fill-gray-800 group-hover:fill-gray-800"
            ></path>
          </svg>
        </button>
      </Link>


      {/* Decorative Image */}
      <div className="mt-12">
         <img src={t2} alt="Travel illustration" 
           
          className="w-full max-w-4xl rounded-lg shadow-xl transform hover:scale-105 transition-transform duration-300"
        />
      </div>
    </div>
  );
}

export default Hero;
