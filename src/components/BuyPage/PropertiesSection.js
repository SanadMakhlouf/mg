import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import config from "../../config";
import "./PropertiesSection.css";

const PropertiesSection = ({ filterParams }) => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);

        // Build the API URL using the new advanced search endpoint
        let apiUrl = `${config.API_URL}/properties/search/advanced`;

        // Create query parameters for the new API
        const queryParams = new URLSearchParams();
        
        // Set listing type to sale for buy page
        queryParams.append("listing_type", "sale");

        // Add filter parameters if they exist
        if (filterParams) {
          if (filterParams.location && filterParams.location.trim() !== "") {
            queryParams.append("location", filterParams.location.trim());
          }

          if (filterParams.propertyType) {
            queryParams.append("type", filterParams.propertyType);
          }

          if (filterParams.minBathrooms) {
            queryParams.append("min_bathrooms", filterParams.minBathrooms);
          }

          if (filterParams.maxBathrooms) {
            queryParams.append("max_bathrooms", filterParams.maxBathrooms);
          }

          if (filterParams.minBedrooms) {
            queryParams.append("min_bedrooms", filterParams.minBedrooms);
          }

          if (filterParams.maxBedrooms) {
            queryParams.append("max_bedrooms", filterParams.maxBedrooms);
          }

          if (filterParams.minArea) {
            queryParams.append("min_area", filterParams.minArea);
          }

          if (filterParams.maxArea) {
            queryParams.append("max_area", filterParams.maxArea);
          }

          if (filterParams.minPrice) {
            queryParams.append("min_price", filterParams.minPrice);
          }

          if (filterParams.maxPrice) {
            queryParams.append("max_price", filterParams.maxPrice);
          }
        }

        // Add query parameters to URL
        const queryString = queryParams.toString();
        if (queryString) {
          apiUrl += `?${queryString}`;
        }

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success) {
          let propertiesData = Array.isArray(result.data)
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
  }, [filterParams]);

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
              image={property.pictures[0]}
              title={property.name}
              price={property.price}
              beds={property.bedrooms}
              baths={property.bathrooms}
              sqft={property.area}
              location={property.location}
              permitNumber={property.permit_number}
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
