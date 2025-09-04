import React from "react";
import ContactHero from "./ContactHero";
import GetInTouchSection from "../GetInTouchSection";
import MapSection from "../MapSection";
import Footer from "../Footer";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <ContactHero />
      <GetInTouchSection />
      <MapSection />
      <Footer />
    </div>
  );
};

export default Contact;
