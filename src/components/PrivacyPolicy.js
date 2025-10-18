import React from "react";
import "./PrivacyPolicy.css";

const PrivacyPolicy = () => {
  return (
    <div className="privacy-policy-page">
      <div className="privacy-policy-container">
        <div className="privacy-policy-header">
          <h1>Privacy Policy</h1>
          <p className="last-updated">Last updated: December 2024</p>
        </div>

        <div className="privacy-policy-content">
          <section className="privacy-section">
            <h2>1. Introduction</h2>
            <p>
              Meridian Group ("we," "our," or "us") is committed to protecting your privacy. 
              This Privacy Policy explains how we collect, use, disclose, and safeguard your 
              information when you visit our website meridiangroup.ae and use our services.
            </p>
          </section>

          <section className="privacy-section">
            <h2>2. Information We Collect</h2>
            <h3>2.1 Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us, including:</p>
            <ul>
              <li>Name and contact information (email address, phone number)</li>
              <li>Property preferences and requirements</li>
              <li>Financial information for property transactions</li>
              <li>Communication preferences</li>
            </ul>

            <h3>2.2 Automatically Collected Information</h3>
            <p>We may automatically collect certain information when you visit our website:</p>
            <ul>
              <li>IP address and device information</li>
              <li>Browser type and version</li>
              <li>Pages visited and time spent on our site</li>
              <li>Referring website information</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>3. How We Use Your Information</h2>
            <p>We use the collected information for the following purposes:</p>
            <ul>
              <li>Providing real estate services and property listings</li>
              <li>Communicating with you about properties and services</li>
              <li>Processing transactions and agreements</li>
              <li>Improving our website and services</li>
              <li>Complying with legal obligations</li>
              <li>Marketing and promotional activities (with your consent)</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>4. Information Sharing</h2>
            <p>We may share your information in the following circumstances:</p>
            <ul>
              <li>With property owners and developers for legitimate business purposes</li>
              <li>With service providers who assist in our operations</li>
              <li>When required by law or legal process</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With your explicit consent</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>5. Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures to protect your 
              personal information against unauthorized access, alteration, disclosure, or 
              destruction. However, no method of transmission over the internet is 100% secure.
            </p>
          </section>

          <section className="privacy-section">
            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal information</li>
              <li>Correct inaccurate information</li>
              <li>Request deletion of your information</li>
              <li>Object to processing of your information</li>
              <li>Withdraw consent for marketing communications</li>
            </ul>
          </section>

          <section className="privacy-section">
            <h2>7. Cookies and Tracking</h2>
            <p>
              Our website uses cookies and similar technologies to enhance your browsing 
              experience, analyze website traffic, and personalize content. You can control 
              cookie settings through your browser preferences.
            </p>
          </section>

          <section className="privacy-section">
            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible 
              for the privacy practices or content of these external sites. We encourage 
              you to review their privacy policies.
            </p>
          </section>

          <section className="privacy-section">
            <h2>9. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of 
              any material changes by posting the new policy on our website and updating 
              the "Last updated" date.
            </p>
          </section>

          <section className="privacy-section">
            <h2>10. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy or our data practices, 
              please contact us:
            </p>
            <div className="contact-info">
              <p><strong>Email:</strong> info@meridiangroup.ae</p>
              <p><strong>Phone:</strong> (+97) 150607030</p>
              <p><strong>Address:</strong> Office 55, Baynunah Tower 2, Al Hosn, Abu Dhabi</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
