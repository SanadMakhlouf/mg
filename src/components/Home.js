import React from "react";
import Hero from "./Hero";
import SearchSection from "./SearchSection";
import WhyUsSection from "./WhyUsSection";
import LookingForSection from "./LookingForSection";
import LastPropertiesSection from "./LastPropertiesSection";
import TestimonialsSection from "./TestimonialsSection";
import PopularDevelopersSection from "./PopularDevelopersSection";
import GetInTouchSection from "./GetInTouchSection";
import MapSection from "./MapSection";
import Footer from "./Footer";

const Home = () => {
  return (
    <>
      <Hero />
      <div className="container">
        <SearchSection />
        <WhyUsSection />
        <LookingForSection />
      </div>
      <LastPropertiesSection />
      <TestimonialsSection />
      <PopularDevelopersSection />
      <GetInTouchSection />
      <MapSection />
      <Footer />
    </>
  );
};

export default Home;
