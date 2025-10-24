import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";
import config from "../../config";
import ImageCarousel from "./ImageCarousel";
import SEO from "../SEO";

const PropertyDetails = () => {
  const { id, name } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données par défaut pour l'agent si aucun agent n'est associé
  const defaultAgent = {
    name: "Where to find us",
    description:
      "Contact our experienced real estate professionals for personalized assistance with your property needs.",
    location: "Al Hisn, Baynunah Tower, Office 93",
    phone: "(+97) 150607030",
    email: "info@meridiangroup.ae",
    image: "/user1.png",
  };

  // Listes d'équipements par défaut basées sur le type de propriété
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
        // Appel à l'API pour récupérer les détails de la propriété
        const response = await fetch(`${config.API_URL}/properties/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success && data.data) {
          setProperty(data.data);

          // Si un agent est associé, récupérer ses détails
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
                // Assurons-nous que les réseaux sociaux sont correctement définis
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
          <p>
            The property you are looking for does not exist or has been removed.
          </p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  // Déterminer si c'est un "hot deal" basé sur la catégorie
  const isHotDeal = property.category === "off-plan";

  // Obtenir les équipements par défaut basés sur le type de propriété
  const amenities = defaultAmenities[property.type] || defaultAmenities.default;

  // Créer un agent par défaut si aucun n'est fourni ou si l'agent est null
  const agent = property.agent
    ? {
        name: property.agent.name || "",
        phone: property.agent.phone || "",
        email: property.agent.email || "",
        image: property.agent.photo_url || "/user1.png",
        job_title: property.agent.job_title || "",
        social_media: agentDetails?.social_media || {}, // Utiliser uniquement les réseaux sociaux de agentDetails
        has_contact_info: !!(property.agent.phone || property.agent.email),
      }
    : defaultAgent;

  // Debug logs pour voir les données des réseaux sociaux
  console.log("Social media from agentDetails:", agentDetails?.social_media);

  // Debug logs pour voir les données de l'agent
  console.log("Property agent data:", property.agent);
  console.log("Agent details data:", agentDetails);
  console.log("Final agent object:", agent);

  // Afficher les détails de l'agent dans la console
  console.log("Agent details from API:", agentDetails);

  // Afficher les liens des réseaux sociaux dans la console
  console.log("Agent social media links:", property.agent?.social_media);

  // Prepare images for carousel
  const propertyImages =
    property.pictures && property.pictures.length > 0
      ? property.pictures
      : ["/test.jpg"];

  return (
    <>
      <SEO
        title={`${property.name} - ${property.location} | Meridian Group Real Estate`}
        description={`${property.name} in ${property.location}. ${property.bedrooms} bed, ${property.bathrooms} bath property for ${property.listing_type === 'sale' ? 'sale' : 'rent'} at ${parseFloat(property.price).toLocaleString()} AED. Contact Meridian Group for more details.`}
        keywords={`${property.name}, ${property.location}, ${property.type}, ${property.bedrooms} bedroom, ${property.bathrooms} bathroom, ${property.listing_type === 'sale' ? 'property for sale' : 'property for rent'}, Abu Dhabi real estate, Meridian Group`}
        url={`https://meridiangroup.ae/property/${id}/${name}`}
        image={property.pictures && property.pictures.length > 0 ? property.pictures[0] : 'https://meridiangroup.ae/og-image.jpg'}
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": property.name,
          "description": property.description || `${property.name} in ${property.location}`,
          "url": `https://meridiangroup.ae/property/${id}/${name}`,
          "image": property.pictures && property.pictures.length > 0 ? property.pictures : [],
          "address": {
            "@type": "PostalAddress",
            "addressLocality": property.location,
            "addressRegion": "Abu Dhabi",
            "addressCountry": "AE"
          },
          "offers": {
            "@type": "Offer",
            "price": property.price,
            "priceCurrency": "AED",
            "availability": "https://schema.org/InStock"
          },
          "floorSize": {
            "@type": "QuantitativeValue",
            "value": property.area,
            "unitCode": "SQF"
          },
          "numberOfRooms": property.bedrooms,
          "numberOfBathroomsTotal": property.bathrooms,
          "additionalProperty": property.type,
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
          </div>

          {/* Right Column - Sidebar */}
          <div className="property-sidebar">
            {propertyImages.length > 0 && (
              <div className="sidebar-image-gallery">
                {propertyImages.slice(0, 3).map((image, index) => (
                  <div key={index} className="sidebar-thumbnail-wrapper">
                    <img
                      src={image}
                      alt={`${property.name} - ${index + 1}`}
                      className="sidebar-thumbnail"
                    />
                    {index === 2 && propertyImages.length > 3 && (
                      <div className="thumbnail-overlay total-count-overlay">
                        <i className="fa-solid fa-camera"></i> {propertyImages.length}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            <div className="property-agent-section">
              <h3>{property.agent ? "Property Agent" : "Contact Information"}</h3>
              <div className="agent-card">
                <div className="agent-image">
                  <img src={agent.image} alt={agent.name} />
                </div>
                <div className="agent-info">
                  <h4>{agent.name}</h4>

                  {property.agent ? (
                    // Affichage des informations de l'agent si disponible
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
                    </>
                  ) : (
                    // Affichage des informations de contact de l'agence
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

                      <div className="agent-contact-buttons">
                        <button className="email-btn">
                          <i className="fa-solid fa-envelope"></i>
                          Email
                        </button>
                        <button className="call-btn">
                          <i className="fa-solid fa-phone"></i>
                          Call
                        </button>
                        <button className="whatsapp-btn">
                          <i className="fab fa-whatsapp"></i>
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="property-agent-section">
          <h3>{property.agent ? "Property Agent" : "Contact Information"}</h3>
          <div className="agent-card">
            <div className="agent-image">
              <img src={agent.image} alt={agent.name} />
            </div>
            <div className="agent-info">
              <h4>{agent.name}</h4>

              {property.agent ? (
                // Affichage des informations de l'agent si disponible
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
                    {!agent.social_media ||
                    !Object.keys(agent.social_media).length ? (
                      <>
                        <a
                          href="#"
                          className="social-icon"
                          aria-label="Facebook"
                        >
                          <i className="fa-brands fa-facebook"></i>
                        </a>
                        <a
                          href="#"
                          className="social-icon"
                          aria-label="LinkedIn"
                        >
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                        <a
                          href="#"
                          className="social-icon"
                          aria-label="Twitter"
                        >
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a
                          href="#"
                          className="social-icon"
                          aria-label="Instagram"
                        >
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                        <a
                          href="#"
                          className="social-icon"
                          aria-label="WhatsApp"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </a>
                      </>
                    ) : (
                      <>
                        {agent.social_media.facebook && (
                          <a
                            href={agent.social_media.facebook}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="Facebook"
                          >
                            <i className="fa-brands fa-facebook"></i>
                          </a>
                        )}
                        {agent.social_media.linkedin && (
                          <a
                            href={agent.social_media.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="LinkedIn"
                          >
                            <i className="fa-brands fa-linkedin"></i>
                          </a>
                        )}
                        {agent.social_media.twitter && (
                          <a
                            href={agent.social_media.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="Twitter"
                          >
                            <i className="fa-brands fa-twitter"></i>
                          </a>
                        )}
                        {agent.social_media.instagram && (
                          <a
                            href={agent.social_media.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="Instagram"
                          >
                            <i className="fa-brands fa-instagram"></i>
                          </a>
                        )}
                        {agent.social_media.whatsapp && (
                          <a
                            href={`https://wa.me/${agent.social_media.whatsapp}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label="WhatsApp"
                          >
                            <i className="fa-brands fa-whatsapp"></i>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                  {agent.has_contact_info && (
                    <button className="contact-agent-btn">Contact Agent</button>
                  )}
                </>
              ) : (
                // Affichage des informations de contact de l'agence
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
                    Contact Us
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Off-plan specific sections moved to OffPlanDetails */}
    </div>
    </>
  );
};

export default PropertyDetails;
