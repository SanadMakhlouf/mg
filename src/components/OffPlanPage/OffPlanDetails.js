import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./OffPlanProjects.css";
import config from "../../config";
import ImageCarousel from "../PropertyDetails/ImageCarousel";
import GetInTouchSection from "../GetInTouchSection";
import MapSection from "../MapSection";
import SEO from "../SEO";

const OffPlanDetails = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Default agent data if no agent is assigned
  const defaultAgent = {
    name: "Meridian Group",
    description:
      "Contact our experienced real estate professionals for personalized assistance with your property needs.",
    location: "Al Hisn, Baynunah Tower, Office 93",
    phone: "(+97) 150607030",
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
            console.log("Fetching agent details for ID:", data.data.agent.id);
            try {
              const agentResponse = await fetch(
                `${config.API_URL}/agents/${data.data.agent.id}`,
                {
                  method: "GET",
                  headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                  },
                }
              );

              if (!agentResponse.ok) {
                const errorText = await agentResponse.text();
                console.error("Agent response not OK:", {
                  status: agentResponse.status,
                  statusText: agentResponse.statusText,
                  errorText,
                });
                throw new Error(`HTTP error! status: ${agentResponse.status}`);
              }

              const agentData = await agentResponse.json();
              console.log("Agent API response:", agentData);

              if (agentData.status === "success" && agentData.data) {
                console.log("Setting agent details:", agentData.data);
                const socialMedia = agentData.data.social_media || {};
                setAgentDetails({
                  ...agentData.data,
                  social_media: socialMedia,
                });
              } else {
                console.error(
                  "Agent API returned unexpected format:",
                  agentData
                );
              }
            } catch (err) {
              console.error("Error fetching agent details:", err);
            }
          }
        } else {
          setError("Property not found");
          setTimeout(() => navigate("/off-plan-properties"), 2000);
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
    document.body.classList.add("page-offplan-details");
    return () => {
      document.body.classList.remove("page-offplan-details");
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
          <button onClick={() => navigate("/off-plan-properties")}>Back to Off-Plan Properties</button>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="property-details-container">
        <div className="property-not-found">
          <h2>Property Not Found</h2>
          <p>
            The property you are looking for does not exist or has been removed.
          </p>
          <button onClick={() => navigate("/off-plan-properties")}>Back to Off-Plan Properties</button>
        </div>
      </div>
    );
  }

  // Determine if it's a "hot deal" based on category
  const isHotDeal = property.category === "off-plan";

  // Get default amenities based on property type
  const amenities = defaultAmenities[property.type] || defaultAmenities.default;

  // Create default agent if none is provided or if agent is null
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

  // Debug logs for social media data
  console.log("Social media from agentDetails:", agentDetails?.social_media);

  // Debug logs for agent data
  console.log("Property agent data:", property.agent);
  console.log("Agent details data:", agentDetails);
  console.log("Final agent object:", agent);

  // Display agent details in console
  console.log("Agent details from API:", agentDetails);

  // Display social media links in console
  console.log("Agent social media links:", property.agent?.social_media);

  // Prepare images for carousel
  const propertyImages =
    property.pictures && property.pictures.length > 0
      ? property.pictures
      : ["/test.jpg"];

  // Brochure URL logic for off-plan properties
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
        title={`${property.name} - Off-Plan Property in ${property.location} | Meridian Group`}
        description={`${property.name} off-plan property in ${property.location}. ${property.price ? `Starting from ${parseFloat(property.price).toLocaleString()} AED.` : ''} ${property.description || 'Premium off-plan development by Meridian Group.'}`}
        keywords={`${property.name}, off-plan property, ${property.location}, Abu Dhabi real estate, pre-construction, Meridian Group, property investment`}
        url={`https://meridiangroup.ae/off-plan/${id}/${name}`}
        image={propertyImages && propertyImages.length > 0 ? propertyImages[0] : 'https://meridiangroup.ae/og-image.jpg'}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": property.name,
          "description": property.description || `${property.name} off-plan property in ${property.location}`,
          "url": `https://meridiangroup.ae/off-plan/${id}/${name}`,
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
      <div className="property-details-page">
      <div className="property-details-container">
        <div className="property-details-header">
          <h1>{property.name}</h1>
          <div className="property-location-details">
            <i className="fa-solid fa-location-dot"></i> {property.location}
          </div>
        </div>

        <div className="property-main-content">
          {/* Left Column - Main Content */}
          <div className="property-main-left">
            <div className="property-images">
              <ImageCarousel images={propertyImages} alt={property.name} />
              {isHotDeal && (
                <div className="hot-deal-badge-details">HOT DEAL</div>
              )}
            </div>

            <div className="property-price-section">
              <div className="property-price-details">
                <h2>
                  {parseFloat(property.price) > 0 
                    ? `${parseFloat(property.price).toLocaleString()} AED`
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
                {property.location}
              </div>

              <div className="property-features">
                <div className="feature">
                  <i className="fa-solid fa-bed"></i>
                  <span>{property.bedrooms || 0} Beds</span>
                </div>
                <div className="feature">
                  <i className="fa-solid fa-bath"></i>
                  <span>{property.bathrooms || 0} Baths</span>
                </div>
                <div className="feature">
                  <i className="fa-solid fa-ruler-combined"></i>
                  <span>{parseFloat(property.area) > 0 ? `${property.area} sqft` : 'Area TBD'}</span>
                </div>
                <div className="feature">
                  <i className="fa-solid fa-building"></i>
                  <span>{property.type || "Property"}</span>
                </div>
                {property.permit_number && (
                  <div className="feature">
                    <i className="fa-solid fa-certificate"></i>
                    <span>Permit: {property.permit_number}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <div 
                className="description-content"
                dangerouslySetInnerHTML={{
                  __html: property.description 
                    ? property.description
                        // Decode HTML entities first
                        .replace(/&amp;lt;/g, '<')
                        .replace(/&amp;gt;/g, '>')
                        .replace(/&amp;amp;/g, '&')
                        .replace(/&amp;quot;/g, '"')
                        .replace(/&amp;#039;/g, "'")
                        .replace(/&amp;nbsp;/g, ' ')
                        // Then handle line breaks
                        .replace(/&lt;br\s*\/?&gt;/gi, '<br>')
                        .replace(/<br\s*\/?>/gi, '<br>')
                        .replace(/&amp;lt;br\s*\/?&amp;gt;/gi, '<br>')
                        // Clean up any remaining entities
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

          {/* Right Column - Sidebar */}
          <div className="property-sidebar">
            <div className="property-agent-section">
              <h3>{property.agent ? "Property Agent" : "Contact Information"}</h3>
              <div className="agent-card">
                <div className="agent-image">
                  <img src={agent.image} alt={agent.name} />
                </div>
                <div className="agent-info">
                  <h4>{agent.name}</h4>

                  {property.agent ? (
                    // Display agent information if available
                    <>
                      {agent.job_title && (
                        <p className="agent-job-title">{agent.job_title}</p>
                      )}
                      {agent.phone && (
                        <p>
                          <i className="fa-solid fa-phone"></i> {agent.phone}
                        </p>
                      )}
                      {agent.email && (
                        <p>
                          <i className="fa-solid fa-envelope"></i> {agent.email}
                        </p>
                      )}
                      <div className="agent-social-media">
                        {agent.facebook && (
                          <a href={agent.facebook} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-facebook"></i>
                          </a>
                        )}
                        {agent.instagram && (
                          <a href={agent.instagram} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-instagram"></i>
                          </a>
                        )}
                        {agent.linkedin && (
                          <a href={agent.linkedin} target="_blank" rel="noopener noreferrer">
                            <i className="fab fa-linkedin"></i>
                          </a>
                        )}
                      </div>
                      <button 
                        className="contact-agent-btn"
                        onClick={() => navigate("/contact")}
                      >
                        <i className="fa-solid fa-paper-plane"></i> Contact Agent
                      </button>
                    </>
                  ) : (
                    // Display agency contact information
                    <>
                      <p className="agency-description">{agent.description}</p>

                      <div className="contact-info-group">
                        <div className="contact-info-item">
                          <h5>
                            <i className="fa-solid fa-location-dot"></i> Location
                          </h5>
                          <p>{agent.location}</p>
                        </div>

                        <div className="contact-info-item">
                          <h5>
                            <i className="fa-solid fa-phone"></i> Phone
                          </h5>
                          <p>{agent.phone}</p>
                        </div>

                        <div className="contact-info-item">
                          <h5>
                            <i className="fa-solid fa-envelope"></i> Email
                          </h5>
                          <p>{agent.email}</p>
                        </div>
                      </div>

                      <button 
                        className="contact-agent-btn"
                        onClick={() => navigate("/contact")}
                      >
                        <i className="fa-solid fa-paper-plane"></i> Contact Us
                      </button>
                    </>
                  )}
                </div>
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
