import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  FaCar,
  FaDollarSign,
  FaClock,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { formatDistanceToNow } from "date-fns";

const RecentCars = () => {
  const [recentCars, setRecentCars] = useState([]);

  useEffect(() => {
    const fetchRecentCars = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/cars/recent`,
          {
            withCredentials: true, // Include cookies
          }
        );
        setRecentCars(response.data);
      } catch (error) {
        console.error("Error fetching recent cars:", error);
      }
    };

    fetchRecentCars();
  }, []);

  return (
    <div className="mt-12">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Recent Cars
      </h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentCars.map((car) => (
          <div
            key={car._id}
            className="card bg-orange-100 border border-orange-300 shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
          >
            <img
              src={car.imageUrl}
              alt={car.carModel}
              className="w-full aspect-[16/9] object-cover"
            />
            <div className="p-4">
              <h2 className="text-lg font-bold text-orange-700 flex items-center gap-2">
                <FaCar className="text-orange-500" />
                {car.carModel}
              </h2>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                <FaDollarSign className="text-orange-500" />
                Price:{" "}
                <span className="font-semibold">${car.rentalPrice}/day</span>
              </p>
              <p className="text-sm text-gray-600 flex items-center gap-2">
                {car.availability ? (
                  <>
                    <FaCheckCircle className="text-green-500" /> Available
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="text-red-500" /> Unavailable
                  </>
                )}
              </p>
              <p className="text-sm text-gray-500 flex items-center gap-2">
                <FaClock className="text-orange-500" />
                Added:{" "}
                <span className="font-semibold">
                  {formatDistanceToNow(new Date(car.dateAdded))} ago
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentCars;
