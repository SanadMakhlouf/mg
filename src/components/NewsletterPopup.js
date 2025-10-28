import React, { useState, useEffect } from "react";
import "./NewsletterPopup.css";
import config from "../config";

const NewsletterPopup = ({ onClose }) => {
  const [formData, setFormData] = useState({
    full_name: "Newsletter Signup",
    email: "",
    mobile_number: "",
    message: "Newsletter subscription from website popup",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [hasSubscribed, setHasSubscribed] = useState(false);

  // Check if user has already subscribed
  useEffect(() => {
    const subscribed = localStorage.getItem("newsletterSubscribed");
    if (subscribed === "true") {
      setHasSubscribed(true);
    }
  }, []);

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
      const response = await fetch(`${config.API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message: "Thank you for subscribing! We'll keep you updated.",
        });
        // Mark as subscribed in localStorage
        localStorage.setItem("newsletterSubscribed", "true");
        setTimeout(() => {
          onClose();
        }, 2000);
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || "Something went wrong. Please try again.",
        });
      }
    } catch (error) {
      console.error("Newsletter subscription error:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to subscribe. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (hasSubscribed) {
    return null; // Don't show popup if already subscribed
  }

  return (
    <div className="newsletter-popup-overlay" onClick={onClose}>
      <div className="newsletter-popup" onClick={(e) => e.stopPropagation()}>
        <button className="newsletter-close-btn" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>

        <div className="newsletter-content">
          <div className="newsletter-icon">
            <i className="fa-solid fa-envelope-circle-check"></i>
          </div>

          <h2 className="newsletter-title">Stay Connected</h2>
          <p className="newsletter-subtitle">
            Get exclusive access to the latest properties, market insights, and
            special offers delivered straight to your inbox.
          </p>

          {submitStatus && (
            <div
              className={`newsletter-status ${
                submitStatus.success ? "success" : "error"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="newsletter-form">
            <div className="newsletter-form-group">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email Address *"
                required
                className="newsletter-input"
              />
              <i className="fa-solid fa-envelope newsletter-input-icon"></i>
            </div>

            <div className="newsletter-form-group">
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="WhatsApp Number (Optional)"
                className="newsletter-input"
              />
              <i className="fa-brands fa-whatsapp newsletter-input-icon"></i>
            </div>

            <button
              type="submit"
              className="newsletter-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Subscribing...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i> Subscribe Now
                </>
              )}
            </button>

            <p className="newsletter-privacy">
              <i className="fa-solid fa-shield-halshield-halved"></i> We respect
              your privacy. Unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterPopup;

