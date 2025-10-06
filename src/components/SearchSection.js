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
    // Create query string from search parameters
    const queryParams = new URLSearchParams();

    // Only add parameters that have values
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value && value.trim() !== "") {
        queryParams.append(key, value.trim());
      }
    });

    // If no parameters are set but location is entered, use that as the main search parameter
    if (searchParams.location && searchParams.location.trim() !== "") {
      queryParams.set("location", searchParams.location.trim());
    }

    // Navigate to the appropriate page based on the active tab
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
                placeholder="Search City, Region Or Address"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            <div className="search-field">
              <select
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleInputChange}
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
              SEARCH
            </button>
          </div>
          <div className="search-row">
            <div className="search-field">
              <select
                name="minBathrooms"
                value={searchParams.minBathrooms}
                onChange={handleInputChange}
              >
                <option value="">Min. Bathrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="search-field">
              <select
                name="maxBathrooms"
                value={searchParams.maxBathrooms}
                onChange={handleInputChange}
              >
                <option value="">Max. Bathrooms</option>
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
              <select
                name="minBedrooms"
                value={searchParams.minBedrooms}
                onChange={handleInputChange}
              >
                <option value="">Min. Bedrooms</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="search-field">
              <select
                name="maxBedrooms"
                value={searchParams.maxBedrooms}
                onChange={handleInputChange}
              >
                <option value="">Max. Bedrooms</option>
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
