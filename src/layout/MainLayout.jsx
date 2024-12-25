import React, { useContext } from "react";
import Navbar from "../components/Navbar";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  return (
    <div className="min-h-screen">
      <Navbar />
      {loading ? (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <span className="loading loading-spinner text-orange-500 loading-lg"></span>
          ;
        </div>
      ) : (
        <Outlet />
      )}
      <Footer />
    </div>
  );
};

export default MainLayout;
