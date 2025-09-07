import React from "react";
import "./OffPlan.css";
import OffPlanHero from "./OffPlanHero";
import OffPlanBanner from "./OffPlanBanner";
import OffPlanGrid from "./OffPlanGrid";
import OffPlanContact from "./OffPlanContact";

const OffPlan = () => {
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

export default OffPlan;
