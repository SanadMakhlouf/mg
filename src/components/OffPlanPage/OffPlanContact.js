import React, { useState } from "react";
import "./OffPlanContact.css";
import config from "../../config";

const OffPlanContact = () => {
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
      console.error('Contact form error:', error);
      setSubmitStatus({
        success: false,
        message: "Failed to submit your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          {submitStatus && (
            <div className={`submit-status ${submitStatus.success ? 'success' : 'error'}`}>
              {submitStatus.message}
            </div>
          )}
          
          <div className="off-plan-form-group">
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleChange}
              placeholder="FULL NAME *"
              required
              className={`off-plan-form-input ${errors.full_name ? 'error' : ''}`}
            />
            {errors.full_name && (
              <span className="field-error">{errors.full_name[0]}</span>
            )}
          </div>

          <div className="off-plan-form-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="EMAIL ADDRESS *"
              required
              className={`off-plan-form-input ${errors.email ? 'error' : ''}`}
            />
            {errors.email && (
              <span className="field-error">{errors.email[0]}</span>
            )}
          </div>

          <div className="off-plan-form-group">
            <input
              type="tel"
              name="mobile_number"
              value={formData.mobile_number}
              onChange={handleChange}
              placeholder="MOBILE NUMBER *"
              required
              className={`off-plan-form-input ${errors.mobile_number ? 'error' : ''}`}
            />
            {errors.mobile_number && (
              <span className="field-error">{errors.mobile_number[0]}</span>
            )}
          </div>

          <div className="off-plan-form-group">
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="COMMENT / MESSAGE *"
              className={`off-plan-form-input off-plan-message-input ${errors.message ? 'error' : ''}`}
              required
            ></textarea>
            {errors.message && (
              <span className="field-error">{errors.message[0]}</span>
            )}
          </div>

          <button 
            type="submit" 
            className="off-plan-send-btn"
            disabled={isSubmitting}
          >
            {isSubmitting ? "SENDING..." : "SEND MESSAGE"}
          </button>
        </form>
      </div>
    </section>
  );
};

export default OffPlanContact;
