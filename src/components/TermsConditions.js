import React from "react";
import "./TermsConditions.css";

const TermsConditions = () => {
  return (
    <div className="terms-conditions-page">
      <div className="terms-conditions-container">
        <div className="terms-conditions-header">
          <h1>Terms and Conditions</h1>
          <p className="last-updated">Last updated: December 2024</p>
        </div>

        <div className="terms-conditions-content">
          <section className="terms-section">
            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing and using the Meridian Group website (meridiangroup.ae) and services, 
              you accept and agree to be bound by the terms and provision of this agreement. 
              If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="terms-section">
            <h2>2. Description of Service</h2>
            <p>
              Meridian Group provides real estate services including property sales, rentals, 
              property management, and real estate consulting services in Abu Dhabi, UAE. 
              Our services are subject to availability and applicable laws and regulations.
            </p>
          </section>

          <section className="terms-section">
            <h2>3. User Responsibilities</h2>
            <p>As a user of our services, you agree to:</p>
            <ul>
              <li>Provide accurate and complete information</li>
              <li>Use our services only for lawful purposes</li>
              <li>Respect intellectual property rights</li>
              <li>Not engage in fraudulent or misleading activities</li>
              <li>Comply with all applicable laws and regulations</li>
            </ul>
          </section>

          <section className="terms-section">
            <h2>4. Property Information</h2>
            <p>
              All property information, including prices, availability, and specifications, 
              is provided for informational purposes only. While we strive for accuracy, 
              we cannot guarantee that all information is current or complete. Property 
              details may change without notice.
            </p>
          </section>

          <section className="terms-section">
            <h2>5. Financial Transactions</h2>
            <p>
              All financial transactions are subject to UAE laws and regulations. 
              We are not responsible for third-party payment processing or banking 
              issues. All fees and charges are clearly disclosed before any transaction.
            </p>
          </section>

          <section className="terms-section">
            <h2>6. Limitation of Liability</h2>
            <p>
              Meridian Group shall not be liable for any indirect, incidental, special, 
              consequential, or punitive damages, including without limitation, loss of 
              profits, data, use, goodwill, or other intangible losses, resulting from 
              your use of our services.
            </p>
          </section>

          <section className="terms-section">
            <h2>7. Intellectual Property</h2>
            <p>
              All content, trademarks, logos, and intellectual property on our website 
              are owned by Meridian Group or our licensors. You may not use, reproduce, 
              or distribute any content without our written permission.
            </p>
          </section>

          <section className="terms-section">
            <h2>8. Privacy</h2>
            <p>
              Your privacy is important to us. Please review our Privacy Policy, which 
              also governs your use of our services, to understand our practices.
            </p>
          </section>

          <section className="terms-section">
            <h2>9. Termination</h2>
            <p>
              We may terminate or suspend your access to our services immediately, 
              without prior notice or liability, for any reason whatsoever, including 
              without limitation if you breach the Terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>10. Governing Law</h2>
            <p>
              These Terms shall be interpreted and governed by the laws of the United 
              Arab Emirates. Any disputes arising from these terms shall be subject 
              to the exclusive jurisdiction of the courts of Abu Dhabi, UAE.
            </p>
          </section>

          <section className="terms-section">
            <h2>11. Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. We will notify 
              users of any material changes by posting the new terms on our website. 
              Your continued use of our services after such modifications constitutes 
              acceptance of the updated terms.
            </p>
          </section>

          <section className="terms-section">
            <h2>12. Contact Information</h2>
            <p>
              If you have any questions about these Terms and Conditions, please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> info@meridiangroup.ae</p>
              <p><strong>Phone:</strong> +971 586830401</p>
              <p><strong>Address:</strong> Al Hisn, Baynunah Tower 2, Office 402, Abu Dhabi</p>
              <p><strong>Working Hours:</strong> Open 09:00 AM to 6:00 PM</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsConditions;
