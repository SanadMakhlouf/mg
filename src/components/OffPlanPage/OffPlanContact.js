import React from "react";
import "./OffPlanContact.css";

const OffPlanContact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <section className="off-plan-contact">
      <div className="contact-content">
        <div className="contact-text">
          <h2>Talk to Our Experts</h2>
          <h3>We're Here to Help</h3>
          <p>Our off-plan property specialists are ready to guide you through every step of your investment journey. Get expert advice today.</p>
        </div>
        <form onSubmit={handleSubmit} className="off-plan-contact-form">
          <div className="off-plan-form-group">
            <input
              type="email"
              placeholder="EMAIL ADDRESS *"
              required
              className="off-plan-form-input"
            />
          </div>
          <div className="off-plan-form-group">
            <textarea
              placeholder="COMMENT / MESSAGE"
              className="off-plan-form-input off-plan-message-input"
              required
            ></textarea>
          </div>
          <button type="submit" className="off-plan-send-btn">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

export default OffPlanContact;
