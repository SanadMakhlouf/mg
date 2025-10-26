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
          <div className="stats-group">
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
                Meridian Group partners with Abu Dhabi's top developers and
                agencies to deliver 100% verified listings—so you invest with
                confidence in a market built on transparency.
              </p>
            </div>

            <div className="user-avatars">
              {/* You'll need to add actual avatar images here */}
              <img src={avatar} alt="avatar" />
            </div>
          </div>

          <div className="features-list">
            <div className="feature-item">
              <img src={money} alt="money" />
              <div className="feature-text">
                <h4>Most Appreciated Projects</h4>
                <p>Highest Capital Appreciation And Rental Income Projects.</p>
              </div>
            </div>
            <div className="feature-item">
              <img src={home} alt="home" />
              <div className="feature-text">
                <h4>Premium Rental Units</h4>
                <p>Best Units Available In The Market</p>
              </div>
            </div>
            <div className="feature-item">
              <img src={chart} alt="chart" />
              <div className="feature-text">
                <h4>We Tailor Your Investment Plan</h4>
                <p>Observe The Growth Of Your Capital.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyUsSection;
