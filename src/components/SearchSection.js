import React from "react";
import "./SearchSection.css";

const SearchSection = () => {
  return (
    <section className="search-section">
      <div className="search-container">
        <div className="search-tabs">
          <button className="tab active">RENTAL</button>
          <button className="tab">SALES</button>
        </div>
        <div className="search-form">
          <div className="search-row">
            <div className="search-field">
              <select defaultValue="">
                <option value="" disabled>
                  Completion Status
                </option>
                <option value="ready">Ready</option>
                <option value="under-construction">Under Construction</option>
              </select>
            </div>
            <div className="search-field">
              <input type="text" placeholder="Search City, Region Or Address" />
            </div>
            <button className="search-btn">SEARCH</button>
          </div>
          <div className="search-row">
            <div className="search-field">
              <select defaultValue="">
                <option value="" disabled>
                  Property Type
                </option>
                <option value="apartment">Apartment</option>
                <option value="villa">Villa</option>
                <option value="office">Office</option>
              </select>
            </div>
            <div className="search-field">
              <select defaultValue="">
                <option value="" disabled>
                  Min. Bathrooms
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
            <div className="search-field">
              <select defaultValue="">
                <option value="" disabled>
                  Max. Bathrooms
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3+</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchSection;
