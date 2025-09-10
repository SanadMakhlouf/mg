import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import logo from "../../assets/logo.png";
import rent from "../../assets/rent.png";
import rent2 from "../../assets/rent2.png";
import rent3 from "../../assets/rent3.jpg";
import "./RentPropertiesSection.css";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/properties/type/rent"
        );
        const result = await response.json();
        console.log("API Response:", result);

        if (result.success) {
          console.log("Properties data:", result.data);
          // If data is a single object, wrap it in an array
          const propertiesData = Array.isArray(result.data)
            ? result.data
            : [result.data];
          setProperties(propertiesData);
        } else {
          setError("Failed to fetch properties");
        }
      } catch (err) {
        setError("Error fetching properties: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

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
            {loading ? (
              <p>Loading properties...</p>
            ) : error ? (
              <p>{error}</p>
            ) : properties.length === 0 ? (
              <p>No properties found</p>
            ) : (
              properties.map((property) => (
                <PropertyCard
                  key={property.id}
                  image={`http://localhost:8000/storage/${property.pictures[0]}`}
                  title={property.name}
                  price={property.price}
                  beds={property.bedrooms}
                  baths={property.bathrooms}
                  sqft={property.area}
                  location={property.location}
                  onViewDetails={() => {}}
                />
              ))
            )}
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
