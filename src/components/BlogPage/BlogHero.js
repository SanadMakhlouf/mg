import React from "react";
import "./BlogHero.css";

const BlogHero = ({ title, subtitle }) => {
  return (
    <div className="blog-hero">
      <div className="blog-hero-overlay"></div>
      <div className="blog-hero-content">
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <div className="blog-search">
          <input
            type="text"
            placeholder="Search articles..."
            className="blog-search-input"
          />
          <button className="blog-search-btn">
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogHero;
