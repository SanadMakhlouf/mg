import React, { useState } from "react";
import "./PopularDevelopersSection.css";

const PopularDevelopersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const developers = [
    {
      id: 1,
      name: "SHEIKH ZAYED GRAND MOSQUE",
      image: "/hero-bg.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    },
    {
      id: 2,
      name: "EMIRATES PALACE",
      image: "/hero-bgg.jpg",
      description: "Experience luxury at its finest in the heart of Abu Dhabi",
    },
    {
      id: 3,
      name: "YAS ISLAND",
      image: "/here-bg2.jpg",
      description:
        "Home to Ferrari World, Yas Waterworld, and Warner Bros. World",
    },
    {
      id: 4,
      name: "SAADIYAT ISLAND",
      image: "/hero-bg.jpg",
      description: "Cultural district featuring the Louvre Abu Dhabi",
    },
    {
      id: 5,
      name: "AL REEM ISLAND",
      image: "/hero-bgg.jpg",
      description: "Modern residential and commercial development in Abu Dhabi",
    },
    {
      id: 6,
      name: "CORNICHE BEACH",
      image: "/here-bg2.jpg",
      description:
        "8 kilometers of pristine beachfront and recreational facilities",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % developers.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + developers.length) % developers.length
    );
  };

  return (
    <section className="popular-developers-section">
      <div className="developers-container">
        <div className="developers-header">
          <div className="header-content">
            <h2>
              POPULAR <span className="text-gray">DEVELOPER</span> IN
              <br />
              ABU DHABI
            </h2>
            <div className="carousel-controls-popular">
              <button onClick={prevSlide} className="control-btn prev">
                &#8249;
              </button>
              <button onClick={nextSlide} className="control-btn next">
                &#8250;
              </button>
            </div>
          </div>
        </div>

        <div className="developers-carousel">
          <div className="carousel-controls-popular">
            <button onClick={prevSlide} className="control-btn prev">
              &#8249;
            </button>
            <button onClick={nextSlide} className="control-btn next">
              &#8250;
            </button>
          </div>
          <div className="carousel-wrapper">
            {developers.map((developer, index) => {
              // Calculer la position relative par rapport au slide actif
              let position = index - currentSlide;
              if (position < 0) position += developers.length;

              return (
                <div
                  key={developer.id}
                  className={`developer-card ${
                    position === 0 ? "active" : ""
                  } position-${position}`}
                >
                  <div className="developer-image">
                    <img src={developer.image} alt={developer.name} />
                    {position === 0 && (
                      <div className="developer-info">
                        <div className="info-text">
                          <h3>{developer.name}</h3>
                          <p>{developer.description}</p>
                        </div>
                        <div className="info-action">
                          <button className="explore-btn">→</button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="explore-more">
          <button className="explore-more-btn">EXPLORE MORE AREAS</button>
        </div>
      </div>
    </section>
  );
};

export default PopularDevelopersSection;
