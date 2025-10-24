import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OffPlanResaleGrid.css";
import ds from "../../assets/off-plans/ds.png";
import PropertyCard from "../PropertyCard/PropertyCard";
import config from "../../config";

const OffPlanResaleGrid = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Clean URL without listing_type parameter
        const apiUrl = `${config.API_URL}/properties/search/advanced?category=off-plans-resale`;
        console.log('Fetching from:', apiUrl); // Debug log
        
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setProjects(result.data);
        } else {
          setError("Failed to fetch projects");
        }
      } catch (err) {
        setError("Error fetching projects: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return (
      <div className="off-plan-projects-section">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="off-plan-projects-section">
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="off-plan-projects-section">
        <p>No projects found</p>
      </div>
    );
  }

  const getImageUrl = (pictures) => {
    if (!pictures || pictures.length === 0) return "";
    return pictures[0].startsWith("http")
      ? pictures[0]
      : `${config.API_URL.replace("/api/v1", "")}/storage/${pictures[0]}`;
  };

  return (
    <div className="off-plan-projects-section">
      <h2 className="section-title">OFF PLAN RESALE PROJECTS</h2>

      <div className="off-plan-featured-grid">
        {projects[0] && (
          <div
            className="off-plan-featured-card"
            onClick={() => {
              const slug = projects[0].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              navigate(`/property/${projects[0].id}/${slug}`);
            }}
            style={{ cursor: "pointer" }}
          >
            <div className="off-plan-image-container">
              <img
                src={getImageUrl(projects[0].pictures)}
                alt={projects[0].name}
                className="off-plan-image"
              />
              <div
                className="bookmark-icon"
                onClick={(e) => e.stopPropagation()}
              >
                <i className="far fa-bookmark"></i>
              </div>
              <div className="off-plan-content">
                <h3 className="project-title">{projects[0].name}</h3>
                <h4 className="project-subtitle">{projects[0].name}</h4>
                
                <p className="project-type">{projects[0].type}</p>
                <p className="project-location">{projects[0].location}</p>
                <button
                  className="enquire-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    const slug = projects[0].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    navigate(`/property/${projects[0].id}/${slug}`);
                  }}
                >
                  ENQUIRE NOW
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="off-plan-right-cards">
          {projects[1] && (
            <div
              className="off-plan-right-card"
              onClick={() => {
                const slug = projects[1].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                navigate(`/property/${projects[1].id}/${slug}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="off-plan-image-container">
                <img
                  src={getImageUrl(projects[1].pictures)}
                  alt={projects[1].name}
                  className="off-plan-image"
                />
                <div
                  className="bookmark-icon"
                  onClick={(e) => e.stopPropagation()}
                >
                  <i className="far fa-bookmark"></i>
                </div>
                <div className="off-plan-content">
                  <h3 className="project-title">{projects[1].name}</h3>
                 
                  <p className="project-type">{projects[1].type}</p>
                  <p className="project-location">{projects[1].location}</p>
                  {projects[1].price && (
                    <p className="project-price">
                      From AED {parseFloat(projects[1].price).toLocaleString()}
                    </p>
                  )}
                  <div className="project-details">
                    {projects[1].bedrooms && (
                      <span>
                        <i className="fa-solid fa-bed"></i>{" "}
                        {projects[1].bedrooms} Beds
                      </span>
                    )}
                    {projects[1].bathrooms && (
                      <span>
                        <i className="fa-solid fa-bath"></i>{" "}
                        {projects[1].bathrooms} Baths
                      </span>
                    )}
                    {projects[1].area && (
                      <span>
                        <i className="fa-solid fa-ruler-combined"></i>{" "}
                        {projects[1].area} sqft
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="off-plan-bottom-cards">
            {projects.slice(2, 4).map((project) => (
              <div
                key={project.id}
                className="off-plan-small-card"
                onClick={() => {
                  const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                  navigate(`/property/${project.id}/${slug}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="off-plan-image-container">
                  <img
                    src={getImageUrl(project.pictures)}
                    alt={project.name}
                    className="off-plan-image"
                  />
                  <div
                    className="bookmark-icon"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <i className="far fa-bookmark"></i>
                  </div>
                  <div className="off-plan-content small">
                    <h4 className="project-title-small">{project.name}</h4>
                    <p className="project-location-small">
                      <i className="fa-solid fa-location-dot"></i>{" "}
                      {project.location}
                    </p>
                    {project.price && (
                      <p className="project-price-small">
                        AED {parseFloat(project.price).toLocaleString()}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="off-plan-second-grid">
        <div className="left-column">
          {projects[4] && (
            <div
              className="project-card"
              onClick={() => {
                const slug = projects[4].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                navigate(`/property/${projects[4].id}/${slug}`);
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="off-plan-image-container">
                <img
                  src={getImageUrl(projects[4].pictures)}
                  alt={projects[4].name}
                  className="off-plan-image"
                />
                <div className="off-plan-content">
                  <h3 className="project-title">{projects[4].name}</h3>
                  <h4 className="project-subtitle">{projects[4].name}</h4>
                 
                  <p className="project-type">{projects[4].type}</p>
                  <p className="project-location">{projects[4].location}</p>
                  <button
                    className="enquire-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      const slug = projects[4].name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                      navigate(`/property/${projects[4].id}/${slug}`);
                    }}
                  >
                    LEARN MORE
                  </button>
                </div>
              </div>
            </div>
          )}

          {projects[5] && (
            <PropertyCard
              id={projects[5].id}
              image={getImageUrl(projects[5].pictures)}
              title={projects[5].name}
              price={projects[5].price}
              beds={projects[5].bedrooms}
              baths={projects[5].bathrooms}
              sqft={projects[5].area}
              location={projects[5].location}
            />
          )}
        </div>

        <div className="right-column">
          <img src={ds} alt="Development" className="full-height-image" />
        </div>
      </div>

      <div className="property-cards-grid">
        {projects.slice(6, 12).map((project) => (
          <PropertyCard
            key={project.id}
            id={project.id}
            image={getImageUrl(project.pictures)}
            title={project.name}
            price={project.price}
            beds={project.bedrooms}
            baths={project.bathrooms}
            sqft={project.area}
            location={project.location}
          />
        ))}
      </div>
    </div>
  );
};

export default OffPlanResaleGrid;
