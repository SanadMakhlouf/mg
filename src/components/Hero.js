import React, { useState, useEffect } from "react";
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
      <div className="carousel-controls">
        <button onClick={prevSlide} className="carousel-control prev">
          &lt;
        </button>
        <div className="carousel-dots">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`carousel-dot ${
                index === currentSlide ? "active" : ""
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
        <button onClick={nextSlide} className="carousel-control next">
          &gt;
        </button>
      </div>
    </div>
  );
};

export default Hero;
