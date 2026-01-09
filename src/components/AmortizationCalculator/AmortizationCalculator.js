import React, { useState } from "react";
import "./AmortizationCalculator.css";
import SEO from "../SEO";

const AmortizationCalculator = () => {
  const [principal, setPrincipal] = useState(2000000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTermMonths, setLoanTermMonths] = useState(300); // 25 years = 300 months

  // Calculate monthly payment
  const calculateMonthlyPayment = () => {
    if (principal <= 0 || interestRate <= 0 || loanTermMonths <= 0) {
      return 0;
    }

    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTermMonths;

    if (monthlyRate === 0) {
      return principal / numberOfPayments;
    }

    const monthlyPayment =
      (principal *
        (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments))) /
      (Math.pow(1 + monthlyRate, numberOfPayments) - 1);

    return monthlyPayment;
  };

  const monthlyPayment = calculateMonthlyPayment();

  // Calculate amortization schedule
  const calculateAmortizationSchedule = () => {
    if (principal <= 0 || interestRate <= 0 || loanTermMonths <= 0 || monthlyPayment <= 0) {
      return [];
    }

    const schedule = [];
    const monthlyRate = interestRate / 100 / 12;
    let remainingBalance = principal;

    for (let month = 1; month <= loanTermMonths; month++) {
      const interestPaid = remainingBalance * monthlyRate;
      const principalPaid = monthlyPayment - interestPaid;
      const newBalance = remainingBalance - principalPaid;

      // Handle final payment adjustment
      const finalBalance = newBalance < 0.01 ? 0 : Math.max(0, newBalance);
      const finalPrincipalPaid = finalBalance === 0 ? remainingBalance : principalPaid;
      const finalInterestPaid = finalBalance === 0 ? monthlyPayment - remainingBalance : interestPaid;

      schedule.push({
        month,
        remainingBalance: finalBalance,
        interestPaid: finalInterestPaid,
        principalPaid: finalPrincipalPaid,
        payment: monthlyPayment,
      });

      remainingBalance = finalBalance;

      // Stop if loan is fully paid
      if (finalBalance <= 0) {
        break;
      }
    }

    return schedule;
  };

  const amortizationSchedule = calculateAmortizationSchedule();
  const totalInterest = amortizationSchedule.reduce(
    (sum, row) => sum + row.interestPaid,
    0
  );
  const totalPaid = amortizationSchedule.reduce(
    (sum, row) => sum + row.payment,
    0
  );

  // Format number with commas
  const formatNumber = (num) => {
    return Math.round(num * 100) / 100; // Round to 2 decimal places
  };

  const formatCurrency = (num) => {
    return formatNumber(num).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  return (
    <>
      <SEO
        title="Amortization Calculator - Loan Payment Breakdown | Meridian Group"
        description="Calculate your loan amortization schedule with our interactive calculator. See month-by-month breakdown of principal, interest, and remaining balance."
        keywords="amortization calculator, loan calculator, mortgage amortization, payment schedule, UAE mortgage"
        url="https://meridiangroup.ae/amortization-calculator"
      />
      <div className="amortization-calculator-page">
        <div className="amortization-calculator-container">
          <div className="amortization-calculator-header">
            <h1>Amortization Calculator</h1>
            <p>See how your loan balance decreases over time</p>
          </div>

          <div className="amortization-calculator-content">
            {/* Input Section */}
            <div className="amortization-inputs-section">
              <div className="inputs-row">
                <div className="input-group">
                  <label htmlFor="principal">
                    Principal (AED)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="principal"
                    min="0"
                    step="1000"
                    value={principal}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setPrincipal(value);
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (isNaN(value) || value < 0) {
                        setPrincipal(2000000); // Default value
                      } else {
                        setPrincipal(value);
                      }
                    }}
                    className="number-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="interestRate">
                    Interest Rate (% annual)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="interestRate"
                    min="0"
                    max="20"
                    step="0.1"
                    value={interestRate}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value) || 0;
                      setInterestRate(value);
                    }}
                    onBlur={(e) => {
                      const value = parseFloat(e.target.value);
                      if (isNaN(value) || value < 0) {
                        setInterestRate(4.5); // Default value
                      } else if (value > 20) {
                        setInterestRate(20);
                      } else {
                        setInterestRate(value);
                      }
                    }}
                    className="number-input"
                  />
                </div>

                <div className="input-group">
                  <label htmlFor="loanTermMonths">
                    Loan Term (Months)
                    <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    id="loanTermMonths"
                    min="1"
                    max="600"
                    step="1"
                    value={loanTermMonths}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 1;
                      setLoanTermMonths(value);
                    }}
                    onBlur={(e) => {
                      const value = parseInt(e.target.value);
                      if (isNaN(value) || value < 1) {
                        setLoanTermMonths(300); // Default value (25 years)
                      } else if (value > 600) {
                        setLoanTermMonths(600);
                      } else {
                        setLoanTermMonths(value);
                      }
                    }}
                    className="number-input"
                  />
                  <div className="term-converter">
                    <span>
                      {Math.floor(loanTermMonths / 12)} years{" "}
                      {loanTermMonths % 12 > 0 && `${loanTermMonths % 12} months`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Monthly Payment Output */}
              <div className="monthly-payment-display">
                <div className="payment-label">Monthly Payment</div>
                <div className="payment-amount">
                  AED {formatCurrency(monthlyPayment)}
                </div>
              </div>
            </div>

            {/* Totals Summary */}
            {amortizationSchedule.length > 0 && (
              <div className="amortization-totals">
                <div className="total-card">
                  <div className="total-label">Total Paid</div>
                  <div className="total-value">
                    AED {formatCurrency(totalPaid)}
                  </div>
                </div>
                <div className="total-card">
                  <div className="total-label">Total Interest</div>
                  <div className="total-value">
                    AED {formatCurrency(totalInterest)}
                  </div>
                </div>
                <div className="total-card">
                  <div className="total-label">Principal</div>
                  <div className="total-value">
                    AED {formatCurrency(principal)}
                  </div>
                </div>
              </div>
            )}

            {/* Amortization Table */}
            {amortizationSchedule.length > 0 ? (
              <div className="amortization-table-section">
                <h2>Amortization Schedule</h2>
                <p className="table-description">
                  Month-by-month breakdown of your loan payments
                </p>
                <div className="table-container">
                  <table className="amortization-table">
                    <thead>
                      <tr>
                        <th>Month #</th>
                        <th>Payment</th>
                        <th>Principal</th>
                        <th>Interest</th>
                        <th>Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {amortizationSchedule.map((row) => (
                        <tr key={row.month}>
                          <td>{row.month}</td>
                          <td>AED {formatCurrency(row.payment)}</td>
                          <td>AED {formatCurrency(row.principalPaid)}</td>
                          <td>AED {formatCurrency(row.interestPaid)}</td>
                          <td>
                            {row.remainingBalance === 0 ? (
                              <span className="paid-off">Paid Off</span>
                            ) : (
                              `AED ${formatCurrency(row.remainingBalance)}`
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ) : (
              <div className="amortization-empty">
                <p>Please enter valid loan details to see the amortization schedule.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AmortizationCalculator;
