import React from "react";

const SpecialOffers = () => {
  return (
    <section className="bg-gray-100 py-12">
      <div className="max-w-screen-xl mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ animation: "slideIn 1s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Get 15% off for weekend rentals!
            </h3>
            <p className="text-white mb-4">
              Book now for a weekend getaway and save big. Limited time offer!
            </p>
            <a
              href="#"
              className="inline-block bg-white bg-opacity-75 text-gray-800 py-2 px-4 rounded-md hover:bg-opacity-90"
            >
              Learn More
            </a>
          </div>

          <div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ animation: "slideIn 1.2s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Luxury cars at $99/day this holiday season!
            </h3>
            <p className="text-white mb-4">
              Drive in style this holiday season. Exclusive offer for a limited
              time.
            </p>
            <a
              href="#"
              className="inline-block bg-white bg-opacity-75 text-gray-800 py-2 px-4 rounded-md hover:bg-opacity-90"
            >
              Book Now
            </a>
          </div>

          <div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            style={{ animation: "slideIn 1.4s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Special Offer: Free upgrade on all rentals!
            </h3>
            <p className="text-white mb-4">
              Get a free upgrade when you book any vehicle this month. Don't
              miss out!
            </p>
            <a
              href="#"
              className="inline-block bg-white bg-opacity-75 text-gray-800 py-2 px-4 rounded-md hover:bg-opacity-90"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
