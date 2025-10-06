import React, { useState, useEffect } from "react";
import PropertyCard from "../PropertyCard/PropertyCard";
import buyBanner2 from "../../assets/buy-banner2.png";
import logo from "../../assets/logo.png";
import rent from "../../assets/rent.png";
import rent2 from "../../assets/rent2.png";
import rent3 from "../../assets/rent3.jpg";
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

        // Build the API URL with query parameters based on filterParams
        let apiUrl = `${config.API_URL}/properties/type/rent`;

        // Add query parameters if they exist
        const queryParams = new URLSearchParams();

        // We'll do all filtering client-side for more flexibility
        // Don't send any parameters to the API

        // Add query parameters to the URL if any exist
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

          // Apply client-side filtering
          if (filterParams) {
            // Filter by location
            if (filterParams.location && filterParams.location.trim() !== "") {
              const locationSearch = filterParams.location.toLowerCase().trim();
              propertiesData = propertiesData.filter((property) => {
                // Check if property has location and if it contains the search term
                return (
                  property.location &&
                  property.location.toLowerCase().includes(locationSearch)
                );
              });
            }

            // Filter by completion status
            if (filterParams.completionStatus) {
              propertiesData = propertiesData.filter(
                (property) =>
                  property.completionStatus === filterParams.completionStatus
              );
            }

            // Filter by property type
            if (filterParams.propertyType) {
              propertiesData = propertiesData.filter((property) => {
                // Check if property has type and if it matches the filter
                return (
                  property.propertyType &&
                  property.propertyType.toLowerCase() ===
                    filterParams.propertyType.toLowerCase()
                );
              });
            }

            // Filter by min bathrooms
            if (filterParams.minBathrooms) {
              const minBaths = parseInt(filterParams.minBathrooms);
              propertiesData = propertiesData.filter(
                (property) => property.bathrooms >= minBaths
              );
            }

            // Filter by max bathrooms
            if (filterParams.maxBathrooms) {
              const maxBaths = parseInt(filterParams.maxBathrooms);
              propertiesData = propertiesData.filter(
                (property) => property.bathrooms <= maxBaths
              );
            }

            // Filter by min bedrooms
            if (filterParams.minBedrooms) {
              const minBeds = parseInt(filterParams.minBedrooms);
              propertiesData = propertiesData.filter(
                (property) => property.bedrooms >= minBeds
              );
            }

            // Filter by max bedrooms
            if (filterParams.maxBedrooms) {
              const maxBeds = parseInt(filterParams.maxBedrooms);
              propertiesData = propertiesData.filter(
                (property) => property.bedrooms <= maxBeds
              );
            }

            // Filter by min area
            if (filterParams.minArea) {
              const minArea = parseInt(filterParams.minArea);
              propertiesData = propertiesData.filter(
                (property) => property.area >= minArea
              );
            }

            // Filter by max area
            if (filterParams.maxArea) {
              const maxArea = parseInt(filterParams.maxArea);
              propertiesData = propertiesData.filter(
                (property) => property.area <= maxArea
              );
            }

            // Filter by min price
            if (filterParams.minPrice) {
              const minPrice = parseInt(filterParams.minPrice);
              propertiesData = propertiesData.filter(
                (property) => property.price >= minPrice
              );
            }

            // Filter by max price
            if (filterParams.maxPrice) {
              const maxPrice = parseInt(filterParams.maxPrice);
              propertiesData = propertiesData.filter(
                (property) => property.price <= maxPrice
              );
            }
          }

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
                  id={property.id}
                  image={property.pictures[0]}
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
