import React from "react";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <div id="banner" className="relative w-full h-[200px] md:h-[300px] lg:h-[500px]  rounded-2xl">
      {/* Background Image/Video */}
      <div className="absolute w-full inset-0 rounded-2xl">
        <img
          src="https://i.ibb.co.com/4pq9rKj/car3.jpg"
          alt="Premium Cars"
          className="w-full h-full  rounded-2xl object-cover"
        />
        {/* Uncomment below and replace with video URL if using video */}
        {/* <video
          src="https://example.com/exotic-cars.mp4"
          autoPlay
          loop
          muted
          className="w-full h-full object-cover"
        /> */}
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50 rounded-2xl">
        <h1 className="text-2xl md:text-4xl lg:text-6xl font-bold text-white text-center drop-shadow-lg">
          Drive Your Dreams Today!
        </h1>
        <Link
          to="/availableCars"
          className="mt-6 px-6 py-3 text-base font-medium text-white bg-orange-500 rounded-md shadow-md hover:bg-orange-400 transition-all sm:px-8 sm:py-4 sm:text-lg md:rounded-lg"
        >
          View Available Cars
        </Link>
      </div>

      {/* Gradient Overlay for Better Readability */}
      <div className="absolute rounded-2xl inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
    </div>
  );
};

export default Banner;
