import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./PropertyDetails.css";

const PropertyDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data for demonstration
  const mockProperties = [
    {
      id: "1",
      image: "/hero-bg.jpg",
      title: "OCEAN BREEZE VILLA",
      price: "3,281,888",
      beds: "5",
      baths: "5",
      sqft: "500",
      location: "Al Danah - Abu Dhabi - UAE",
      description:
        "Luxurious villa with stunning ocean views, modern design, and premium finishes. Features include a private pool, garden, and smart home technology.",
      amenities: [
        "Swimming Pool",
        "Garden",
        "Smart Home",
        "Security System",
        "Parking",
      ],
      isHotDeal: true,
      agent: {
        name: "Mohammed Al Mansoori",
        phone: "+971 50 123 4567",
        email: "mohammed@meridiagroup.ae",
        image: "/user1.png",
      },
    },
    {
      id: "2",
      image: "/hero-bg2.jpg",
      title: "SKYLINE APARTMENT",
      price: "1,950,000",
      beds: "3",
      baths: "2",
      sqft: "320",
      location: "Al Reem Island - Abu Dhabi - UAE",
      description:
        "Modern apartment with panoramic city views, contemporary design, and high-end appliances. Features include a balcony, gym access, and 24/7 security.",
      amenities: ["Balcony", "Gym", "Pool", "24/7 Security", "Parking"],
      agent: {
        name: "Sarah Al Hashimi",
        phone: "+971 50 987 6543",
        email: "sarah@meridiagroup.ae",
        image: "/user2.png",
      },
    },
    {
      id: "3",
      image: "/test.jpg",
      title: "DESERT OASIS VILLA",
      price: "4,500,000",
      beds: "6",
      baths: "7",
      sqft: "750",
      location: "Saadiyat Island - Abu Dhabi - UAE",
      description:
        "Exclusive villa with desert and sea views, featuring traditional and modern design elements. Includes a private pool, garden, and entertainment area.",
      amenities: [
        "Private Pool",
        "Garden",
        "Entertainment Area",
        "Smart Home",
        "Security",
      ],
      isHotDeal: true,
      agent: {
        name: "Ahmed Al Zaabi",
        phone: "+971 50 555 7777",
        email: "ahmed@meridiagroup.ae",
        image: "/user3.png",
      },
    },
    {
      id: "4",
      image: "/hero-bgg.jpg",
      title: "MARINA HEIGHTS",
      price: "2,800,000",
      beds: "4",
      baths: "3",
      sqft: "450",
      location: "Al Bateen - Abu Dhabi - UAE",
      description:
        "Spacious apartment with marina views, modern design, and premium finishes. Features include a balcony, shared pool, and gym access.",
      amenities: ["Balcony", "Pool", "Gym", "Security", "Parking"],
      agent: {
        name: "Fatima Al Mazrouei",
        phone: "+971 50 222 3333",
        email: "fatima@meridiagroup.ae",
        image: "/user4.png",
      },
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch property details
    setLoading(true);
    setTimeout(() => {
      const foundProperty = mockProperties.find((p) => p.id === id);
      if (foundProperty) {
        setProperty(foundProperty);
      } else {
        // If property not found, redirect to 404 or home
        navigate("/");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="property-details-container loading">
        <div className="loading-spinner">Loading...</div>
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

  return (
    <div className="property-details-container">
      <div className="property-details-header">
        <h1>{property.title}</h1>
        <div className="property-location-details">
          <i className="fa-solid fa-location-dot"></i> {property.location}
        </div>
      </div>

      <div className="property-main-content">
        <div className="property-images">
          <img
            src={property.image}
            alt={property.title}
            className="main-image"
          />
          {property.isHotDeal && (
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
              <span>{property.beds} Bedrooms</span>
            </div>
            <div className="feature">
              <i className="fa-solid fa-bath"></i>
              <span>{property.baths} Bathrooms</span>
            </div>
            <div className="feature">
              <i className="fa-solid fa-ruler-combined"></i>
              <span>{property.sqft} Square Ft</span>
            </div>
          </div>

          <div className="property-description">
            <h3>Description</h3>
            <p>{property.description}</p>
          </div>

          <div className="property-amenities">
            <h3>Amenities</h3>
            <ul>
              {property.amenities.map((amenity, index) => (
                <li key={index}>
                  <i className="fa-solid fa-check"></i> {amenity}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="property-agent-section">
        <h3>Property Agent</h3>
        <div className="agent-card">
          <div className="agent-image">
            <img src={property.agent.image} alt={property.agent.name} />
          </div>
          <div className="agent-info">
            <h4>{property.agent.name}</h4>
            <p>
              <i className="fa-solid fa-phone"></i> {property.agent.phone}
            </p>
            <p>
              <i className="fa-solid fa-envelope"></i> {property.agent.email}
            </p>
            <button className="contact-agent-btn">Contact Agent</button>
          </div>
        </div>
      </div>

      <div className="property-actions">
        <button className="action-btn schedule-btn">
          <i className="fa-solid fa-calendar"></i> Schedule Viewing
        </button>
        <button className="action-btn add-to-dashboard-btn">
          <i className="fa-solid fa-plus"></i> Add to Dashboard
        </button>
      </div>
    </div>
  );
};

export default PropertyDetails;
