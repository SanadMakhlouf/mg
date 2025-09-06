import React from "react";
import "./ReadyProjectsContact.css";

const ReadyProjectsContact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <section className="ready-projects-contact">
      <div className="contact-content">
        <div className="contact-text">
          <h2>OUR EXPERTS</h2>
          <h3>WILL HELP YOU</h3>
          <p>Feel free to contact us any time, we are online 24/7</p>
        </div>
        <form onSubmit={handleSubmit} className="ready-projects-contact-form">
          <div className="ready-projects-form-group">
            <input
              type="email"
              placeholder="EMAIL ADDRESS *"
              required
              className="ready-projects-form-input"
            />
          </div>
          <div className="ready-projects-form-group">
            <textarea
              placeholder="COMMENT / MESSAGE"
              className="ready-projects-form-input ready-projects-message-input"
              required
            ></textarea>
          </div>
          <button type="submit" className="ready-projects-send-btn">
            SEND MESSAGE
          </button>
        </form>
      </div>
    </section>
  );
};

export default ReadyProjectsContact;
