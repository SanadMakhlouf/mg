import React from "react";
import SEO from "../SEO";
import "./ReadyProjects.css";
import ReadyProjectsHero from "./ReadyProjectsHero";
import ReadyProjectsBanner from "./ReadyProjectsBanner";
import ProjectsGrid from "./ProjectsGrid";
import ReadyProjectsContact from "./ReadyProjectsContact";

const ReadyProjects = () => {
  return (
    <>
      <SEO
        title="Ready Projects | Completed Properties in Abu Dhabi | Meridian Group"
        description="Explore ready-to-move-in properties in Abu Dhabi. Browse completed apartments, villas, and commercial properties available for immediate occupancy."
        keywords="ready properties Abu Dhabi, completed projects Abu Dhabi, ready to move in properties, finished properties UAE"
        url="https://meridiangroup.ae/ready-projects"
        image="https://meridiangroup.ae/logo.png"
      />
      <div className="ready-projects-page">
        <ReadyProjectsHero />
        <div className="ready-projects-container">
          <ReadyProjectsBanner />
          <ProjectsGrid />
          <ReadyProjectsContact />
        </div>
      </div>
    </>
  );
};

export default ReadyProjects;
