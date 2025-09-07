import React from "react";
import "./OffPlanGrid.css";
import mainImage from "../../assets/off-plans/plan1.jpg";
import plan2 from "../../assets/off-plans/plan2.jpg";
import plan3 from "../../assets/off-plans/plan3.jpg";
import plan1 from "../../assets/off-plans/26a72632833160bb0c0aa176f87feb859f8805b8 (1).jpg";

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
    </div>
  );
};

export default OffPlanGrid;
