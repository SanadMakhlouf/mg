import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./OffPlanGrid.css";
import PropertyCard from "../PropertyCard/PropertyCard";
import config from "../../config";

const OffPlanGrid = ({ filterParams = {} }) => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        // Build query parameters
        const queryParams = new URLSearchParams();
        queryParams.append("category", "off-plans");

        // Add filter parameters if they exist
        if (filterParams) {
          if (filterParams.location && filterParams.location.trim() !== "") {
            queryParams.append("location", filterParams.location.trim());
          }

          if (filterParams.propertyType) {
            queryParams.append("type", filterParams.propertyType);
          }

          if (filterParams.minBathrooms) {
            queryParams.append("min_bathrooms", filterParams.minBathrooms);
          }

          if (filterParams.maxBathrooms) {
            queryParams.append("max_bathrooms", filterParams.maxBathrooms);
          }

          if (filterParams.minBedrooms) {
            queryParams.append("min_bedrooms", filterParams.minBedrooms);
          }

          if (filterParams.maxBedrooms) {
            queryParams.append("max_bedrooms", filterParams.maxBedrooms);
          }

          if (filterParams.minArea) {
            queryParams.append("min_area", filterParams.minArea);
          }

          if (filterParams.maxArea) {
            queryParams.append("max_area", filterParams.maxArea);
          }

          if (filterParams.minPrice) {
            queryParams.append("min_price", filterParams.minPrice);
          }

          if (filterParams.maxPrice) {
            queryParams.append("max_price", filterParams.maxPrice);
          }
        }

        // Use the new advanced search API for off-plan properties
        const apiUrl = `${config.API_URL}/properties/search/advanced?${queryParams.toString()}`;
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filterParams?.location,
    filterParams?.propertyType,
    filterParams?.minBathrooms,
    filterParams?.maxBathrooms,
    filterParams?.minBedrooms,
    filterParams?.maxBedrooms,
    filterParams?.minArea,
    filterParams?.maxArea,
    filterParams?.minPrice,
    filterParams?.maxPrice,
  ]);

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

  // Helper function to create SEO-friendly slug
  const createSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Helper function to get image URL
  const getImageUrl = (pictures) => {
    if (!pictures || pictures.length === 0) return "";
    return pictures[0].startsWith("http")
      ? pictures[0]
      : `${config.API_URL.replace("/api/v1", "")}/storage/${pictures[0]}`;
  };

  return (
    <div className="off-plan-projects-section">
      <h2 className="section-title">Off Plan Projects</h2>

      <div className="off-plan-featured-grid">
        {/* Grande carte à gauche */}
        {projects[0] && (
          <div
            className="off-plan-featured-card"
            onClick={() => navigate(`/off-plan/${projects[0].id}/${createSlug(projects[0].name)}`)}
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
                <p className="project-developer">
                  By: {projects[0].developer || "Developer Name"}
                </p>
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

        {/* Conteneur pour les cartes de droite */}
        <div className="off-plan-right-cards">
          {/* Carte en haut à droite */}
          {projects[1] && (
            <div
              className="off-plan-right-card"
              onClick={() => navigate(`/off-plan/${projects[1].id}/${createSlug(projects[1].name)}`)}
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
                  <p className="project-developer">
                    By: {projects[1].developer || "Developer Name"}
                  </p>
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

          {/* Cartes en bas à droite */}
          <div className="off-plan-bottom-cards">
            {projects.slice(2, 4).map((project) => (
              <div
                key={project.id}
                className="off-plan-small-card"
                onClick={() => navigate(`/off-plan/${project.id}/${createSlug(project.name)}`)}
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

      {/* Nouvelle section */}
      <div className="off-plan-second-grid">
        <div className="left-column">
          {/* Carte projet en haut */}
          {projects[4] && (
            <div
              className="project-card"
              onClick={() => navigate(`/off-plan/${projects[4].id}/${createSlug(projects[4].name)}`)}
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
                  <p className="project-developer">
                    By: {projects[4].developer || "Developer Name"}
                  </p>
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

          {/* PropertyCard en bas */}
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
      </div>

      {/* Grille de cartes 2x3 */}
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

export default OffPlanGrid;
