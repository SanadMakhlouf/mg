import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./OffPlan.css";
import OffPlanHero from "./OffPlanHero";
import OffPlanBanner from "./OffPlanBanner";
import OffPlanGrid from "./OffPlanGrid";
import OffPlanContact from "./OffPlanContact";

const OffPlan = () => {
  const location = useLocation();
  const [filterParams, setFilterParams] = useState({
    location: "",
    propertyType: "",
    minBathrooms: "",
    maxBathrooms: "",
    minBedrooms: "",
    maxBedrooms: "",
    minArea: "",
    maxArea: "",
    minPrice: "",
    maxPrice: "",
  });

  // Extract search parameters from URL when component mounts
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const newFilterParams = { ...filterParams };

    // Update filter parameters from URL query parameters
    for (const [key, value] of queryParams.entries()) {
      if (key in newFilterParams) {
        newFilterParams[key] = value;
      }
    }

    setFilterParams(newFilterParams);
  }, [location.search]);

  // Handle filter changes
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterParams({
      ...filterParams,
      [name]: value,
    });
  };

  // Handle search button click
  const handleSearch = () => {
    console.log("Filtering properties with:", filterParams);
  };

  return (
    <div className="off-plan-page">
      <OffPlanHero />
      <div className="off-plan-container">
        <OffPlanBanner />
        
        {/* Search Section */}
        <div className="off-plan-search-section">
          <div className="search-header">
            <h3>Off Plan Properties</h3>
          </div>
          <div className="search-filters">
            <div className="filter-row">
              <div className="filter-group location-group">
                <label>Location</label>
                <div className="search-input-container">
                  <input
                    type="text"
                    name="location"
                    value={filterParams.location}
                    onChange={handleFilterChange}
                    placeholder="Search City, Region Or Address..."
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        handleSearch();
                      }
                    }}
                  />
                  <button className="search-button" onClick={handleSearch}>
                    Search
                  </button>
                </div>
              </div>
              <div className="filter-group">
                <label>Property Type</label>
                <select
                  name="propertyType"
                  value={filterParams.propertyType}
                  onChange={handleFilterChange}
                >
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="office">Office</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="shop">Shop</option>
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Min. Bathrooms</label>
                <select
                  name="minBathrooms"
                  value={filterParams.minBathrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max. Bathrooms</label>
                <select
                  name="maxBathrooms"
                  value={filterParams.maxBathrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Bathrooms</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Min. Bedrooms</label>
                <select
                  name="minBedrooms"
                  value={filterParams.minBedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max. Bedrooms</label>
                <select
                  name="maxBedrooms"
                  value={filterParams.maxBedrooms}
                  onChange={handleFilterChange}
                >
                  <option value="">Bedrooms</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Min. Area</label>
                <select
                  name="minArea"
                  value={filterParams.minArea}
                  onChange={handleFilterChange}
                >
                  <option value="">Min Area</option>
                  <option value="500">500 sq ft</option>
                  <option value="1000">1000 sq ft</option>
                  <option value="1500">1500+ sq ft</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max. Area</label>
                <select
                  name="maxArea"
                  value={filterParams.maxArea}
                  onChange={handleFilterChange}
                >
                  <option value="">Max Area</option>
                  <option value="1000">1000 sq ft</option>
                  <option value="2000">2000 sq ft</option>
                  <option value="3000">3000+ sq ft</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Min. Price</label>
                <input
                  type="text"
                  name="minPrice"
                  value={filterParams.minPrice}
                  onChange={handleFilterChange}
                  placeholder="Price ( AED )"
                />
              </div>
              <div className="filter-group">
                <label>Max. Price</label>
                <input
                  type="text"
                  name="maxPrice"
                  value={filterParams.maxPrice}
                  onChange={handleFilterChange}
                  placeholder="Price ( AED )"
                />
              </div>
            </div>
          </div>
        </div>

        <OffPlanGrid filterParams={filterParams} />
        <OffPlanContact />
      </div>
    </div>
  );
};

export default OffPlan;
