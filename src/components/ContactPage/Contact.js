import React from "react";
import SEO from "../SEO";
import ContactHero from "./ContactHero";
import GetInTouchSection from "../GetInTouchSection";
import MapSection from "../MapSection";
import "./Contact.css";

const Contact = () => {
  return (
    <>
      <SEO
        title="Contact Us | Meridian Group Real Estate Abu Dhabi"
        description="Get in touch with Meridian Group for expert real estate services in Abu Dhabi. Contact our team for property sales, rentals, and management services."
        keywords="contact Meridian Group, real estate Abu Dhabi contact, property consultation Abu Dhabi"
        url="https://meridiangroup.ae/contact"
        image="https://meridiangroup.ae/logo.png"
      />
      <div className="contact-page">
        <ContactHero />
        <GetInTouchSection />
        <MapSection />
      </div>
    </>
  );
};

export default Contact;
