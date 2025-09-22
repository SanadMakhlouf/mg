import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const carouselData = [
  {
    image: `${process.env.PUBLIC_URL}/hero-bgg.jpg`,
    title: "Where Trust, Integrity\nAnd Professionalism\nMeet!",
  },
  {
    image: `${process.env.PUBLIC_URL}/here-bg2.jpg`,
    title: "Discover Your\nDream Home\nToday",
  },
  {
    image: `${process.env.PUBLIC_URL}/test.jpg`,
    title: "Luxury Living\nRedefined\nFor You",
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
        <div style={{ display: "flex", gap: "20px", marginBottom: "3rem" }}>
          <Link
            to="/ready-projects"
            style={{
              cursor: "pointer",
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "4px",
              minWidth: "120px",
              textAlign: "center",
              background: "#800020",
              color: "white",
              border: "2px solid #800020",
              transition: "all 0.3s ease",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "white";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "#800020";
              e.target.style.borderColor = "#800020";
            }}
          >
            READY PROJECTS
          </Link>
          <Link
            to="/about"
            style={{
              cursor: "pointer",
              padding: "12px 40px",
              fontSize: "16px",
              fontWeight: "500",
              borderRadius: "4px",
              minWidth: "120px",
              textAlign: "center",
              background: "transparent",
              color: "white",
              border: "2px solid white",
              transition: "all 0.3s ease",
              textDecoration: "none",
              display: "inline-block",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "#800020";
              e.target.style.borderColor = "#800020";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "transparent";
              e.target.style.borderColor = "white";
            }}
          >
            ABOUT US
          </Link>
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
