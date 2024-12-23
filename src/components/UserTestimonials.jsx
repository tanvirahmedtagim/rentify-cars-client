import React, { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";

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

const UserTestimonials = () => {
  const swiperRef = useRef(null);

  useEffect(() => {
    if (swiperRef.current) {
      const swiperInstance = swiperRef.current.swiper;
      swiperInstance.autoplay.start(); // Manually start autoplay
    }
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-12 px-6">
      <h2 className="text-center text-3xl font-semibold mb-8 text-gray-900">
        What Our Customers Say
      </h2>

      <Swiper
        ref={swiperRef}
        spaceBetween={40}
        centeredSlides={true}
        loop={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        effect="fade"
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Navigation, Pagination, Autoplay, EffectFade]}
        className="testimonial-carousel"
      >
        {testimonials.map((testimonial, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col items-center space-y-6 p-6 bg-gradient-to-r from-orange-400 via-yellow-300 to-orange-400 rounded-xl shadow-xl transition-transform transform hover:scale-105">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg"
              />
              <div className="flex items-center space-x-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i} className="text-white text-3xl">
                    ★
                  </span>
                ))}
              </div>
              <p className="text-center text-xl text-white italic">
                "{testimonial.review}"
              </p>
              <h3 className="text-2xl font-semibold text-white">
                {testimonial.name}
              </h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UserTestimonials;
