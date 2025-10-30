import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import "./BlogCarousel.css";

const BlogCarousel = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${config.API_URL}/blogs?limit=10`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();

        if (result.status === "success" && Array.isArray(result.data)) {
          const formattedBlogs = result.data.map((blog) => ({
            id: blog.id,
            title: blog.title,
            excerpt: blog.excerpt || blog.description || "",
            image: blog.image.startsWith("http")
              ? blog.image
              : `${config.API_URL.replace("/api/v1", "")}/storage/${blog.image}`,
          }));
          setBlogs(formattedBlogs);
        }
        } catch (err) {
        // Error fetching blogs
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const nextSlide = () => {
    const maxIndex = Math.max(0, blogs.length - 4);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, blogs.length - 4);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const visibleBlogs = blogs.slice(currentIndex, currentIndex + 4);

  if (loading) {
    return (
      <section className="blog-carousel-section">
        <div className="container">
          <p>Loading guides...</p>
        </div>
      </section>
    );
  }

  if (blogs.length === 0) {
    return null;
  }

  return (
    <section className="blog-carousel-section">
      <div className="container">
        <div className="blog-carousel-wrapper">
          {blogs.length > 4 && (
            <button className="blog-carousel-arrow prev-arrow" onClick={prevSlide}>
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          )}

          <div className="blog-carousel">
            {visibleBlogs.map((blog) => (
              <div
                key={blog.id}
                className="blog-carousel-card"
                onClick={() => navigate(`/blog/${blog.id}`)}
              >
                <div className="blog-card-content-section">
                  <h3 className="blog-card-title">{blog.title}</h3>
                  <p className="blog-card-description">{blog.excerpt}</p>
                </div>
                <div className="blog-card-image-section">
                  <img src={blog.image || "/test.jpg"} alt={blog.title} />
                  <div className="blog-image-overlay"></div>
                </div>
              </div>
            ))}
          </div>

          {blogs.length > 4 && (
            <button className="blog-carousel-arrow next-arrow" onClick={nextSlide}>
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default BlogCarousel;

