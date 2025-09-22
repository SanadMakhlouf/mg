import React from "react";
import "./TrustedAgents.css";
import user1 from "../../assets/about-us/user1.jpg";
import user2 from "../../assets/about-us/user2.jpg";
import user3 from "../../assets/about-us/user3.jpg";
import user4 from "../../assets/about-us/user4.jpg";
// Using the existing images for CEO and CTO, you can replace these with actual images later

const TrustedAgents = () => {
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
                <img src={user1} alt="CEO" />
              </div>
              <div className="executive-info">
                <h3>John Smith</h3>
                <p className="executive-title">Chief Executive Officer</p>
                <div className="executive-description">
                  <p>
                    With over 20 years of experience in real estate development
                    and investment, John has led the company to new heights
                    since its founding. His vision for sustainable growth and
                    commitment to excellence has established Meridian Group as a
                    leader in the UAE real estate market.
                  </p>
                  <p>
                    John holds an MBA from Harvard Business School and has
                    previously served as Director of Operations at several
                    prestigious international real estate firms.
                  </p>
                </div>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" aria-label="Email">
                    <i className="fas fa-envelope"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* CTO */}
            <div className="executive-card">
              <div className="executive-image">
                <img src={user2} alt="CTO" />
              </div>
              <div className="executive-info">
                <h3>Sarah Johnson</h3>
                <p className="executive-title">Chief Technology Officer</p>
                <div className="executive-description">
                  <p>
                    Sarah brings innovative technological solutions to Meridian
                    Group's operations, overseeing digital transformation and
                    implementing cutting-edge property technology. Her expertise
                    in PropTech has revolutionized how we connect clients with
                    their perfect properties.
                  </p>
                  <p>
                    With a background in Computer Science and Real Estate
                    Management, Sarah previously led technology initiatives at
                    major property management firms and tech startups in Dubai
                    and London.
                  </p>
                </div>
                <div className="social-icons">
                  <a href="#" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                  <a href="#" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
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
          <div className="agents-grid">
            <div className="agent-card">
              <div className="agent-image">
                <img src={user1} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user2} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user3} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user4} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user1} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user2} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user3} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>

            <div className="agent-card">
              <div className="agent-image">
                <img src={user4} alt="Agent" />
              </div>
              <h3>FULL NAME</h3>
              <p>JOB OR SOMETHING</p>
              <div className="social-icons">
                <a href="#" aria-label="Facebook">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" aria-label="LinkedIn">
                  <i className="fab fa-linkedin-in"></i>
                </a>
                <a href="#" aria-label="Twitter">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" aria-label="Instagram">
                  <i className="fab fa-instagram"></i>
                </a>
                <a href="#" aria-label="WhatsApp">
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrustedAgents;
