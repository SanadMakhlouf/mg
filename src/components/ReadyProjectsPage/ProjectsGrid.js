import React from "react";
import "./ProjectsGrid.css";

const ProjectsGrid = () => {
  // Données factices pour les projets
  const projects = [
    {
      id: 1,
      name: "BEACH MANSION",
      location: "Dubai Marina",
      image: require("../../assets/ready-projet/projet1.jpg"),
      size: "large",
    },
    {
      id: 2,
      name: "DUBAI",
      location: "Downtown Dubai",
      image: require("../../assets/ready-projet/projet2.jpg"),
      size: "large",
    },
    {
      id: 3,
      name: "PROJECT NAME",
      location: "Business Bay",
      image: require("../../assets/ready-projet/projet3.jpg"),
      size: "large",
    },
    {
      id: 4,
      name: "FERRARI WORLD",
      location: "Yas Island",
      image: require("../../assets/ready-projet/projet4.jpg"),
      size: "small",
    },
    {
      id: 5,
      name: "SKYSCRAPERS",
      location: "Sheikh Zayed Road",
      image: require("../../assets/ready-projet/projet5.jpg"),
      size: "small",
    },
    {
      id: 6,
      name: "BURJ KHALIFA",
      location: "Downtown Dubai",
      image: require("../../assets/ready-projet/projet6.jpg"),
      size: "small",
    },
    {
      id: 7,
      name: "PROJECT NAME",
      location: "Palm Jumeirah",
      image: require("../../assets/ready-projet/projet7.jpg"),
      size: "large",
    },
    {
      id: 8,
      name: "YAS ISLAND",
      location: "Abu Dhabi",
      image: require("../../assets/ready-projet/projet8.jpg"),
      size: "medium",
    },
    {
      id: 9,
      name: "PROJECT NAME",
      location: "Abu Dhabi",
      image: require("../../assets/ready-projet/projet9.jpg"),
      size: "large",
    },
    {
      id: 10,
      name: "WILD WADI",
      location: "Jumeirah",
      image: require("../../assets/ready-projet/projet10.jpg"),
      size: "small",
    },
    {
      id: 11,
      name: "MADINAT JUMEIRAH",
      location: "Jumeirah",
      image: require("../../assets/ready-projet/projet11.jpg"),
      size: "small",
    },
    {
      id: 12,
      name: "DESERT SAFARI",
      location: "Dubai Desert",
      image: require("../../assets/ready-projet/projet12.jpg"),
      size: "small",
    },
  ];

  // Section d'information sur la recherche de propriétés
  const findPropertyInfo = {
    title: "Find Proprety For your Fam!",
    description:
      "We are here to help you find your dream property with personalized service and expert advice. Our team is dedicated to understanding your needs and preferences.",
    contactInfo: [
      { icon: "/loca.png", text: "123 Sheikh Zayed Road, Dubai, UAE" },
      { icon: "/ime.png", text: "info@mgreal.com" },
      { icon: "/phone.png", text: "+971 50 123 4567" },
      { icon: "/time.png", text: "Mon-Sat: 9am - 6pm" },
    ],
  };

  return (
    <div className="projects-section">
      <h2 className="section-title">READY Projects</h2>

      <div className="projects-grid">
        {/* Première rangée */}
        <div className="top-grid">
          <div className="projects-cards">
            <div className="project-card">
              <div
                className="project-image"
                style={{ backgroundImage: `url(${projects[0].image})` }}
              >
                <div className="play-button">
                  <span>▶</span>
                </div>
                <div className="project-info">
                  <h3>{projects[0].name}</h3>
                  <p>{projects[0].location}</p>
                </div>
              </div>
            </div>

            <div className="project-card">
              <div
                className="project-image"
                style={{ backgroundImage: `url(${projects[1].image})` }}
              >
                <div className="play-button">
                  <span>▶</span>
                </div>
                <div className="project-info">
                  <h3>{projects[1].name}</h3>
                  <p>{projects[1].location}</p>
                </div>
              </div>
            </div>

            <div className="project-card large">
              <div
                className="project-image"
                style={{ backgroundImage: `url(${projects[2].image})` }}
              >
                <div className="play-button">
                  <span>▶</span>
                </div>
                <div className="project-info">
                  <h3>{projects[2].name}</h3>
                  <p>{projects[2].location}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="find-property-card">
            <span className="keep-close">KEEP CLOSE AND</span>
            <h3>{findPropertyInfo.title}</h3>
            <p>{findPropertyInfo.description}</p>
            <div className="contact-info">
              {findPropertyInfo.contactInfo.map((info, index) => (
                <div key={index} className="info-item">
                  <img src={info.icon} alt={info.text} />
                  <p>{info.text}</p>
                </div>
              ))}
            </div>
            <div className="divider"></div>
            <button className="contact-btn">CONTACT US</button>
          </div>
        </div>

        {/* Deuxième rangée */}

        {/* Troisième rangée */}
        <div className="grid-row small-cards">
          <div className="project-card small">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[3].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[3].name}</h3>
                <p>{projects[3].location}</p>
              </div>
            </div>
          </div>

          <div className="project-card small">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[4].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[4].name}</h3>
                <p>{projects[4].location}</p>
              </div>
            </div>
          </div>

          <div className="project-card small">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[5].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[5].name}</h3>
                <p>{projects[5].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Quatrième rangée */}
        <div className="grid-row">
          <div className="project-card large">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[6].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[6].name}</h3>
                <p>{projects[6].location}</p>
              </div>
            </div>
          </div>

          <div className="project-card medium">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[7].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[7].name}</h3>
                <p>{projects[7].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Cinquième rangée */}
        <div className="grid-row">
          <div className="project-card large full-width">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[8].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[8].name}</h3>
                <p>{projects[8].location}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Sixième rangée */}
        <div className="grid-row small-cards">
          <div className="project-card small">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[9].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[9].name}</h3>
                <p>{projects[9].location}</p>
              </div>
            </div>
          </div>

          <div className="project-card small">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[10].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[10].name}</h3>
                <p>{projects[10].location}</p>
              </div>
            </div>
          </div>

          <div className="project-card small">
            <div
              className="project-image"
              style={{ backgroundImage: `url(${projects[11].image})` }}
            >
              <div className="play-button">
                <span>▶</span>
              </div>
              <div className="project-info">
                <h3>{projects[11].name}</h3>
                <p>{projects[11].location}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGrid;
