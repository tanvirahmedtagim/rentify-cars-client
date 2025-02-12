import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FreeMode, Pagination } from "swiper/modules";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "John Doe",
    image: "https://i.ibb.co.com/Tb9nSRB/user17.jpg",
    rating: 5,
    review: "Amazing service and great cars. Highly recommend!",
  },
  {
    name: "Jane Smith",
    image: "https://i.ibb.co.com/2jRDVCT/user14.jpg",
    rating: 4,
    review: "Great experience overall, but could be faster.",
  },
  {
    name: "Mark Wilson",
    image: "https://i.ibb.co.com/tYXpZrH/user19.jpg",
    rating: 5,
    review: "Best service I've ever received. Would come back anytime!",
  },
  {
    name: "Emerson Davis",
    image: "https://i.ibb.co.com/LPNsnfr/user11.jpg",
    rating: 4,
    review: "Very good, but they could improve their customer support.",
  },
];

const renderStars = (rating) => {
  const fullStars = "★".repeat(rating);
  const emptyStars = "☆".repeat(5 - rating);
  return fullStars + emptyStars;
};

export default function UserTestimonials() {
  return (
    <section className="mt-12" id="testimonial">
      <div className="main gap-4 flex flex-col justify-center">
        <div className="head-p text-black uppercase text-center font-bold text-3xl mb-4">
          <h1>What Our Customers Say</h1>
        </div>

        <Swiper
          slidesPerView={4}
          spaceBetween={30}
          freeMode={true}
          pagination={{
            clickable: true,
          }}
          modules={[FreeMode, Pagination]}
          className="mySwiper w-full"
          breakpoints={{
            320: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 40,
            },
          }}
        >
          {testimonials.map((testimonial, index) => (
            <SwiperSlide
              key={index}
              className="bg-orange-500 text-white rounded-lg text-center font-mono p-5"
            >
              <motion.div
                className="testimonials-profile-circle flex justify-center items-center"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
              >
                <img
                  src={testimonial.image}
                  alt="testimonial-avatar"
                  className="testimonial-avatar w-24 h-24 border-4 border-[#1D8BA0] rounded-full"
                />
              </motion.div>
              <motion.p
                className="mt-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                {testimonial.review.length > 30
                  ? `${testimonial.review.slice(0, 30)}...`
                  : testimonial.review}
              </motion.p>
              <motion.div
                className="rating mt-1 text-xl"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <span className="text-white">
                  {renderStars(testimonial.rating)}
                </span>
              </motion.div>
              <motion.h6
                className="review-by text-center text-white text-lg mt-1"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                -{testimonial.name}
              </motion.h6>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
