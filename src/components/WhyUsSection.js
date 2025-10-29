import React from "react";
import "./WhyUsSection.css";
// NOTE: These icons will be replaced by client-provided icons
import home from "../assets/home.png";
import money from "../assets/money.png";
import chart from "../assets/chart.png";
import avatar from "../assets/Avatar.png";

const WhyUsSection = () => {
  return (
    <section className="why-us-section">
      <div className="why-us-container">
        <div className="stats-container">
          <div className="stats-group slide-left">
            <div className="why-us-header">
              <h2>
                <span className="city-name">
                  ABU DHABI'S{" "}
                  <span className="colored-text">
                    MOST <br />{" "}
                  </span>
                </span>
                <span>TRUSTED </span>
                <span className="colored-text">REAL ESTATE</span> PARTNER
              </h2>
              <p className="why-us-description">
                Meridian Group connects you with Abu Dhabi's most prestigious developers and trusted agencies, ensuring every listing is 100% verified. Invest confidently in a transparent market where your success is our priority.
              </p>
            </div>

            <div className="user-avatars">
              {/* You'll need to add actual avatar images here */}
              <img src={avatar} alt="avatar" />
            </div>
          </div>

          <div className="features-list stagger-children">
            <div className="feature-item">
              <img src={money} alt="money" />
              <div className="feature-text">
                <h4>Top Appreciating Projects</h4>
                <p>Discover investment opportunities with the highest capital appreciation and rental income potential in Abu Dhabi.</p>
              </div>
            </div>
            <div className="feature-item">
              <img src={home} alt="home" />
              <div className="feature-text">
                <h4>Premium Rental Units</h4>
                <p>Access the finest rental properties with exceptional quality, prime locations, and outstanding amenities.</p>
              </div>
            </div>
            <div className="feature-item">
              <img src={chart} alt="chart" />
              <div className="feature-text">
                <h4>Tailored Investment Strategies</h4>
                <p>We craft personalized investment plans that align with your financial goals, ensuring sustainable capital growth.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
