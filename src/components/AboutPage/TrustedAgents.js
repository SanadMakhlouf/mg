import React, { useState, useEffect } from "react";
import "./TrustedAgents.css";
import user1 from "../../assets/about-us/user1.jpg";
import user2 from "../../assets/about-us/user2.jpg";
import ceoImage from "../../assets/Abdullah Chaar- CEO.png";
import cooImage from "../../assets/Greg MCEWEN- COO.png";
import config from "../../config";

const TrustedAgents = () => {
  const [agents, setAgents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        console.log("Fetching from:", `${config.API_URL}/agents`); // Debug log
        const response = await fetch(`${config.API_URL}/agents`, {
          method: "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          const errorText = await response.text();
          console.error("Response not OK:", {
            status: response.status,
            statusText: response.statusText,
            errorText,
          });
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        console.log("Received data:", data); // Debug log

        if (data.status === "success" && Array.isArray(data.data)) {
          setAgents(data.data);
        } else {
          console.error("API returned unexpected format", data);
          setError("Failed to fetch agents data");
        }
      } catch (err) {
        console.error("Error details:", {
          name: err.name,
          message: err.message,
          stack: err.stack,
        });
        if (err.message.includes("Failed to fetch")) {
          setError(
            "Could not connect to the server. Please check your internet connection or try again later."
          );
        } else {
          setError(`Error fetching agents: ${err.message}`);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);
  return (
    <>
      {/* Leadership Section */}
      <section className="leadership-section">
        <div className="container">
          <div className="section-title">
            <span className="subtitle">Our Leadership</span>
            <h2>Executive Team</h2>
          </div>

          <div className="leadership-grid">
            {/* CEO */}
            <div className="executive-card">
              <div className="executive-image">
                <img src={ceoImage} alt="Abdullah Chaar - CEO" />
              </div>
              <div className="executive-info">
                <h3>Abdullah Chaar</h3>
                <p className="executive-title">Chief Executive Officer</p>
                <div className="executive-description">
                  <p>
                    Abdullah Chaar leads Meridian Group with a vision of
                    excellence and innovation in the UAE real estate market. His
                    strategic leadership and deep understanding of the regional
                    market have positioned Meridian Group as a trusted name in
                    property services.
                  </p>
                  <p>
                    With extensive experience in real estate development and
                    investment, Abdullah brings a wealth of knowledge and
                    expertise to drive the company's growth and success in the
                    competitive UAE market.
                  </p>
                </div>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="Email">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* COO */}
            <div className="executive-card">
              <div className="executive-image">
                <img src={cooImage} alt="Greg McEwen - COO" />
              </div>
              <div className="executive-info">
                <h3>Greg McEwen</h3>
                <p className="executive-title">Chief Operating Officer</p>
                <div className="executive-description">
                  <p>
                    Greg McEwen oversees the day-to-day operations of Meridian
                    Group, ensuring operational excellence and efficient service
                    delivery across all business units. His operational
                    expertise and strategic planning capabilities drive the
                    company's continued growth and success.
                  </p>
                  <p>
                    With a strong background in operations management and
                    business development, Greg plays a crucial role in
                    maintaining Meridian Group's high standards of service
                    quality and client satisfaction in the competitive UAE real
                    estate market.
                  </p>
                </div>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="Email">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Agents Section */}
      <section id="trusted-agents" className="trusted-agents-section">
        <div className="section-title">
          <span className="subtitle">Our Qualified</span>
          <h2>Trusted Agents</h2>
        </div>

        <div className="container">
          {loading ? (
            <div className="loading-container">
              <p>Loading agents...</p>
            </div>
          ) : error ? (
            <div className="error-container">
              <p>{error}</p>
            </div>
          ) : (
            <div className="agents-grid">
              {agents.length > 0 ? (
                agents.map((agent) => (
                  <div className="agent-card" key={agent.id}>
                    <div className="agent-image">
                      <img
                        src={agent.photo_url || user1}
                        alt={agent.name || "Agent"}
                      />
                    </div>
                    <h3>{agent.name || "FULL NAME"}</h3>
                    <p>{agent.job_title || "Real Estate Agent"}</p>
                    <div className="social-icons">
                      {!agent.social_media ||
                      !Object.keys(agent.social_media).length ? (
                        <>
                          <a href="#" aria-label="Facebook">
                            <i className="fab fa-facebook-f"></i>
                          </a>
                          <a href="#" aria-label="LinkedIn">
                            <i className="fab fa-linkedin-in"></i>
                          </a>
                          <a href="#" aria-label="Instagram">
                            <i className="fab fa-instagram"></i>
                          </a>
                          <a href="#" aria-label="WhatsApp">
                            <i className="fab fa-whatsapp"></i>
                          </a>
                        </>
                      ) : (
                        <>
                          {agent.social_media.facebook && (
                            <a
                              href={agent.social_media.facebook}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Facebook"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </a>
                          )}
                          {agent.social_media.linkedin && (
                            <a
                              href={agent.social_media.linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="LinkedIn"
                            >
                              <i className="fab fa-linkedin-in"></i>
                            </a>
                          )}
                          {agent.social_media.instagram && (
                            <a
                              href={agent.social_media.instagram}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="Instagram"
                            >
                              <i className="fab fa-instagram"></i>
                            </a>
                          )}
                          {agent.social_media.whatsapp && (
                            <a
                              href={`https://wa.me/${agent.social_media.whatsapp}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label="WhatsApp"
                            >
                              <i className="fab fa-whatsapp"></i>
                            </a>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                ))
              ) : (
                <div className="no-agents-message">
                  <p>No agents found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default TrustedAgents;
