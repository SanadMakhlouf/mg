import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./SearchSection.css";

const SearchSection = ({ defaultTab = null, hideTabs = false, title = "Find Your Perfect Property", hideTitle = false }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(defaultTab || "rental");
  
  // Initialize search params from URL
  const getInitialSearchParams = () => {
    const queryParams = new URLSearchParams(location.search);
    return {
      location: queryParams.get("location") || "",
      propertyType: queryParams.get("type") || queryParams.get("propertyType") || "",
      minBathrooms: queryParams.get("min_bathrooms") || queryParams.get("minBathrooms") || "",
      maxBathrooms: queryParams.get("max_bathrooms") || queryParams.get("maxBathrooms") || "",
      minBedrooms: queryParams.get("min_bedrooms") || queryParams.get("minBedrooms") || "",
      maxBedrooms: queryParams.get("max_bedrooms") || queryParams.get("maxBedrooms") || "",
    };
  };

  const [searchParams, setSearchParams] = useState(getInitialSearchParams);

  // Update search params when URL changes
  useEffect(() => {
    const params = getInitialSearchParams();
    setSearchParams(params);
    
    // Set active tab based on current route or defaultTab prop
    if (defaultTab) {
      setActiveTab(defaultTab);
    } else if (location.pathname === "/buy" || location.pathname.includes("/buy")) {
      setActiveTab("sales");
    } else if (location.pathname === "/rent" || location.pathname.includes("/rent")) {
      setActiveTab("rental");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search, location.pathname, defaultTab]);

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

    // Check if we're on off-plan-properties-resale or off-plan-properties page
    // If so, just update URL params without navigating
    if (location.pathname === "/off-plan-properties-resale" || location.pathname === "/off-plan-properties") {
      const newUrl = queryParams.toString() 
        ? `${location.pathname}?${queryParams.toString()}`
        : location.pathname;
      // Use navigate to properly update React Router location
      navigate(newUrl, { replace: true });
      return;
    }

    // Navigate to the appropriate page with new API parameters
    if (activeTab === "rental") {
      navigate(`/rent?${queryParams.toString()}`);
    } else {
      navigate(`/buy?${queryParams.toString()}`);
    }
  };

  // Auto-search with debouncing
  useEffect(() => {
    // Skip initial render
    const isInitialMount = !searchParams.location && 
                          !searchParams.propertyType && 
                          !searchParams.minBathrooms && 
                          !searchParams.maxBathrooms && 
                          !searchParams.minBedrooms && 
                          !searchParams.maxBedrooms;
    
    if (isInitialMount) return;

    // Debounce search
    const searchTimeout = setTimeout(() => {
      handleSearch();
    }, 500); // 500ms delay

    return () => clearTimeout(searchTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.location, searchParams.propertyType, searchParams.minBathrooms, searchParams.maxBathrooms, searchParams.minBedrooms, searchParams.maxBedrooms, activeTab]);

  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-header">
          {!hideTitle && <h2 className="search-title">{title}</h2>}
          {!hideTabs && (
        <div className="search-tabs">
          <button
            className={`tab ${activeTab === "rental" ? "active" : ""}`}
            onClick={() => handleTabChange("rental")}
          >
              <i className="fa-solid fa-key"></i>
              <span>RENTAL</span>
          </button>
          <button
            className={`tab ${activeTab === "sales" ? "active" : ""}`}
            onClick={() => handleTabChange("sales")}
          >
              <i className="fa-solid fa-hand-holding-dollar"></i>
              <span>SALES</span>
          </button>
          </div>
          )}
        </div>
        
        <div className="search-form">
          <div className="search-row main-row">
            <div className="search-field-wrapper">
              <div className="search-field-icon">
                <i className="fa-solid fa-location-dot"></i>
              </div>
              <input
                type="text"
                name="location"
                value={searchParams.location}
                onChange={handleInputChange}
                placeholder="Search by city, community, or address"
                className="search-input"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
              />
            </div>
            
            <div className="search-field-wrapper">
              <div className="search-field-icon">
                <i className="fa-solid fa-building"></i>
              </div>
              <select
                id="propertyType"
                name="propertyType"
                value={searchParams.propertyType}
                onChange={handleInputChange}
                className="search-select"
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
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
            </button>
          </div>
          
          <div className="search-row filters-row">
            <div className="filter-group">
              <label className="filter-label">
                <i className="fa-solid fa-bed"></i>
                Bedrooms
              </label>
              <div className="filter-inputs">
                <select
                  id="minBedrooms"
                  name="minBedrooms"
                  value={searchParams.minBedrooms}
                  onChange={handleInputChange}
                  className="filter-select"
                  aria-label="Minimum Bedrooms"
                >
                  <option value="">Min</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
                <span className="filter-separator">to</span>
                <select
                  id="maxBedrooms"
                  name="maxBedrooms"
                  value={searchParams.maxBedrooms}
                  onChange={handleInputChange}
                  className="filter-select"
                  aria-label="Maximum Bedrooms"
                >
                  <option value="">Max</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
            </div>
            
            <div className="filter-group">
              <label className="filter-label">
                <i className="fa-solid fa-bath"></i>
                Bathrooms
              </label>
              <div className="filter-inputs">
              <select
                id="minBathrooms"
                name="minBathrooms"
                value={searchParams.minBathrooms}
                onChange={handleInputChange}
                  className="filter-select"
                aria-label="Minimum Bathrooms"
              >
                  <option value="">Min</option>
                <option value="0">Studio</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
                <span className="filter-separator">to</span>
              <select
                id="maxBathrooms"
                name="maxBathrooms"
                value={searchParams.maxBathrooms}
                onChange={handleInputChange}
                  className="filter-select"
                aria-label="Maximum Bathrooms"
              >
                  <option value="">Max</option>
                <option value="0">Studio</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4+</option>
              </select>
            </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
