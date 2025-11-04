import React, { useState, useEffect, useRef } from "react";
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
  const [showAgentInfo, setShowAgentInfo] = useState(false);

  // ✅ Sticky pour agent-card-bayut (position fixed)
  const agentCardRef = useRef(null);
  const sidebarRef = useRef(null);
  const priceHeaderRef = useRef(null);
  const [isSticky, setIsSticky] = useState(false);
  const [fixedStyle, setFixedStyle] = useState({});

  useEffect(() => {
    if (!property) return;

    const handleScroll = () => {
      if (
        !agentCardRef.current ||
        !sidebarRef.current ||
        !priceHeaderRef.current
      )
        return;

      const sidebarRect = sidebarRef.current.getBoundingClientRect();
      const priceHeaderRect = priceHeaderRef.current.getBoundingClientRect();
      const triggerPoint = 120; // Point où le fixed s'active (navbar + marge)

      // Vérifier si on a dépassé le property-price-header
      // La carte devient fixed quand le price-header sort de la vue (son bas est au-dessus du haut de la fenêtre)
      const hasPassedPriceHeader = priceHeaderRect.bottom < triggerPoint;

      // Vérifier si on n'a pas dépassé le conteneur parent
      // Le fixed doit s'arrêter quand le bas du conteneur parent sort de la vue
      const containerBottom = sidebarRect.bottom;
      const isContainerStillVisible = containerBottom > triggerPoint;

      // Activer fixed si on a dépassé le price-header ET que le conteneur est encore visible
      const shouldBeSticky = hasPassedPriceHeader && isContainerStillVisible;

      setIsSticky(shouldBeSticky);

      // Si on doit être sticky, positionner la carte comme icône flottant en bas à droite
      if (shouldBeSticky) {
        // Positionner en bas à droite, juste à côté du bouton WhatsApp
        const margin = 20;
        const whatsappButtonSize = 60; // Taille approximative du bouton WhatsApp
        const iconSize = 70; // Taille de l'icône flottant
        const spacing = 15; // Espacement entre WhatsApp et l'icône

        // Positionner à gauche du bouton WhatsApp
        const right = whatsappButtonSize + spacing + margin;

        setFixedStyle({
          width: `${iconSize}px`,
          height: `${iconSize}px`,
          right: `${right}px`,
          bottom: `${margin}px`,
          left: "auto",
          top: "auto",
        });
      }
    };

    // Utiliser requestAnimationFrame pour de meilleures performances
    let ticking = false;
    const optimizedScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", optimizedScroll, { passive: true });
    window.addEventListener(
      "resize",
      () => {
        handleScroll();
      },
      { passive: true }
    );

    // Attendre que le DOM soit complètement rendu
    const timeoutId = setTimeout(() => {
      handleScroll();
    }, 300);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", optimizedScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [property]);

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
              // Error fetching agent details
            }
          }
        } else {
          setError("Property not found");
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        // Error fetching property details
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
          <p>
            The property you are looking for does not exist or has been removed.
          </p>
          <button onClick={() => navigate("/")}>Back to Home</button>
        </div>
      </div>
    );
  }

  // Determine if it's a "hot deal" based on category
  const isHotDeal = property.category === "off-plan";

  // Determine if it's an off-plan property (check category or URL path)
  const isOffPlan =
    property.category === "off-plan" ||
    property.category === "off-plans" ||
    window.location.pathname.includes("/off-plan/");

  // Get default amenities based on property type
  const amenities = defaultAmenities[property.type] || defaultAmenities.default;

  // Mock off-plan data (can be replaced with API data later)
  const offPlanData = {
    developer: property.developer || "Emaar Properties",
    status: property.status || "Under Construction",
    handoverDate: property.handover_date || "Q4 2026",
    firstInstallment: "10%",
    constructionProgress: "45%",
    paymentPlans: [
      {
        plan: "Plan 1: Flexible Payment Plan",
        downPayment: "10%",
        duringConstruction: "40%",
        onHandover: "50%",
        description:
          "Pay 10% booking, 40% during construction, and 50% on handover",
      },
      {
        plan: "Plan 2: Post-Handover Payment Plan",
        downPayment: "20%",
        duringConstruction: "30%",
        onHandover: "50%",
        description:
          "Extended payment plan with options up to 5 years post-handover",
      },
      {
        plan: "Plan 3: Construction Linked Plan",
        downPayment: "15%",
        duringConstruction: "35%",
        onHandover: "50%",
        description: "Payments linked to construction milestones",
      },
    ],
  };

  // Create agent object from API response
  const agent =
    property.agent && agentDetails
      ? {
          id: agentDetails.id,
          name: agentDetails.name || property.agent.name || "Meridian Group",
          job_title: agentDetails.job_title || property.agent.job_title || "",
          photo_url:
            agentDetails.photo_url ||
            property.agent.photo_url ||
            "/logo192.png",
          social_media: agentDetails.social_media || {},
        }
      : property.agent
      ? {
          id: property.agent.id,
          name: property.agent.name || "Meridian Group",
          job_title: property.agent.job_title || "",
          photo_url: property.agent.photo_url || "/logo192.png",
          social_media: {},
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
        : `${config.API_URL.replace("/api/v1", "")}/storage/${
            property.pdf_url
          }`;
    }
    if (property?.brochure) {
      return property.brochure.startsWith("http")
        ? property.brochure
        : `${config.API_URL.replace("/api/v1", "")}/storage/${
            property.brochure
          }`;
    }
    return null;
  })();

  return (
    <>
      <SEO
        title={`${property.name} - Property in ${property.location} | Meridian Group`}
        description={`${property.name} property in ${property.location}. ${
          property.price
            ? `Starting from ${parseFloat(
                property.price
              ).toLocaleString()} AED.`
            : ""
        } ${property.description || "Premium property by Meridian Group."}`}
        keywords={`${property.name}, property, ${property.location}, Abu Dhabi real estate, Meridian Group, property investment`}
        url={`https://meridiangroup.ae/property/${id}/${name}`}
        image={
          propertyImages && propertyImages.length > 0
            ? propertyImages[0]
            : "https://meridiangroup.ae/og-image.jpg"
        }
        type="article"
        structuredData={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: property.name,
          description:
            property.description ||
            `${property.name} property in ${property.location}`,
          url: `https://meridiangroup.ae/property/${id}/${name}`,
          image: propertyImages || [],
          address: {
            "@type": "PostalAddress",
            addressLocality: property.location,
            addressRegion: "Abu Dhabi",
            addressCountry: "AE",
          },
          offers: property.price
            ? {
                "@type": "Offer",
                price: property.price,
                priceCurrency: "AED",
              }
            : undefined,
          provider: {
            "@type": "RealEstateAgent",
            name: "Meridian Group",
            url: "https://meridiangroup.ae",
          },
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
              <button
                className="image-overlay-btn map-btn"
                onClick={() => navigate("/contact")}
              >
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
          <div className="property-price-header" ref={priceHeaderRef}>
            <div className="price-header-left">
              <h1 className="property-price-large">
                {parseFloat(property.price) > 0
                  ? `${parseFloat(property.price).toLocaleString()} AED`
                  : "Price on Request"}
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
                  <span>
                    {parseFloat(property.area) > 0
                      ? `${property.area} sqft`
                      : "Area TBD"}
                  </span>
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

          {/* Off-Plan Specific Section */}
          {isOffPlan && (
            <div className="off-plan-info-section">
              <div className="off-plan-header">
                <div className="off-plan-badges">
                  <span
                    className={`off-plan-status-badge ${offPlanData.status
                      .toLowerCase()
                      .replace(/\s+/g, "-")}`}
                  >
                    <i className="fa-solid fa-building"></i>
                    {offPlanData.status}
                  </span>
                  <span className="off-plan-installment-badge">
                    <i className="fa-solid fa-money-bill-wave"></i>
                    First Installment: {offPlanData.firstInstallment}
                  </span>
                  <span className="off-plan-handover-badge">
                    <i className="fa-solid fa-calendar-check"></i>
                    Handover: {offPlanData.handoverDate}
                  </span>
                </div>
                <div className="off-plan-developer">
                  <i className="fa-solid fa-building-circle-check"></i>
                  <div className="developer-info">
                    <span className="developer-label">Developer</span>
                    <span className="developer-name">
                      {offPlanData.developer}
                    </span>
                  </div>
                </div>
              </div>

              <div className="off-plan-progress">
                <div className="progress-header">
                  <span className="progress-label">Construction Progress</span>
                  <span className="progress-percentage">
                    {offPlanData.constructionProgress}
                  </span>
                </div>
                <div className="progress-bar">
                  <div
                    className="progress-bar-fill"
                    style={{ width: offPlanData.constructionProgress }}
                  ></div>
                </div>
              </div>

              {/* Payment Plans Section */}
              <div className="off-plan-payment-plans">
                <h3 className="payment-plans-title">
                  <i className="fa-solid fa-file-invoice-dollar"></i>
                  Payment Plans
                </h3>
                <div className="payment-plans-grid">
                  {offPlanData.paymentPlans.map((plan, index) => (
                    <div key={index} className="payment-plan-card">
                      <div className="plan-header">
                        <h4>{plan.plan}</h4>
                        <span className="plan-badge">Available</span>
                      </div>
                      <div className="plan-breakdown">
                        <div className="plan-item">
                          <i className="fa-solid fa-hand-holding-dollar"></i>
                          <div className="plan-item-content">
                            <span className="plan-item-label">
                              Down Payment
                            </span>
                            <span className="plan-item-value">
                              {plan.downPayment}
                            </span>
                          </div>
                        </div>
                        <div className="plan-item">
                          <i className="fa-solid fa-hard-hat"></i>
                          <div className="plan-item-content">
                            <span className="plan-item-label">
                              During Construction
                            </span>
                            <span className="plan-item-value">
                              {plan.duringConstruction}
                            </span>
                          </div>
                        </div>
                        <div className="plan-item">
                          <i className="fa-solid fa-key"></i>
                          <div className="plan-item-content">
                            <span className="plan-item-label">On Handover</span>
                            <span className="plan-item-value">
                              {plan.onHandover}
                            </span>
                          </div>
                        </div>
                      </div>
                      <p className="plan-description">{plan.description}</p>
                      <button
                        className="plan-inquire-btn"
                        onClick={() => setShowScheduleViewing(true)}
                      >
                        <i className="fa-solid fa-envelope"></i>
                        Inquire About This Plan
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Download Brochure Button */}
              <div className="off-plan-brochure-section">
                <button
                  className="off-plan-brochure-btn"
                  onClick={() => {
                    // Create a mock PDF or redirect to brochure
                    const brochureLink =
                      brochureUrl ||
                      `${config.API_URL.replace(
                        "/api/v1",
                        ""
                      )}/storage/brochures/${property.id}.pdf`;
                    window.open(brochureLink, "_blank");
                  }}
                >
                  <i className="fa-solid fa-file-pdf"></i>
                  <span>Download Project Brochure</span>
                  <i className="fa-solid fa-download"></i>
                </button>
                <p className="brochure-note">
                  Get detailed information about this project including floor
                  plans, amenities, and location map.
                </p>
              </div>
            </div>
          )}

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
              <div className="property-description-section description-desktop">
                <h3>About This Property</h3>
                <div
                  className="description-text"
                  dangerouslySetInnerHTML={{
                    __html: property.description
                      ? property.description
                          .replace(/&amp;lt;/g, "<")
                          .replace(/&amp;gt;/g, ">")
                          .replace(/&amp;amp;/g, "&")
                          .replace(/&amp;quot;/g, '"')
                          .replace(/&amp;#039;/g, "'")
                          .replace(/&amp;nbsp;/g, " ")
                          .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
                          .replace(/<br\s*\/?>/gi, "<br>")
                          .replace(/&amp;lt;br\s*\/?&amp;gt;/gi, "<br>")
                          .replace(/&amp;/g, "&")
                          .replace(/&quot;/g, '"')
                          .replace(/&#39;/g, "'")
                          .replace(/&nbsp;/g, " ")
                          .replace(/&lt;/g, "<")
                          .replace(/&gt;/g, ">")
                      : `Beautiful ${property.type} located in ${property.location}. This property features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms with a total area of ${property.area} square feet.`,
                  }}
                />
              </div>

              {/* Amenities Section */}
              {amenities && amenities.length > 0 && (
                <div className="property-amenities-section">
                  <h3>Amenities & Features</h3>
                  <div className="amenities-grid">
                    {amenities.map((amenity, index) => (
                      <div key={index} className="amenity-item">
                        <i className="fa-solid fa-check-circle"></i>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Property Information Table */}
              <div className="property-info-table">
                <h3>Property Information</h3>
                <div className="info-table">
                  <div className="info-row">
                    <span className="info-label">Type</span>
                    <span className="info-value">
                      {property.type || "Property"}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Purpose</span>
                    <span className="info-value">
                      {property.category === "rental" ? "For Rent" : "For Sale"}
                    </span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Reference no.</span>
                    <span className="info-value">MG-{property.id}</span>
                  </div>
                  {property.permit_number && (
                    <div className="info-row">
                      <span className="info-label">Permit</span>
                      <span className="info-value">
                        {property.permit_number}
                      </span>
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
            <div className="property-sidebar-right" ref={sidebarRef}>
              <div
                className={`agent-card-bayut ${
                  isSticky ? "agent-card-sticky" : ""
                }`}
                ref={agentCardRef}
                style={isSticky ? fixedStyle : {}}
                title={isSticky ? `${agent.name} - Contact Agent` : ""}
                onClick={isSticky ? () => setShowAgentInfo(true) : undefined}
              >
                <div className="agent-card-header">
                  <div className="agent-card-banner">
                    <span className="broker-badge">Verified Broker</span>
                  </div>
                  <div className="agent-photo-container">
                    <img
                      src={agent.photo_url || agent.image}
                      alt={agent.name}
                      className="agent-photo"
                    />
                  </div>
                </div>
                <div className="agent-card-body">
                  <div className="agent-name-badge-container">
                    <h4 className="agent-name">{agent.name}</h4>
                    {property.agent && (
                      <span className="agent-blue-badge">Agent</span>
                    )}
                  </div>

                  {agent.job_title && (
                    <p className="agent-job-title">{agent.job_title}</p>
                  )}

                  {!property.agent && (
                    <p className="agent-description">{agent.description}</p>
                  )}

                  {/* Social Media Links */}
                  {property.agent && agent.social_media && (
                    <div className="agent-social-buttons">
                      {agent.social_media.instagram && (
                        <a
                          href={agent.social_media.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn instagram-btn"
                          aria-label="Instagram"
                        >
                          <i className="fa-brands fa-instagram"></i>
                        </a>
                      )}
                      {agent.social_media.facebook && (
                        <a
                          href={agent.social_media.facebook}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn facebook-btn"
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
                          className="social-btn linkedin-btn"
                          aria-label="LinkedIn"
                        >
                          <i className="fa-brands fa-linkedin"></i>
                        </a>
                      )}
                      {agent.social_media.whatsapp && (
                        <a
                          href={agent.social_media.whatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn whatsapp-btn"
                          aria-label="WhatsApp"
                        >
                          <i className="fa-brands fa-whatsapp"></i>
                        </a>
                      )}
                      {agent.social_media.twitter && (
                        <a
                          href={agent.social_media.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="social-btn twitter-btn"
                          aria-label="Twitter"
                        >
                          <i className="fa-brands fa-twitter"></i>
                        </a>
                      )}
                    </div>
                  )}

                  {/* Default Contact Info if no agent */}
                  {!property.agent && (
                    <div className="agent-contact-info">
                      <div className="contact-info-item">
                        <i className="fa-solid fa-phone"></i>
                        <span>{agent.phone}</span>
                      </div>
                      <div className="contact-info-item">
                        <i className="fa-solid fa-envelope"></i>
                        <span>{agent.email}</span>
                      </div>
                    </div>
                  )}

                  <button
                    className="schedule-viewing-btn-bayut"
                    onClick={() => setShowScheduleViewing(true)}
                  >
                    <i className="fa-solid fa-calendar-check"></i>
                    Schedule Viewing
                  </button>
                </div>
              </div>

              {/* Quick Contact Card */}
              <div className="quick-contact-card">
                <h4 className="quick-contact-title">
                  <i className="fa-solid fa-headset"></i>
                  Quick Contact
                </h4>
                <div className="quick-contact-items">
                  <a href="tel:+971586830401" className="quick-contact-item">
                    <div className="quick-contact-icon phone-icon">
                      <i className="fa-solid fa-phone"></i>
                    </div>
                    <div className="quick-contact-text">
                      <span className="quick-contact-label">Call Us</span>
                      <span className="quick-contact-value">
                        +971 586830401
                      </span>
                    </div>
                  </a>
                  <a
                    href="mailto:info@meridiangroup.ae"
                    className="quick-contact-item"
                  >
                    <div className="quick-contact-icon email-icon">
                      <i className="fa-solid fa-envelope"></i>
                    </div>
                    <div className="quick-contact-text">
                      <span className="quick-contact-label">Email Us</span>
                      <span className="quick-contact-value">
                        info@meridiangroup.ae
                      </span>
                    </div>
                  </a>
                  <a
                    href="https://wa.me/971586830401"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="quick-contact-item"
                  >
                    <div className="quick-contact-icon whatsapp-icon">
                      <i className="fa-brands fa-whatsapp"></i>
                    </div>
                    <div className="quick-contact-text">
                      <span className="quick-contact-label">WhatsApp</span>
                      <span className="quick-contact-value">Chat Now</span>
                    </div>
                  </a>
                </div>
              </div>

              {/* Office Location Card */}
              <div className="office-location-card">
                <h4 className="office-location-title">
                  <i className="fa-solid fa-location-dot"></i>
                  Visit Our Office
                </h4>
                <div className="office-location-content">
                  <p className="office-address">
                    <i className="fa-solid fa-building"></i>
                    Al Hisn, Baynunah Tower 2, Office 402, Abu Dhabi
                  </p>
                  <div className="office-hours">
                    <div className="office-hours-item">
                      <i className="fa-solid fa-clock"></i>
                      <span>Mon - Sat: 09:00 AM - 6:00 PM</span>
                    </div>
                  </div>
                  <button
                    className="view-map-btn"
                    onClick={() => {
                      const address = encodeURIComponent(
                        "Al Hisn, Baynunah Tower 2, Office 402, Abu Dhabi"
                      );
                      window.open(
                        `https://www.google.com/maps/search/?api=1&query=${address}`,
                        "_blank"
                      );
                    }}
                  >
                    <i className="fa-solid fa-map-pin"></i>
                    View on Map
                  </button>
                </div>
              </div>

              {/* Property Insights Card */}
              <div className="property-insights-card">
                <h4 className="property-insights-title">
                  <i className="fa-solid fa-chart-line"></i>
                  Property Insights
                </h4>
                <div className="insights-grid">
                  <div className="insight-item">
                    <div className="insight-icon">
                      <i className="fa-solid fa-calendar-days"></i>
                    </div>
                    <div className="insight-content">
                      <span className="insight-label">Listing Date</span>
                      <span className="insight-value">
                        {property.created_at
                          ? new Date(property.created_at).toLocaleDateString(
                              "en-US",
                              {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                              }
                            )
                          : "Recently Listed"}
                      </span>
                    </div>
                  </div>
                  <div className="insight-item">
                    <div className="insight-icon">
                      <i className="fa-solid fa-eye"></i>
                    </div>
                    <div className="insight-content">
                      <span className="insight-label">Property ID</span>
                      <span className="insight-value">MG-{property.id}</span>
                    </div>
                  </div>
                  {property.permit_number && (
                    <div className="insight-item">
                      <div className="insight-icon">
                        <i className="fa-solid fa-certificate"></i>
                      </div>
                      <div className="insight-content">
                        <span className="insight-label">Permit Number</span>
                        <span className="insight-value">
                          {property.permit_number}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="insight-item">
                    <div className="insight-icon">
                      <i className="fa-solid fa-tag"></i>
                    </div>
                    <div className="insight-content">
                      <span className="insight-label">Listing Type</span>
                      <span className="insight-value">
                        {property.listing_type === "rental"
                          ? "For Rent"
                          : "For Sale"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions Card */}
              <div className="quick-actions-card">
                <h4 className="quick-actions-title">
                  <i className="fa-solid fa-bolt"></i>
                  Quick Actions
                </h4>
                <div className="quick-actions-grid">
                  <button
                    className="quick-action-btn"
                    onClick={() => setShowScheduleViewing(true)}
                  >
                    <i className="fa-solid fa-calendar-check"></i>
                    <span>Schedule Viewing</span>
                  </button>
                  <button
                    className="quick-action-btn"
                    onClick={() => {
                      const subject = encodeURIComponent(
                        `Inquiry about ${property.name}`
                      );
                      const body = encodeURIComponent(
                        `Hello,\n\nI'm interested in ${property.name} located at ${property.location}.\n\nPlease contact me with more information.\n\nThank you!`
                      );
                      window.location.href = `mailto:info@meridiangroup.ae?subject=${subject}&body=${body}`;
                    }}
                  >
                    <i className="fa-solid fa-envelope"></i>
                    <span>Send Inquiry</span>
                  </button>
                  <button
                    className="quick-action-btn"
                    onClick={() => {
                      const message = encodeURIComponent(
                        `Hi, I'm interested in ${property.name} - ${window.location.href}`
                      );
                      window.open(
                        `https://wa.me/971586830401?text=${message}`,
                        "_blank"
                      );
                    }}
                  >
                    <i className="fa-brands fa-whatsapp"></i>
                    <span>WhatsApp</span>
                  </button>
                  <button
                    className="quick-action-btn"
                    onClick={() => {
                      const propertyUrl = encodeURIComponent(
                        window.location.href
                      );
                      window.open(
                        `https://www.facebook.com/sharer/sharer.php?u=${propertyUrl}`,
                        "_blank"
                      );
                    }}
                  >
                    <i className="fa-brands fa-facebook"></i>
                    <span>Share</span>
                  </button>
                </div>
              </div>

              {/* Trust Badge Card */}
              <div className="trust-badge-card">
                <div className="trust-badge-header">
                  <i className="fa-solid fa-shield-check"></i>
                  <h4>Verified Property</h4>
                </div>
                <div className="trust-badges">
                  <div className="trust-badge-item">
                    <i className="fa-solid fa-check-circle"></i>
                    <span>100% Verified</span>
                  </div>
                  <div className="trust-badge-item">
                    <i className="fa-solid fa-check-circle"></i>
                    <span>Legal Documents</span>
                  </div>
                  <div className="trust-badge-item">
                    <i className="fa-solid fa-check-circle"></i>
                    <span>Trusted Broker</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section - Mobile Position (After Agent) */}
            <div className="property-description-section description-mobile">
              <h3>About This Property</h3>
              <div
                className="description-text"
                dangerouslySetInnerHTML={{
                  __html: property.description
                    ? property.description
                        .replace(/&amp;lt;/g, "<")
                        .replace(/&amp;gt;/g, ">")
                        .replace(/&amp;amp;/g, "&")
                        .replace(/&amp;quot;/g, '"')
                        .replace(/&amp;#039;/g, "'")
                        .replace(/&amp;nbsp;/g, " ")
                        .replace(/&lt;br\s*\/?&gt;/gi, "<br>")
                        .replace(/<br\s*\/?>/gi, "<br>")
                        .replace(/&amp;lt;br\s*\/?&amp;gt;/gi, "<br>")
                        .replace(/&amp;/g, "&")
                        .replace(/&quot;/g, '"')
                        .replace(/&#39;/g, "'")
                        .replace(/&nbsp;/g, " ")
                        .replace(/&lt;/g, "<")
                        .replace(/&gt;/g, ">")
                    : `Beautiful ${property.type} located in ${property.location}. This property features ${property.bedrooms} bedrooms and ${property.bathrooms} bathrooms with a total area of ${property.area} square feet.`,
                }}
              />
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

        {/* Agent Info Popup */}
        {showAgentInfo && (
          <div
            className="agent-info-popup-overlay"
            onClick={() => setShowAgentInfo(false)}
          >
            <div
              className="agent-info-popup"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="agent-info-close-btn"
                onClick={() => setShowAgentInfo(false)}
                aria-label="Close"
              >
                <i className="fa-solid fa-times"></i>
              </button>

              <div className="agent-info-header">
                <div className="agent-info-avatar">
                  <img src={agent.photo_url || agent.image} alt={agent.name} />
                  <div className="agent-info-verified-badge">
                    <i className="fa-solid fa-check-circle"></i>
                  </div>
                </div>
                <div className="agent-info-title">
                  <h3>{agent.name}</h3>
                  {agent.job_title && (
                    <p className="agent-info-job-title">{agent.job_title}</p>
                  )}
                  {property.agent && (
                    <span className="agent-info-badge">Verified Agent</span>
                  )}
                </div>
              </div>

              {!property.agent && agent.description && (
                <div className="agent-info-description">
                  <p>{agent.description}</p>
                </div>
              )}

              <div className="agent-info-phone">
                <div className="agent-info-phone-card">
                  <div className="agent-info-phone-icon">
                    <i className="fa-solid fa-phone"></i>
                  </div>
                  <div className="agent-info-phone-content">
                    <span className="agent-info-phone-label">Call Us</span>
                    <a
                      href="tel:+971586830401"
                      className="agent-info-phone-number"
                    >
                      +971 586830401
                    </a>
                  </div>
                  <a
                    href="tel:+971586830401"
                    className="agent-info-phone-btn"
                    aria-label="Call +971 586830401"
                  >
                    <i className="fa-solid fa-phone"></i>
                  </a>
                </div>
              </div>

              <div className="agent-info-actions">
                <button
                  className="agent-info-primary-btn"
                  onClick={() => {
                    setShowAgentInfo(false);
                    setShowScheduleViewing(true);
                  }}
                >
                  <i className="fa-solid fa-calendar-check"></i>
                  Schedule Viewing
                </button>
                <button
                  className="agent-info-secondary-btn"
                  onClick={() => setShowAgentInfo(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default PropertyDetails;
