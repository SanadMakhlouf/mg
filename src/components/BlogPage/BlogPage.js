import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogHero from "./BlogHero";
import BlogCard from "./BlogCard";
import "./BlogPage.css";
import config from "../../config";

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const [activeCategory, setActiveCategory] = useState(tagFilter || "all");
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const blogsPerPage = 6;

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${config.API_URL}/blogs`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (result.status === "success" && Array.isArray(result.data)) {
          setBlogs(result.data);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Get unique categories from blogs
  const categories = ["all", ...new Set(blogs.map((blog) => blog.category))];

  // Filter blogs based on active category or tag
  useEffect(() => {
    if (tagFilter) {
      setFilteredBlogs(blogs.filter((blog) => blog.tags.includes(tagFilter)));
      setActiveCategory("all");
    } else if (activeCategory === "all") {
      setFilteredBlogs(blogs);
    } else {
      setFilteredBlogs(
        blogs.filter((blog) => blog.category === activeCategory)
      );
    }
    setCurrentPage(1);
  }, [activeCategory, tagFilter, blogs]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return (
      <div className="blog-page">
        <BlogHero
          title="Our Blog"
          subtitle="Stay updated with the latest insights, trends, and news in Abu Dhabi's real estate market"
        />
        <div className="blog-content-container">
          <div className="loading-message">
            <i className="fas fa-spinner fa-spin"></i>
            <p>Loading blogs...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-page">
        <BlogHero
          title="Our Blog"
          subtitle="Stay updated with the latest insights, trends, and news in Abu Dhabi's real estate market"
        />
        <div className="blog-content-container">
          <div className="error-message">
            <i className="fas fa-exclamation-circle"></i>
            <p>Error loading blogs: {error}</p>
            <button onClick={() => window.location.reload()}>Try Again</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <BlogHero
        title={tagFilter ? `Posts Tagged: ${tagFilter}` : "Our Blog"}
        subtitle={
          tagFilter
            ? "Explore our articles related to this specific topic"
            : "Stay updated with the latest insights, trends, and news in Abu Dhabi's real estate market"
        }
      />

      <div className="blog-content-container">
        <div className="blog-categories">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`category-btn ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="blog-grid">
          {currentBlogs.length > 0 ? (
            currentBlogs.map((blog) => (
              <BlogCard
                key={blog.id}
                blog={{
                  ...blog,
                  image: blog.image.startsWith("http")
                    ? blog.image
                    : `${config.API_URL.replace("/api/v1", "")}/storage/${
                        blog.image
                      }`,
                  authorImage: blog.authorImage.startsWith("http")
                    ? blog.authorImage
                    : `${config.API_URL.replace("/api/v1", "")}/storage/${
                        blog.authorImage
                      }`,
                }}
              />
            ))
          ) : (
            <div className="no-blogs-message">
              <h3>No articles found</h3>
              <p>Try selecting a different category or removing filters</p>
            </div>
          )}
        </div>

        {filteredBlogs.length > blogsPerPage && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => paginate(currentPage - 1)}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`pagination-btn ${
                  currentPage === i + 1 ? "active" : ""
                }`}
                onClick={() => paginate(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => paginate(currentPage + 1)}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogPage;
