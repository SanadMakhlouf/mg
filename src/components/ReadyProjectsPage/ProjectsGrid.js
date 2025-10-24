import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../config";
import "./ProjectsGrid.css";

const ProjectsGrid = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Use the new advanced search API for ready projects
        const response = await fetch(
          `${config.API_URL}/properties/search/advanced?category=ready-project&listing_type=sale`
        );

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

  // Section d'information sur la recherche de propriétés
  const findPropertyInfo = {
    title: "Find Proprety For your Fam!",
    description:
      "We are here to help you find your dream property with personalized service and expert advice. Our team is dedicated to understanding your needs and preferences.",
    contactInfo: [
      { icon: "/loca.png", text: "Office 55, Baynunah Tower 2, Al Hosn, Abu Dhabi" },
      { icon: "/ime.png", text: "info@meridiangroup.ae" },
      { icon: "/phone.png", text: "+971 50 607 030" },
      { icon: "/time.png", text: "Mon-Sat: 9am - 6pm" },
    ],
  };

  if (loading) {
    return (
      <div className="projects-section">
        <p>Loading projects...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="projects-section">
        <p>{error}</p>
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="projects-section">
        <p>No projects found</p>
      </div>
    );
  }

  // Fonction pour générer une carte de projet
  const ProjectCard = ({ project, size = "" }) => {
    const handleClick = () => {
      const slug = project.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      navigate(`/property/${project.id}/${slug}`);
    };

    return (
      <div className={`project-card ${size}`} onClick={handleClick}>
        <div
          className="project-image"
          style={{
            backgroundImage: `url(${project.pictures[0]})`,
          }}
        >
          <div className="play-button">
            <span>▶</span>
          </div>
          <div className="project-info">
            <h3>{project.name}</h3>
            <p>{project.location}</p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="projects-section">
      <h2 className="section-title">READY Projects</h2>

      <div className="projects-grid">
        {/* Première rangée */}
        <div className="top-grid">
          <div className="projects-cards">
            {projects.slice(0, 3).map((project, index) => (
              <ProjectCard
                key={project.id}
                project={project}
                size={index === 2 ? "large" : ""}
              />
            ))}
          </div>

          <div className="find-property-card">
            <span className="keep-close">KEEP CLOSE AND</span>
            <h3>{findPropertyInfo.title}</h3>
            <p>{findPropertyInfo.description}</p>
            <div className="contact-info">
              {findPropertyInfo.contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <img src={info.icon} alt={info.text} />
                  <p>{info.text}</p>
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <button className="contact-btn">CONTACT US</button>
          </div>
        </div>

        {/* Deuxième rangée - Petites cartes */}
        <div className="grid-row small-cards">
          {projects.slice(3, 6).map((project) => (
            <ProjectCard key={project.id} project={project} size="small" />
          ))}
        </div>

        {/* Troisième rangée - Grande et moyenne cartes */}
        <div className="grid-row">
          {projects.slice(6, 8).map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              size={index === 0 ? "large" : "medium"}
            />
          ))}
        </div>

        {/* Quatrième rangée - Grande carte pleine largeur */}
        {projects[8] && (
          <div className="grid-row">
            <ProjectCard project={projects[8]} size="large full-width" />
          </div>
        )}

        {/* Cinquième rangée - Petites cartes */}
        <div className="grid-row small-cards">
          {projects.slice(9, 12).map((project) => (
            <ProjectCard key={project.id} project={project} size="small" />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
