import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./PopularDevelopersSection.css";
import config from "../config";

const PopularDevelopersSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const [developers, setDevelopers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les blogs depuis l'API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/blogs?limit=6`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          // Transformer les données des blogs en format pour le carousel
          const formattedData = result.data.map((blog) => ({
            id: blog.id,
            name: blog.title.toUpperCase(),
            image: blog.image.startsWith("http")
              ? blog.image
              : `${config.API_URL.replace("/api/v1", "")}/storage/${
                  blog.image
                }`,
            description:
              blog.excerpt || "Explore this amazing location in Abu Dhabi",
            tag:
              blog.tags && blog.tags.length > 0
                ? blog.tags[0]
                : blog.category.toLowerCase().replace(/\s+/g, "-"),
          }));

          setDevelopers(formattedData);
        } else {
          // Si pas de données, utiliser des données par défaut
          setDevelopers(getDefaultDevelopers());
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
        // En cas d'erreur, utiliser des données par défaut
        setDevelopers(getDefaultDevelopers());
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Fonction pour obtenir des données par défaut en cas d'erreur
  const getDefaultDevelopers = () => [
    {
      id: 1,
      name: "SHEIKH ZAYED GRAND MOSQUE",
      image: "/hero-bg.jpg",
      description: "Discover the architectural marvel and spiritual heart of Abu Dhabi",
      tag: "sheikh-zayed",
    },
    {
      id: 2,
      name: "EMIRATES PALACE",
      image: "/hero-bgg.jpg",
      description: "Experience luxury at its finest in the heart of Abu Dhabi",
      tag: "emirates-palace",
    },
    {
      id: 3,
      name: "YAS ISLAND",
      image: "/here-bg2.jpg",
      description:
        "Home to Ferrari World, Yas Waterworld, and Warner Bros. World",
      tag: "yas-island",
    },
    {
      id: 4,
      name: "SAADIYAT ISLAND",
      image: "/hero-bg.jpg",
      description: "Cultural district featuring the Louvre Abu Dhabi",
      tag: "saadiyat-island",
    },
    {
      id: 5,
      name: "AL REEM ISLAND",
      image: "/hero-bgg.jpg",
      description: "Modern residential and commercial development in Abu Dhabi",
      tag: "al-reem-island",
    },
    {
      id: 6,
      name: "CORNICHE BEACH",
      image: "/here-bg2.jpg",
      description:
        "8 kilometers of pristine beachfront and recreational facilities",
      tag: "corniche-beach",
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

  const navigateToBlog = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  // Afficher un message de chargement
  if (loading) {
    return (
      <section className="popular-developers-section">
        <div className="developers-container">
          <div className="developers-header">
            <div className="header-content">
              <h2>
                LATEST <span className="text-gray">BLOGS</span> AND
                <br />
                NEWS
              </h2>
            </div>
          </div>
          <div className="loading-container">
            <div className="loading-spinner">
              <i className="fas fa-spinner fa-spin"></i>
              <p>Loading blogs...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Si aucun développeur n'est disponible, ne pas afficher la section
  if (developers.length === 0) {
    return null;
  }

  return (
    <section className="popular-developers-section">
      <div className="developers-container">
        <div className="developers-header">
          <div className="header-content">
            <h2>
              Latest <span className="text-gray">Blogs</span> and
              <br />
              News
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
                          <button
                            className="explore-btn"
                            onClick={() => navigateToBlog(developer.id)}
                          >
                            →
                          </button>
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
          <Link to="/blog" className="explore-more-btn">
            Read More Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PopularDevelopersSection;
