import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Hero.css";

const carouselData = [
  {
    image: `${process.env.PUBLIC_URL}/media/abu-dhabi.jpg`,
    title: "Premium Properties",
    subtitle: "Exceptional Results",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Al reem Island.jpg`,
    title: "Discover Your",
    subtitle: "Perfect Property",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Al Fahid-02.jpg`,
    title: "Your Trusted Partner",
    subtitle: "in Abu Dhabi Real Estate",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Abu Dhabi 5.jpg`,
    title: "Luxury Living",
    subtitle: "In Abu Dhabi",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Abu Dhabi 4.jpg`,
    title: "Exclusive Real Estate",
    subtitle: "Premium Locations",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/Abu Dhabi 3.jpg`,
    title: "Prime Investment",
    subtitle: "Opportunities Await",
  },
  {
    image: `${process.env.PUBLIC_URL}/media/ABU DHABI 2.jpg`,
    title: "Experience Excellence",
    subtitle: "With Meridian Group",
  },
].map(slide => ({
  ...slide,
  image: slide.image.replace(/ /g, '%20') // Encode spaces in URLs
}));

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // Preload all images
  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = carouselData.map((slide, index) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.onload = () => {
            console.log(`Image ${index + 1} loaded:`, slide.image);
            resolve();
          };
          img.onerror = () => {
            console.error(`Failed to load image ${index + 1}:`, slide.image);
            reject(new Error(`Failed to load: ${slide.image}`));
          };
          img.src = slide.image;
        });
      });

      try {
        await Promise.all(imagePromises);
        console.log("All images loaded successfully");
        setImagesLoaded(true);
        setIsLoaded(true);
      } catch (error) {
        console.error("Error loading images:", error);
        // Still set loaded to true to allow carousel to work
        setImagesLoaded(true);
        setIsLoaded(true);
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

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % carouselData.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + carouselData.length) % carouselData.length);
  };

  return (
    <div className="hero-clean">
      {/* Background Images */}
      {carouselData.map((slide, index) => (
        <div
          key={`bg-${index}`}
          className={`hero-bg-image ${index === currentSlide ? "active" : ""}`}
          style={{ backgroundImage: `url("${slide.image}")` }}
        />
      ))}

      {/* Overlay */}
      <div className="hero-overlay-clean"></div>

      {/* Content */}
      <div className="hero-content-clean">
        <div className={`hero-text-wrapper ${isLoaded ? "loaded" : ""}`}>
          <h1 className="hero-title-clean">
            {carouselData[currentSlide].title}
        </h1>
          <h2 className="hero-subtitle-clean">
            {carouselData[currentSlide].subtitle}
          </h2>
          <p className="hero-description-clean">
            Experience luxury real estate at its finest. Discover premium properties 
            in Abu Dhabi's most prestigious locations.
          </p>

          <div className="hero-buttons-clean">
            <Link to="/off-plan-properties" className="hero-btn hero-btn-primary">
              Explore Properties
              <i className="fa-solid fa-arrow-right"></i>
          </Link>
            <Link to="/about" className="hero-btn hero-btn-secondary">
              Our Story
              <i className="fa-solid fa-play"></i>
          </Link>
          </div>

          <div className="hero-stats-clean">
            <div className="hero-stat-item">
              <span className="stat-number">50+</span>
              <span className="stat-label">Properties Sold</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-number">5+</span>
              <span className="stat-label">Years Experience</span>
            </div>
            <div className="hero-stat-item">
              <span className="stat-number">100%</span>
              <span className="stat-label">Client Satisfaction</span>
          </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="hero-nav-clean">
        <button className="nav-arrow nav-prev" onClick={prevSlide} aria-label="Previous slide">
          <i className="fa-solid fa-chevron-left"></i>
        </button>
        
        <div className="nav-dots-clean">
          {carouselData.map((_, index) => (
            <button
              key={index}
              className={`nav-dot-clean ${index === currentSlide ? "active" : ""}`}
              onClick={() => setCurrentSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <button className="nav-arrow nav-next" onClick={nextSlide} aria-label="Next slide">
          <i className="fa-solid fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Hero;
