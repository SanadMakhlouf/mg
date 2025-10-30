import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./TeamSection.css";

const TeamSection = () => {
  const navigate = useNavigate();
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/agents`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status === "success" && Array.isArray(data.data)) {
          // Limit to first 3 agents for homepage
          const formattedAgents = data.data.slice(0, 3).map((agent) => ({
            id: agent.id,
            name: agent.name || "Team Member",
            title: agent.job_title || "Property Expert",
            image: agent.photo_url
              ? agent.photo_url.startsWith("http")
                ? agent.photo_url
                : `${config.API_URL.replace("/api/v1", "")}/storage/${agent.photo_url}`
              : "/test.jpg",
            phone: "+971 586830401",
            email: agent.email || "info@meridiangroup.ae"
          }));

          setAgents(formattedAgents);
        }
      } catch (err) {
        console.error("Error fetching agents:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  if (loading) {
    return (
      <section className="team-section">
        <div className="container">
          <p>Loading team members...</p>
        </div>
      </section>
    );
  }

  if (agents.length === 0) {
    return null;
  }

  return (
    <section className="team-section">
      <div className="container">
        <div className="team-header">
          <div className="team-header-left">
            <span className="team-bg-text">TEAM</span>
            <h2 className="team-title">
              <span className="team-title-small">Our</span>
              <br />
              Team Member
            </h2>
            <p className="team-description">
              We are a real estate firm with over 15 years of expertise. We provide amazing locations to our partners and clients.
            </p>
          </div>
          <div className="team-header-right">
            <button 
              className="team-view-all-btn"
              onClick={() => navigate("/about")}
            >
              View All Members
              <i className="fa-solid fa-arrow-right"></i>
            </button>
          </div>
        </div>

        <div className="team-grid">
          {agents.map((agent) => (
            <div key={agent.id} className="team-card">
              <div className="team-card-image">
                <img src={agent.image} alt={agent.name} />
                <div className="team-card-overlay">
                  <div className="team-card-info">
                    <h3 className="team-member-name">{agent.name}</h3>
                    <p className="team-member-title">{agent.title}</p>
                  </div>
                  <button 
                    className="team-contact-icon"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.location.href = `tel:${agent.phone}`;
                    }}
                  >
                    <i className="fa-solid fa-phone"></i>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;

