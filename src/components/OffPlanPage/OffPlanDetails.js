import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OffPlanProjects.css"; // reuse styling if available
import config from "../../config";
import ImageCarousel from "../PropertyDetails/ImageCarousel";
import GetInTouchSection from "../GetInTouchSection";
import MapSection from "../MapSection";
import SEO from "../SEO";

const OffPlanDetails = () => {
  const { id, name } = useParams();
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

  // Force solid navbar background on this page only
  useEffect(() => {
    document.body.classList.add("page-offplan-details");
    return () => {
      document.body.classList.remove("page-offplan-details");
    };
  }, []);

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
    <>
      <SEO
        title={`${project.name} - Off-Plan Property in ${project.location} | Meridian Group`}
        description={`${project.name} off-plan property in ${project.location}. ${project.price ? `Starting from ${parseFloat(project.price).toLocaleString()} AED.` : ''} ${project.description || 'Premium off-plan development by Meridian Group.'}`}
        keywords={`${project.name}, off-plan property, ${project.location}, Abu Dhabi real estate, pre-construction, Meridian Group, property investment`}
        url={`https://meridiangroup.ae/off-plan/${id}/${name}`}
        image={images && images.length > 0 ? images[0] : 'https://meridiangroup.ae/og-image.jpg'}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": project.name,
          "description": project.description || `${project.name} off-plan property in ${project.location}`,
          "url": `https://meridiangroup.ae/off-plan/${id}/${name}`,
          "image": images || [],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": project.location,
            "addressRegion": "Abu Dhabi",
            "addressCountry": "AE"
          },
          "offers": project.price ? {
            "@type": "Offer",
            "price": project.price,
            "priceCurrency": "AED",
            "availability": "https://schema.org/PreOrder"
          } : undefined,
          "additionalProperty": "Off-Plan",
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Meridian Group",
            "url": "https://meridiangroup.ae"
          }
        }}
      />
      <div className="off-plan-projects-section">
      <div className="property-details-container">
        <div className="property-details-header">
          <h1>{project.name}</h1>
          <div className="property-location-details">
            <i className="fa-solid fa-location-dot"></i> {project.location}
          </div>
        </div>

        <div className="property-main-content">
          {/* Left Column - Main Content */}
          <div className="property-main-left">
            <div className="property-images">
              <ImageCarousel images={images} alt={project.name} />
            </div>

            <div className="property-price-section">
              <div className="property-price-details">
                <h2>
                  {parseFloat(project.price) > 0 
                    ? `${parseFloat(project.price).toLocaleString()} AED`
                    : 'Price on Request'
                  }
                </h2>
                <div className="property-action-buttons">
                  <button className="save-btn">
                    <i className="fa-solid fa-heart"></i>
                  </button>
                  <button className="share-btn">
                    <i className="fa-solid fa-share"></i>
                  </button>
                </div>
              </div>
              
              <div className="property-address">
                <i className="fa-solid fa-location-dot"></i>
                {project.location}
              </div>

              <div className="property-features">
                <div className="feature-item">
                  <i className="fa-solid fa-bed"></i>
                  <span>{project.bedrooms || 'N/A'} Bedrooms</span>
                </div>
                <div className="feature-item">
                  <i className="fa-solid fa-bath"></i>
                  <span>{project.bathrooms || 'N/A'} Bathrooms</span>
                </div>
                <div className="feature-item">
                  <i className="fa-solid fa-ruler-combined"></i>
                  <span>{project.area || 'N/A'} sq ft</span>
                </div>
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: project.description
                    ? project.description
                        .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
                        .replace(/<br\s*\/?>/gi, '<br>')
                        .replace(/&amp;/g, '&')
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, ' ')
                        .replace(/&lt;/g, '<')
                        .replace(/&gt;/g, '>')
                        .replace(/\r\n/g, '<br>')
                        .replace(/\n/g, '<br>')
                    : `Beautiful ${project.type} located in ${project.location}. This property features ${project.bedrooms} bedrooms and ${project.bathrooms} bathrooms with a total area of ${project.area} square feet.`
                }}
              />
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
                  <i className="fa-solid fa-download"></i>
                  Download Brochure (PDF)
                </a>
              </div>
            )}
          </div>

          {/* Right Column - Sidebar */}
          <div className="property-sidebar">
            {/* Sidebar Image Gallery */}
            {images.length > 0 && (
              <div className="sidebar-image-gallery">
                {images.slice(0, 3).map((image, index) => (
                  <div key={index} className="sidebar-thumbnail-wrapper">
                    <img
                      src={image}
                      alt={`${project.name} - ${index + 1}`}
                      className="sidebar-thumbnail"
                    />
                    {index === 2 && images.length > 3 && (
                      <div className="thumbnail-overlay total-count-overlay">
                        <i className="fa-solid fa-camera"></i> {images.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Agent Section */}
            <div className="agent-section">
              <h3>Contact Agent</h3>
              <div className="agent-info">
                <div className="agent-avatar">
                  <img 
                    src={project.agent?.photo_url || "/Avatar.png"} 
                    alt={project.agent?.name || "Agent"} 
                  />
                </div>
                <div className="agent-details">
                  <h4>{project.agent?.name || "Meridian Group"}</h4>
                  <p>{project.agent?.job_title || "Real Estate Agent"}</p>
                  <div className="agent-contact">
                    <p><i className="fa-solid fa-phone"></i> +971 586830401</p>
                    <p><i className="fa-solid fa-envelope"></i> info@meridiangroup.ae</p>
                  </div>
                </div>
              </div>
              <div className="agent-contact-buttons">
                <a href="mailto:info@meridiangroup.ae" className="email-btn">
                  <i className="fa-solid fa-envelope"></i>
                  Email
                </a>
                <a href="tel:+971586830401" className="call-btn">
                  <i className="fa-solid fa-phone"></i>
                  Call
                </a>
                <a href="https://wa.me/971586830401" target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                  <i className="fa-brands fa-whatsapp"></i>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <GetInTouchSection />
      <MapSection />
    </div>
    </>
  );
};

export default OffPlanDetails;
