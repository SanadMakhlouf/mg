import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import "./PropertiesSection.css";

const PropertiesSection = () => {
  const properties = [
    {
      id: 1,
      image: "/test.jpg",
      title: "Modern Luxury Villa",
      price: "5,500,000",
      beds: 4,
      baths: 5,
      sqft: 4200,
      location: "Palm Jumeirah - Dubai",
    },
    {
      id: 2,
      image: "/buy-hero.jpg",
      title: "Elegant Apartment with Sea View",
      price: "2,800,000",
      beds: 2,
      baths: 3,
      sqft: 1800,
      location: "Dubai Marina - Dubai",
    },
    {
      id: 3,
      image: "/hero-bg.jpg",
      title: "Spacious Family Home",
      price: "4,200,000",
      beds: 5,
      baths: 4,
      sqft: 3500,
      location: "Arabian Ranches - Dubai",
    },
    {
      id: 4,
      image: "/hero-bgg.jpg",
      title: "Premium Penthouse",
      price: "7,900,000",
      beds: 3,
      baths: 4,
      sqft: 2800,
      location: "Downtown Dubai",
    },
    {
      id: 5,
      image: "/here-bg2.jpg",
      title: "Contemporary Townhouse",
      price: "3,600,000",
      beds: 3,
      baths: 3.5,
      sqft: 2400,
      location: "Jumeirah Village Circle - Dubai",
    },
    {
      id: 6,
      image: "/banner.png",
      title: "Exclusive Beach Villa",
      price: "8,500,000",
      beds: 6,
      baths: 7,
      sqft: 5500,
      location: "Palm Jumeirah - Dubai",
    },
  ];

  return (
    <div className="properties-section">
      <div className="properties-header">
        <h2>Property for Buy</h2>
        <button className="map-button">
          <i className="fa-solid fa-map-location-dot"></i>
          Go to Map
        </button>
      </div>
      <div className="properties-grid">
        {properties.map((property) => (
          <PropertyCard
            key={property.id}
            image={property.image}
            title={property.title}
            price={property.price}
            beds={property.beds}
            baths={property.baths}
            sqft={property.sqft}
            location={property.location}
            onViewDetails={() => {}}
          />
        ))}
      </div>
      <div className="journey-banner">
        <img src={buyBanner2} alt="Your journey, our expertise" />
      </div>
    </div>
  );
};

export default PropertiesSection;
