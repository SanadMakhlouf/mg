import React, { useState, useEffect, useRef } from "react";
import "./MortgageCalculator.css";
import SEO from "../SEO";

const MortgageCalculator = () => {
  const [propertyPrice, setPropertyPrice] = useState(2000000);
  const [residencyStatus, setResidencyStatus] = useState("resident");
  const [downPaymentPercent, setDownPaymentPercent] = useState(30); // 30% for resident (70% loan)
  const [downPaymentAED, setDownPaymentAED] = useState(600000); // 30% of 2,000,000
  const [loanPeriod, setLoanPeriod] = useState(25);
  const [interestRate, setInterestRate] = useState(3.75); // 3.75% for resident
  const [upfrontCosts, setUpfrontCosts] = useState(0);

  // Track which down payment input was last changed to avoid infinite loops
  const downPaymentSourceRef = useRef("percent"); // "percent" or "aed"

  // Lead capture form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate loan amount
  const loanAmount = propertyPrice - downPaymentAED;

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    if (loanAmount <= 0 || interestRate <= 0 || loanPeriod <= 0) {
      return 0;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanPeriod * 12;

    if (monthlyRate === 0) {
      return loanAmount / numberOfPayments;
    }

    const monthlyPayment =
      (loanAmount *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();
  const totalPayment = monthlyPayment * loanPeriod * 12;
  const totalInterest = totalPayment - loanAmount;

  // Sync down payment percentage and AED (avoid infinite loop)
  useEffect(() => {
    if (
      downPaymentSourceRef.current === "percent" ||
      downPaymentSourceRef.current === "residency"
    ) {
      const calculatedAED = (propertyPrice * downPaymentPercent) / 100;
      setDownPaymentAED(calculatedAED);
      if (downPaymentSourceRef.current === "residency") {
        downPaymentSourceRef.current = "percent"; // Reset to prevent loops
      }
    } else if (downPaymentSourceRef.current === "price") {
      // When property price changes, recalculate AED based on percentage
      const calculatedAED = (propertyPrice * downPaymentPercent) / 100;
      setDownPaymentAED(calculatedAED);
      downPaymentSourceRef.current = "percent"; // Reset to prevent loops
    }
  }, [propertyPrice, downPaymentPercent]);

  // Sync down payment AED to percentage (avoid infinite loop)
  useEffect(() => {
    if (downPaymentSourceRef.current === "aed" && propertyPrice > 0) {
      const calculatedPercent = (downPaymentAED / propertyPrice) * 100;
      if (calculatedPercent <= 100) {
        setDownPaymentPercent(calculatedPercent);
      }
    }
  }, [downPaymentAED, propertyPrice]);

  // Auto-update down payment and interest rate based on residency status
  useEffect(() => {
    downPaymentSourceRef.current = "residency"; // Set source to prevent loops

    switch (residencyStatus) {
      case "uae-national":
        // UAE National: 75% loan (25% down payment), 4.54% interest
        setDownPaymentPercent(25);
        setInterestRate(4.54);
        break;
      case "resident":
        // UAE Resident: 70% loan (30% down payment), 3.75% interest
        setDownPaymentPercent(30);
        setInterestRate(3.75);
        break;
      case "non-resident":
        // Non-Resident: 60% loan (40% down payment), 4.54% interest
        setDownPaymentPercent(40);
        setInterestRate(4.54);
        break;
      default:
        break;
    }
  }, [residencyStatus]);

  // Validation
  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Please enter a valid email address";
    }

    if (!formData.phone.trim()) {
      errors.phone = "Phone number is required";
    } else if (!/^[\d\s\-+()]+$/.test(formData.phone)) {
      errors.phone = "Please enter a valid phone number";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Here you would typically send the data to your backend
      console.log("Form submitted:", {
        ...formData,
        propertyPrice,
        residencyStatus,
        downPaymentPercent,
        downPaymentAED,
        loanAmount,
        loanPeriod,
        interestRate,
        monthlyPayment,
        upfrontCosts,
      });

      setFormSubmitted(true);

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", phone: "" });
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Format number with commas
  const formatNumber = (num) => {
    return Math.round(num).toLocaleString("en-US");
  };

  return (
    <>
      <SEO
        title="Mortgage Calculator - Calculate Your Monthly Payments | Meridian Group"
        description="Calculate your mortgage monthly payments with our interactive mortgage calculator. Get instant estimates based on property price, down payment, interest rate, and loan term."
        keywords="mortgage calculator, UAE mortgage, property finance, loan calculator, Abu Dhabi mortgage"
        url="https://meridiangroup.ae/mortgage-calculator"
      />
      <div className="mortgage-calculator-page">
        <div className="mortgage-calculator-container">
          <div className="mortgage-calculator-header">
            <h1>Mortgage Calculator</h1>
            <p>Calculate your monthly mortgage payments instantly</p>
          </div>

          <div className="mortgage-calculator-content">
            {/* Left Column - Calculator */}
            <div className="calculator-section">
              {/* Property Price */}
              <div className="calculator-group">
                <label htmlFor="propertyPrice">
                  Property Price (AED)
                  <span className="required">*</span>
                </label>
                <div className="input-with-slider">
                  <input
                    type="number"
                    id="propertyPrice"
                    min="100000"
                    max="50000000"
                    step="10000"
                    value={propertyPrice}
                    onChange={(e) => {
                      const value = Math.max(
                        100000,
                        Math.min(50000000, parseFloat(e.target.value) || 100000)
                      );
                      downPaymentSourceRef.current = "price";
                      setPropertyPrice(value);
                    }}
                    className="number-input"
                  />
                  <input
                    type="range"
                    min="100000"
                    max="50000000"
                    step="10000"
                    value={propertyPrice}
                    onChange={(e) => {
                      downPaymentSourceRef.current = "price";
                      setPropertyPrice(parseFloat(e.target.value));
                    }}
                    className="slider-input"
                  />
                </div>
                <div className="input-range-labels">
                  <span>AED 100,000</span>
                  <span>AED 50,000,000</span>
                </div>
              </div>

              {/* Residency Status */}
              <div className="calculator-group">
                <label htmlFor="residencyStatus">
                  Residency Status
                  <span className="required">*</span>
                </label>
                <div className="radio-group">
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="residencyStatus"
                      value="uae-national"
                      checked={residencyStatus === "uae-national"}
                      onChange={(e) => setResidencyStatus(e.target.value)}
                    />
                    <span>UAE National</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="residencyStatus"
                      value="resident"
                      checked={residencyStatus === "resident"}
                      onChange={(e) => setResidencyStatus(e.target.value)}
                    />
                    <span>Resident</span>
                  </label>
                  <label className="radio-label">
                    <input
                      type="radio"
                      name="residencyStatus"
                      value="non-resident"
                      checked={residencyStatus === "non-resident"}
                      onChange={(e) => setResidencyStatus(e.target.value)}
                    />
                    <span>Non-Resident</span>
                  </label>
                </div>
              </div>

              {/* Down Payment */}
              <div className="calculator-group">
                <label htmlFor="downPaymentPercent">
                  Down Payment
                  <span className="required">*</span>
                </label>
                <div className="down-payment-inputs">
                  <div className="down-payment-percent">
                    <input
                      type="number"
                      id="downPaymentPercent"
                      min="0"
                      max="100"
                      step="0.1"
                      value={downPaymentPercent}
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          Math.min(100, parseFloat(e.target.value) || 0)
                        );
                        downPaymentSourceRef.current = "percent";
                        setDownPaymentPercent(value);
                      }}
                      className="number-input"
                    />
                    <span className="input-suffix">%</span>
                  </div>
                  <span className="input-separator">or</span>
                  <div className="down-payment-aed">
                    <input
                      type="number"
                      id="downPaymentAED"
                      min="0"
                      max={propertyPrice}
                      step="1000"
                      value={downPaymentAED}
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          Math.min(
                            propertyPrice,
                            parseFloat(e.target.value) || 0
                          )
                        );
                        downPaymentSourceRef.current = "aed";
                        setDownPaymentAED(value);
                      }}
                      className="number-input"
                    />
                    <span className="input-suffix">AED</span>
                  </div>
                </div>
                {downPaymentAED > propertyPrice && (
                  <span className="error-message">
                    Down payment cannot exceed property price
                  </span>
                )}
              </div>

              {/* Loan Amount (Auto-calculated) */}
              <div className="calculator-group">
                <label>Loan Amount (Auto-calculated)</label>
                <div className="calculated-value">
                  AED {formatNumber(loanAmount)}
                </div>
              </div>

              {/* Loan Period */}
              <div className="calculator-group">
                <label htmlFor="loanPeriod">
                  Loan Period (Years)
                  <span className="required">*</span>
                </label>
                <div className="input-with-slider">
                  <input
                    type="number"
                    id="loanPeriod"
                    min="1"
                    max="25"
                    step="1"
                    value={loanPeriod}
                    onChange={(e) => {
                      const value = Math.max(
                        1,
                        Math.min(25, parseInt(e.target.value) || 1)
                      );
                      setLoanPeriod(value);
                    }}
                    className="number-input"
                  />
                  <input
                    type="range"
                    min="1"
                    max="25"
                    step="1"
                    value={loanPeriod}
                    onChange={(e) => setLoanPeriod(parseInt(e.target.value))}
                    className="slider-input"
                  />
                </div>
                <div className="input-range-labels">
                  <span>1 year</span>
                  <span>25 years</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="calculator-group">
                <label htmlFor="interestRate">
                  Interest Rate (%)
                  <span className="required">*</span>
                </label>
                <div className="input-with-slider">
                  <input
                    type="number"
                    id="interestRate"
                    min="1"
                    max="10"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => {
                      const value = Math.max(
                        1,
                        Math.min(10, parseFloat(e.target.value) || 1)
                      );
                      setInterestRate(value);
                    }}
                    className="number-input"
                  />
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) =>
                      setInterestRate(parseFloat(e.target.value))
                    }
                    className="slider-input"
                  />
                </div>
                <div className="input-range-labels">
                  <span>1%</span>
                  <span>10%</span>
                </div>
              </div>

              {/* Optional Upfront Costs */}
              <div className="calculator-group">
                <label htmlFor="upfrontCosts">
                  Optional Upfront Costs (AED)
                </label>
                <input
                  type="number"
                  id="upfrontCosts"
                  min="0"
                  step="1000"
                  value={upfrontCosts}
                  onChange={(e) =>
                    setUpfrontCosts(
                      Math.max(0, parseFloat(e.target.value) || 0)
                    )
                  }
                  className="number-input full-width"
                  placeholder="0"
                />
              </div>

              {/* Monthly Payment Output */}
              <div className="monthly-payment-output">
                <div className="payment-label">Monthly Payment</div>
                <div className="payment-amount">
                  AED {formatNumber(monthlyPayment)}
                </div>
                <div className="payment-details">
                  <div className="payment-detail-item">
                    <span className="detail-label">Total Payment:</span>
                    <span className="detail-value">
                      AED {formatNumber(totalPayment)}
                    </span>
                  </div>
                  <div className="payment-detail-item">
                    <span className="detail-label">Total Interest:</span>
                    <span className="detail-value">
                      AED {formatNumber(totalInterest)}
                    </span>
                  </div>
                  <div className="payment-detail-item">
                    <span className="detail-label">Loan Amount:</span>
                    <span className="detail-value">
                      AED {formatNumber(loanAmount)}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="lead-capture-section">
              <h3>Get Your Mortgage Quote</h3>
              <p>
                Fill in your details to receive a personalized mortgage quote
              </p>

              {formSubmitted ? (
                <div className="form-success-message">
                  <i className="fa-solid fa-check-circle"></i>
                  <p>Thank you! We'll contact you shortly.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="lead-capture-form">
                  <div className="form-group">
                    <label htmlFor="name">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={formErrors.name ? "error" : ""}
                      placeholder="Enter your full name"
                    />
                    {formErrors.name && (
                      <span className="error-message">{formErrors.name}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={formErrors.email ? "error" : ""}
                      placeholder="Enter your email address"
                    />
                    {formErrors.email && (
                      <span className="error-message">{formErrors.email}</span>
                    )}
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">
                      Phone <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={formErrors.phone ? "error" : ""}
                      placeholder="Enter your phone number"
                    />
                    {formErrors.phone && (
                      <span className="error-message">{formErrors.phone}</span>
                    )}
                  </div>

                  <button type="submit" className="submit-btn">
                    <i className="fa-solid fa-paper-plane"></i>
                    Get My Quote
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MortgageCalculator;
