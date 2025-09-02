import React from "react";
import Navbar from "../Navbar";
import RentHero from "./RentHero";
import RentBanner from "./RentBanner";
import WelcomeSection from "./WelcomeSection";
import PropertiesSection from "./PropertiesSection";
import "./Rent.css";

const Rent = () => {
  return (
    <div className="rent-page">
      <Navbar />
      <RentHero />
      <WelcomeSection />
      <div className="rent-container">
        <RentBanner />
        <div className="rent-search-section">
          <div className="search-header">
            <h3>RENT</h3>
          </div>
          <div className="search-filters">
            <div className="filter-row">
              <div className="filter-group">
                <label>Completion Status</label>
                <select>
                  <option value="">Completion Status</option>
                  <option value="completed">Completed</option>
                  <option value="under-construction">Under Construction</option>
                  <option value="off-plan">Off Plan</option>
                </select>
              </div>
              <div className="filter-group location-group">
                <label>Location</label>
                <div className="search-input-container">
                  <input
                    type="text"
                    placeholder="Search City, Region Or Address..."
                  />
                  <button className="search-button">SEARCH</button>
                </div>
              </div>
            </div>

            <div className="filter-row">
              <div className="filter-group">
                <label>Property Type</label>
                <select>
                  <option value="">Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="villa">Villa</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Min. Bathrooms</label>
                <select>
                  <option value="">Bathrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max. Bathrooms</label>
                <select>
                  <option value="">Bathrooms</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Min. Bedrooms</label>
                <select>
                  <option value="">Bedrooms</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3+</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max. Bedrooms</label>
                <select>
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
                <select>
                  <option value="">Min Area</option>
                  <option value="500">500 sq ft</option>
                  <option value="1000">1000 sq ft</option>
                  <option value="1500">1500+ sq ft</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Max. Area</label>
                <select>
                  <option value="">Max Area</option>
                  <option value="1000">1000 sq ft</option>
                  <option value="2000">2000 sq ft</option>
                  <option value="3000">3000+ sq ft</option>
                </select>
              </div>
              <div className="filter-group">
                <label>Min. Price</label>
                <input type="text" placeholder="Price ( AED )" />
              </div>
              <div className="filter-group">
                <label>Max. Price</label>
                <input type="text" placeholder="Price ( AED )" />
              </div>
            </div>
          </div>
        </div>
        <PropertiesSection />
      </div>
    </div>
  );
};

export default Rent;
