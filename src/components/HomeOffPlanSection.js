import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./HomeOffPlanSection.css";

const HomeOffPlanSection = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        
        const queryParams = new URLSearchParams();
        queryParams.append("category", "off-plans-resale");
        queryParams.append("limit", "4"); // Limit to 4 properties
        
        const apiUrl = `${config.API_URL}/properties/search/advanced?${queryParams.toString()}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          setProjects(result.data.slice(0, 4)); // Ensure only 4
        }
        } catch (err) {
        // Error fetching projects
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const getImageUrl = (pictures) => {
    if (!pictures || pictures.length === 0) return "/test.jpg";
    return pictures[0].startsWith("http")
      ? pictures[0]
      : `${config.API_URL.replace("/api/v1", "")}/storage/${pictures[0]}`;
  };

  const createSlug = (name) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  if (loading) {
    return (
      <div className="home-off-plan-section">
        <div className="container">
          <p>Loading properties...</p>
        </div>
      </div>
    );
  }

  if (projects.length === 0) {
    return null;
  }

  return (
    <div className="home-off-plan-section">
      <div className="container">
        <h2 className="section-title">Latest Properties</h2>
        
        <div className="home-properties-grid">
          {projects.map((project) => (
            <div
              key={project.id}
              className="home-property-card"
              onClick={() => {
                const slug = createSlug(project.name);
                navigate(`/property/${project.id}/${slug}`);
              }}
            >
              <div className="home-property-image">
                <img
                  src={getImageUrl(project.pictures)}
                  alt={project.name}
                />
                <div className="home-property-bookmark">
                  <i className="far fa-bookmark"></i>
                </div>
              </div>
              
              <div className="home-property-content">
                <h3 className="home-property-title">{project.name}</h3>
                {project.type && (
                  <p className="home-property-type">{project.type}</p>
                )}
                {project.location && (
                  <p className="home-property-location">
                    <i className="fa-solid fa-map-marker-alt"></i>
                    {project.location}
                  </p>
                )}
                {project.price && (
                  <p className="home-property-price">
                    From AED {parseFloat(project.price).toLocaleString()}
                  </p>
                )}
                <div className="home-property-details">
                  {project.bedrooms && (
                    <span>
                      <i className="fa-solid fa-bed"></i>
                      {project.bedrooms} Beds
                    </span>
                  )}
                  {project.bathrooms && (
                    <span>
                      <i className="fa-solid fa-bath"></i>
                      {project.bathrooms} Baths
                    </span>
                  )}
                  {project.area && (
                    <span>
                      <i className="fa-solid fa-ruler-combined"></i>
                      {project.area} sqft
                    </span>
                  )}
                </div>
                <button className="home-property-btn">
                  ENQUIRE NOW
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeOffPlanSection;

