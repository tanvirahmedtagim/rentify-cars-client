import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const MyBookings = () => {
  const axiosSecure = useAxiosSecure();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axiosSecure
        .get(`/myBooking/${user?.email}`)
        .then((response) => setBookings(response.data))
        .catch((error) => console.error("Error fetching bookings:", error))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const handleCancelBooking = (booking) => {
    setSelectedBooking(booking);
    setShowCancelModal(true);
  };

  const handleModifyBooking = (booking) => {
    setSelectedBooking(booking);
    setShowModifyModal(true);
  };

  const confirmCancelBooking = () => {
    if (!selectedBooking) return;

    axiosSecure
      .put(`/myBooking/${selectedBooking._id}`, {
        bookingStatus: "Canceled",
        startDate: selectedBooking.startDate,
        endDate: selectedBooking.endDate,
        totalCost: selectedBooking.totalCost,
      })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === selectedBooking._id
              ? { ...b, bookingStatus: "Canceled" }
              : b
          )
        );
        setShowCancelModal(false);
        setSelectedBooking(null);
      })
      .catch((error) => console.error("Error canceling booking:", error));
  };

  const confirmModifyBooking = (dates) => {
    if (!selectedBooking || !dates.startDate || !dates.endDate) return;

    const start = new Date(dates.startDate);
    const end = new Date(dates.endDate);
    const totalDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    const totalCost = selectedBooking.rentalPrice * totalDays;

    axiosSecure
      .put(`/myBooking/${selectedBooking._id}`, {
        startDate: dates.startDate,
        endDate: dates.endDate,
        totalCost,
        bookingStatus: selectedBooking.bookingStatus,
      })
      .then(() => {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === selectedBooking._id
              ? {
                  ...b,
                  startDate: dates.startDate,
                  endDate: dates.endDate,
                  totalCost,
                }
              : b
          )
        );
        setShowModifyModal(false);
        setSelectedBooking(null);
      })
      .catch((error) => console.error("Error modifying booking:", error));
  };

  const chartData = {
    labels: bookings.map((booking) => booking.carModel),
    datasets: [
      {
        label: "Daily Rental Price ($)",
        data: bookings.map((booking) => booking.rentalPrice),
        fill: false,
        borderColor: "rgba(75,192,192,1)",
        tension: 0.1,
      },
    ],
  };

  if (loading) {
    return (
      <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="absolute inset-2 border-4 border-deep-gray border-b-transparent rounded-full animate-[spin_1s_linear_reverse]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto lg:w-11/12 mx-auto p-4">
      {/* Render the chart */}
      <div className="mb-6">
        <h2 className="text-xl text-center font-bold mb-4">
          Car Daily Rental Prices Chart
        </h2>
        <Line data={chartData} options={{ responsive: true }} />
      </div>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-4 border-b font-bold text-center">Car Image</th>
            <th className="p-4 border-b font-bold text-center">Car Model</th>
            <th className="p-4 border-b font-bold text-center">Booking Date</th>
            <th className="p-4 border-b font-bold text-center">Start Date</th>
            <th className="p-4 border-b font-bold text-center">End Date</th>
            <th className="p-4 border-b font-bold text-center">Total Price</th>
            <th className="p-4 border-b font-bold text-center">
              Booking Status
            </th>
            <th className="p-4 border-b font-bold text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={booking._id || index}
              className={`hover:bg-gray-100 ${
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }`}
            >
              <td className="border-b items-center justify-center flex">
                <img
                  src={booking.imageUrl}
                  alt={booking.carModel}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-4 border-b text-center">{booking.carModel}</td>
              <td className="p-4 border-b text-center">
                {booking.createdAt
                  ? format(new Date(booking.createdAt), "dd-MM-yyyy HH:mm")
                  : "N/A"}
              </td>
              <td className="p-4 border-b text-center">
                {format(new Date(booking.startDate), "dd-MM-yyyy HH:mm")}
              </td>
              <td className="p-4 border-b text-center">
                {format(new Date(booking.endDate), "dd-MM-yyyy HH:mm")}
              </td>
              <td className="p-4 border-b text-center">${booking.totalCost}</td>
              <td className="p-4 border-b text-center">
                <span
                  className={`px-2 py-1 rounded ${
                    booking.bookingStatus === "Confirmed"
                      ? "bg-green-100 text-green-800"
                      : booking.bookingStatus === "Pending"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {booking.bookingStatus}
                </span>
              </td>
              <td className="flex justify-center gap-2">
                <button
                  onClick={() => handleModifyBooking(booking)}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  <FaCalendarAlt className="h-5 w-5 mr-2" />
                  Modify Dates
                </button>
                <button
                  onClick={() => handleCancelBooking(booking)}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                >
                  <FaTrash className="h-5 w-5 mr-2" />
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cancel and Modify Modals */}
      {showCancelModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow w-80 mx-auto p-6">
            <h2 className="text-lg font-bold mb-4">
              Are you sure you want to cancel this booking?
            </h2>
            <div className="flex space-x-4">
              <button
                onClick={confirmCancelBooking}
                className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
              >
                Yes
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {showModifyModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-bold mb-4">Modify Booking Dates</h2>
            <input
              type="datetime-local"
              required
              className="border rounded p-2 w-full mb-4"
              onChange={(e) =>
                setSelectedBooking((prev) => ({
                  ...prev,
                  startDate: e.target.value,
                }))
              }
            />
            <input
              type="datetime-local"
              required
              className="border rounded p-2 w-full mb-4"
              onChange={(e) =>
                setSelectedBooking((prev) => ({
                  ...prev,
                  endDate: e.target.value,
                }))
              }
            />
            <div className="flex space-x-4">
              <button
                onClick={() =>
                  confirmModifyBooking({
                    startDate: selectedBooking?.startDate,
                    endDate: selectedBooking?.endDate,
                  })
                }
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
              <button
                onClick={() => setShowModifyModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookings;
