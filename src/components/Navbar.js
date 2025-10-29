import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPropertiesDropdown, setShowPropertiesDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e) => {
      if (isMobileMenuOpen && !e.target.closest('.navbar-container')) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("keydown", handleEscape);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const togglePropertiesDropdown = () => {
    setShowPropertiesDropdown(!showPropertiesDropdown);
  };

  return (
    <nav className={`navbar ${isScrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Hamburger Menu Button */}
        <button
          className={`hamburger-menu ${isMobileMenuOpen ? "open" : ""}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div
          className={`navbar-links ${isMobileMenuOpen ? "mobile-open" : ""}`}
          onClick={(e) => {
            // Close menu when clicking on navbar-links itself or any link
            if (e.target.tagName === 'A' || e.target.classList.contains('navbar-links')) {
              setIsMobileMenuOpen(false);
              setShowPropertiesDropdown(false);
            }
          }}
        >
          <Link to="/">
            HOME
          </Link>
          <div className="dropdown-container">
            <div
              className="dropdown-trigger"
              onMouseEnter={() =>
                !isMobileMenuOpen && setShowPropertiesDropdown(true)
              }
              onMouseLeave={() =>
                !isMobileMenuOpen && setShowPropertiesDropdown(false)
              }
              onClick={() =>
                isMobileMenuOpen &&
                setShowPropertiesDropdown(!showPropertiesDropdown)
              }
            >
              <span>PROPERTIES</span>
              <div
                className={`dropdown-menu ${
                  showPropertiesDropdown ? "show" : ""
                }`}
              >
                <Link to="/buy">
                  BUY
                </Link>
                <Link to="/rent">
                  RENT
                </Link>
                <Link to="/off-plan-properties-resale">
                  OFF PLAN RESALE
                </Link>
              </div>
            </div>
          </div>
          <Link to="/services">
            SERVICES
          </Link>
          <Link to="/about">
            ABOUT US
          </Link>
          <Link to="/blog">
            BLOG
          </Link>
          <Link to="/contact">
            CONTACT
          </Link>
          <Link
            to="/off-plan-properties"
            className="list-property-btn"
          >
            OFF PLAN
          </Link>
          {/* Investment Plan button hidden temporarily */}
          {/* <button className="investment-plan-btn">INVESTMENT PLAN</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
