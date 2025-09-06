import React from "react";
import "./ReadyProjects.css";
import ReadyProjectsHero from "./ReadyProjectsHero";
import ReadyProjectsBanner from "./ReadyProjectsBanner";
import ProjectsGrid from "./ProjectsGrid";
import ReadyProjectsContact from "./ReadyProjectsContact";

const ReadyProjects = () => {
  return (
    <div className="ready-projects-page">
      <ReadyProjectsHero />
      <div className="ready-projects-container">
        <ReadyProjectsBanner />
        <ProjectsGrid />
        <ReadyProjectsContact />
      </div>
    </div>
  );
};

export default ReadyProjects;
