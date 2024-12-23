import React, { useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";

const CarDetails = () => {
  const { id } = useParams();
  const cars = useLoaderData();
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="lg:w-11/12 mx-auto md:my-12 my-8">
        <div className="card lg:card-side bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-xl rounded-lg overflow-hidden">
          <figure className="w-full lg:w-1/2">
            <img
              src={cars.imageUrl}
              alt={cars.carModel}
              className="object-cover w-full h-64 lg:h-full lg:w-full rounded-lg"
            />
          </figure>
          <div className="card-body w-full lg:w-1/2 p-4 lg:p-6">
            <h2 className="card-title text-2xl lg:text-3xl font-semibold mb-2">
              {cars.carModel}
            </h2>
            <p className="text-base lg:text-lg text-gray-100 mb-4">
              Price Per Day: ${cars.rentalPrice}
            </p>
            <p className="text-base lg:text-lg text-gray-100 mb-4">
              Availability: {cars.availability ? "Available" : "Unavailable"}
            </p>
            <h4 className="font-medium text-lg lg:text-xl mb-2">Features:</h4>
            <ul className="list-disc pl-5 mb-4 text-gray-200">
              {cars.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="text-base lg:text-lg text-gray-200 mb-4">
              {cars.description}
            </p>
            <div className="card-actions justify-end">
              <button
                onClick={() => setModalOpen(true)}
                className="btn btn-block px-6 py-3 text-lg font-semibold rounded-lg  bg-white bg-opacity-75 text-gray-800  hover:bg-opacity-90"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
            <h3 className="text-lg font-bold text-gray-800">
              Booking Confirmation
            </h3>
            <p className="mt-2 text-gray-700">
              You are booking:{" "}
              <span className="font-semibold">{cars.carModel}</span>
            </p>
            <p className="mt-2 text-gray-700">
              Price Per Day: ${cars.rentalPrice}
            </p>
            <p className="mt-2 text-gray-700">
              Availability: {cars.availability ? "Available" : "Unavailable"}
            </p>
            <h4 className="font-medium mt-4 text-gray-800">Features:</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {cars.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setModalOpen(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 mr-2"
              >
                Cancel
              </button>
              <button className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700">
                Confirm Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarDetails;
