import React from "react";
import "./MapSection.css";

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="location-card">
        <span className="subtitle">Our Location</span>
        <h2>Where to find us</h2>
        <p>
          Visit our office in the heart of Abu Dhabi for personalized real estate services. 
          Our experienced team is ready to help you with all your property needs.
        </p>

        <div className="contact-details">
          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/loca.png"} alt="location" />
            <div>
              <p>Al Hisn, Baynunah Tower</p>
              <p>Office 93</p>
            </div>
          </div>

          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/phone.png"} alt="phone" />
            <div>
              <p>(+97) 150607030</p>
              <p>(+97) 150607030</p>
            </div>
          </div>

          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/ime.png"} alt="email" />
            <div>
              <p>info@meridiangroup.ae</p>
              <p>info@meridiangroup.ae</p>
            </div>
          </div>

          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/time.png"} alt="time" />
            <div>
              <p>Open: 04:00 am</p>
              <p>Closed: 07:00 pm</p>
            </div>
          </div>
        </div>

        <button className="search-maps-btn">SEARCH ON MAPS</button>
      </div>
    </section>
  );
};

export default MapSection;
