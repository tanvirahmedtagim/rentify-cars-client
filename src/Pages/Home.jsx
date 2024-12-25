import React from "react";
import Banner from "../components/Banner";
import WhyChooseUs from "../components/WhyChooseUs";
import UserTestimonials from "../components/UserTestimonials";
import SpecialOffers from "../components/SpecialOffers";
import RecentCars from "../components/RecentCars";

const Home = () => {
  return (
    <div>
      {/* Banner Section */}
      <Banner></Banner>

      {/* Why Choose us section */}
      <WhyChooseUs></WhyChooseUs>

      {/* Recent Cars */}
      <RecentCars></RecentCars>

      {/* User Testimonial */}
      <UserTestimonials></UserTestimonials>

      {/* Special offers */}
      <SpecialOffers></SpecialOffers>
    </div>
  );
};

export default Home;
