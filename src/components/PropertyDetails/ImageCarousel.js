import React, { useState, useEffect, useRef } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const thumbnailRefs = useRef([]);
  const thumbnailsContainerRef = useRef(null);

  const nextImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToImage = (index) => {
    setCurrentIndex(index);
  };

  // Auto-scroll active thumbnail into view
  useEffect(() => {
    if (thumbnailRefs.current[currentIndex] && thumbnailsContainerRef.current) {
      const thumbnailElement = thumbnailRefs.current[currentIndex];
      const container = thumbnailsContainerRef.current;
      
      const thumbnailTop = thumbnailElement.offsetTop;
      const thumbnailHeight = thumbnailElement.offsetHeight;
      const containerTop = container.scrollTop;
      const containerHeight = container.clientHeight;
      
      // Check if thumbnail is out of view
      if (thumbnailTop < containerTop || thumbnailTop + thumbnailHeight > containerTop + containerHeight) {
        container.scrollTo({
          top: thumbnailTop - containerHeight / 2 + thumbnailHeight / 2,
          behavior: 'smooth'
        });
      }
    }
  }, [currentIndex]);

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel-bayut">
        <div className="carousel-layout-bayut">
          <div className="carousel-main-bayut">
            <img src="/test.jpg" alt={alt} className="main-image-bayut" onClick={toggleZoom} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="image-carousel-bayut">
      <div className="carousel-layout-bayut">
        {/* Main Image on Left */}
        <div className="carousel-main-bayut">
          <img
            src={images[currentIndex]}
            alt={`${alt} - Image ${currentIndex + 1}`}
            className="main-image-bayut"
            onClick={toggleZoom}
          />

          {images.length > 1 && (
            <>
              <button className="carousel-btn-bayut prev-btn-bayut" onClick={prevImage}>
                <i className="fa-solid fa-chevron-left"></i>
              </button>
              <button className="carousel-btn-bayut next-btn-bayut" onClick={nextImage}>
                <i className="fa-solid fa-chevron-right"></i>
              </button>
            </>
          )}
        </div>

        {/* Vertical Thumbnails on Right - Show All */}
        {images.length > 1 && (
          <div className="carousel-thumbnails-vertical" ref={thumbnailsContainerRef}>
            {images.map((image, index) => (
              <div
                key={index}
                ref={(el) => (thumbnailRefs.current[index] = el)}
                className={`thumbnail-vertical ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToImage(index)}
              >
                <img
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Zoom Modal */}
      {isZoomed && (
        <div className="zoom-modal" onClick={closeZoom}>
          <div className="zoom-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-zoom-btn" onClick={closeZoom}>
              <i className="fa-solid fa-times"></i>
            </button>
            <img
              src={images[currentIndex]}
              alt={`${alt} - Zoomed Image ${currentIndex + 1}`}
              className="zoomed-image"
            />
            {images.length > 1 && (
              <>
                <button className="zoom-carousel-btn prev-btn" onClick={prevImage}>
                  <i className="fa-solid fa-chevron-left"></i>
                </button>
                <button className="zoom-carousel-btn next-btn" onClick={nextImage}>
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageCarousel;