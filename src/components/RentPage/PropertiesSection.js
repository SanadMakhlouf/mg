import React from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import logo from "../../assets/logo.png";
import rent from "../../assets/rent.png";
import rent2 from "../../assets/rent2.png";
import rent3 from "../../assets/rent3.jpg";
import "./RentPropertiesSection.css";

const PropertiesSection = () => {
  const properties = [
    {
      id: 1,
      image: "/test.jpg",
      title: "Modern Apartment for Rent",
      price: "12,000",
      beds: 2,
      baths: 2,
      sqft: 1200,
      location: "Dubai Marina - Dubai",
    },
    {
      id: 2,
      image: "/buy-hero.jpg",
      title: "Luxury Villa with Pool",
      price: "25,000",
      beds: 4,
      baths: 4,
      sqft: 3500,
      location: "Palm Jumeirah - Dubai",
    },
    {
      id: 3,
      image: "/hero-bg.jpg",
      title: "Cozy Studio Apartment",
      price: "6,500",
      beds: 1,
      baths: 1,
      sqft: 650,
      location: "Business Bay - Dubai",
    },
    {
      id: 4,
      image: "/hero-bgg.jpg",
      title: "Family Townhouse",
      price: "18,000",
      beds: 3,
      baths: 3.5,
      sqft: 2200,
      location: "Arabian Ranches - Dubai",
    },
    {
      id: 5,
      image: "/here-bg2.jpg",
      title: "Penthouse with Sea View",
      price: "35,000",
      beds: 3,
      baths: 4,
      sqft: 2800,
      location: "JBR - Dubai",
    },
    {
      id: 6,
      image: "/banner.png",
      title: "Furnished Apartment",
      price: "14,000",
      beds: 2,
      baths: 2,
      sqft: 1400,
      location: "Downtown Dubai",
    },
  ];

  return (
    <div className="rent-properties-section">
      <div className="rent-properties-header">
        <h2>Property for Rent</h2>
        <button className="map-button">
          <i className="fa-solid fa-map-location-dot"></i>
          Go to Map
        </button>
      </div>
      <div className="rent-properties-content">
        <div className="rent-properties-left">
          <div className="rent-properties-grid">
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
        </div>
        <div className="rent-properties-right">
          <div className="ad-banner full-image">
            <img src={rent2} alt="Group Meridian" className="full-banner-img" />
          </div>
          <div
            className="ad-banner square-banner"
            style={{ backgroundImage: `url(${rent3})` }}
          >
            <h3>Yasirland</h3>
          </div>
          <div className="ad-banner full-image">
            <img
              src={rent}
              alt="Buy, Rent or Sell Your Home"
              className="full-banner-img"
            />
          </div>
        </div>
      </div>
      <div className="journey-banner">
        <img src={buyBanner2} alt="Your journey, our expertise" />
      </div>
    </div>
  );
};

export default PropertiesSection;
