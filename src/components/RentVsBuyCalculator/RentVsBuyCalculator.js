import React, { useState, useEffect, useRef } from "react";
import "./RentVsBuyCalculator.css";
import SEO from "../SEO";

const RentVsBuyCalculator = () => {
  const [annualRent, setAnnualRent] = useState(120000);
  const [purchasePrice, setPurchasePrice] = useState(2000000);
  const [residencyStatus, setResidencyStatus] = useState("resident");
  const [downPaymentPercent, setDownPaymentPercent] = useState(30);
  const [downPaymentAED, setDownPaymentAED] = useState(600000);
  const [loanPeriod, setLoanPeriod] = useState(25);
  const [interestRate, setInterestRate] = useState(3.75);

  // Track which down payment input was last changed to avoid infinite loops
  const downPaymentSourceRef = useRef("percent");

  // Lead capture form
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Calculate loan amount
  const loanAmount = purchasePrice - downPaymentAED;

  // Calculate monthly mortgage payment
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

  // Calculate buying costs
  const calculateBuyingCosts = () => {
    const agentCommission = purchasePrice * 0.02; // 2% agent commission
    const dubaiLandDeptFee = purchasePrice * 0.04; // 4% DLD fee
    const trusteeFee = Math.max(2000, purchasePrice * 0.001); // 0.1% or min 2000 AED
    const valuationFee = 2500; // Fixed valuation fee
    const processingFee = 5000; // Fixed processing fee
    const registrationFee = 2000; // Fixed registration fee

    const totalFees =
      agentCommission +
      dubaiLandDeptFee +
      trusteeFee +
      valuationFee +
      processingFee +
      registrationFee;

    return {
      agentCommission,
      dubaiLandDeptFee,
      trusteeFee,
      valuationFee,
      processingFee,
      registrationFee,
      totalFees,
    };
  };

  const buyingCosts = calculateBuyingCosts();

  // Calculate renting costs
  const calculateRentingCosts = () => {
    const monthlyRent = annualRent / 12;
    const agentCommission = annualRent * 0.05; // 5% agent commission (one-time)
    const ejariFee = 220; // Fixed EJARI fee per year

    return {
      monthlyRent,
      agentCommission,
      ejariFee,
    };
  };

  const rentingCosts = calculateRentingCosts();

  // Calculate total costs over loan period
  const calculateTotalCosts = () => {
    const totalMonths = loanPeriod * 12;

    // Buying scenario
    const totalMortgagePayments = monthlyPayment * totalMonths;
    const totalBuyingCost =
      downPaymentAED +
      totalMortgagePayments +
      buyingCosts.totalFees;

    // Renting scenario
    const totalRentPayments = annualRent * loanPeriod;
    const totalAgentCommission = rentingCosts.agentCommission * loanPeriod;
    const totalEjariFees = rentingCosts.ejariFee * loanPeriod;
    const totalRentingCost =
      totalRentPayments + totalAgentCommission + totalEjariFees;

    const savings = totalRentingCost - totalBuyingCost;

    return {
      totalBuyingCost,
      totalRentingCost,
      savings,
      isBuyingBetter: savings > 0,
    };
  };

  const totalCosts = calculateTotalCosts();

  // Sync down payment percentage and AED (avoid infinite loop)
  useEffect(() => {
    if (
      downPaymentSourceRef.current === "percent" ||
      downPaymentSourceRef.current === "residency"
    ) {
      const calculatedAED = (purchasePrice * downPaymentPercent) / 100;
      setDownPaymentAED(calculatedAED);
      if (downPaymentSourceRef.current === "residency") {
        downPaymentSourceRef.current = "percent";
      }
    } else if (downPaymentSourceRef.current === "price") {
      const calculatedAED = (purchasePrice * downPaymentPercent) / 100;
      setDownPaymentAED(calculatedAED);
      downPaymentSourceRef.current = "percent";
    }
  }, [purchasePrice, downPaymentPercent]);

  // Sync down payment AED to percentage (avoid infinite loop)
  useEffect(() => {
    if (downPaymentSourceRef.current === "aed" && purchasePrice > 0) {
      const calculatedPercent = (downPaymentAED / purchasePrice) * 100;
      if (calculatedPercent <= 100) {
        setDownPaymentPercent(calculatedPercent);
      }
    }
  }, [downPaymentAED, purchasePrice]);

  // Auto-update down payment and interest rate based on residency status
  useEffect(() => {
    downPaymentSourceRef.current = "residency";

    switch (residencyStatus) {
      case "uae-national":
        setDownPaymentPercent(25);
        setInterestRate(4.54);
        break;
      case "resident":
        setDownPaymentPercent(30);
        setInterestRate(3.75);
        break;
      case "non-resident":
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
      console.log("Form submitted:", {
        ...formData,
        annualRent,
        purchasePrice,
        residencyStatus,
        downPaymentPercent,
        downPaymentAED,
        loanAmount,
        loanPeriod,
        interestRate,
        monthlyPayment,
        totalCosts,
      });

      setFormSubmitted(true);

      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", phone: "" });
      }, 3000);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
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
        title="Rent vs Buy Calculator - Compare Property Costs | Meridian Group"
        description="Compare the total costs of renting versus buying a property in Dubai. Calculate mortgage payments, fees, and see which option saves you more money."
        keywords="rent vs buy calculator, property calculator, Dubai property, mortgage calculator, rent calculator"
        url="https://meridiangroup.ae/rent-vs-buy-calculator"
      />
      <div className="rent-vs-buy-calculator-page">
        <div className="rent-vs-buy-calculator-container">
          <div className="rent-vs-buy-calculator-header">
            <h1>Rent vs Buy Calculator</h1>
            <p>Compare the costs of renting versus buying a property</p>
          </div>

          <div className="rent-vs-buy-calculator-content">
            {/* Left Column - Calculator */}
            <div className="calculator-section">
              {/* Annual Rent */}
              <div className="calculator-group">
                <label htmlFor="annualRent">
                  Annual Rent (AED)
                  <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="annualRent"
                  min="0"
                  step="1000"
                  value={annualRent}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    setAnnualRent(value);
                  }}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 0) {
                      setAnnualRent(120000);
                    } else {
                      setAnnualRent(value);
                    }
                  }}
                  className="number-input"
                />
              </div>

              {/* Purchase Price */}
              <div className="calculator-group">
                <label htmlFor="purchasePrice">
                  Purchase Price (AED)
                  <span className="required">*</span>
                </label>
                <input
                  type="number"
                  id="purchasePrice"
                  min="0"
                  step="10000"
                  value={purchasePrice}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value) || 0;
                    downPaymentSourceRef.current = "price";
                    setPurchasePrice(value);
                  }}
                  onBlur={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 0) {
                      downPaymentSourceRef.current = "price";
                      setPurchasePrice(2000000);
                    } else {
                      downPaymentSourceRef.current = "price";
                      setPurchasePrice(value);
                    }
                  }}
                  className="number-input"
                />
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
                      max={purchasePrice}
                      step="1000"
                      value={downPaymentAED}
                      onChange={(e) => {
                        const value = Math.max(
                          0,
                          Math.min(
                            purchasePrice,
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
                {downPaymentAED > purchasePrice && (
                  <span className="error-message">
                    Down payment cannot exceed purchase price
                  </span>
                )}
              </div>

              {/* Loan Period */}
              <div className="calculator-group">
                <label htmlFor="loanPeriod">
                  Mortgage Loan Period (Years)
                  <span className="required">*</span>
                </label>
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
              </div>

              {/* Interest Rate */}
              <div className="calculator-group">
                <label htmlFor="interestRate">
                  Interest Rate (%)
                  <span className="required">*</span>
                </label>
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
              </div>

              {/* Monthly Payment Output */}
              <div className="monthly-payment-output">
                <div className="payment-label">Monthly Mortgage Payment</div>
                <div className="payment-amount">
                  AED {formatNumber(monthlyPayment)}
                </div>
              </div>
            </div>

            {/* Right Column - Lead Capture Form */}
            <div className="lead-capture-section">
              <h3>Get Your Comparison Report</h3>
              <p>
                Fill in your details to receive a detailed rent vs buy comparison
                report
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
                    Get My Report
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Comparison Table */}
          <div className="comparison-section">
            <h2>Cost Comparison</h2>
            <p className="comparison-description">
              Total costs over {loanPeriod} {loanPeriod === 1 ? "year" : "years"}
            </p>

            <div className="comparison-table-container">
              <table className="comparison-table">
                <thead>
                  <tr>
                    <th>Cost Item</th>
                    <th>Renting</th>
                    <th>Buying</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Down Payment</td>
                    <td>-</td>
                    <td>AED {formatNumber(downPaymentAED)}</td>
                  </tr>
                  <tr>
                    <td>Monthly Payment</td>
                    <td>AED {formatNumber(rentingCosts.monthlyRent)}</td>
                    <td>AED {formatNumber(monthlyPayment)}</td>
                  </tr>
                  <tr>
                    <td>Total Payments ({loanPeriod} {loanPeriod === 1 ? "year" : "years"})</td>
                    <td>AED {formatNumber(annualRent * loanPeriod)}</td>
                    <td>AED {formatNumber(monthlyPayment * loanPeriod * 12)}</td>
                  </tr>
                  <tr>
                    <td>Agent Commission</td>
                    <td>AED {formatNumber(rentingCosts.agentCommission * loanPeriod)}</td>
                    <td>AED {formatNumber(buyingCosts.agentCommission)}</td>
                  </tr>
                  <tr>
                    <td>Registration/DLD Fees</td>
                    <td>-</td>
                    <td>AED {formatNumber(buyingCosts.dubaiLandDeptFee)}</td>
                  </tr>
                  <tr>
                    <td>EJARI Fees</td>
                    <td>AED {formatNumber(rentingCosts.ejariFee * loanPeriod)}</td>
                    <td>-</td>
                  </tr>
                  <tr>
                    <td>Other Fees (Trustee, Valuation, Processing)</td>
                    <td>-</td>
                    <td>
                      AED{" "}
                      {formatNumber(
                        buyingCosts.trusteeFee +
                          buyingCosts.valuationFee +
                          buyingCosts.processingFee +
                          buyingCosts.registrationFee
                      )}
                    </td>
                  </tr>
                  <tr className="total-row">
                    <td>
                      <strong>Total Cost</strong>
                    </td>
                    <td>
                      <strong>AED {formatNumber(totalCosts.totalRentingCost)}</strong>
                    </td>
                    <td>
                      <strong>AED {formatNumber(totalCosts.totalBuyingCost)}</strong>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Savings/Loss Display */}
            <div
              className={`savings-display ${
                totalCosts.isBuyingBetter ? "savings" : "loss"
              }`}
            >
              <div className="savings-icon">
                <i
                  className={`fa-solid ${
                    totalCosts.isBuyingBetter ? "fa-arrow-down" : "fa-arrow-up"
                  }`}
                ></i>
              </div>
              <div className="savings-content">
                <div className="savings-label">
                  {totalCosts.isBuyingBetter
                    ? "You Save by Buying"
                    : "You Pay More by Buying"}
                </div>
                <div className="savings-amount">
                  AED {formatNumber(Math.abs(totalCosts.savings))}
                </div>
                <div className="savings-description">
                  Over {loanPeriod} {loanPeriod === 1 ? "year" : "years"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RentVsBuyCalculator;
