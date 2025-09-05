import React from "react";
import "./ListYourForm.css";

const ListYourForm = () => {
  return (
    <div className="list-your-form-section">
      <div className="list-your-form-container">
        <div className="form-left">
          <p className="keep-close">KEEP CLOSE</p>
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
          <h2>Sell or Rent Out your Property in Abu Dhabi</h2>
          <p>
            We are here to help you sell or rent out your property as fast as
            possible with 100% transparency, keeping you informed with
            up-to-date market trends that may affect your property's sale or
            rental value.
          </p>
          <p className="highlight-text">
            We help our clients evaluate and sell their properties!
          </p>
        </div>
      </div>
    </div>
  );
};

export default ListYourForm;
