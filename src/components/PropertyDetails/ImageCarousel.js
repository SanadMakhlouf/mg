import React, { useState } from "react";
import "./ImageCarousel.css";

const ImageCarousel = ({ images, alt }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  if (!images || images.length === 0) {
    return (
      <div className="image-carousel">
        <div className="carousel-main">
          <img src="/test.jpg" alt={alt} className="main-image" />
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
          className="main-image"
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
    </div>
  );
};

export default ImageCarousel;
