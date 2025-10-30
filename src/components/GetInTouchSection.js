import React, { useState } from "react";
import "./GetInTouchSection.css";
import config from "../config";

const GetInTouchSection = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      const response = await fetch(`${config.API_URL}/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        // Show success message
        setSubmitStatus({ 
          success: true, 
          message: result.message || "Thank you for your message! We will get back to you soon." 
        });
        // Reset form after successful submission
        setFormData({
          full_name: "",
          email: "",
          mobile_number: "",
          message: "",
        });
      } else {
        // Show validation errors
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitStatus({
          success: false,
          message: result.message || "Please check the form for errors and try again.",
        });
      }
    } catch (error) {
      // Contact form error
      setSubmitStatus({
        success: false,
        message: "Failed to submit your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <section className="get-in-touch">
      <div className="get-in-touch-container">
        <div className="left-section slide-left">
          <span className="keep-close">We're Here for You</span>
          <h2>Get In Touch</h2>
          <p>
            Connect with Meridian Group's expert team for fast, transparent property transactions. 
            We leverage up-to-date market insights and industry expertise to optimize your property's 
            sale or rental value. Your success is our commitment.
          </p>

          <div className="contact-info">
            <div className="info-item">
              <img src="/loca.png" alt="location" />
              <p>Al Hisn, Baynunah Tower 2, Office 402, Abu Dhabi</p>
            </div>
            <div className="info-item">
              <img src="/phone.png" alt="phone" />
              <div>
                <p>+971 586830401</p>
              </div>
            </div>
            <div className="info-item">
              <img src="/ime.png" alt="email" />
              <div>
                <p>info@meridiangroup.ae</p>
              </div>
            </div>
            <div className="info-item">
              <img src="/time.png" alt="working hours" />
              <div>
                <p>Open 09:00 AM to 6:00 PM</p>
              </div>
            </div>
          </div>

          <div className="social-links">
            <h3>FOLLOW US</h3>
            <div className="social-icons">
              <a 
                href="https://www.facebook.com/p/Meridian-Group-61555497801970/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <img src="/fb.png" alt="Facebook" />
              </a>
              <a 
                href="https://www.instagram.com/meridiangroupuae/" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <img src="/insta.png" alt="Instagram" />
              </a>
              <a 
                href="https://wa.me/971586830401" 
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
              >
                <img src="/whats.png" alt="WhatsApp" />
              </a>
            </div>
          </div>
        </div>

        <div className="right-section slide-right">
          <h2>Send Us a Message</h2>
          <p>Let's discuss how we can help you today</p>

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
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="Mohamed Al Mansoori"
                required
                className={errors.full_name ? 'error' : ''}
              />
              {errors.full_name && (
                <span className="field-error">{errors.full_name[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label>EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="info@meridiangroup.ae"
                className={errors.email ? 'error' : ''}
              />
              {errors.email && (
                <span className="field-error">{errors.email[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label>MOBILE NUMBER *</label>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="+97150607030"
                required
                className={errors.mobile_number ? 'error' : ''}
              />
              {errors.mobile_number && (
                <span className="field-error">{errors.mobile_number[0]}</span>
              )}
            </div>

            <div className="form-group">
              <label>COMMENT / MESSAGE *</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message"
                required
                className={errors.message ? 'error' : ''}
              ></textarea>
              {errors.message && (
                <span className="field-error">{errors.message[0]}</span>
              )}
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
