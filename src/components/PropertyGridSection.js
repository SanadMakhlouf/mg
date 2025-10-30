import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./PropertyGridSection.css";

const PropertyGridSection = () => {
  const navigate = useNavigate();
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/properties/search/advanced?listing_type=sale`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const properties = Array.isArray(result.data) ? result.data : [result.data];
          
          // Group properties by type
          const typeMap = {};
          properties.forEach((property) => {
            const type = property.type || "apartment";
            if (!typeMap[type]) {
              typeMap[type] = {
                type: type,
                count: 0,
                image: property.pictures && property.pictures.length > 0
                  ? property.pictures[0].startsWith("http")
                    ? property.pictures[0]
                    : `${config.API_URL.replace("/api/v1", "")}/storage/${property.pictures[0]}`
                  : "/test.jpg"
              };
            }
            typeMap[type].count++;
          });

          // Convert to array and format type names
          const typesArray = Object.values(typeMap).map((item) => ({
            ...item,
            displayName: formatTypeName(item.type),
            searchUrl: `/buy?propertyType=${item.type}`
          }));

          // Sort by count (descending)
          typesArray.sort((a, b) => b.count - a.count);

          // Take up to 9 types
          setPropertyTypes(typesArray.slice(0, 9));
        }
        } catch (err) {
        // Error fetching properties
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  const formatTypeName = (type) => {
    const typeMap = {
      apartment: "Apartments",
      villa: "Villas",
      townhouse: "Townhouses",
      penthouse: "Penthouses",
      studio: "Studio",
      duplex: "Duplexes",
      office: "Office",
      commercial: "Commercial",
      shop: "Shops"
    };
    return typeMap[type] || type.charAt(0).toUpperCase() + type.slice(1) + "s";
  };

  if (loading) {
    return (
      <section className="property-grid-section">
        <div className="container">
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (propertyTypes.length === 0) {
    return null;
  }

  return (
    <section className="property-grid-section">
      <div className="container">
        <div className="property-grid-header">
          <h2 className="property-grid-title">Premium Properties Available</h2>
          <p className="property-grid-subtitle">Abu Dhabi</p>
          <p className="property-grid-description">
            Discover exclusive real estate opportunities in Abu Dhabi with Meridian Group. From luxury apartments to premium villas, find your perfect property in the UAE's capital.
          </p>
        </div>
        <div className="property-types-grid">
          {propertyTypes.map((propertyType, index) => (
            <div
              key={index}
              className="property-type-card"
              onClick={() => navigate(propertyType.searchUrl)}
            >
              <div className="property-type-image">
                <img src={propertyType.image} alt={propertyType.displayName} />
                <div className="property-type-overlay"></div>
              </div>
              <div className="property-type-content">
                <h3 className="property-type-name">{propertyType.displayName}</h3>
                <p className="property-type-count">{propertyType.count} {propertyType.count === 1 ? 'Listing' : 'Listings'}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyGridSection;

