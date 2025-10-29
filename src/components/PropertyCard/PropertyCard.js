import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({
  id = "1",
  image,
  title,
  price,
  beds,
  baths,
  sqft,
  location = "Al Danah - Abou Dabi - Émirats arabes unis",
  isHotDeal = false,
  permitNumber = null,
}) => {
  const navigate = useNavigate();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleViewDetails = (e) => {
    e.stopPropagation();
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/property/${id}/${slug}`);
  };

  const propertyUrl = `${window.location.origin}/property/${id}/${title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
  const shareText = `Check out this property: ${title}`;

  const handleShare = (platform, e) => {
    e.stopPropagation();
    const encodedUrl = encodeURIComponent(propertyUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      email: `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

  const copyLink = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(propertyUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    });
  };

  return (
    <div
      className="property-card"
      onClick={handleViewDetails}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} className="property-image" />
      {isHotDeal && <div className="hot-deal-badge">HOT DEAL</div>}
      
      {/* Share Button */}
      <div className="property-card-share">
        <button
          className="share-icon-btn"
          onClick={(e) => {
            e.stopPropagation();
            setShowShareMenu(!showShareMenu);
          }}
        >
          <i className="fa-solid fa-share-nodes"></i>
        </button>
        
        {showShareMenu && (
          <>
            <div
              className="share-menu-overlay"
              onClick={(e) => {
                e.stopPropagation();
                setShowShareMenu(false);
              }}
            ></div>
            <div className="property-share-menu">
              <button
                className="share-menu-option whatsapp"
                onClick={(e) => handleShare("whatsapp", e)}
              >
                <i className="fa-brands fa-whatsapp"></i>
              </button>
              <button
                className="share-menu-option facebook"
                onClick={(e) => handleShare("facebook", e)}
              >
                <i className="fa-brands fa-facebook"></i>
              </button>
              <button
                className="share-menu-option twitter"
                onClick={(e) => handleShare("twitter", e)}
              >
                <i className="fa-brands fa-x-twitter"></i>
              </button>
              <button
                className="share-menu-option email"
                onClick={(e) => handleShare("email", e)}
              >
                <i className="fa-solid fa-envelope"></i>
              </button>
              <button
                className="share-menu-option copy"
                onClick={(e) => copyLink(e)}
              >
                <i className={`fa-solid ${copied ? "fa-check" : "fa-link"}`}></i>
              </button>
            </div>
          </>
        )}
      </div>
      <div className="property-location">
        <i className="fa-solid fa-location-dot"></i> {location}
        {permitNumber && (
          <div className="permit-number">
            <i className="fa-solid fa-certificate"></i> Permit: {permitNumber}
          </div>
        )}
      </div>
      <div className="property-details">
        <div className="property-info-grid">
          <div className="info-item-l">
            <span>
              {beds} <i className="fa-solid fa-bed"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Bed</span>
          </div>
          <div className="info-item-l">
            <span>
              {baths} <i className="fa-solid fa-bath"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Bath</span>
          </div>
          <div className="info-item-l">
            <span>
              {sqft} <i className="fa-solid fa-ruler-combined"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Sq Ft</span>
          </div>
        </div>
        <div className="property-title-price">
          <h3 className="property-title">{title}</h3>
          <div className="price-container">
            <p className="property-price">{parseFloat(price).toLocaleString()} AED</p>
            <button className="view-details-btn" onClick={handleViewDetails}>
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
