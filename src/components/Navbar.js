import React from "react";
import "./Navbar.css";
import logo from "../assets/logo.png";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img src={logo} alt="logo" />
        </div>
        <div className="navbar-links">
          <a href="#home">HOME</a>
          <a href="#properties">PROPERTIES</a>
          <a href="#services">SERVICES</a>
          <a href="#about">ABOUT US</a>
          <a href="#contact">CONTACT</a>
          <button className="list-property-btn">LIST PROPERTY</button>
          <button className="investment-plan-btn">INVESTMENT PLAN</button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
