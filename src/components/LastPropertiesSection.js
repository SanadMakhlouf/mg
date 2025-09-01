import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LastPropertiesSection.css";
import PropertyCard from "./PropertyCard/PropertyCard";

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
