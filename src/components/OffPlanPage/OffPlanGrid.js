import React from "react";
import "./OffPlanGrid.css";
import mainImage from "../../assets/off-plans/plan1.jpg";
import plan2 from "../../assets/off-plans/plan2.jpg";
import plan3 from "../../assets/off-plans/plan3.jpg";
import plan1 from "../../assets/off-plans/26a72632833160bb0c0aa176f87feb859f8805b8 (1).jpg";
import ds from "../../assets/off-plans/ds.png";
import PropertyCard from "../PropertyCard/PropertyCard";

const OffPlanGrid = () => {
  return (
    <div className="off-plan-projects-section">
      <h2 className="section-title">OFF PLAN PROJECTS</h2>

      <div className="off-plan-featured-grid">
        {/* Grande carte à gauche */}
        <div className="off-plan-featured-card">
          <div className="off-plan-image-container">
            <img
              src={mainImage}
              alt="Project Name"
              className="off-plan-image"
            />
            <div className="bookmark-icon">
              <i className="far fa-bookmark"></i>
            </div>
            <div className="off-plan-content">
              <h3 className="project-title">PROJECT NAME</h3>
              <h4 className="project-subtitle">HORIZON HEIGHTS</h4>
              <p className="project-developer">By: Emaar Properties</p>
              <p className="project-type">Apartment & Villas</p>
              <p className="project-location">Yas Island, Abu Dhabi</p>
              <button className="enquire-btn">ENQUIRE NOW</button>
            </div>
          </div>
        </div>

        {/* Conteneur pour les cartes de droite */}
        <div className="off-plan-right-cards">
          {/* Carte en haut à droite */}
          <div className="off-plan-right-card">
            <div className="off-plan-image-container">
              <img src={plan1} alt="Project Name" className="off-plan-image" />
              <div className="bookmark-icon">
                <i className="far fa-bookmark"></i>
              </div>
              <div className="off-plan-content">
                <h3 className="project-title">PROJECT NAME</h3>
                <p className="project-type">Apartment & Villa</p>
                <p className="project-location">Yas Island, Abu Dhabi</p>
              </div>
            </div>
          </div>

          {/* Cartes en bas à droite */}
          <div className="off-plan-bottom-cards">
            <div className="off-plan-small-card">
              <div className="off-plan-image-container">
                <img
                  src={plan2}
                  alt="Project Name"
                  className="off-plan-image"
                />
                <div className="bookmark-icon">
                  <i className="far fa-bookmark"></i>
                </div>
              </div>
            </div>
            <div className="off-plan-small-card">
              <div className="off-plan-image-container">
                <img
                  src={plan3}
                  alt="Project Name"
                  className="off-plan-image"
                />
                <div className="bookmark-icon">
                  <i className="far fa-bookmark"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nouvelle section */}
      <div className="off-plan-second-grid">
        <div className="left-column">
          {/* Carte projet en haut */}
          <div className="project-card">
            <div className="off-plan-image-container">
              <img src={plan2} alt="Project Name" className="off-plan-image" />
              <div className="off-plan-content">
                <h3 className="project-title">PROJECT NAME</h3>
                <h4 className="project-subtitle">LUXURY RESIDENCE</h4>
                <p className="project-developer">By: Premium Developers</p>
                <p className="project-type">Premium Apartments</p>
                <p className="project-location">Downtown, Abu Dhabi</p>
                <button className="enquire-btn">LEARN MORE</button>
              </div>
            </div>
          </div>

          {/* PropertyCard en bas */}
          <PropertyCard
            image={plan3}
            title="Ocean Breeze Villa"
            price="3,281,888"
            beds="5"
            baths="5"
            sqft="500"
            location="Al Danah - Abou Dabi"
          />
        </div>

        {/* Image à droite */}
        <div className="right-column">
          <img src={ds} alt="Development" className="full-height-image" />
        </div>
      </div>

      {/* Grille de cartes 2x3 */}
      <div className="property-cards-grid">
        {/* Première ligne */}
        <PropertyCard
          image={plan1}
          title="Palm Vista Residence"
          price="2,450,000"
          beds="3"
          baths="3"
          sqft="180"
          location="Palm Jumeirah, Dubai"
        />
        <PropertyCard
          image={plan2}
          title="Marina Heights Tower"
          price="1,850,000"
          beds="2"
          baths="2"
          sqft="120"
          location="Dubai Marina"
        />
        <PropertyCard
          image={plan3}
          title="Downtown Luxury Loft"
          price="3,100,000"
          beds="4"
          baths="4"
          sqft="220"
          location="Downtown Dubai"
        />

        {/* Deuxième ligne */}
        <PropertyCard
          image={mainImage}
          title="Sunset Bay View"
          price="4,200,000"
          beds="5"
          baths="6"
          sqft="350"
          location="Jumeirah Beach"
        />
        <PropertyCard
          image={plan2}
          title="Garden Valley Estate"
          price="2,800,000"
          beds="4"
          baths="3"
          sqft="200"
          location="Arabian Ranches"
        />
        <PropertyCard
          image={plan1}
          title="Sky High Penthouse"
          price="5,500,000"
          beds="6"
          baths="7"
          sqft="400"
          location="Business Bay"
        />
      </div>
    </div>
  );
};

export default OffPlanGrid;
