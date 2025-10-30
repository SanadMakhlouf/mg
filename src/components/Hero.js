import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const carouselData = [
  {
    image: `${process.env.PUBLIC_URL}/media/abu-dhabi.jpg`,
    title: "Top notch living space",
    description: "Bringing together a team with passion, dedication, and resources to help our clients reach their buying and selling goals. We are with you every step of the way.",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Al reem Island.jpg`,
    title: "Discover Your Perfect Property",
    description: "Experience luxury real estate at its finest. Discover premium properties in Abu Dhabi's most prestigious locations.",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Al Fahid-02.jpg`,
    title: "Your Trusted Partner",
    description: "We are a real estate firm with over 15 years of expertise. We provide amazing locations to our partners and clients.",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Abu Dhabi 5.jpg`,
    title: "Luxury Living In Abu Dhabi",
    description: "Connect with Abu Dhabi's most prestigious developers and trusted agencies, ensuring every listing is 100% verified.",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Abu Dhabi 4.jpg`,
    title: "Exclusive Real Estate",
    description: "Invest confidently in a transparent market where your success is our priority.",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Abu Dhabi 3.jpg`,
    title: "Prime Investment Opportunities",
    description: "Experience excellence with Meridian Group. Premium properties in Abu Dhabi's most sought-after locations.",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/ABU DHABI 2.jpg`,
    title: "Experience Excellence",
    description: "With Meridian Group - Your trusted partner for luxury real estate in Abu Dhabi.",
  },
].map(slide => ({
  ...slide,
  image: slide.image.replace(/ /g, '%20')
}));

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images - but show first image immediately
  useEffect(() => {
    // Show first image immediately
    setIsLoaded(true);
    
    const loadImages = async () => {
      const imagePromises = carouselData.map((slide, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            resolve();
          };
          img.onerror = () => {
            // Even if image fails, resolve to continue
            resolve();
          };
          img.src = slide.image;
        });
      });

      try {
        await Promise.all(imagePromises);
        setImagesLoaded(true);
      } catch (error) {
        setImagesLoaded(true);
      }
    };

    loadImages();
  }, []);

  useEffect(() => {
    if (!imagesLoaded) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % carouselData.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [imagesLoaded]);

  // Ensure first slide shows immediately on mount
  useEffect(() => {
    setCurrentSlide(0);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <div className="hero-card-layout">
      {/* Dark background */}
      <div className="hero-dark-bg"></div>

      {/* Main Hero Card Container */}
      <div className="hero-card-container">
        {/* Left Sidebar - Social Media */}
        <div className="hero-sidebar-left">
          <a 
            href="https://www.instagram.com/meridiangroupuae/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            INSTAGRAM
          </a>
          <div className="social-separator">·</div>
          <a 
            href="https://www.facebook.com/p/Meridian-Group-61555497801970/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            FACEBOOK
          </a>
          <div className="social-separator">·</div>
          <a 
            href="https://wa.me/971586830401" 
            target="_blank" 
            rel="noopener noreferrer"
            className="social-link"
          >
            WHATSAPP
          </a>
        </div>

        {/* Right Sidebar - Scroll Indicator */}
        <button 
          className="hero-sidebar-right" 
          onClick={handleScrollDown}
          aria-label="Scroll down"
        >
          <div className="scroll-text">SCROLL</div>
          <div className="scroll-arrow">
            <i className="fa-solid fa-chevron-down"></i>
          </div>
        </button>

        {/* Background Images */}
        {carouselData.map((slide, index) => (
          <div
            key={`bg-${index}`}
            className={`hero-card-bg-image ${index === currentSlide ? "active" : ""}`}
            style={{ backgroundImage: `url("${slide.image}")` }}
          />
        ))}

        {/* Overlay */}
        <div className="hero-card-overlay"></div>

        {/* Large Text Overlay */}
        <div className="hero-large-text-overlay">
          MERIDIAN
        </div>

        {/* Rotating Circular Text */}
        <div className="hero-circular-text">
          <svg viewBox="0 0 200 200" className="circular-text-svg">
            <defs>
              <path id="circular-path" d="M 100, 100 m -75, 0 a 75,75 0 1,1 150,0 a 75,75 0 1,1 -150,0" />
            </defs>
            <text className="circular-text-content">
              <textPath href="#circular-path" startOffset="0%">
                MERIDIAN GROUP • MERIDIAN GROUP • MERIDIAN GROUP • 
              </textPath>
            </text>
          </svg>
          <div className="circular-text-icon">
            <i className="fa-solid fa-play"></i>
          </div>
        </div>

        {/* Content */}
        <div className="hero-card-content">
          <div className={`hero-card-text-wrapper ${isLoaded ? "loaded" : ""}`}>
            <h1 className="hero-card-title">
              {carouselData[currentSlide].title}
            </h1>
            <p className="hero-card-description">
              {carouselData[currentSlide].description}
            </p>

            <Link to="/buy" className="hero-card-cta-btn">
              Explore Properties
              <i className="fa-solid fa-arrow-right"></i>
            </Link>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button 
          className="hero-nav-arrow hero-nav-prev" 
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        <button 
          className="hero-nav-arrow hero-nav-next" 
          onClick={nextSlide}
          aria-label="Next slide"
        >
          <i className="fa-solid fa-chevron-right"></i>
        </button>

        {/* Carousel Indicators */}
        <div className="hero-card-indicators">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`hero-indicator ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
