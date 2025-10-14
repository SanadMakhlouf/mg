import React from "react";
import "./OffPlanResale.css";
import OffPlanHero from "../OffPlanPage/OffPlanHero";
import OffPlanBanner from "../OffPlanPage/OffPlanBanner";
import OffPlanResaleGrid from "./OffPlanResaleGrid";
import OffPlanContact from "../OffPlanPage/OffPlanContact";

const OffPlanResale = () => {
  return (
    <div className="off-plan-page">
      <OffPlanHero />
      <div className="off-plan-container">
        <OffPlanBanner />
        <OffPlanResaleGrid />
        <OffPlanContact />
      </div>
    </div>
  );
};

export default OffPlanResale;
