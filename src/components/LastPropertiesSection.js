import React from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LastPropertiesSection.css";
import PropertyCard from "./PropertyCard/PropertyCard";

const LastPropertiesSection = () => {
  const properties = [
    {
      id: "1",
      image: "/hero-bg.jpg",
      title: "OCEAN BREEZE VILLA",
      price: "3,281,888",
      beds: "5",
      baths: "5",
      sqft: "500",
      isHotDeal: true,
    },
    {
      id: "2",
      image: "/hero-bg2.jpg",
      title: "SKYLINE APARTMENT",
      price: "1,950,000",
      beds: "3",
      baths: "2",
      sqft: "320",
    },
    {
      id: "3",
      image: "/test.jpg",
      title: "DESERT OASIS VILLA",
      price: "4,500,000",
      beds: "6",
      baths: "7",
      sqft: "750",
      isHotDeal: true,
    },
    {
      id: "4",
      image: "/hero-bgg.jpg",
      title: "MARINA HEIGHTS",
      price: "2,800,000",
      beds: "4",
      baths: "3",
      sqft: "450",
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
        <Link to="/buy" className="view-all-btn">
          VIEW ALL PROPERTIES
        </Link>
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
