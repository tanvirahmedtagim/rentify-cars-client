import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import { toast } from "react-toastify";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { AuthContext } from "../provider/AuthProvider";

const CarDetails = () => {
  const axiosSecure = useAxiosSecure();
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const fetchCarDetails = async () => {
      try {
        const response = await axiosSecure.get(`/cars/${id}`);
        setCar(response.data);
      } catch (error) {
        console.error("Error fetching car details:", error);
        toast.error("Failed to load car details. Please try again.");
      }
    };

    fetchCarDetails();
  }, [id, axiosSecure]);

  const calculateTotalCost = () => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.max(end - start, 0);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setTotalCost(diffDays * car.rentalPrice);
    } else {
      setTotalCost(0);
    }
  };

  useEffect(() => {
    calculateTotalCost();
  }, [startDate, endDate, car]);

  if (!car) {
    return (
      <div className="flex justify-center items-center mt-40">
        <span className="loading loading-spinner text-info loading-lg"></span>;
      </div>
    );
  }

  const {
    _id,
    carModel,
    rentalPrice,
    availability,
    features,
    dateAdded,
    description,
    imageUrl,
    bookingStatus,
  } = car;

  const handleMyBookings = () => {
    const createdAt = new Date().toISOString();

    const bookingItems = {
      carModel,
      rentalPrice,
      imageUrl,
      email: user?.email,
      dateAdded,
      bookingStatus: "Confirmed",
      carId: _id,
      startDate,
      endDate,
      totalCost,
      createdAt,
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
        navigate("/availableCars");
      })
      .catch((error) => {
        console.error("Error adding to Bookings:", error);
        toast.error("An error occurred. Please try again.");
      });
  };

  // Determine if the booking button should be disabled in the modal
  const isBookingButtonDisabled = !startDate || !endDate;

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
              {carModel}
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
                className="btn btn-block px-6 py-3 text-lg font-semibold rounded-lg bg-white bg-opacity-75 text-gray-800 hover:bg-opacity-90"
              >
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed z-50 inset-0 bg-black bg-opacity-50 flex justify-center items-center">
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

            <div className="mt-4">
              <label className="block text-gray-700 mb-2">Start Date:</label>
              <input
                type="date"
                className="border border-gray-300 rounded w-full px-3 py-2 mb-3"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />

              <label className="block text-gray-700 mb-2">End Date:</label>
              <input
                type="date"
                className="border border-gray-300 rounded w-full px-3 py-2"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </div>

            <p className="mt-4 text-gray-800 font-semibold">
              Total Cost: ${totalCost}
            </p>

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
                disabled={isBookingButtonDisabled} // Disable the button if dates are not filled
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
