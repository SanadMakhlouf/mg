import React from "react";
import logo from "../assets/logo.png";
import "./LoadingScreen.css";

const LoadingScreen = () => {
  return (
    <div className="loading-screen">
      <div className="loading-content">
        <img src={logo} alt="Meridian Group" className="loading-logo" />
      </div>
    </div>
  );
};

export default LoadingScreen;

