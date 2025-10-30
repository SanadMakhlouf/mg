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
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [cursorTrail, setCursorTrail] = useState([]);
  const [displayedText, setDisplayedText] = useState("");
  const [isTypingComplete, setIsTypingComplete] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = carouselData[currentSlide].title;
    let currentIndex = 0;
    setDisplayedText("");
    setIsTypingComplete(false);

    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setDisplayedText(fullText.substring(0, currentIndex));
        currentIndex++;
      } else {
        setIsTypingComplete(true);
        clearInterval(typingInterval);
      }
    }, 80); // Typing speed

    return () => clearInterval(typingInterval);
  }, [currentSlide]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 8000); // Changed to 8 seconds to allow typing to complete

    return () => clearInterval(timer);
  }, []);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setMousePosition({ x, y });

    // Create cursor trail
    const newTrail = {
      x: e.clientX,
      y: e.clientY,
      id: Date.now() + Math.random(),
    };
    
    setCursorTrail((prev) => [...prev.slice(-15), newTrail]);
  };

  const handleTouchMove = (e) => {
    if (e.touches.length > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
      const y = ((e.touches[0].clientY - rect.top) / rect.height) * 100;
      setMousePosition({ x, y });
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + carouselData.length) % carouselData.length
    );
  };

  return (
    <div className="hero" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove}>
      {/* Custom Cursor Trail */}
      {cursorTrail.map((trail, index) => (
        <div
          key={trail.id}
          className="cursor-trail"
          style={{
            left: trail.x,
            top: trail.y,
            animationDelay: `${index * 0.05}s`,
          }}
        />
      ))}

      {/* Floating Particles */}
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      {/* Cursor Glow Effect */}
      <div
        className="cursor-glow"
        style={{
          left: `${mousePosition.x}%`,
          top: `${mousePosition.y}%`,
        }}
      />

      {/* Sharp background layer */}
      {carouselData.map((slide, index) => (
        <img
          key={`sharp-${index}`}
          src={slide.image}
          alt={`Hero Background ${index + 1}`}
          className={`hero-image hero-image-sharp ${index === currentSlide ? "active" : ""}`}
        />
      ))}
      
      {/* Blurred overlay layer with mouse reveal */}
      {carouselData.map((slide, index) => (
        <div
          key={`blur-${index}`}
          className={`hero-image-blur ${index === currentSlide ? "active" : ""}`}
          style={{
            backgroundImage: `url(${slide.image})`,
            maskImage: `radial-gradient(circle 250px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)`,
            WebkitMaskImage: `radial-gradient(circle 250px at ${mousePosition.x}% ${mousePosition.y}%, transparent 0%, rgba(0,0,0,0.4) 40%, black 100%)`,
          }}
        />
      ))}
      
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="typewriter-text">
          {displayedText.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
          {!isTypingComplete && <span className="typing-cursor">|</span>}
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
