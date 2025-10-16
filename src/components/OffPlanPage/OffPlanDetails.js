import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OffPlanProjects.css"; // reuse styling if available
import config from "../../config";
import ImageCarousel from "../PropertyDetails/ImageCarousel";
import GetInTouchSection from "../GetInTouchSection";
import MapSection from "../MapSection";

const OffPlanDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.API_URL}/properties/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if ((data.success || data.status === "success") && data.data) {
          setProject(data.data);
        } else {
          setError("Project not found");
          setTimeout(() => navigate("/off-plan-properties"), 2000);
        }
      } catch (err) {
        setError(`Error fetching project details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, [id, navigate]);

  const images = project?.pictures?.length ? project.pictures : ["/test.jpg"];
  // Prefer explicit pdf_url from API; otherwise fall back to brochure field if present
  const brochureUrl = (() => {
    if (project?.pdf_url) {
      return project.pdf_url.startsWith("http")
        ? project.pdf_url
        : `${config.API_URL.replace("/api/v1", "")}/storage/${project.pdf_url}`;
    }
    if (project?.brochure) {
      return project.brochure.startsWith("http")
        ? project.brochure
        : `${config.API_URL.replace("/api/v1", "")}/storage/${
            project.brochure
          }`;
    }
    return null;
  })();

  if (loading) {
    return (
      <div className="off-plan-projects-section">
        <p>Loading...</p>
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

  if (!project) return null;

  return (
    <div className="off-plan-projects-section">
      <div className="property-details-header">
        <h1>{project.name}</h1>
        <div className="property-location-details">
          <i className="fa-solid fa-location-dot"></i> {project.location}
        </div>
      </div>

      <div className="property-main-content">
        <div className="property-images">
          <ImageCarousel images={images} alt={project.name} />
        </div>
        <div className="property-info-details">
          <div className="property-price-details">
            {project.price && <h2>{project.price} AED</h2>}
          </div>
          <div className="property-description">
            <h3>Description</h3>
            <p>{project.description || "No description available."}</p>
          </div>

          {brochureUrl && (
            <div className="property-brochure">
              <a
                href={brochureUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-agent-btn"
                download
              >
                Download Brochure (PDF)
              </a>
            </div>
          )}
        </div>
      </div>

      <GetInTouchSection />
      <MapSection />
    </div>
  );
};

export default OffPlanDetails;
