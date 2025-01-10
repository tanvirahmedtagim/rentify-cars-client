import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  return loading ? (
    <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
        <div className="absolute inset-2 border-4 border-deep-gray border-b-transparent rounded-full animate-[spin_1s_linear_reverse]"></div>
      </div>
    </div>
  ) : (
    <div className="min-h-screen">
      <div className="fixed z-40 w-full top-0 bg-orange-500 text-white font-semibold backdrop-blur-md">
        <Navbar />
      </div>

      <div className="mt-[65px] w-11/12 mx-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainLayout;
