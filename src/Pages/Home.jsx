import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import UserTestimonials from "../components/UserTestimonials";
import SpecialOffers from "../components/SpecialOffers";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <Banner></Banner>

      {/* Why Choose us section */}
      <WhyChooseUs></WhyChooseUs>

      {/* User Testimonial */}
      <UserTestimonials></UserTestimonials>

      {/* Specil offers */}
      <SpecialOffers></SpecialOffers>
    </div>
  );
};

export default Home;
