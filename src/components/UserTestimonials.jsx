import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import { FreeMode, Pagination } from "swiper/modules";

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
    <>
      <section className=" mt-12">
        <div className="main gap-4 flex flex-col justify-center">
          <div className="head-p text-black text-center font-bold text-3xl mb-4">
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
              640: {
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
                <div className="testimonials-profile-circle flex justify-center items-center">
                  <img
                    src={testimonial.image}
                    alt="testimonial-avatar"
                    className="testimonial-avatar w-24 h-24 border-4 border-[#1D8BA0] rounded-full"
                  />
                </div>
                <p className="mt-4">
                  {testimonial.review.length > 30
                    ? `${testimonial.review.slice(0, 30)}...`
                    : testimonial.review}
                </p>
                <div className="rating mt-1 text-xl">
                  <span className="text-white">
                    {renderStars(testimonial.rating)}
                  </span>
                </div>
                <h6 className="review-by text-center text-white text-lg mt-1">
                  -{testimonial.name}
                </h6>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
