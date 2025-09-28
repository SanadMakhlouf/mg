import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./LastPropertiesSection.css";
import PropertyCard from "./PropertyCard/PropertyCard";
import config from "../config";

const LastPropertiesSection = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch(`${config.API_URL}/properties`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          // Filtrer pour obtenir uniquement les propriétés de type "ready-project"
          const readyProjects = data.data.filter(
            (prop) => prop.category === "ready-project"
          );

          // S'il n'y a pas assez de ready-projects, prendre aussi d'autres propriétés
          let projectsToShow =
            readyProjects.length >= 6 ? readyProjects : data.data;

          // Prendre 6 projets au hasard
          const randomProjects = shuffleArray(projectsToShow).slice(0, 6);
          setProperties(randomProjects);
        } else {
          setError("Failed to fetch properties data");
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setError(`Error fetching properties: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  // Fonction pour mélanger un tableau (algorithme de Fisher-Yates)
  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };

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
        <h2>FEATURED PROPERTIES</h2>
        <Link to="/buy" className="view-all-btn">
          VIEW ALL PROPERTIES
        </Link>
      </div>
      <div className="carousel-container">
        {loading ? (
          <div className="loading-container">
            <p>Loading properties...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <p>{error}</p>
          </div>
        ) : properties.length > 0 ? (
          <Slider {...settings}>
            {properties.map((property, index) => (
              <PropertyCard
                key={property.id || index}
                id={property.id}
                image={
                  property.pictures && property.pictures.length > 0
                    ? `${config.API_URL.replace("/api/v1", "")}/storage/${
                        property.pictures[0]
                      }`
                    : "/test.jpg"
                }
                title={property.name || "PROPERTY"}
                price={
                  property.price ? `${property.price}` : "Contact for price"
                }
                beds={property.bedrooms || "N/A"}
                baths={property.bathrooms || "N/A"}
                sqft={property.area || "N/A"}
                location={property.location || "Dubai, UAE"}
                isHotDeal={property.category === "off-plans"}
              />
            ))}
          </Slider>
        ) : (
          <div className="no-properties-message">
            <p>No properties available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default LastPropertiesSection;
