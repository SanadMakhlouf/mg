import React from "react";
import "./LookingForSection.css";
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris.
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
      <div className="villa-container">  <img src={villa2} alt="villa2" /></div>
    </section>
  );
};

export default LookingForSection;
