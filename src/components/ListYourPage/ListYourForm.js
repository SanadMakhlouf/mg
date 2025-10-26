import React from "react";
import "./ListYourForm.css";

const ListYourForm = () => {
  return (
    <div className="list-your-form-section">
      <div className="list-your-form-container">
        <div className="form-left">
          <p className="keep-close">List Your Property</p>
          <h2>Your Details</h2>

          <form className="list-your-form">
            <div className="form-row">
              <input type="text" placeholder="FULL NAME" />
              <input type="email" placeholder="EMAIL ADDRESS" />
            </div>
            <div className="form-row">
              <input type="tel" placeholder="MOBILE NUMBER" />
              <input type="text" placeholder="PROJECT NAME" />
            </div>
            <textarea placeholder="COMMENT / MESSAGE"></textarea>
            <button type="submit" className="send-message-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>

        <div className="form-right">
          <h2>Maximize Your Property's Value</h2>
          <p>
            Partner with Meridian Group to sell or rent your property quickly and profitably. 
            Our strategic approach combines extensive market knowledge with personalized service, 
            ensuring you receive the best possible returns while staying informed throughout the entire process.
          </p>
          <p className="highlight-text">
            Expert valuation, professional marketing, and proven results—your property deserves the best.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListYourForm;
