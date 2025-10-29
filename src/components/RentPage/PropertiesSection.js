import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import logo from "../../assets/logo.png";
import rent from "../../assets/rent.png";
import rent2 from "../../assets/rent2.png";
import config from "../../config";
import "./RentPropertiesSection.css";

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
        
        // Set listing type to rent for rent page
        queryParams.append("listing_type", "rent");

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

          // Handle completion status for rent properties
          if (filterParams.completionStatus) {
            if (filterParams.completionStatus === "ready") {
              queryParams.append("category", "ready-project");
            } else if (filterParams.completionStatus === "off-plan") {
              queryParams.append("category", "off-plan");
            }
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

          // Properties are already filtered by the API

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
    <div className="rent-properties-section">
      <div className="rent-properties-header">
        <h2>Property for Rent</h2>
      </div>
      <div className="rent-properties-content">
        <div className="rent-properties-left">
          <div className="rent-properties-grid">
            {loading ? (
              <p>Loading properties...</p>
            ) : error ? (
              <p>{error}</p>
            ) : properties.length === 0 ? (
              <div className="no-properties-found">
                <p>No properties found matching your criteria</p>
                <button 
                  className="explore-all-btn"
                  onClick={() => window.location.href = "/rent"}
                >
                  Explore All Properties
                </button>
              </div>
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
        </div>
        <div className="rent-properties-right">
          <div className="ad-banner full-image">
            <img src={rent2} alt="Group Meridian" className="full-banner-img" />
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
    </div>
  );
};

export default PropertiesSection;
