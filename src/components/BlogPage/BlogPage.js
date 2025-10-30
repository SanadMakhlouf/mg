import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import SEO from "../SEO";
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

  // Get unique categories from blogs with error handling
  const categories = [
    "all",
    ...new Set(blogs.map((blog) => blog.category).filter(Boolean)),
  ];

  // Filter blogs based on active category or tag
  useEffect(() => {
    try {
      if (tagFilter) {
        setFilteredBlogs(
          blogs.filter((blog) => blog.tags && blog.tags.includes(tagFilter))
        );
        setActiveCategory("all");
      } else if (activeCategory === "all") {
        setFilteredBlogs(blogs);
      } else {
        setFilteredBlogs(
          blogs.filter((blog) => blog.category === activeCategory)
        );
      }
      setCurrentPage(1);
    } catch (error) {
      console.error("Error filtering blogs:", error);
      setFilteredBlogs(blogs);
    }
  }, [activeCategory, tagFilter, blogs]);

  // Pagination logic with error handling
  const safeCurrentPage = Math.max(
    1,
    Math.min(currentPage, Math.ceil(filteredBlogs.length / blogsPerPage) || 1)
  );
  const indexOfLastBlog = safeCurrentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage) || 1;

  const paginate = (pageNumber) => {
    const safePageNumber = Math.max(1, Math.min(pageNumber, totalPages));
    setCurrentPage(safePageNumber);
  };

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
    <>
      <SEO
        title={tagFilter ? `${tagFilter} Articles | Meridian Group Blog` : "Real Estate Blog | Meridian Group Abu Dhabi"}
        description={tagFilter ? `Explore articles about ${tagFilter} in Abu Dhabi's real estate market.` : "Stay updated with the latest insights, trends, and news in Abu Dhabi's real estate market from Meridian Group."}
        keywords={tagFilter ? `${tagFilter}, real estate Abu Dhabi, property investment` : "real estate blog Abu Dhabi, property news UAE, real estate insights, property investment tips"}
        url={`https://meridiangroup.ae/blog${tagFilter ? `?tag=${tagFilter}` : ''}`}
        image="https://meridiangroup.ae/logo.png"
      />
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
            currentBlogs.map((blog) => {
              try {
                return (
                  <BlogCard
                    key={blog.id}
                    blog={{
                      ...blog,
                      image:
                        blog.image && blog.image.startsWith("http")
                          ? blog.image
                          : blog.image
                          ? `${config.API_URL.replace("/api/v1", "")}/storage/${
                              blog.image
                            }`
                          : "/test.jpg",
                      authorImage:
                        blog.authorImage && blog.authorImage.startsWith("http")
                          ? blog.authorImage
                          : blog.authorImage
                          ? `${config.API_URL.replace("/api/v1", "")}/storage/${
                              blog.authorImage
                            }`
                          : "/user1.png",
                    }}
                  />
                );
              } catch (error) {
                console.error("Error rendering blog card:", error);
                return null;
              }
            })
          ) : (
            <div className="no-blogs-message">
              <h3>No articles found</h3>
              <p>Try selecting a different category or removing filters</p>
            </div>
          )}
        </div>

        {filteredBlogs.length > blogsPerPage && totalPages > 1 && (
          <div className="pagination">
            <button
              className="pagination-btn"
              disabled={safeCurrentPage === 1}
              onClick={() => paginate(safeCurrentPage - 1)}
              aria-label="Previous page"
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>

            {Array.from({ length: totalPages }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={i}
                  className={`pagination-btn ${
                    safeCurrentPage === pageNum ? "active" : ""
                  }`}
                  onClick={() => paginate(pageNum)}
                  aria-label={`Go to page ${pageNum}`}
                >
                  {pageNum}
                </button>
              );
            })}

            <button
              className="pagination-btn"
              disabled={safeCurrentPage === totalPages}
              onClick={() => paginate(safeCurrentPage + 1)}
              aria-label="Next page"
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
    </>
  );
};

export default BlogPage;
