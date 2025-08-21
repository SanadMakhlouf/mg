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

        <div
          className="developers-carousel"
          style={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              left: "20px",
              zIndex: 10,
            }}
          >
            <button
              onClick={prevSlide}
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                backgroundColor: "#800020",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#600018";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#800020";
              }}
            >
              &#8249;
            </button>
          </div>

          <div
            style={{
              position: "absolute",
              top: "50%",
              transform: "translateY(-50%)",
              right: "20px",
              zIndex: 10,
            }}
          >
            <button
              onClick={nextSlide}
              style={{
                width: "40px",
                height: "40px",
                border: "none",
                backgroundColor: "#800020",
                color: "white",
                fontSize: "24px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "50%",
                transition: "background-color 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#600018";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#800020";
              }}
            >
              &#8250;
            </button>
          </div>

          <div
            className="carousel-wrapper"
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              width: "100%",
              position: "relative",
            }}
          >
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
                  style={{
                    position: "absolute",
                    left: "50%",
                    transform:
                      position === 0
                        ? "translateX(-50%) scale(1)"
                        : position === 1
                        ? "translateX(calc(-50% + 320px)) scale(0.9)"
                        : position === 2
                        ? "translateX(calc(-50% + 490px)) scale(0.9)"
                        : position === 3
                        ? "translateX(calc(-50% - 490px)) scale(0.9)"
                        : "translateX(calc(-50% - 320px)) scale(0.9)",
                    opacity: position === 0 ? 1 : 0.7,
                    zIndex: position === 0 ? 2 : 1,
                  }}
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
