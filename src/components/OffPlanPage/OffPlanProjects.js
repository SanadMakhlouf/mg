import React from "react";
import "./OffPlanProjects.css";
import plan1 from "../../assets/off-plans/plan1.jpg";
import plan2 from "../../assets/off-plans/plan2.jpg";
import plan3 from "../../assets/off-plans/plan3.jpg";
import card from "../../assets/off-plans/card.jpg";
import ds from "../../assets/off-plans/ds.png";

const OffPlanProjects = () => {
  const projects = [
    {
      id: 1,
      image: plan1,
      title: "Luxury Apartment Complex",
      location: "Downtown",
      price: "$1,200,000",
      completion: "Q4 2024",
    },
    {
      id: 2,
      image: plan2,
      title: "Modern Townhouses",
      location: "Suburban Area",
      price: "$800,000",
      completion: "Q2 2024",
    },
    {
      id: 3,
      image: plan3,
      title: "Premium Residences",
      location: "Waterfront",
      price: "$2,500,000",
      completion: "Q1 2025",
    },
    {
      id: 4,
      image: card,
      title: "Urban Apartments",
      location: "City Center",
      price: "$950,000",
      completion: "Q3 2024",
    },
    {
      id: 5,
      image: ds,
      title: "Luxury Villas",
      location: "Exclusive Area",
      price: "$3,200,000",
      completion: "Q4 2024",
    },
  ];

  return (
    <div className="off-plan-projects">
      <div className="off-plan-projects-grid">
        {projects.map((project) => (
          <div key={project.id} className="project-card">
            <div className="project-image">
              <img src={project.image} alt={project.title} />
              <div className="project-overlay">
                <button className="view-details">View Details</button>
              </div>
            </div>
            <div className="project-info">
              <h3>{project.title}</h3>
              <p className="location">{project.location}</p>
              <div className="project-details">
                <p className="price">Starting from {project.price}</p>
                <p className="completion">Completion: {project.completion}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OffPlanProjects;
