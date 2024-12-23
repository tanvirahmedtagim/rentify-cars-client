import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import Modal from "react-modal";

// Set the app element for accessibility
Modal.setAppElement("#root");

const MyCars = () => {
  const { user } = useContext(AuthContext);
  const [myCars, setMyCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCar, setEditingCar] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [sortOption, setSortOption] = useState("date-desc");

  useEffect(() => {
    if (user?.email) {
      setLoading(true);
      axios
        .get(
          `http://localhost:5000/myCars?email=${encodeURIComponent(user.email)}`
        )
        .then((res) => {
          const cars = res.data;
          if (sortOption === "date-desc") {
            cars.sort((a, b) => new Date(b.dateAdded) - new Date(a.dateAdded));
          } else if (sortOption === "date-asc") {
            cars.sort((a, b) => new Date(a.dateAdded) - new Date(b.dateAdded));
          } else if (sortOption === "price-asc") {
            cars.sort((a, b) => a.dailyRentalPrice - b.dailyRentalPrice);
          } else if (sortOption === "price-desc") {
            cars.sort((a, b) => b.dailyRentalPrice - a.dailyRentalPrice);
          }
          setMyCars(cars);
        })
        .finally(() => setLoading(false));
    }
  }, [user?.email, sortOption]);

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:5000/myCars/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            Swal.fire("Deleted!", "Your car has been deleted.", "success");
            setMyCars(myCars.filter((car) => car._id !== id));
          }
        });
      }
    });
  };

  const handleUpdateSubmit = (event) => {
    event.preventDefault();
    const form = event.target;

    const carModel = form.carModel.value;
    const rentalPrice = form.rentalPrice.value;
    const availability = form.availability.value;
    const registrationNumber = form.registrationNumber.value;
    const features = form.features.value;
    const description = form.description.value;
    const imageUrl = form.imageUrl.value;
    const location = form.location.value;

    const updatedCar = {
      carModel,
      rentalPrice,
      availability,
      registrationNumber,
      features,
      description,
      imageUrl,
      location,
    };
    axios
      .patch(`http://localhost:5000/myCars/${editingCar._id}`, updatedCar)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          Swal.fire("Success", "Car details updated successfully!", "success");
          setMyCars((prevCars) =>
            prevCars.map((car) =>
              car._id === editingCar._id ? { ...car, ...updatedCar } : car
            )
          );
          setEditingCar(null);
        }
      });
  };

  return (
    <div className="w-11/12 mx-auto">
      <h1 className="text-xl text-center sm:text-2xl font-bold text-gray-800 mb-4">
        My Cars
      </h1>

      <div className="mb-4 flex justify-end">
        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          className="select select-bordered w-full max-w-xs"
        >
          <option value="date-desc">Date Added (Newest First)</option>
          <option value="date-asc">Date Added (Oldest First)</option>
          <option value="price-asc">Price (Lowest First)</option>
          <option value="price-desc">Price (Highest First)</option>
        </select>
      </div>

      {loading ? (
        <div className="text-center">
          <span className="loading loading-spinner text-info"></span>
        </div>
      ) : myCars.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600 mb-4">No cars added yet. Add one now!</p>
          <Link
            to="/addCar"
            className="btn bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Add a Car
          </Link>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra text-sm sm:text-base">
            <thead className="bg-gray-200">
              <tr>
                <th>Image</th>
                <th>Model</th>
                <th>Price/Day</th>
                <th>Availability</th>
                <th>Date Added</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {myCars.map((car) => (
                <tr key={car._id}>
                  <td>
                    <img
                      src={car.imageUrl}
                      alt={car.carModel}
                      className="w-20 h-14 object-cover"
                    />
                  </td>
                  <td>{car.carModel}</td>
                  <td>${parseFloat(car.rentalPrice || 0).toFixed(2)}</td>
                  <td>{car.availability ? "Yes" : "No"}</td>
                  <td>{new Date(car.dateAdded).toLocaleDateString()}</td>
                  <td className="flex gap-2">
                    <button
                      className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                      onClick={() => {
                        setEditingCar(car);
                        setSelectedDate(new Date(car.dateAdded));
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="p-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                      onClick={() => handleDelete(car._id)}
                    >
                      <FaTrashAlt />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Modal
        isOpen={!!editingCar}
        onRequestClose={() => setEditingCar(null)}
        contentLabel="Edit Car Details"
        className="bg-white lg:p-6 p-2 rounded-lg shadow-lg max-w-4xl w-11/12 mx-auto lg:mt-16 lg:mb-16"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center"
      >
        <h3 className="text-lg text-center font-bold mb-2">
          Update Car Details
        </h3>
        {editingCar && (
          <form onSubmit={handleUpdateSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Car Model
                </label>
                <input
                  type="text"
                  name="carModel"
                  defaultValue={editingCar.carModel}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Daily Rental Price
                </label>
                <input
                  type="number"
                  name="rentalPrice"
                  defaultValue={editingCar.rentalPrice || ""}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Availability
                </label>
                <select
                  name="availability"
                  defaultValue={
                    editingCar.availability ? "available" : "unavailable"
                  }
                  className="select select-bordered w-full"
                >
                  <option value="available">Available</option>
                  <option value="unavailable">Unavailable</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Registration Number
                </label>
                <input
                  type="text"
                  name="registrationNumber"
                  defaultValue={editingCar.registrationNumber}
                  className="input input-bordered w-full"
                />
              </div>
              <div className="col-span-1 md:col-span-2">
                <label className="block text-sm font-medium mb-1">
                  Features
                </label>
                <textarea
                  name="features"
                  defaultValue={editingCar.features}
                  className="textarea textarea-bordered w-full"
                ></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Image URL
                </label>
                <input
                  type="url"
                  name="imageUrl"
                  defaultValue={editingCar.imageUrl}
                  className="input input-bordered w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  defaultValue={editingCar.location}
                  className="input input-bordered w-full"
                />
              </div>
            </div>
            <div className="mb-1">
              <label className="block text-sm font-medium mb-1">
                Description
              </label>
              <textarea
                name="description"
                defaultValue={editingCar.description}
                className="textarea textarea-bordered w-full"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                type="button"
                onClick={() => setEditingCar(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
};

export default MyCars;
