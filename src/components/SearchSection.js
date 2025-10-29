import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchSection.css";

const SearchSection = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("rental");
  const [searchParams, setSearchParams] = useState({
    location: "",
    propertyType: "",
    minBathrooms: "",
    maxBathrooms: "",
    minBedrooms: "",
    maxBedrooms: "",
  });

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchParams({
      ...searchParams,
      [name]: value,
    });
  };

  const handleSearch = () => {
    // Create query string from search parameters using new API format
    const queryParams = new URLSearchParams();

    // Map frontend parameters to API parameters
    if (searchParams.location && searchParams.location.trim() !== "") {
      queryParams.append("location", searchParams.location.trim());
    }

    if (searchParams.propertyType) {
      queryParams.append("type", searchParams.propertyType);
    }

    if (searchParams.minBathrooms) {
      queryParams.append("min_bathrooms", searchParams.minBathrooms);
    }

    if (searchParams.maxBathrooms) {
      queryParams.append("max_bathrooms", searchParams.maxBathrooms);
    }

    if (searchParams.minBedrooms) {
      queryParams.append("min_bedrooms", searchParams.minBedrooms);
    }

    if (searchParams.maxBedrooms) {
      queryParams.append("max_bedrooms", searchParams.maxBedrooms);
    }

    // Set listing type based on active tab
    queryParams.append("listing_type", activeTab === "rental" ? "rent" : "sale");

    // Navigate to the appropriate page with new API parameters
    if (activeTab === "rental") {
      navigate(`/rent?${queryParams.toString()}`);
    } else {
      navigate(`/buy?${queryParams.toString()}`);
    }
  };

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-tabs">
          <button
            className={`tab ${activeTab === "rental" ? "active" : ""}`}
            onClick={() => handleTabChange("rental")}
          >
            RENTAL
          </button>
          <button
            className={`tab ${activeTab === "sales" ? "active" : ""}`}
            onClick={() => handleTabChange("sales")}
          >
            SALES
          </button>
        </div>
        <div className="search-form">
          <div className="search-row">
            <div className="search-field">
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="Search by city, community, or address"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div className="search-field">
              <label htmlFor="propertyType" className="sr-only">Property Type</label>
              <select
                id="propertyType"
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleInputChange}
                aria-label="Property Type"
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
                <option value="townhouse">Townhouse</option>
                <option value="shop">Shop</option>
              </select>
            </div>
            <button className="search-btn" onClick={handleSearch}>
              Search
            </button>
          </div>
          <div className="search-row">
            <div className="search-field">
              <label htmlFor="minBathrooms" className="sr-only">Minimum Bathrooms</label>
              <select
                id="minBathrooms"
                name="minBathrooms"
                value={searchParams.minBathrooms}
                onChange={handleInputChange}
                aria-label="Minimum Bathrooms"
              >
                <option value="">Min. Bath</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="maxBathrooms" className="sr-only">Maximum Bathrooms</label>
              <select
                id="maxBathrooms"
                name="maxBathrooms"
                value={searchParams.maxBathrooms}
                onChange={handleInputChange}
                aria-label="Maximum Bathrooms"
              >
                <option value="">Max. Bath</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="search-field">{/* Placeholder for balance */}</div>
          </div>
          <div className="search-row">
            <div className="search-field">
              <label htmlFor="minBedrooms" className="sr-only">Minimum Bedrooms</label>
              <select
                id="minBedrooms"
                name="minBedrooms"
                value={searchParams.minBedrooms}
                onChange={handleInputChange}
                aria-label="Minimum Bedrooms"
              >
                <option value="">Min. Bed</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="search-field">
              <label htmlFor="maxBedrooms" className="sr-only">Maximum Bedrooms</label>
              <select
                id="maxBedrooms"
                name="maxBedrooms"
                value={searchParams.maxBedrooms}
                onChange={handleInputChange}
                aria-label="Maximum Bedrooms"
              >
                <option value="">Max. Bed</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            <div className="search-field">{/* Placeholder for balance */}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;