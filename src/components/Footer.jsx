import React from "react";
import { Link } from "react-router-dom";
import {
  FaFacebookF,
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
} from "react-icons/fa";

const Footer = () => {
  return (
    <div className="sticky mt-6 top-[100vh]">
      <footer className="bg-black text-gray-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-orange-500 text-2xl font-bold mb-4">
              Rentify Cars
            </h2>
            <p className="mb-4">
              Your trusted partner for convenient and reliable car rentals.
              Explore our seamless booking experience tailored to your needs.
            </p>
            <div className="flex space-x-4">
              <Link
                to="#"
                className="text-orange-500 hover:text-orange-400 text-2xl"
              >
                <FaFacebookF />
              </Link>
              <Link
                to="#"
                className="text-orange-500 hover:text-orange-400 text-2xl"
              >
                <FaInstagram />
              </Link>
              <Link
                to="#"
                className="text-orange-500 hover:text-orange-400 text-2xl"
              >
                <FaTwitter />
              </Link>
              <Link
                to="#"
                className="text-orange-500 hover:text-orange-400 text-2xl"
              >
                <FaLinkedinIn />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Homepage
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Business Rental
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Airport Transfer
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Travel Rental
                </Link>
              </li>
              <li>
                <Link
                  to="/"
                  className="hover:text-orange-400 transition duration-200"
                >
                  Luxury Rental
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-orange-500 font-semibold mb-4">Contact Us</h3>
            <p className="mb-2">
              <i className="fas fa-map-marker-alt text-orange-500 mr-2"></i>
              123 Rentify St, Cityville, Country
            </p>
            <p className="mb-2">
              <i className="fas fa-phone text-orange-500 mr-2"></i>
              +123-456-7890
            </p>
            <p>
              <i className="fas fa-envelope text-orange-500 mr-2 text-center"></i>
              rentifycars@gmail.com
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 py-4 text-center text-sm">
          <p>© 2024 Rentify Cars. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
