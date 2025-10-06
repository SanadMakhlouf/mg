import React, { useState, useEffect } from "react";
import "./OffPlanGrid.css";
import ds from "../../assets/off-plans/ds.png";
import PropertyCard from "../PropertyCard/PropertyCard";
import config from "../../config";

const OffPlanGrid = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${config.API_URL}/ready-projects/category/off-plans`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "success" && result.data && result.data.data) {
          setProjects(result.data.data);
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

  // Helper function to get image URL
  const getImageUrl = (pictures) => {
    if (!pictures || pictures.length === 0) return "";
    return pictures[0];
  };

  return (
    <div className="off-plan-projects-section">
      <h2 className="section-title">OFF PLAN PROJECTS</h2>

      <div className="off-plan-featured-grid">
        {/* Grande carte à gauche */}
        {projects[0] && (
          <div className="off-plan-featured-card">
            <div className="off-plan-image-container">
              <img
                src={getImageUrl(projects[0].pictures)}
                alt={projects[0].name}
                className="off-plan-image"
              />
              <div className="bookmark-icon">
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
                <button className="enquire-btn">ENQUIRE NOW</button>
              </div>
            </div>
          </div>
        )}

        {/* Conteneur pour les cartes de droite */}
        <div className="off-plan-right-cards">
          {/* Carte en haut à droite */}
          {projects[1] && (
            <div className="off-plan-right-card">
              <div className="off-plan-image-container">
                <img
                  src={getImageUrl(projects[1].pictures)}
                  alt={projects[1].name}
                  className="off-plan-image"
                />
                <div className="bookmark-icon">
                  <i className="far fa-bookmark"></i>
                </div>
                <div className="off-plan-content">
                  <h3 className="project-title">{projects[1].name}</h3>
                  <p className="project-type">{projects[1].type}</p>
                  <p className="project-location">{projects[1].location}</p>
                </div>
              </div>
            </div>
          )}

          {/* Cartes en bas à droite */}
          <div className="off-plan-bottom-cards">
            {projects.slice(2, 4).map((project) => (
              <div key={project.id} className="off-plan-small-card">
                <div className="off-plan-image-container">
                  <img
                    src={getImageUrl(project.pictures)}
                    alt={project.name}
                    className="off-plan-image"
                  />
                  <div className="bookmark-icon">
                    <i className="far fa-bookmark"></i>
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
            <div className="project-card">
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
                  <button className="enquire-btn">LEARN MORE</button>
                </div>
              </div>
            </div>
          )}

          {/* PropertyCard en bas */}
          {projects[5] && (
            <PropertyCard
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

        {/* Image à droite */}
        <div className="right-column">
          <img src={ds} alt="Development" className="full-height-image" />
        </div>
      </div>

      {/* Grille de cartes 2x3 */}
      <div className="property-cards-grid">
        {projects.slice(6, 12).map((project) => (
          <PropertyCard
            key={project.id}
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
