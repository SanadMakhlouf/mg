import React, { useState } from "react";
import "./WhatsAppWidget.css";

const WhatsAppWidget = () => {
  const [isHovered, setIsHovered] = useState(false);
  
  // WhatsApp number (remove spaces, parentheses, and format for WhatsApp)
  const phoneNumber = "971586830401"; // Your number formatted for WhatsApp
  const message = "Hello! I'm interested in learning more about your properties.";
  
  const handleClick = () => {
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div 
      className={`whatsapp-widget ${isHovered ? 'hovered' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="whatsapp-icon">
        <svg viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
          <path
            fill="currentColor"
            d="M16 0c-8.837 0-16 7.163-16 16 0 2.825 0.737 5.607 2.137 8.048l-2.137 7.952 7.933-2.127c2.42 1.37 5.173 2.127 8.067 2.127 8.837 0 16-7.163 16-16s-7.163-16-16-16zM16 29.467c-2.482 0-4.908-0.646-7.07-1.87l-0.507-0.292-5.253 1.408 1.409-5.231-0.321-0.525c-1.308-2.145-2.003-4.611-2.003-7.223 0-7.51 6.11-13.62 13.62-13.62s13.62 6.11 13.62 13.62-6.11 13.62-13.62 13.62zM21.305 19.26c-0.346-0.174-2.049-1.007-2.366-1.123-0.316-0.117-0.547-0.174-0.776 0.174s-0.893 1.123-1.094 1.347c-0.201 0.225-0.402 0.253-0.748 0.079-0.346-0.174-1.461-0.537-2.785-1.711-1.030-0.916-1.725-2.048-1.927-2.394-0.201-0.346-0.021-0.533 0.152-0.706 0.156-0.155 0.346-0.402 0.518-0.604 0.174-0.201 0.231-0.346 0.346-0.571 0.117-0.225 0.058-0.427-0.028-0.604-0.087-0.174-0.776-1.87-1.063-2.565-0.28-0.672-0.56-0.58-0.776-0.591-0.201-0.010-0.431-0.012-0.661-0.012s-0.604 0.087-0.92 0.427c-0.316 0.346-1.206 1.179-1.206 2.873s1.235 3.333 1.406 3.561c0.174 0.225 2.425 3.732 5.872 5.234 0.821 0.357 1.462 0.571 1.962 0.731 0.825 0.262 1.576 0.225 2.168 0.137 0.662-0.099 2.045-0.835 2.332-1.642 0.288-0.807 0.288-1.501 0.201-1.642-0.087-0.146-0.316-0.231-0.662-0.408z"
          />
        </svg>
      </div>
      {isHovered && (
        <div className="whatsapp-tooltip">
          Chat with us on WhatsApp
        </div>
      )}
    </div>
  );
};

export default WhatsAppWidget;




