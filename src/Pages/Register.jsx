import React, { useContext, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";
import sideLogo from "../assets/login.jpg";

const Register = () => {
  const navigate = useNavigate();
  const { handleRegister, manageProfile, handleLogout } =
    useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const form = new FormData(e.target);
    const name = form.get("name");
    const photo = form.get("photo");
    const email = form.get("email");
    const password = form.get("password");

    // Password validation
    if (password.length < 6) {
      toast.error("Password must contain at least 6 characters");
      return;
    }
    if (!/[a-z]/.test(password)) {
      toast.error("Password must contain at least one lowercase letter");
      return;
    }
    if (!/[A-Z]/.test(password)) {
      toast.error("Password must contain at least one uppercase letter");
      return;
    }

    try {
      // Register the user
      const res = await handleRegister(email, password);

      // Sign out the user after registration
      await handleLogout();

      // Update user profile
      await manageProfile(name, photo);

      // Success message and redirect
      Swal.fire({
        title: "Success!",
        text: "User registered successfully. Please log in.",
        icon: "success",
        confirmButtonText: "OK",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/login");
    } catch (error) {
      console.error("Error during registration:", error.message);
      toast.error("Registration failed. User may already exist.");
    }
  };
  return (
    <div>
      <div className="min-h-screen w-full flex items-center justify-center  bg-gray-50">
        <div className="w-full max-w-4xl md:flex-row flex-col bg-white shadow-lg rounded-lg flex overflow-hidden">
          {" "}
          {/* Left Side - Image */}
          <div className="md:w-1/2 w-full mb-6 md:mb-0  md:flex items-center justify-center bg-gray-100">
            <img
              src={sideLogo}
              alt="Side Illustration"
              className="w-full h-full"
            />
          </div>
          <div className="w-full md:w-1/2">
            <form onSubmit={handleSubmit} className="card-body pb-4">
              <h1 className="text-2xl font-bold text-center">
                Register Our Account
              </h1>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  name="name"
                  type="text"
                  placeholder="name"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  name="email"
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Photo Url</span>
                </label>
                <input
                  name="photo"
                  type="text"
                  placeholder="Photo Url"
                  className="input input-bordered"
                  required
                />
              </div>
              <div className="form-control relative">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="password"
                  className="input input-bordered"
                  required
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer absolute bottom-4 right-3 "
                >
                  {showPassword ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </span>
              </div>
              <div className="form-control mt-6">
                <button className="btn text-white hover:bg-orange-600 bg-orange-500">
                  Register
                </button>
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
            <p className="text-center text-orange-500 pb-4">
              Already Have An Account?
              <Link className="font-bold text-gray-700" to="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default Register;
