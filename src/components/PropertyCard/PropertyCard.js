import React from "react";
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

  const handleViewDetails = (e) => {
    e.stopPropagation(); // Empêche la propagation du clic
    const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    navigate(`/property/${id}/${slug}`);
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
        {permitNumber && (
          <div className="permit-number">
            <i className="fa-solid fa-certificate"></i> Permit: {permitNumber}
          </div>
        )}
      </div>
      <div className="property-details">
        <div className="property-info">
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
