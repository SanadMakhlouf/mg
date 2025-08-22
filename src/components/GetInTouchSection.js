import React from "react";
import "./GetInTouchSection.css";

const GetInTouchSection = () => {
  return (
    <section className="get-in-touch">
      <div className="get-in-touch-container">
        <div className="left-section">
          <span className="keep-close">KEEP CLOSE</span>
          <h2>Get In Touch</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud. Ut enim ad minim veniam, quis nostrud
            ut enim ad minim veniam, quis nostrud ut enim ad minim veniam, quis
            nostrud.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <img src="/loca.png" alt="location" />
              <p>Al Hisn, Baynunah Tower 2, Office 93</p>
            </div>
            <div className="info-item">
              <img src="/phone.png" alt="phone" />
              <div>
                <p>(+97) 150907039</p>
                <p>(+97) 150907039</p>
              </div>
            </div>
            <div className="info-item">
              <img src="/ime.png" alt="email" />
              <div>
                <p>info@meridiagroup.ae</p>
                <p>info@domain.com</p>
              </div>
            </div>
            <div className="info-item">
              <img src="/time.png" alt="time" />
              <div>
                <p>Open: 04:00 am</p>
                <p>Closed: 07:00 pm</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <h3>FOLLOW US</h3>
            <div className="social-icons">
              <a href="#" aria-label="Facebook">
                <img src="/fb.png" alt="Facebook" />
              </a>
              <a href="#" aria-label="Instagram">
                <img src="/insta.png" alt="Instagram" />
              </a>
              <a href="#" aria-label="Twitter">
                <img src="/x.png" alt="Twitter" />
              </a>
              <a href="#" aria-label="WhatsApp">
                <img src="/whats.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-section">
          <h2>Your Details</h2>
          <p>How Can We Assist You ?</p>

          <form className="contact-form">
            <div className="form-group">
              <label>FULL NAME *</label>
              <input type="text" placeholder="Mohamed Al Mansoori" />
            </div>

            <div className="form-group">
              <label>EMAIL ADDRESS *</label>
              <input type="email" placeholder="info@meridiagroup.ae" />
            </div>

            <div className="form-group">
              <label>MOBILE NUMBER *</label>
              <input type="tel" placeholder="+97150907039" />
            </div>

            <div className="form-group">
              <label>COMMENT / MESSAGE *</label>
              <textarea placeholder="Message"></textarea>
            </div>

            <button type="submit" className="send-message-btn">
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
