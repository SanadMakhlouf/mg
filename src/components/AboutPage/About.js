import React from "react";
import AboutHero from "./AboutHero";
import TrustedAgents from "./TrustedAgents";
import "./About.css";
import logo from "../../assets/about-us/Container.png";
import aboutUsImage from "../../assets/about-us/about-us.jpg";
import aboutUsImage2 from "../../assets/about-us/hero-bgg.jpg";
const About = () => {
  return (
    <div className="about-page">
      <AboutHero />

      <section className="meridian-group">
        <div className="container">
          <h2>Meridian Group</h2>
          <div className="content-wrapper">
            <div className="text-content">
              <p>
                Introducing the Meridian Group, a distinguished name in the real
                estate industry. Specializing in comprehensive real estate
                services, we serve as a dedicated agency for both leasing and
                selling properties, ensuring seamless transactions for all our
                clients. Beyond mere transactions, we take pride in our property
                management division, where we go above and beyond to preserveand
                enhance the lifespan and quality of each property. This includes
                rigorous maintenance and attention to detail, ultimately
                attracting discerning tenants and optimizing revenue for
                property owners. At the core of our operations lie our
                unwavering principles: quality, discipline, and trust. These
                values guide every aspect of our work, ensuring a level of
                service that stands out in the industry. With our eyes set on
                excellence, our ambition is to become the premier real estate
                company in Abu Dhabi, setting new benchmarks for the sector.
              </p>
              <p>
                We are an official registered company in Abu Dhabi with a Trade
                License of CN-4329843, and a Broker License Certificate
                202304747778.
              </p>
            </div>
            <div className="logo-container">
              <img src={logo} alt="Meridian Group Logo" className="mg-logo" />
            </div>
          </div>
        </div>
      </section>

      <section className="vision-mission">
        <div className="container">
          <img src={aboutUsImage2} alt="Vision" className="section-image" />
          <div className="vision">
            <div className="title-section">
              <h3>OUR VISION</h3>
            </div>
            <div className="content-section">
              <p>
                To ascend to the pinnacle of real estate agencies and to emerge
                as the premier developers in UAE. We aspire to be renowned not
                only for our stellar property management services but also for
                setting new industry standards in every facet of our operations.
              </p>
            </div>
          </div>

          <div className="mission">
            <div className="content-section">
              <p>
                At the Meridian Group, we are committed to providing
                unparalleled real estate experiences. Through unwavering
                dedication, extensive industry knowledge, and a client-centric
                approach, we strive to excel in every transaction. We aim to
                deliver superior property management services, ensuring the
                longevity and profitability of our clients' assets. Our mission
                is to be the vanguard of excellence in the UAE real estate
                landscape, embodying trust, quality, and discipline in all that
                we do.
              </p>
            </div>
            <div className="title-section">
              <h3>OUR MISSION</h3>
            </div>
          </div>

          <img src={aboutUsImage} alt="Mission" className="section-image" />
        </div>
      </section>

      <TrustedAgents />
    </div>
  );
};

export default About;
