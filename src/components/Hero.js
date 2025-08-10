import React from "react";
import "./Hero.css";

const Hero = () => {
  return (
    <div className="hero">
      <img
        src={`${process.env.PUBLIC_URL}/hero-bgg.jpg`}
        alt="Hero Background"
        className="hero-image"
      />
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>
          Where Trust, Integrity
          <br />
          And Professionalism
          <br />
          Meet!
        </h1>
        <div className="hero-buttons">
          <button className="explore-btn">EXPLORE</button>
          <button className="about-btn">ABOUT US</button>
        </div>
        <div className="hero-states">
          <div className="hero-state">
            <h2>100+</h2>
            <p>Properties</p>
          </div>
          <div className="hero-state">
            <h2>100+</h2>
            <p>Properties</p>
          </div>
          <div className="hero-state">
            <h2>100+</h2>
            <p>Properties</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
