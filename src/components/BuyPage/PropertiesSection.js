import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import config from "../../config";
import "./PropertiesSection.css";

const PropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const apiUrl = `${config.API_URL}/properties/type/sale`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
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
              id={property.id}
              image={`${config.API_URL.replace("/api/v1", "")}/storage/${
                property.pictures[0]
              }`}
              title={property.name}
              price={property.price}
              beds={property.bedrooms}
              baths={property.bathrooms}
              sqft={property.area}
              location={property.location}
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
