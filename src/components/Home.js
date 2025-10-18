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
import SEO from "./SEO";

const Home = () => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Meridian Group",
    "url": "https://meridiangroup.ae",
    "description": "Premier real estate services in Abu Dhabi, UAE",
    "publisher": {
      "@type": "Organization",
      "name": "Meridian Group",
      "url": "https://meridiangroup.ae"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://meridiangroup.ae/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Meridian Group - Premier Real Estate in Abu Dhabi | Buy, Rent & Invest"
        description="Discover premium real estate opportunities in Abu Dhabi with Meridian Group. Expert property services for buying, renting, and investing in luxury apartments, villas, and off-plan projects."
        keywords="real estate Abu Dhabi, property for sale Abu Dhabi, luxury apartments Abu Dhabi, villas for rent, off-plan properties, real estate investment UAE, property management Abu Dhabi"
        url="https://meridiangroup.ae/"
        image="https://meridiangroup.ae/og-image.jpg"
        structuredData={structuredData}
      />
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
    </>
  );
};

export default Home;
