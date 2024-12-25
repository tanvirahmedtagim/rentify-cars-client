import React, { useContext, useState } from "react";
import { useLoaderData, useParams } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import axios from "axios";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";

const CarDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const cars = useLoaderData();
  const [isModalOpen, setModalOpen] = useState(false);
  const {
    _id,
    carModel,
    rentalPrice,
    availability,
    features,
    description,
    bookingCount,
    imageUrl,
    location,
    dateAdded,
    email,
    bookingStatus,
  } = cars || {};

  const handleMyBookings = () => {
    const bookingItems = {
      carModel,
      rentalPrice,
      imageUrl,
      dateAdded,
      email,
      bookingStatus,
      carId: _id,
    };

    axiosSecure
      .post(`/myBooking`, bookingItems, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.data.insertedId) {
          Swal.fire({
            title: "Success!",
            text: "Booking successfully.",
            icon: "success",
            confirmButtonText: "Cool",
          });
          setModalOpen(false);
        }
      })
      .catch((error) => {
        console.error("Error adding to Bookings:", error);
        toast.alert("An error occurred. Please try again.");
      });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="lg:w-11/12 mx-auto md:my-12 my-8">
        <div className="card lg:card-side bg-gradient-to-b from-[#d67528] to-[#e0945e] text-black shadow-xl rounded-lg overflow-hidden">
          <figure className="w-full lg:w-1/2">
            <img
              src={imageUrl}
              alt={carModel}
              className="object-cover w-full h-64 lg:h-full lg:w-full rounded-lg"
            />
          </figure>
          <div className="card-body w-full lg:w-1/2 p-4 lg:p-6">
            <h2 className="card-title text-2xl lg:text-3xl font-semibold mb-2">
              {cars.carModel}
            </h2>
            <p className="text-base lg:text-lg text-black mb-4">
              Price Per Day: ${rentalPrice}
            </p>
            <p className="text-bold lg:text-lg p-3 w-48 rounded-xl text-white bg-[#11ba11] mb-4">
              Availability: {availability ? "Available" : "Unavailable"}
            </p>
            <h4 className="font-medium text-lg lg:text-xl mb-2">Features:</h4>
            <ul className="list-disc pl-5 mb-4 text-black">
              {features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <p className="text-base lg:text-lg text-black mb-4">
              {description}
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
              You are booking: <span className="font-semibold">{carModel}</span>
            </p>
            <p className="mt-2 text-gray-700">Price Per Day: ${rentalPrice}</p>
            <p className="mt-2 text-gray-700">
              Availability: {availability ? "Available" : "Unavailable"}
            </p>
            <h4 className="font-medium mt-4 text-gray-800">Features:</h4>
            <ul className="list-disc pl-5 text-gray-600">
              {features.map((feature, index) => (
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
              <button
                onClick={handleMyBookings}
                className="bg-orange-600 text-white px-4 py-2 rounded hover:bg-orange-700"
              >
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
