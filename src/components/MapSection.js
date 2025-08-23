import React from "react";
import "./MapSection.css";

const MapSection = () => {
  return (
    <section className="map-section">
      <div className="location-card">
        <span className="subtitle">Our Location</span>
        <h2>Where to find us</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna.
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
              <p>(+97) 150907039</p>
              <p>(+97) 150907039</p>
            </div>
          </div>

          <div className="detail-item">
            <img src={process.env.PUBLIC_URL + "/ime.png"} alt="email" />
            <div>
              <p>info@meridiagroup.ae</p>
              <p>info@domain.com</p>
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
