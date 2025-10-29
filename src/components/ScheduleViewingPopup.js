import React, { useState, useEffect } from "react";
import "./ScheduleViewingPopup.css";
import config from "../config";

const ScheduleViewingPopup = ({ onClose, propertyId, propertyName }) => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    mobile_number: "",
    preferred_date: "",
    preferred_time: "",
    message: `I would like to schedule a viewing for ${propertyName}`,
  });
  const [countryCode, setCountryCode] = useState("+971");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Detect user's country and set default country code
  useEffect(() => {
    // Try to detect country from timezone or use default UAE
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (timezone.includes("Dubai") || timezone.includes("Abu_Dhabi")) {
      setCountryCode("+971");
    }
    // You can add more country detections here
  }, []);

  const countryCodes = [
    { code: "+971", country: "UAE", flag: "🇦🇪" },
    { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
    { code: "+974", country: "Qatar", flag: "🇶🇦" },
    { code: "+965", country: "Kuwait", flag: "🇰🇼" },
    { code: "+973", country: "Bahrain", flag: "🇧🇭" },
    { code: "+968", country: "Oman", flag: "🇴🇲" },
    { code: "+20", country: "Egypt", flag: "🇪🇬" },
    { code: "+961", country: "Lebanon", flag: "🇱🇧" },
    { code: "+962", country: "Jordan", flag: "🇯🇴" },
    { code: "+44", country: "UK", flag: "🇬🇧" },
    { code: "+1", country: "USA/Canada", flag: "🇺🇸" },
    { code: "+91", country: "India", flag: "🇮🇳" },
    { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: null,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrors({});

    try {
      // Combine country code with mobile number
      const fullMobileNumber = formData.mobile_number.startsWith("+")
        ? formData.mobile_number
        : `${countryCode}${formData.mobile_number}`;

      // Build comprehensive message with all viewing details
      let fullMessage = `I would like to schedule a viewing for ${propertyName}\n\n`;
      
      // Add preferred date and time if provided
      if (formData.preferred_date || formData.preferred_time) {
        fullMessage += "Preferred Viewing Details:\n";
        if (formData.preferred_date) {
          const dateObj = new Date(formData.preferred_date);
          const formattedDate = dateObj.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          });
          fullMessage += `- Date: ${formattedDate}\n`;
        }
        if (formData.preferred_time) {
          fullMessage += `- Time: ${formData.preferred_time}\n`;
        }
        fullMessage += "\n";
      }
      
      // Add property link
      fullMessage += `Property Link: ${window.location.href}\n\n`;
      
      // Add additional message if provided
      if (formData.message && formData.message.trim() !== "" && 
          formData.message !== `I would like to schedule a viewing for ${propertyName}`) {
        fullMessage += `Additional Notes:\n${formData.message}`;
      }

      const submissionData = {
        full_name: formData.full_name,
        email: formData.email,
        mobile_number: fullMobileNumber,
        message: fullMessage,
        property_id: propertyId,
      };

      const response = await fetch(`${config.API_URL}/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(submissionData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus({
          success: true,
          message:
            "Your viewing request has been submitted! We'll contact you soon.",
        });
        setTimeout(() => {
          onClose();
        }, 2500);
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        setSubmitStatus({
          success: false,
          message: result.message || "Please check the form and try again.",
        });
      }
    } catch (error) {
      console.error("Schedule viewing error:", error);
      setSubmitStatus({
        success: false,
        message: "Failed to submit request. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get min date (today) and max date (3 months from now)
  const today = new Date().toISOString().split("T")[0];
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateStr = maxDate.toISOString().split("T")[0];

  return (
    <div className="schedule-viewing-overlay" onClick={onClose}>
      <div className="schedule-viewing-popup" onClick={(e) => e.stopPropagation()}>
        <button className="schedule-close-btn" onClick={onClose}>
          <i className="fa-solid fa-times"></i>
        </button>

        <div className="schedule-content">
          <div className="schedule-icon">
            <i className="fa-solid fa-calendar-check"></i>
          </div>

          <h2 className="schedule-title">Schedule a Viewing</h2>
          <p className="schedule-subtitle">
            Book a personalized tour of {propertyName}. Our expert agents will
            guide you through every detail.
          </p>

          {submitStatus && (
            <div
              className={`schedule-status ${
                submitStatus.success ? "success" : "error"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="schedule-form">
            <div className="schedule-form-group">
              <label>Full Name *</label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                placeholder="John Doe"
                required
                className={`schedule-input ${errors.full_name ? "error" : ""}`}
              />
              {errors.full_name && (
                <span className="field-error">{errors.full_name[0]}</span>
              )}
            </div>

            <div className="schedule-form-group">
              <label>Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
                className={`schedule-input ${errors.email ? "error" : ""}`}
              />
              {errors.email && (
                <span className="field-error">{errors.email[0]}</span>
              )}
            </div>

            <div className="schedule-form-group">
              <label>WhatsApp Number *</label>
              <div className="phone-input-container">
                <select
                  className="country-code-select"
                  value={countryCode}
                  onChange={(e) => setCountryCode(e.target.value)}
                >
                  {countryCodes.map((country) => (
                    <option key={country.code} value={country.code}>
                      {country.flag} {country.code}
                    </option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="mobile_number"
                  value={formData.mobile_number}
                  onChange={handleChange}
                  placeholder="501234567"
                  required
                  className={`schedule-input phone-input ${
                    errors.mobile_number ? "error" : ""
                  }`}
                />
              </div>
              {errors.mobile_number && (
                <span className="field-error">{errors.mobile_number[0]}</span>
              )}
            </div>

            <div className="schedule-form-row">
              <div className="schedule-form-group">
                <label>Preferred Date *</label>
                <input
                  type="date"
                  name="preferred_date"
                  value={formData.preferred_date}
                  onChange={handleChange}
                  min={today}
                  max={maxDateStr}
                  required
                  className={`schedule-input ${
                    errors.preferred_date ? "error" : ""
                  }`}
                />
                {errors.preferred_date && (
                  <span className="field-error">{errors.preferred_date[0]}</span>
                )}
              </div>

              <div className="schedule-form-group">
                <label>Preferred Time *</label>
                <select
                  name="preferred_time"
                  value={formData.preferred_time}
                  onChange={handleChange}
                  required
                  className={`schedule-input ${
                    errors.preferred_time ? "error" : ""
                  }`}
                >
                  <option value="">Select Time</option>
                  <option value="09:00 AM">09:00 AM</option>
                  <option value="10:00 AM">10:00 AM</option>
                  <option value="11:00 AM">11:00 AM</option>
                  <option value="12:00 PM">12:00 PM</option>
                  <option value="01:00 PM">01:00 PM</option>
                  <option value="02:00 PM">02:00 PM</option>
                  <option value="03:00 PM">03:00 PM</option>
                  <option value="04:00 PM">04:00 PM</option>
                  <option value="05:00 PM">05:00 PM</option>
                  <option value="06:00 PM">06:00 PM</option>
                  <option value="07:00 PM">07:00 PM</option>
                </select>
                {errors.preferred_time && (
                  <span className="field-error">{errors.preferred_time[0]}</span>
                )}
              </div>
            </div>

            <div className="schedule-form-group">
              <label>Additional Message (Optional)</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Any specific requirements or questions..."
                className="schedule-input schedule-textarea"
                rows="3"
              ></textarea>
            </div>

            <button
              type="submit"
              className="schedule-submit-btn"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i> Submitting...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-calendar-check"></i> Schedule Viewing
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ScheduleViewingPopup;

