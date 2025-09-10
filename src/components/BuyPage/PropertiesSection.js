import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import "./PropertiesSection.css";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/api/properties/type/sale"
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
    <div className="properties-section">
      <div className="properties-header">
        <h2>Property for Buy</h2>
        <button className="map-button">
          <i className="fa-solid fa-map-location-dot"></i>
          Go to Map
        </button>
      </div>
      <div className="properties-grid">
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
      <div className="journey-banner">
        <img src={buyBanner2} alt="Your journey, our expertise" />
      </div>
    </div>
  );
};

export default PropertiesSection;
