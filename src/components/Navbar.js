import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [showPropertiesDropdown, setShowPropertiesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
        <div className="navbar-links">
          <Link to="/">HOME</Link>
          <div className="dropdown-container">
            <div
              className="dropdown-trigger"
              onMouseEnter={() => setShowPropertiesDropdown(true)}
              onMouseLeave={() => setShowPropertiesDropdown(false)}
            >
              <span>PROPERTIES</span>
              <div
                className={`dropdown-menu ${
                  showPropertiesDropdown ? "show" : ""
                }`}
              >
                <Link to="/buy">BUY</Link>
                <Link to="/rent">RENT</Link>
                <Link to="/off-plan-properties">OFF PLANS</Link>
              </div>
            </div>
          </div>
          <Link to="/services">SERVICES</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <Link to="/off-plan-properties" className="list-property-btn">
            OFF PLANS
          </Link>
          {/* Investment Plan button hidden temporarily */}
          {/* <button className="investment-plan-btn">INVESTMENT PLAN</button> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
