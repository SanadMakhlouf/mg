import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// Custom link component that scrolls to top when clicked
const ScrollToTopLink = ({ to, children, ...props }) => {
  const handleClick = () => {
    window.scrollTo(0, 0);
  };

  return (
    <Link to={to} onClick={handleClick} {...props}>
      {children}
    </Link>
  );
};

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <img src={logo} alt="MG" className="footer-logo" />
          <div className="social-icons">
            <a
              href="https://www.facebook.com/p/Meridian-Group-61555497801970/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <img src="/fb-footer.png" alt="Facebook" />
            </a>
            <a
              href="https://www.instagram.com/meridiangroupuae/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <img src="/insta-footer.png" alt="Instagram" />
            </a>
            <a
              href="https://wa.me/971586830401"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
            >
              <img src="/whats-footer.png" alt="WhatsApp" />
            </a>
            <a
              href="https://www.tiktok.com/@meridian_group"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="TikTok"
            >
              <img src="/tk-footer.png" alt="TikTok" />
            </a>
          </div>
        </div>

        <div className="footer-links">
          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <ScrollToTopLink to="/about">About Us</ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/about#trusted-agents">
                  Our Agents
                </ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/blog">Latest Blog</ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/contact">Contact Us</ScrollToTopLink>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Resources</h3>
            <ul>
              <li>
                <ScrollToTopLink to="/rent">Rent A Property</ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/buy">Buy A Property</ScrollToTopLink>
              </li>
              <li>
                <ScrollToTopLink to="/sell">Sell A Property</ScrollToTopLink>
              </li>
              {/* Investment Plan button hidden temporarily */}
              {/* <li>
                <Link to="/investment">Investment Plan</Link>
              </li> */}
            </ul>
          </div>

          <div className="footer-column">
            <h3>Contact Us</h3>
            <ul>
              <li>
                <ScrollToTopLink to="/contact">Get in Touch</ScrollToTopLink>
              </li>
              <li>
                <a href="mailto:info@meridiangroup.ae">info@meridiangroup.ae</a>
              </li>
              <li className="phone-number">+971 586830401</li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Address</h3>
            <p>
              Office 55, Baynunah Tower 2,
              <br />
              Al Hosn, Abu Dhabi
              <br />
              0000
            </p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>Copyright© 2025 MERIDIAN GROUP. All Rights Reserved</p>
        <div className="footer-bottom-links">
          <ScrollToTopLink to="/privacy">Privacy Policy</ScrollToTopLink>
          <ScrollToTopLink to="/terms">Terms & Conditions</ScrollToTopLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
