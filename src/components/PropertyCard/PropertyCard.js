import React from "react";
import { useNavigate } from "react-router-dom";
import "./PropertyCard.css";

const PropertyCard = ({
  id = "1", // Default ID for existing cards
  image,
  title,
  price,
  beds,
  baths,
  sqft,
  location = "Al Danah - Abou Dabi - Émirats arabes unis",
  onViewDetails,
  isHotDeal = false,
}) => {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    if (onViewDetails) {
      onViewDetails();
    } else {
      navigate(`/property/${id}`);
    }
  };
  return (
    <div
      className="property-card"
      onClick={handleViewDetails}
      style={{ cursor: "pointer" }}
    >
      <img src={image} alt={title} className="property-image" />
      {isHotDeal && <div className="hot-deal-badge">HOT DEAL</div>}
      <div className="property-location">
        <i className="fa-solid fa-location-dot"></i> {location}
      </div>
      <div className="property-details">
        <div className="property-info">
          <div className="info-item-l">
            <span>
              {beds} <i className="fa-solid fa-bed"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Beds</span>
          </div>
          <div className="info-item-l">
            <span>
              {baths} <i className="fa-solid fa-bath"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Baths</span>
          </div>
          <div className="info-item-l">
            <span>
              {sqft} <i className="fa-solid fa-ruler-combined"></i>
            </span>
            <span style={{ color: "#A8A8A8" }}>Square Ft</span>
          </div>
        </div>
        <div className="property-title-price">
          <h3 className="property-title">{title}</h3>
          <div className="price-container">
            <p className="property-price">{price} AED</p>
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
