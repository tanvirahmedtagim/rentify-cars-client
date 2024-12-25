import React, { useContext, useEffect, useState } from "react";
import { format } from "date-fns";
import axios from "axios";
import { AuthContext } from "../provider/AuthProvider";
import { FaCalendarAlt, FaTrash } from "react-icons/fa";
import useAxiosSecure from "../hooks/useAxiosSecure";

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
        .get(`/myBooking?email=${user?.email}`)
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

    // Update the booking status to canceled
    axiosSecure
      .put(`/myBooking/${selectedBooking._id}`, {
        bookingStatus: "Canceled",
        dateAdded: new Date().toISOString(),
      })
      .then((response) => {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === selectedBooking._id
              ? {
                  ...b,
                  bookingStatus: "Canceled",
                  dateAdded: new Date().toISOString(),
                }
              : b
          )
        );
        setShowCancelModal(false);
        setSelectedBooking(null);
      })
      .catch((error) => console.error("Error canceling booking:", error));
  };

  const confirmModifyBooking = (newDate) => {
    if (!selectedBooking || !newDate) return;

    // Update the booking with the new date
    axiosSecure
      .put(`/myBooking/${selectedBooking._id}`, {
        bookingStatus: selectedBooking.bookingStatus,
        dateAdded: newDate,
      })
      .then((response) => {
        setBookings((prevBookings) =>
          prevBookings.map((b) =>
            b._id === selectedBooking._id ? { ...b, dateAdded: newDate } : b
          )
        );
        setShowModifyModal(false);
        setSelectedBooking(null);
      })
      .catch((error) => console.error("Error modifying booking:", error));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center mt-40">
        <span className="loading loading-spinner text-info loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto lg:w-11/12 mx-auto p-4">
      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead className="bg-gray-200 text-left">
          <tr>
            <th className="p-4 border-b font-bold text-center">Car Image</th>
            <th className="p-4 border-b font-bold text-center">Car Model</th>
            <th className="p-4 border-b font-bold text-center">Booking Date</th>
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
              <td className="lg:mt-12  border-b items-center justify-center flex">
                <img
                  src={booking.imageUrl}
                  alt={booking.carModel}
                  className="w-16 h-16 object-cover rounded"
                />
              </td>
              <td className="p-4 border-b text-center">{booking.carModel}</td>
              <td className="p-4 border-b text-center">
                {booking.dateAdded
                  ? format(new Date(booking.dateAdded), "dd-MM-yyyy HH:mm")
                  : "Invalid Date"}
              </td>
              <td className="p-4 border-b text-center">
                ${booking.rentalPrice}
              </td>
              <td className="p-4 border-b text-center">
                <span
                  className={`px-2 py-1 rounded text-center ${
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
              <td className="flex lg:text-base md:text-xs justify-center items-start lg:mb-14   gap-2 md:mb-6 ">
                <button
                  onClick={() => handleModifyBooking(booking)}
                  className="flex items-center bg-blue-500 hover:bg-blue-600 text-white font-bold  py-2 lg:px-4 px-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
                >
                  <FaCalendarAlt className="h-5 w-5 mr-2" />
                  Modify Date
                </button>

                <button
                  onClick={() => handleCancelBooking(booking)}
                  className="flex items-center bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2"
                >
                  <FaTrash className="h-5 w-5 mr-2" />
                  Cancel
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow w-11/12 md:w-80 mx-auto p-6">
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

      {/* Modify Date Modal */}
      {showModifyModal && (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded shadow p-6">
            <h2 className="text-lg font-bold mb-4">Modify Booking Date</h2>
            <input
              type="datetime-local"
              className="border rounded p-2 w-full mb-4"
              onChange={(e) =>
                setSelectedBooking((prev) => ({
                  ...prev,
                  newDate: e.target.value,
                }))
              }
            />
            <div className="flex space-x-4">
              <button
                onClick={() => confirmModifyBooking(selectedBooking?.newDate)}
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
