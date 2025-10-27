import React from "react";
import "./MapSection.css";

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="location-card">
        <span className="subtitle">Visit Us</span>
        <h2>Find Our Office</h2>
        <p>
          Located in the heart of Abu Dhabi at Baynunah Tower, our office is your gateway to exceptional real estate 
          services. Schedule a consultation with our experienced team—we're here to help you find your perfect property 
          or maximize your investment returns.
        </p>

        <div className="contact-details">
          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/loca.png"} alt="location" />
            <div>
              <p>Al Hisn, Baynunah Tower 2 , Office 402 , Abu dhabi</p>
              
            </div>
          </div>

          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/phone.png"} alt="phone" />
            <div>
              <p>(+97) 586830401</p>
            </div>
          </div>

          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/ime.png"} alt="email" />
            <div>
              <p>info@meridiangroup.ae</p>
            </div>
          </div>
        </div>

        <button 
          className="search-maps-btn"
          onClick={() => window.open('https://share.google/o1rVfnflSbTSKhd8t', '_blank')}
        >
          SEARCH ON MAPS
        </button>
      </div>
    </section>
  );
};

export default MapSection;
