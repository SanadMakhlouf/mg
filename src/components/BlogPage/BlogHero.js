import React from "react";
import "./BlogHero.css";

const BlogHero = ({ title, subtitle }) => {
  return (
    <div className="blog-hero">
      <div className="blog-hero-overlay"></div>
      <div className="blog-hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
  
      </div>
    </div>
  );
};

export default BlogHero;
