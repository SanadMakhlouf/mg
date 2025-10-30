import React from "react";
import SEO from "../SEO";
import AboutHero from "./AboutHero";
import TrustedAgents from "./TrustedAgents";
import "./About.css";
import logo from "../../assets/about-us/Container.png";
import aboutUsImage from "../../assets/about-us/about-us.jpg";
import aboutUsImage2 from "../../assets/about-us/hero-bgg.jpg";
const About = () => {
  return (
    <>
      <SEO
        title="About Meridian Group | Premier Real Estate Agency in Abu Dhabi"
        description="Learn about Meridian Group, Abu Dhabi's trusted real estate partner. Discover our mission, values, and expert team dedicated to exceptional property services."
        keywords="Meridian Group about, real estate company Abu Dhabi, property management Abu Dhabi, real estate agents UAE"
        url="https://meridiangroup.ae/about"
        image="https://meridiangroup.ae/logo.png"
      />
      <div className="about-page">
        <AboutHero />

      <section className="meridian-group">
        <div className="container">
          <h2>Meridian Group</h2>
          <div className="content-wrapper">
            <div className="text-content">
              <p>
                Meridian Group stands as a beacon of excellence in Abu Dhabi's real estate landscape. 
                As a premier full-service agency, we specialize in property sales, leasing, and comprehensive 
                property management solutions. Our expert team ensures every transaction is seamless, transparent, 
                and executed with precision. We don't just manage properties—we enhance their value through strategic 
                maintenance, attention to detail, and proactive management. This approach attracts premium tenants 
                and maximizes returns for property owners. Founded on principles of integrity, quality, and 
                client-centric service, Meridian Group has earned a reputation as the most trusted real estate partner 
                in Abu Dhabi. We're committed to setting new standards of excellence while helping our clients achieve 
                their property goals.
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
                To become the leading real estate agency in Abu Dhabi and establish Meridian Group as the most trusted 
                property partner in the UAE. We envision a future where excellence, innovation, and client satisfaction 
                define every interaction. Our vision extends beyond transaction success—we aim to shape the real estate 
                industry through groundbreaking service standards, transparent practices, and unwavering commitment to 
                our clients' prosperity.
              </p>
            </div>
          </div>

          <div className="mission">
            <div className="content-section">
              <p>
                Meridian Group is dedicated to delivering exceptional real estate experiences that exceed expectations. 
                Our mission is to provide seamless, transparent, and profitable property solutions while building 
                lasting relationships with clients. Through deep market expertise, innovative approaches, and meticulous 
                attention to detail, we transform property transactions into opportunities for growth. We protect and 
                enhance property values through comprehensive management services, ensuring maximum returns and long-term 
                satisfaction. Every day, we work to set new benchmarks in service quality, establishing Meridian Group 
                as the trusted name in Abu Dhabi real estate.
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
    </>
  );
};

export default About;
