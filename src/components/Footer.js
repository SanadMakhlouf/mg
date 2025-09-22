import React from "react";
import "./Footer.css";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

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
                <Link to="/about">About Us</Link>
              </li>
              <li>
                <Link to="/about#trusted-agents">Our Agents</Link>
              </li>
              <li>
                <Link to="/blog">Latest Blog</Link>
              </li>
              <li>
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Ressources</h3>
            <ul>
              <li>
                <Link to="/rent">Rent A Proprety</Link>
              </li>
              <li>
                <Link to="/buy">Buy A Proprety</Link>
              </li>
              <li>
                <Link to="/sell">Sell A Proprety</Link>
              </li>
              <li>
                <Link to="/investment">Investment Plan</Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Say Hello ?</h3>
            <ul>
              <li>
                <Link to="/support">Need Support ?</Link>
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
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/terms">Terms & Conditions</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
