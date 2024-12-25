import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FaMapMarkerAlt,
  FaCar,
  FaDollarSign,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";

const AvailableCars = () => {
  const [cars, setCars] = useState([]);
  const [view, setView] = useState("grid");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("");

  useEffect(() => {
    // Fetch all cars from the backend
    axios
      .get(`${import.meta.env.VITE_API_URL}/cars`)
      .then((response) => setCars(response.data))
      .catch((error) => console.error("Error fetching cars:", error));
  }, []);

  // Filter out unavailable cars and apply search query
  const filteredCars = cars
    .filter((car) => car.availability) // Show only available cars
    .filter((car) => {
      const query = searchQuery.toLowerCase();
      return (
        (car.carModel || "").toLowerCase().includes(query) ||
        (car.location || "").toLowerCase().includes(query)
      );
    });

  // Sort cars based on the selected option
  const sortedCars = [...filteredCars].sort((a, b) => {
    if (sortOption === "carModel")
      return (a.carModel || "").localeCompare(b.carModel || "");
    if (sortOption === "location")
      return (a.location || "").localeCompare(b.location || "");
    if (sortOption === "rentalPrice")
      return (a.rentalPrice || 0) - (b.rentalPrice || 0);
    if (sortOption === "bookingCount")
      return (b.bookingCount || 0) - (a.bookingCount || 0); // Descending for popularity
    return 0;
  });

  return (
    <div className="p-4">
      {/* Search, Sort, and Toggle Controls */}
      <div className="flex md:flex-row flex-col gap-3 justify-between items-center md:mb-4">
        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search by car model or location"
          className="border p-2 w-full rounded md:w-1/2"
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex md:flex-row flex-col justify-end gap-3 w-full md:w-1/2 md:space-x-2">
          {/* Sort Dropdown */}
          <select
            onChange={(e) => setSortOption(e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Sort By</option>
            <option value="carModel">Car Model</option>
            <option value="location">Location</option>
            <option value="rentalPrice">Rental Price</option>
            <option value="bookingCount">Booking Count</option>
          </select>

          {/* Toggle View Button */}
          <button
            onClick={() => setView(view === "grid" ? "list" : "grid")}
            className="bg-orange-500 text-white p-2 rounded hover:bg-orange-600"
          >
            Toggle to {view === "grid" ? "List" : "Grid"} View
          </button>
        </div>
      </div>

      {/* Cars Display */}
      <div
        className={`grid ${
          view === "grid"
            ? "lg:grid-cols-3 md:grid-cols-2 gap-4"
            : "grid-cols-1 gap-4"
        }`}
      >
        {sortedCars.map((car) => (
          <div
            key={car._id}
            className={`p-4 rounded-lg shadow-lg ${
              view === "list"
                ? "flex flex-row items-center space-x-4 bg-orange-100"
                : "flex flex-col bg-orange-100"
            }`}
          >
            {/* Image */}
            {car.imageUrl && (
              <img
                src={car.imageUrl}
                alt={car.carModel}
                className={`rounded-lg ${
                  view === "list" ? "w-24 h-24" : "w-full h-48"
                } object-cover`}
              />
            )}

            {/* Car Details */}
            <div className="flex-1">
              <h2 className="text-xl font-bold flex items-center text-orange-700">
                <FaCar className="mr-2" /> {car.carModel || "Unknown Model"}
              </h2>
              <p className="flex items-center text-gray-700">
                <FaDollarSign className="mr-2 text-orange-500" />
                Rental Price: ${car.rentalPrice || "N/A"} / day
              </p>
              <p className="flex items-center text-gray-700">
                <FaMapMarkerAlt className="mr-2 text-orange-500" />
                Location: {car.location || "Unknown"}
              </p>
              <p className="flex items-center text-gray-700">
                {car.availability ? (
                  <>
                    <FaCheck className="mr-2 text-green-500" /> Available
                  </>
                ) : (
                  <>
                    <FaTimes className="mr-2 text-red-500" /> Not Available
                  </>
                )}
              </p>
              <p className="flex items-center text-gray-700">
                <FaCar className="mr-2 text-purple-500" />
                Booking Count: {car.bookingCount}
              </p>
              <p className="text-gray-600">
                {car.description || "No description available."}
              </p>
            </div>

            {/* Book Now Button */}
            <Link
              to={`/cars/${car._id}`}
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
            >
              Book Now
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableCars;
