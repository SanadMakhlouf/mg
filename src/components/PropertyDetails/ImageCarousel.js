import React, { useState } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

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

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="carousel-main">
          <img src="/test.jpg" alt={alt} className="main-image" onClick={toggleZoom} />
        </div>
      </div>
    );
  }

  return (
    <div className="image-carousel">
      <div className="carousel-main">
        <img
          src={images[currentIndex]}
          alt={`${alt} - Image ${currentIndex + 1}`}
          className={`main-image ${isZoomed ? 'zoomed' : ''}`}
          onClick={toggleZoom}
        />

        {images.length > 1 && (
          <>
            <button className="carousel-btn prev-btn" onClick={prevImage}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <button className="carousel-btn next-btn" onClick={nextImage}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>

            <div className="image-counter">
              {currentIndex + 1} / {images.length}
            </div>
          </>
        )}

        <button className="zoom-btn" onClick={toggleZoom}>
          <i className="fa-solid fa-magnifying-glass-plus"></i>
        </button>
      </div>

      {images.length > 1 && (
        <div className="carousel-thumbnails">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`${alt} thumbnail ${index + 1}`}
              className={`thumbnail ${index === currentIndex ? "active" : ""}`}
              onClick={() => goToImage(index)}
            />
          ))}
        </div>
      )}

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