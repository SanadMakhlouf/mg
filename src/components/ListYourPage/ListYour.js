import React from "react";
import SEO from "../SEO";
import "./ListYour.css";
import ListYourHero from "./ListYourHero";
import ListYourBanner from "./ListYourBanner";
import ListYourForm from "./ListYourForm";

const ListYour = () => {
  return (
    <>
      <SEO
        title="List Your Property | Meridian Group Real Estate"
        description="List your property with Meridian Group for maximum exposure. Professional marketing, expert agents, and seamless property management services in Abu Dhabi."
        keywords="list property Abu Dhabi, sell property Abu Dhabi, property listing service, real estate listing UAE"
        url="https://meridiangroup.ae/list-your-property"
        image="https://meridiangroup.ae/logo.png"
      />
      <div className="list-your-page">
        <ListYourHero />
        <div className="list-your-container">
          <ListYourBanner />
        </div>
        <ListYourForm />
      </div>
    </>
  );
};

export default ListYour;
