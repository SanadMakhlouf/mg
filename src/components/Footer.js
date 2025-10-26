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
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/fb-footer.png" alt="Facebook" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/insta-footer.png" alt="Instagram" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/x-footer.png" alt="X" />
            </a>
            <a
              href="https://whatsapp.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src="/whats-footer.png" alt="WhatsApp" />
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
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
            <h3>Say Hello ?</h3>
            <ul>
              <li>
                <ScrollToTopLink to="/support">Need Support ?</ScrollToTopLink>
              </li>
              <li>
                <a href="mailto:info@meridiangroup.ae">info@meridiangroup.ae</a>
              </li>
              <li className="phone-number">(+97) 150607030</li>
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
        <p>Copyright© 2024 MERIDIAN GROUP. All Rights Reserved</p>
        <div className="footer-bottom-links">
          <ScrollToTopLink to="/privacy">Privacy Policy</ScrollToTopLink>
          <ScrollToTopLink to="/terms">Terms & Conditions</ScrollToTopLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
