import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";

const Login = () => {
  const navigate = useNavigate();
  const { handleLogin, handleGoogleLogin, manageProfile } =
    useContext(AuthContext);
  // const [error, setError] = useState("");
  const handleGoogleSignIn = async () => {
    try {
      await handleGoogleLogin();

      // Show success alert using SweetAlert
      Swal.fire({
        title: "Success!",
        text: "Logged in with Google!",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        showConfirmButton: false,
      });
      navigate("/");
    } catch (err) {
      // Show error alert using SweetAlert
      Swal.fire({
        title: "Error!",
        text: err.message || "Google sign-in failed.",
        icon: "error",
        confirmButtonText: "Try Again",
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData(e.target);
    const email = form.get("email");
    const password = form.get("password");

    try {
      await handleLogin(email, password).then((res) => {
        e.target.reset();
        // navigate("/");
        // manageProfile(name, photo);
        Swal.fire({
          title: "Success!",
          text: "Logged in Successfully!",
          icon: "success",
          confirmButtonText: "OK",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/");
      });
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="card bg-white p-8 w-full sm:w-96 border-4 border-gradient-to-r from-blue-500 via-purple-600 to-pink-500 rounded-xl shadow-lg">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-8">
          Login to Your Account
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="form-control">
            <label className="label text-gray-600">Email</label>
            <input
              name="email"
              type="email"
              required
              placeholder="Enter your email"
              className="input input-bordered w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control">
            <label className="label text-gray-600">Password</label>
            <input
              name="password"
              type="password"
              required
              placeholder="Enter your password"
              className="input input-bordered w-full p-3 rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="form-control mt-6">
            <button className="btn w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-lg hover:opacity-90 focus:outline-none transform hover:scale-105 transition-all duration-300 ease-in-out">
              Login
            </button>
          </div>
        </form>
        <div className="my-4 text-center">
          <button
            onClick={handleGoogleSignIn}
            className="btn w-full bg-gradient-to-r from-yellow-400 via-red-500 to-pink-600 text-white py-3 rounded-lg flex justify-center items-center hover:opacity-90 transition-all duration-300"
          >
            <FcGoogle className="mr-3" fontSize="24" />
            Login With Google
          </button>
        </div>
        <p className="text-center text-gray-600">
          Don't have an account?
          <Link
            to="/register"
            className="font-semibold text-blue-500 hover:underline"
          >
            Register
          </Link>
        </p>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Login;
