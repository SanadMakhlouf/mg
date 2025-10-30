import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../Navbar";
import BuyHero from "./BuyHero";
import BuyBanner from "./BuyBanner";
import PropertiesSection from "./PropertiesSection";
import SearchSection from "../SearchSection";
import "./Buy.css";

const Buy = () => {
  const location = useLocation();
  
  // Initialize filterParams from URL immediately
  const getInitialFilterParams = () => {
    const queryParams = new URLSearchParams(location.search);
    return {
      location: queryParams.get("location") || "",
      propertyType: queryParams.get("propertyType") || "",
      minBathrooms: queryParams.get("minBathrooms") || "",
      maxBathrooms: queryParams.get("maxBathrooms") || "",
      minBedrooms: queryParams.get("minBedrooms") || "",
      maxBedrooms: queryParams.get("maxBedrooms") || "",
      minArea: queryParams.get("minArea") || "",
      maxArea: queryParams.get("maxArea") || "",
      minPrice: queryParams.get("minPrice") || "",
      maxPrice: queryParams.get("maxPrice") || "",
    };
  };

  const [filterParams, setFilterParams] = useState(getInitialFilterParams);

  // Update filterParams when URL changes
  useEffect(() => {
    setFilterParams(getInitialFilterParams());
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
    // Here you would implement the actual filtering logic
  };

  return (
    <div className="buy-page">
      <Navbar />
      <BuyHero />
      <SearchSection defaultTab="sales" hideTabs={false} />
      <div className="buy-container">
        <BuyBanner />
        <div className="buy-search-section" style={{ display: 'none' }}>
          <div className="search-header">
            <h3>Buy</h3>
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
                <label htmlFor="buy-propertyType">Property Type</label>
                <select
                  id="buy-propertyType"
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
                <label htmlFor="buy-minBathrooms">Min. Bathrooms</label>
                <select
                  id="buy-minBathrooms"
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
                <label htmlFor="buy-maxBathrooms">Max. Bathrooms</label>
                <select
                  id="buy-maxBathrooms"
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
                <label htmlFor="buy-minBedrooms">Min. Bedrooms</label>
                <select
                  id="buy-minBedrooms"
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
                <label htmlFor="buy-maxBedrooms">Max. Bedrooms</label>
                <select
                  id="buy-maxBedrooms"
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
                <label htmlFor="buy-minArea">Min. Area</label>
                <select
                  id="buy-minArea"
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
                <label htmlFor="buy-maxArea">Max. Area</label>
                <select
                  id="buy-maxArea"
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
        <PropertiesSection filterParams={filterParams} />
      </div>
    </div>
  );
};

export default Buy;
