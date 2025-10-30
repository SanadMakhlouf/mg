import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";
import config from "../../config";
import ImageCarousel from "./ImageCarousel";
import SEO from "../SEO";
import ShareButtons from "../ShareButtons";
import ScheduleViewingPopup from "../ScheduleViewingPopup";

const PropertyDetails = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showScheduleViewing, setShowScheduleViewing] = useState(false);

  // Default agent data if no agent is assigned
  const defaultAgent = {
    name: "Meridian Group",
    description:
      "Contact our experienced real estate professionals for personalized assistance with your property needs.",
    location: "Al Hisn, Baynunah Tower 2, Office 402, Abu Dhabi",
    phone: "+971 586830401",
    email: "info@meridiangroup.ae",
    image: "/logo192.png",
  };

  // Default amenities lists based on property type
  const defaultAmenities = {
    Apartment: ["Balcony", "Gym", "Pool", "24/7 Security", "Parking"],
    Villa: [
      "Swimming Pool",
      "Garden",
      "Smart Home",
      "Security System",
      "Parking",
    ],
    House: ["Garden", "Parking", "Security System"],
    Land: ["Utilities", "Road Access"],
    default: ["Parking", "Security"],
  };

  useEffect(() => {
    const fetchPropertyDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${config.API_URL}/properties/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setProperty(data.data);

          // If an agent is associated, fetch their details
          if (data.data.agent?.id) {
            try {
              const agentResponse = await fetch(
                `${config.API_URL}/agents/${data.data.agent.id}`
              );

              if (agentResponse.ok) {
                const agentData = await agentResponse.json();
                if (agentData.status === "success" && agentData.data) {
                  const socialMedia = agentData.data.social_media || {};
                  setAgentDetails({
                    ...agentData.data,
                    social_media: socialMedia,
                  });
                }
              }
            } catch (err) {
              console.error("Error fetching agent details:", err);
            }
          }
        } else {
          setError("Property not found");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        console.error("Error fetching property details:", err);
        setError(`Error fetching property details: ${err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchPropertyDetails();
  }, [id, navigate]);

  // Force solid navbar background on this page only
  useEffect(() => {
    document.body.classList.add("page-property-details");
    return () => {
      document.body.classList.remove("page-property-details");
    };
  }, []);

  if (loading) {
    return (
      <div className="property-details-container loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="property-details-container">
        <div className="property-not-found">
          <h2>Property Not Found</h2>
          <p>{error}</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details-container">
        <div className="property-not-found">
          <h2>Property Not Found</h2>
          <p>The property you are looking for does not exist or has been removed.</p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  // Determine if it's a "hot deal" based on category
  const isHotDeal = property.category === "off-plan";

  // Get default amenities based on property type
  const amenities = defaultAmenities[property.type] || defaultAmenities.default;

  // Create default agent if none is provided
  const agent = property.agent
    ? {
        name: property.agent.name || "Meridian Group",
        phone: property.agent.phone || "",
        email: property.agent.email || "",
        image: property.agent.photo_url || "/logo192.png",
        job_title: property.agent.job_title || "",
        social_media: agentDetails?.social_media || {},
        has_contact_info: !!(property.agent.phone || property.agent.email),
      }
    : defaultAgent;

  // Prepare images for carousel
  const propertyImages =
    property.pictures && property.pictures.length > 0
      ? property.pictures
      : ["/test.jpg"];

  // Brochure URL logic
  const brochureUrl = (() => {
    if (property?.pdf_url) {
      return property.pdf_url.startsWith("http")
        ? property.pdf_url
        : `${config.API_URL.replace("/api/v1", "")}/storage/${property.pdf_url}`;
    }
    if (property?.brochure) {
      return property.brochure.startsWith("http")
        ? property.brochure
        : `${config.API_URL.replace("/api/v1", "")}/storage/${property.brochure}`;
    }
    return null;
  })();

  return (
    <>
      <SEO
        title={`${property.name} - Property in ${property.location} | Meridian Group`}
        description={`${property.name} property in ${property.location}. ${property.price ? `Starting from ${parseFloat(property.price).toLocaleString()} AED.` : ''} ${property.description || 'Premium property by Meridian Group.'}`}
        keywords={`${property.name}, property, ${property.location}, Abu Dhabi real estate, Meridian Group, property investment`}
        url={`https://meridiangroup.ae/property/${id}/${name}`}
        image={propertyImages && propertyImages.length > 0 ? propertyImages[0] : 'https://meridiangroup.ae/og-image.jpg'}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": property.name,
          "description": property.description || `${property.name} property in ${property.location}`,
          "url": `https://meridiangroup.ae/property/${id}/${name}`,
          "image": propertyImages || [],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": property.location,
            "addressRegion": "Abu Dhabi",
            "addressCountry": "AE"
          },
          "offers": property.price ? {
            "@type": "Offer",
            "price": property.price,
            "priceCurrency": "AED"
          } : undefined,
          "provider": {
            "@type": "RealEstateAgent",
            "name": "Meridian Group",
            "url": "https://meridiangroup.ae"
          }
        }}
      />
      <div className="property-details-page">
        <div className="property-details-container">
          {/* Breadcrumb */}
          <button className="back-to-search" onClick={() => navigate(-1)}>
            <i className="fa-solid fa-arrow-left"></i>
            Back to Search
          </button>

          {/* Image Gallery Section - Bayut Style */}
          <div className="property-image-section">
            <div className="main-image-container">
              <ImageCarousel images={propertyImages} alt={property.name} />
              {isHotDeal && (
                <div className="hot-deal-badge-details">HOT DEAL</div>
              )}
              {/* Overlay buttons */}
              <button className="image-overlay-btn map-btn" onClick={() => navigate("/contact")}>
                <i className="fa-solid fa-map-pin"></i>
                <span>Map</span>
              </button>
              <button 
                className="image-overlay-btn video-btn" 
                onClick={() => setShowScheduleViewing(true)}
              >
                <i className="fa-solid fa-video"></i>
                <span>Request video</span>
              </button>
            </div>
          </div>

          {/* Price and Key Info Section */}
          <div className="property-price-header">
            <div className="price-header-left">
              <h1 className="property-price-large">
                {parseFloat(property.price) > 0 
                  ? `${parseFloat(property.price).toLocaleString()} AED`
                  : 'Price on Request'
                }
              </h1>
              <p className="property-full-address">
                {property.name}, {property.location}
              </p>
              <div className="property-key-stats">
                <div className="stat-item">
                  <i className="fa-solid fa-bed"></i>
                  <span>{property.bedrooms || 0} Beds</span>
                </div>
                <div className="stat-item">
                  <i className="fa-solid fa-bath"></i>
                  <span>{property.bathrooms || 0} Baths</span>
                </div>
                <div className="stat-item">
                  <i className="fa-solid fa-ruler-combined"></i>
                  <span>{parseFloat(property.area) > 0 ? `${property.area} sqft` : 'Area TBD'}</span>
                </div>
              </div>
            </div>
            <div className="price-header-right">
              <ShareButtons 
                propertyId={property.id}
                propertyName={property.name}
                propertyUrl={window.location.href}
              />
            </div>
          </div>

          {/* Two Column Layout */}
          <div className="property-content-layout">
            {/* Left Column - Main Content */}
            <div className="property-main-content-left">
              {/* Property Type/Features */}
              <div className="property-type-headline">
                {property.bedrooms && property.bedrooms > 0 && (
                  <span>{property.bedrooms}BR</span>
                )}
                {property.type && <span>{property.type}</span>}
                {property.category && <span>{property.category}</span>}
              </div>

              {/* Description */}
              <div className="property-description-section">
                <div 
                  className="description-text"
                  dangerouslySetInnerHTML={{
                    __html: property.description 
                      ? property.description
                          .replace(/&amp;lt;/g, '<')
                          .replace(/&amp;gt;/g, '>')
                          .replace(/&amp;amp;/g, '&')
                          .replace(/&amp;quot;/g, '"')
                          .replace(/&amp;#039;/g, "'")
                          .replace(/&amp;nbsp;/g, ' ')
                          .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
                          .replace(/<br\s*\/?>/gi, '<br>')
                          .replace(/&amp;lt;br\s*\/?&amp;gt;/gi, '<br>')
                          .replace(/&amp;/g, '&')
                          .replace(/&quot;/g, '"')
                          .replace(/&#39;/g, "'")
                          .replace(/&nbsp;/g, ' ')
                          .replace(/&lt;/g, '<')
                          .replace(/&gt;/g, '>')
                      : `Beautiful ${property.type} located in ${property.location}. This property features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms with a total area of ${property.area} square feet.`
                  }}
                />
              </div>

              {/* Property Information Table */}
              <div className="property-info-table">
                <h3>Property Information</h3>
                <div className="info-table">
                  <div className="info-row">
                    <span className="info-label">Type</span>
                    <span className="info-value">{property.type || "Property"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Purpose</span>
                    <span className="info-value">{property.category === "rental" ? "For Rent" : "For Sale"}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Reference no.</span>
                    <span className="info-value">MG-{property.id}</span>
                  </div>
                  {property.permit_number && (
                    <div className="info-row">
                      <span className="info-label">Permit</span>
                      <span className="info-value">{property.permit_number}</span>
                    </div>
                  )}
                  <div className="info-row">
                    <span className="info-label">Location</span>
                    <span className="info-value">{property.location}</span>
                  </div>
                  {property.bedrooms && (
                    <div className="info-row">
                      <span className="info-label">Bedrooms</span>
                      <span className="info-value">{property.bedrooms}</span>
                    </div>
                  )}
                  {property.bathrooms && (
                    <div className="info-row">
                      <span className="info-label">Bathrooms</span>
                      <span className="info-value">{property.bathrooms}</span>
                    </div>
                  )}
                  {property.area && (
                    <div className="info-row">
                      <span className="info-label">Area</span>
                      <span className="info-value">{property.area} sqft</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Brochure Download */}
              {brochureUrl && (
                <div className="property-brochure-section">
                  <a
                    href={brochureUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="brochure-download-btn"
                    download
                  >
                    <i className="fa-solid fa-download"></i>
                    Download Brochure (PDF)
                  </a>
                </div>
              )}
            </div>

            {/* Right Column - Agent Sidebar */}
            <div className="property-sidebar-right">
              <div className="agent-card-bayut">
                <div className="agent-card-header">
                  <div className="agent-card-banner">
                    <span className="broker-badge">Verified Broker</span>
                  </div>
                  <div className="agent-photo-container">
                    <img src={agent.image} alt={agent.name} className="agent-photo" />
                  </div>
                </div>
                <div className="agent-card-body">
                  <h4 className="agent-name">{agent.name}</h4>
                  
                  {property.agent && agent.job_title && (
                    <p className="agent-job-title">{agent.job_title}</p>
                  )}

                  {!property.agent && (
                    <p className="agent-description">{agent.description}</p>
                  )}

                  {/* Contact Buttons */}
                  <div className="agent-contact-buttons">
                    <a 
                      href={`mailto:${agent.email}`}
                      className="contact-btn email-btn"
                    >
                      <i className="fa-solid fa-envelope"></i>
                      <span>Email</span>
                    </a>
                    <a 
                      href={`tel:${agent.phone}`}
                      className="contact-btn call-btn"
                    >
                      <i className="fa-solid fa-phone"></i>
                      <span>Call</span>
                    </a>
                    <a 
                      href={`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="contact-btn whatsapp-btn"
                    >
                      <i className="fa-brands fa-whatsapp"></i>
                    </a>
                  </div>

                  <button 
                    className="schedule-viewing-btn-bayut"
                    onClick={() => setShowScheduleViewing(true)}
                  >
                    <i className="fa-solid fa-calendar-check"></i>
                    Schedule Viewing
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {showScheduleViewing && (
          <ScheduleViewingPopup
            onClose={() => setShowScheduleViewing(false)}
            propertyId={property.id}
            propertyName={property.name}
          />
        )}
      </div>
    </>
  );
};

export default PropertyDetails;
