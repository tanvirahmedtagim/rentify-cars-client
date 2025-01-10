import React, { useRef, useContext } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const AddCar = () => {
  const formRef = useRef(null);
  const { user } = useContext(AuthContext);
  const axiosSecure = useAxiosSecure();
  const handleAddCar = async (event) => {
    event.preventDefault();
    const form = event.target;

    const carModel = form.carModel.value;
    const rentalPrice = form.rentalPrice.value;
    const availability = form.availability.value === "true";
    const registrationNumber = form.registrationNumber.value;
    const features = form.features.value.split(",");
    const description = form.description.value;
    const bookingCount = 0;
    const imageUrl = form.imageUrl.value;
    const location = form.location.value;
    const dateAdded = new Date().toISOString();
    const bookingStatus = "Pending";

    const newCar = {
      carModel,
      rentalPrice,
      availability,
      registrationNumber,
      features,
      description,
      bookingCount,
      imageUrl,
      location,
      dateAdded,
      email: user?.email,
      bookingStatus,
    };

    try {
      const response = await axiosSecure.post(
        `/cars`,
        newCar,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.insertedId) {
        formRef.current.reset();
        Swal.fire({
          title: "Success!",
          text: "Car Added successfully.",
          icon: "success",
          confirmButtonText: "Cool",
        });
      }
    } catch (error) {
      console.error("Error adding car:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add car. Please try again.",
        icon: "error",
        confirmButtonText: "Okay",
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-indigo-100 to-indigo-50 shadow-xl rounded-lg">
      <h1 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
        Add New Car
      </h1>
      <form ref={formRef} onSubmit={handleAddCar} className="space-y-6">
        {/* Car Model */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Car Model
          </label>
          <input
            type="text"
            name="carModel"
            required
            placeholder="Enter car model"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Daily Rental Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Daily Rental Price
          </label>
          <input
            type="number"
            name="rentalPrice"
            required
            placeholder="Enter daily rental price"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Availability
          </label>
          <select
            name="availability"
            required
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300"
          >
            <option value="true">Available</option>
            <option value="false">Unavailable</option>
          </select>
        </div>

        {/* Vehicle Registration Number */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Vehicle Registration Number
          </label>
          <input
            type="text"
            name="registrationNumber"
            required
            placeholder="Enter vehicle registration number"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Features (e.g., GPS, AC, etc.)
          </label>
          <input
            type="text"
            name="features"
            required
            placeholder="Enter features separated by commas"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            placeholder="Write a brief description..."
            rows="4"
            required
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Image URL
          </label>
          <input
            type="text"
            name="imageUrl"
            required
            placeholder="Enter image URL"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Location
          </label>
          <input
            type="text"
            name="location"
            required
            placeholder="Enter location"
            className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-300 placeholder:text-gray-400"
          />
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full px-6 py-3 mt-6 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-400 transition duration-300"
          >
            Add Car
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCar;
