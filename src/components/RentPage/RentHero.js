import React from "react";
import "./RentHero.css";

const RentHero = () => {
  return (
    <div className="rent-hero">
      <div className="rent-hero-content">
        <h1>Rent</h1>
        <div className="rent-hero-breadcrumb">
          <span>Home</span>
          <span>/</span>
          <span>Properties</span>
          <span>/</span>
          <span>Rent</span>
        </div>
      </div>
    </div>
  );
};

export default RentHero;
