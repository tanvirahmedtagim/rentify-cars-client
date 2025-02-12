import React from "react";
import { motion } from "framer-motion";

const SpecialOffers = () => {
  return (
    <section className="my-12">
      <div className="mx-auto">
        <h2 className="text-3xl uppercase font-bold text-center text-gray-800 mb-8">
          Special Offers
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* First Offer */}
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            style={{ animation: "slideIn 1s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Get 15% off on weekend rentals for a limited time and enjoy!
            </h3>
            <p className="text-white mb-4">
              Book now for a weekend getaway and save big. Limited time offer!
            </p>
          </motion.div>

          {/* Second Offer */}
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
            style={{ animation: "slideIn 1.2s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Luxury cars at $99/day this holiday season!
            </h3>
            <p className="text-white mb-4">
              Drive in style this holiday season. Exclusive offer for a limited
              time.
            </p>
          </motion.div>

          {/* Third Offer */}
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
            style={{ animation: "slideIn 1.4s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Special Offer: Free upgrade on all rentals!
            </h3>
            <p className="text-white mb-4">
              Get a free upgrade when you book any vehicle this month. Don't
              miss out!
            </p>
          </motion.div>

          {/* Fourth Offer */}
          <motion.div
            className="bg-gradient-to-r from-orange-400 to-orange-600 p-6 rounded-lg shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
            style={{ animation: "slideIn 1.6s ease-out" }}
          >
            <h3 className="text-xl font-semibold text-white mb-4">
              Early bird offer: Save 20% on your next rental!
            </h3>
            <p className="text-white mb-4">
              Plan ahead and save big. Book early to enjoy this exclusive
              discount.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
