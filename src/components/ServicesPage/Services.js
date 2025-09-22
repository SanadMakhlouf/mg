import React from "react";
import "./Services.css";

const Services = () => {
  return (
    <div className="services-page">
      <div className="services-hero">
        <div className="services-hero-content">
          <h1>Our Services</h1>
          <div className="services-hero-breadcrumb">
            <span>Home</span> / <span>Services</span>
          </div>
        </div>
      </div>
      <div className="services-container">
        <h2>Our Services</h2>
        <p>We offer a wide range of real estate services to meet your needs.</p>
        <div className="services-grid">
          <div className="service-card">
            <h3>Property Management</h3>
            <p>
              Professional management of residential and commercial properties.
            </p>
          </div>
          <div className="service-card">
            <h3>Property Valuation</h3>
            <p>Accurate assessment of property value based on market trends.</p>
          </div>
          <div className="service-card">
            <h3>Property Listing</h3>
            <p>Comprehensive listing services for property owners.</p>
          </div>
          <div className="service-card">
            <h3>Property Consultation</h3>
            <p>Expert advice on property investment and development.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
