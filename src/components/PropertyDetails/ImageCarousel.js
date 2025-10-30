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
      <div className="image-carousel-bayut">
        <div className="carousel-layout-bayut">
          <div className="carousel-main-bayut">
            <img src="/test.jpg" alt={alt} className="main-image-bayut" onClick={toggleZoom} />
          </div>
        </div>
      </div>
    );
  }

  // Show first 3 thumbnails vertically
  const displayThumbnails = images.slice(0, Math.min(images.length, 3));
  const remainingCount = images.length > 3 ? images.length - 3 : 0;

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

        {/* Vertical Thumbnails on Right */}
        {images.length > 1 && (
          <div className="carousel-thumbnails-vertical">
            {displayThumbnails.map((image, index) => (
              <div
                key={index}
                className={`thumbnail-vertical ${index === currentIndex ? "active" : ""}`}
                onClick={() => goToImage(index)}
              >
                <img
                  src={image}
                  alt={`${alt} thumbnail ${index + 1}`}
                />
                {index === 2 && remainingCount > 0 && (
                  <div className="thumbnail-counter-overlay">
                    <i className="fa-solid fa-camera"></i>
                    <span>{remainingCount}</span>
                  </div>
                )}
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