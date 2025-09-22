import React from "react";
import ContactHero from "./ContactHero";
import GetInTouchSection from "../GetInTouchSection";
import MapSection from "../MapSection";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <ContactHero />
      <GetInTouchSection />
      <MapSection />
    </div>
  );
};

export default Contact;
