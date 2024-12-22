import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <div className="relative w-full h-screen">
        {/* Background Image/Video */}
        <div className="absolute inset-0">
          <img
            src="https://i.ibb.co.com/zf7pWP5/banner.jpg"
            alt="Premium Cars"
            className="w-full h-full object-cover"
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
        <div className="relative z-10 flex flex-col items-center justify-center h-full bg-black bg-opacity-50">
          <h1 className="text-4xl md:text-6xl font-bold text-white text-center drop-shadow-lg">
            Drive Your Dreams Today!
          </h1>
          <Link
            to="/availableCars"
            className="mt-6 px-8 py-4 text-lg font-semibold text-white bg-blue-600 rounded-lg shadow-md hover:bg-blue-500 transition-all"
          >
            View Available Cars
          </Link>
        </div>

        {/* Gradient Overlay for Better Readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black opacity-70"></div>
      </div>
    </div>
  );
};

export default Home;
