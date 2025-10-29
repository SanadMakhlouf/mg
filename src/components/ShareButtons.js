import React, { useState } from "react";
import "./ShareButtons.css";

const ShareButtons = ({ propertyId, propertyName, propertyUrl }) => {
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [copied, setCopied] = useState(false);

  const fullUrl = propertyUrl || `${window.location.origin}/property/${propertyId}`;
  const shareText = `Check out this property: ${propertyName}`;

  const handleShare = (platform) => {
    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedText = encodeURIComponent(shareText);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      twitter: `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      email: `mailto:?subject=${encodedText}&body=${encodedText}%20${encodedUrl}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
      setShowShareMenu(false);
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(fullUrl).then(() => {
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
        setShowShareMenu(false);
      }, 2000);
    });
  };

  return (
    <div className="share-buttons-container">
      <button
        className="share-trigger-btn"
        onClick={() => setShowShareMenu(!showShareMenu)}
      >
        <i className="fa-solid fa-share-nodes"></i>
        <span>Share</span>
      </button>

      {showShareMenu && (
        <>
          <div
            className="share-overlay"
            onClick={() => setShowShareMenu(false)}
          ></div>
          <div className="share-menu">
            <button
              className="share-option whatsapp"
              onClick={() => handleShare("whatsapp")}
            >
              <i className="fa-brands fa-whatsapp"></i>
              <span>WhatsApp</span>
            </button>
            <button
              className="share-option facebook"
              onClick={() => handleShare("facebook")}
            >
              <i className="fa-brands fa-facebook"></i>
              <span>Facebook</span>
            </button>
            <button
              className="share-option twitter"
              onClick={() => handleShare("twitter")}
            >
              <i className="fa-brands fa-x-twitter"></i>
              <span>X</span>
            </button>
            <button
              className="share-option linkedin"
              onClick={() => handleShare("linkedin")}
            >
              <i className="fa-brands fa-linkedin"></i>
              <span>LinkedIn</span>
            </button>
            <button
              className="share-option email"
              onClick={() => handleShare("email")}
            >
              <i className="fa-solid fa-envelope"></i>
              <span>Email</span>
            </button>
            <button className="share-option copy" onClick={copyLink}>
              <i className={`fa-solid ${copied ? "fa-check" : "fa-link"}`}></i>
              <span>{copied ? "Copied!" : "Copy Link"}</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ShareButtons;


