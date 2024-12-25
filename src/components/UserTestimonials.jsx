import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "../App.css";

// Import required modules from Swiper
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";

// Initialize Swiper modules
import SwiperCore from "swiper";
SwiperCore.use([Autoplay]);

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
      <section className="bg-white">
        <div className="main my-16 flex flex-col justify-center">
          <div className="head-p text-black text-center font-bold text-3xl">
            <h1>What Our Customer Say</h1>
          </div>
          <div className="head text-white text-4xl font-semibold font-mono flex justify-center items-center">
            TESTIMONIALS
          </div>
          <Swiper
            loop={true}
            pagination={{
              clickable: true,
            }}
            autoplay={{ delay: 3000 }}
            navigation={true}
            modules={[EffectCoverflow, Pagination, Navigation]}
            className="mySwiper w-4/5"
            effect={"coverflow"}
            coverflowEffect={{
              rotate: 10,
              stretch: 50,
              depth: 200,
              modifier: 1,
              slideShadows: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 1,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 1,
                spaceBetween: 30,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 150,
              },
            }}
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide
                key={index}
                className="swiper-slide bg-orange-500 text-white rounded-lg text-center font-mono"
              >
                <div className="px-5 pt-3">
                  <div className="testimonials-profile-circle flex justify-center items-center pt-5">
                    <img
                      src={testimonial.image}
                      alt="testimonial-avatar"
                      className="testimonial-avatar w-24 h-24 border-4 border-[#1D8BA0] rounded-full"
                    />
                  </div>
                  <p className="mt-4">{testimonial.review}</p>
                  <div className="rating mt-1 text-xl">
                    <span className="text-white">
                      {renderStars(testimonial.rating)}
                    </span>
                  </div>
                  <h6 className="review-by text-white text-lg mt-1">
                    - {testimonial.name}
                  </h6>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>
    </>
  );
}
