import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

// NOTE: These images are low quality and should be replaced with higher resolution versions
const carouselData = [
  {
    image: `${process.env.PUBLIC_URL}/hero-bgg.jpg`,
    title: "Your Trusted Partner\nin Abu Dhabi\nReal Estate",
  },
  {
    image: `${process.env.PUBLIC_URL}/here-bg2.jpg`,
    title: "Discover Your\nPerfect Property\nin Abu Dhabi",
  },
  {
    image: `${process.env.PUBLIC_URL}/test.jpg`,
    title: "Premium Properties\nExceptional Results\nGuaranteed",
  },
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  return (
    <div className="hero">
      {carouselData.map((slide, index) => (
        <img
          key={index}
          src={slide.image}
          alt={`Hero Background ${index + 1}`}
          className={`hero-image ${index === currentSlide ? "active" : ""}`}
        />
      ))}
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1>
          {carouselData[currentSlide].title.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </h1>
        <div className="hero-buttons">
          <Link
            to="/off-plan-properties"
            className="explore-btn"
            style={{
              textDecoration: "none",
              display: "inline-block",
              position: "relative",
              zIndex: "1",
            }}
          >
            OFF PLAN PROJECTS
          </Link>
          <Link
            to="/about"
            className="about-btn"
            style={{
              textDecoration: "none",
              display: "inline-block",
              position: "relative",
              zIndex: "1",
            }}
          >
            ABOUT US
          </Link>
        </div>
        <div className="hero-states">
          <div className="hero-state">
            <h2>50+</h2>
            <p>Properties Sold</p>
          </div>
          <div className="hero-state">
            <h2>5+</h2>
            <p>Years Experience</p>
          </div>
          <div className="hero-state">
            <h2>100%</h2>
            <p>Client Satisfaction</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
