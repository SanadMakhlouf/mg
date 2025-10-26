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
        <h2>Comprehensive Real Estate Solutions</h2>
        <p>Meridian Group delivers end-to-end real estate services tailored to your unique needs. From strategic property management to expert consultation, we provide the expertise and support necessary for your success.</p>
        <div className="services-grid">
          <div className="service-card">
            <h3>Property Management</h3>
            <p>
              Comprehensive property management services that protect and enhance your investment. We handle maintenance, tenant relations, and revenue optimization while preserving long-term value.
            </p>
          </div>
          <div className="service-card">
            <h3>Property Valuation</h3>
            <p>Accurate, data-driven property assessments using advanced market analysis. Get the precise valuation you need to make informed investment and sales decisions.</p>
          </div>
          <div className="service-card">
            <h3>Property Listing & Marketing</h3>
            <p>Strategic listing and marketing solutions that maximize your property's visibility. We leverage multiple channels and proven strategies to attract qualified buyers and tenants.</p>
          </div>
          <div className="service-card">
            <h3>Investment Consultation</h3>
            <p>Expert guidance on property investments and development opportunities in Abu Dhabi. Our consultants provide strategic insights to help you achieve your financial goals.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
