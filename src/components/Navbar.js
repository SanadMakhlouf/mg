import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <div className="navbar-links">
          <Link to="/">HOME</Link>
          <Link to="/buy">PROPERTIES</Link>
          <Link to="/services">SERVICES</Link>
          <Link to="/about">ABOUT US</Link>
          <Link to="/contact">CONTACT</Link>
          <button className="list-property-btn">LIST PROPERTY</button>
          <button className="investment-plan-btn">INVESTMENT PLAN</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
