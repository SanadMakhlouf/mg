import React from "react";
import "./LookingForSection.css";
// NOTE: These images are low quality and will be replaced with higher resolution versions provided by the client
import villa from "../assets/vila.png";
import office from "../assets/office.png";
import apartment from "../assets/apart.png";
import shop from "../assets/shop.png";
import townhouse from "../assets/townhouse.png";
import villa2 from "../assets/villa-bg.png";

const LookingForSection = () => {
  return (
    <section className="looking-for-section">
      <div className="looking-for-container">
        <div className="section-header">
          <h2>WHAT ARE YOU LOOKING FOR?</h2>
          <p>
            Discover your perfect property in Abu Dhabi. From modern apartments to luxury villas, 
            we offer a comprehensive range of real estate solutions tailored to your needs.
          </p>
        </div>

        <div className="cards-container">
          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <img src={apartment} alt="apartment" />
              </div>
              <h3>Apartments</h3>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <img src={townhouse} alt="townhouse" />
              </div>
              <h3>Townhouses</h3>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <img src={villa} alt="villa" />
              </div>
              <h3>Villas</h3>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <img src={office} alt="office" />
              </div>
              <h3>Offices</h3>
            </div>
          </div>

          <div className="card">
            <div className="card-content">
              <div className="card-image">
                <img src={shop} alt="shop" />
              </div>
              <h3>Shops</h3>
            </div>
          </div>
        </div>
      </div>
      <div className="villa-container">
        {/* This image is low quality and will be replaced */}
        <img src={villa2} alt="villa2" />
      </div>
    </section>
  );
};

export default LookingForSection;
