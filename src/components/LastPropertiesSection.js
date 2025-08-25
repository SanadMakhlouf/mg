import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LastPropertiesSection.css";

const PropertyCard = ({ image, title, price, beds, baths, sqft }) => {
  return (
    <div className="property-card">
      <img src={image} alt={title} className="property-image" />
      <div className="property-location">
        {" "}
        <i className="fa-solid fa-location-dot"></i> Al Danah - Abou Dabi -
        Émirats arabes unis
      </div>
      <div className="property-details">
        <div className="property-info">
          <div className="info-item-l">
            <span>
              {" "}
              {beds} <i className="fa-solid fa-bed"></i>{" "}
            </span>
            <span style={{ color: "#A8A8A8" }}>Beds</span>
          </div>
          <div className="info-item-l">
            <span>
              {baths} <i className="fa-solid fa-bath"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Baths</span>
          </div>
          <div className="info-item-l">
            <span>
              {sqft} <i className="fa-solid fa-ruler-combined"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Square Ft</span>
          </div>
        </div>
        <div className="property-title-price">
          <h3 className="property-title">{title}</h3>
          <div className="price-container">
            <p className="property-price">{price} AED</p>
            <button className="view-details-btn">
              <i class="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const LastPropertiesSection = () => {
  const properties = [
    {
      image: "/hero-bg.jpg",
      title: "OCEAN BREEZE VILLA",
      price: "3,281,888",
      beds: "5",
      baths: "5",
      sqft: "500",
    },
    {
      image: "/hero-bg2.jpg",
      title: "OCEAN BREEZE VILLA",
      price: "3,281,888",
      beds: "5",
      baths: "5",
      sqft: "500",
    },
    {
      image: "/test.jpg",
      title: "OCEAN BREEZE VILLA",
      price: "3,281,888",
      beds: "5",
      baths: "5",
      sqft: "500",
    },
    {
      image: "/hero-bgg.jpg",
      title: "OCEAN BREEZE VILLA",
      price: "3,281,888",
      beds: "5",
      baths: "5",
      sqft: "500",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: "20px",
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerMode: true,
          centerPadding: "20px",
        },
      },
    ],
  };

  return (
    <section className="last-properties-section">
      <div className="last-properties-header">
        <h2>LAST PROPRETIES.</h2>
        <button className="view-all-btn">VIEW ALL PROPERTIES</button>
      </div>
      <div className="carousel-container">
        <Slider {...settings}>
          {properties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default LastPropertiesSection;
