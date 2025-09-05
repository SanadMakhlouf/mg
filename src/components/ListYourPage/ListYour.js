import React from "react";
import "./ListYour.css";
import ListYourHero from "./ListYourHero";
import ListYourBanner from "./ListYourBanner";
import ListYourForm from "./ListYourForm";

const ListYour = () => {
  return (
    <div className="list-your-page">
      <ListYourHero />
      <div className="list-your-container">
        <ListYourBanner />
      </div>
      <ListYourForm />
    </div>
  );
};

export default ListYour;
