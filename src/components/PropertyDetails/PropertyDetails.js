import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";
import config from "../../config";
import ImageCarousel from "./ImageCarousel";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [agentDetails, setAgentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Données par défaut pour l'agent si aucun agent n'est associé
  const defaultAgent = {
    name: "Where to find us",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna.",
    location: "Al Hisn, Baynunah Tower, Office 93",
    phone: "(+97) 150907039",
    phone2: "(+97) 150907039",
    email: "info@meridiagroup.ae",
    email2: "info@domain.com",
    hours: "Open: 04:00 am - Closed: 07:00 pm",
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
  const isHotDeal = property.category === "off-plans";

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
    <div className="property-details-page">
      <div className="property-details-container">
        <div className="property-details-header">
          <h1>{property.name}</h1>
          <div className="property-location-details">
            <i className="fa-solid fa-location-dot"></i> {property.location}
          </div>
        </div>

        <div className="property-main-content">
          <div className="property-images">
            <ImageCarousel images={propertyImages} alt={property.name} />
            {isHotDeal && (
              <div className="hot-deal-badge-details">HOT DEAL</div>
            )}
          </div>

          <div className="property-info-details">
            <div className="property-price-details">
              <h2>{property.price} AED</h2>
            </div>

            <div className="property-features">
              <div className="feature">
                <i className="fa-solid fa-bed"></i>
                <span>{property.bedrooms || 0} Bedrooms</span>
              </div>
              <div className="feature">
                <i className="fa-solid fa-bath"></i>
                <span>{property.bathrooms || 0} Bathrooms</span>
              </div>
              <div className="feature">
                <i className="fa-solid fa-ruler-combined"></i>
                <span>{property.area || 0} Square Ft</span>
              </div>
              <div className="feature">
                <i className="fa-solid fa-building"></i>
                <span>{property.type || "Property"}</span>
              </div>
            </div>

            <div className="property-description">
              <h3>Description</h3>
              <p>
                {property.description ||
                  `Beautiful ${property.type} located in ${property.location}. This property features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms with a total area of ${property.area} square feet.`}
              </p>
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
                      <p>{agent.phone2}</p>
                    </div>

                    <div className="contact-info-item">
                      <h5>
                        <i className="fa-solid fa-envelope"></i> Email
                      </h5>
                      <p>{agent.email}</p>
                      <p>{agent.email2}</p>
                    </div>

                    <div className="contact-info-item">
                      <h5>
                        <i className="fa-solid fa-clock"></i> Working Hours
                      </h5>
                      <p>{agent.hours}</p>
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
    </div>
  );
};

export default PropertyDetails;
