import React from "react";
import "./Services.css";

const Services = () => {
  const services = [
    {
      title: "Property Management",
      description: "Comprehensive property management services that protect and enhance your investment. We handle maintenance, tenant relations, and revenue optimization while preserving long-term value.",
      icon: "fa-solid fa-building",
    },
    {
      title: "Property Valuation",
      description: "Accurate, data-driven property assessments using advanced market analysis. Get the precise valuation you need to make informed investment and sales decisions.",
      icon: "fa-solid fa-chart-line",
    },
    {
      title: "Property Listing & Marketing",
      description: "Strategic listing and marketing solutions that maximize your property's visibility. We leverage multiple channels and proven strategies to attract qualified buyers and tenants.",
      icon: "fa-solid fa-bullhorn",
    },
    {
      title: "Investment Consultation",
      description: "Expert guidance on property investments and development opportunities in Abu Dhabi. Our consultants provide strategic insights to help you achieve your financial goals.",
      icon: "fa-solid fa-handshake",
    },
  ];

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
        <p>
          Meridian Group delivers end-to-end real estate services tailored to your unique needs. 
          From strategic property management to expert consultation, we provide the expertise and 
          support necessary for your success.
        </p>
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-icon">
                <i className={service.icon}></i>
          </div>
              <h3>{service.title}</h3>
              <p>{service.description}</p>
          </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
