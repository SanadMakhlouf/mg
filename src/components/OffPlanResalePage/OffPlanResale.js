import React from "react";
import "./OffPlanResale.css";
import OffPlanHero from "../OffPlanPage/OffPlanHero";
import OffPlanBanner from "../OffPlanPage/OffPlanBanner";
import OffPlanGrid from "../OffPlanPage/OffPlanGrid";
import OffPlanContact from "../OffPlanPage/OffPlanContact";

const OffPlanResale = () => {
  return (
    <div className="off-plan-page">
      <OffPlanHero />
      <div className="off-plan-container">
        <OffPlanBanner />
        <OffPlanGrid />
        <OffPlanContact />
      </div>
    </div>
  );
};

export default OffPlanResale;
