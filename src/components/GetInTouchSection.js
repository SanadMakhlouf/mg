import React, { useState } from "react";
import "./GetInTouchSection.css";

const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      // You can replace this with an actual API endpoint
      // For now, we'll simulate a successful submission after a delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("Form submitted:", formData);
      // Reset form after successful submission
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
      setSubmitStatus({ success: true, message: "Message sent successfully!" });
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="get-in-touch">
      <div className="get-in-touch-container">
        <div className="left-section">
          <span className="keep-close">KEEP CLOSE</span>
          <h2>Get In Touch</h2>
          <p>
            We are here to help you sell or rent out your property as fast as
            possible with 100% transparency, keeping you informed with
            up-to-date market trends that may affect your property’s sale or
            rental value.
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

          <form className="contact-form" onSubmit={handleSubmit}>
            {submitStatus && (
              <div
                className={`submit-status ${
                  submitStatus.success ? "success" : "error"
                }`}
              >
                {submitStatus.message}
              </div>
            )}

            <div className="form-group">
              <label>FULL NAME *</label>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Mohamed Al Mansoori"
                required
              />
            </div>

            <div className="form-group">
              <label>EMAIL ADDRESS *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@meridiagroup.ae"
                required
              />
            </div>

            <div className="form-group">
              <label>MOBILE NUMBER *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+97150907039"
                required
              />
            </div>

            <div className="form-group">
              <label>COMMENT / MESSAGE *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="send-message-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouchSection;
