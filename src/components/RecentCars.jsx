import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
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
            withCredentials: true,
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
    <div className="mt-12 px-4 sm:px-8" id="recentCars">
      {/* Animated Heading */}
      <motion.h2
        className="text-3xl font-bold text-center uppercase text-gray-800 mb-8"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        Recent Cars
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {recentCars.map((car, index) => (
          <motion.div
            key={car._id}
            className="card bg-orange-100 border border-orange-300 shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
            viewport={{ once: false, amount: 0.2 }}
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
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RecentCars;
