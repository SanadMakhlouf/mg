import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./NotificationBar.css";

const NotificationBar = () => {
  const [notification, setNotification] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/properties/search/advanced?listing_type=sale`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.success && result.data) {
          const properties = Array.isArray(result.data) ? result.data : [result.data];
          const totalCount = properties.length;
          
          setNotification({
            message: totalCount > 0 
              ? `Meridian Group has ${totalCount} premium properties available for sale in Abu Dhabi`
              : "Premium properties available for sale in Abu Dhabi",
            linkText: "Explore Properties",
            linkUrl: "/buy"
          });
        } else {
          setNotification({
            message: "Premium properties available for sale in Abu Dhabi",
            linkText: "Explore Properties",
            linkUrl: "/buy"
          });
        }
      } catch (err) {
        console.error("Error fetching properties:", err);
        setNotification({
          message: "Premium properties available for sale in Abu Dhabi",
          linkText: "Explore Properties",
          linkUrl: "/buy"
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading || !notification) {
    return null;
  }

  return (
    <section className="notification-bar-section">
      <div className="notification-bar">
        <div className="notification-content">
          <span className="notification-pill">{notification.message}</span>
          <span className="notification-separator">·</span>
          <a 
            href={notification.linkUrl}
            className="notification-link"
            onClick={(e) => {
              e.preventDefault();
              navigate(notification.linkUrl);
            }}
          >
            {notification.linkText}
            <i className="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>
      </div>
    </section>
  );
};

export default NotificationBar;

