import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import BlogHero from "./BlogHero";
import BlogCard from "./BlogCard";
import "./BlogPage.css";

const BlogPage = () => {
  const [searchParams] = useSearchParams();
  const tagFilter = searchParams.get("tag");
  const [activeCategory, setActiveCategory] = useState(tagFilter || "all");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 6;

  // Mock blog data - in a real application, this would come from an API
  const blogs = [
    {
      id: 1,
      title: "Top 10 Luxury Villas in Abu Dhabi",
      excerpt:
        "Explore the most exclusive and luxurious villas in Abu Dhabi, featuring stunning architecture and premium amenities.",
      image: "/hero-bg.jpg",
      date: "June 15, 2024",
      author: "Mohammed Al Mansoori",
      authorImage: "/user1.png",
      category: "Luxury Properties",
      tags: ["luxury", "villas", "abu-dhabi", "sheikh-zayed"],
      readTime: "5 min read",
    },
    {
      id: 2,
      title: "Investment Opportunities in Al Reem Island",
      excerpt:
        "Discover why Al Reem Island is becoming one of the hottest investment destinations in Abu Dhabi's real estate market.",
      image: "/hero-bg2.jpg",
      date: "June 10, 2024",
      author: "Sarah Al Hashimi",
      authorImage: "/user2.png",
      category: "Investment",
      tags: ["investment", "al-reem-island", "real-estate"],
      readTime: "7 min read",
    },
    {
      id: 3,
      title: "Guide to Off-Plan Properties in Abu Dhabi",
      excerpt:
        "Everything you need to know about purchasing off-plan properties in Abu Dhabi, including benefits and potential risks.",
      image: "/test.jpg",
      date: "June 5, 2024",
      author: "Ahmed Al Zaabi",
      authorImage: "/user3.png",
      category: "Off-Plan",
      tags: ["off-plan", "investment", "guide"],
      readTime: "8 min read",
    },
    {
      id: 4,
      title: "The Rise of Saadiyat Island as a Cultural Hub",
      excerpt:
        "How Saadiyat Island has transformed into a world-class cultural destination with the Louvre Abu Dhabi and upcoming Guggenheim.",
      image: "/hero-bgg.jpg",
      date: "May 28, 2024",
      author: "Fatima Al Mazrouei",
      authorImage: "/user4.png",
      category: "Lifestyle",
      tags: ["saadiyat-island", "culture", "tourism"],
      readTime: "6 min read",
    },
    {
      id: 5,
      title: "Sustainable Architecture in Modern Abu Dhabi",
      excerpt:
        "Exploring eco-friendly building practices and sustainable architecture in Abu Dhabi's newest developments.",
      image: "/hero-bg.jpg",
      date: "May 20, 2024",
      author: "Mohammed Al Mansoori",
      authorImage: "/user1.png",
      category: "Architecture",
      tags: ["sustainability", "architecture", "eco-friendly"],
      readTime: "9 min read",
    },
    {
      id: 6,
      title: "Navigating Abu Dhabi's Rental Market in 2024",
      excerpt:
        "Expert tips and insights on finding the perfect rental property in Abu Dhabi's competitive market.",
      image: "/hero-bg2.jpg",
      date: "May 15, 2024",
      author: "Sarah Al Hashimi",
      authorImage: "/user2.png",
      category: "Rental",
      tags: ["rental", "market-trends", "tips"],
      readTime: "7 min read",
    },
    {
      id: 7,
      title: "The Evolution of Yas Island Entertainment District",
      excerpt:
        "From Formula 1 to theme parks: How Yas Island became Abu Dhabi's premier entertainment destination.",
      image: "/test.jpg",
      date: "May 10, 2024",
      author: "Ahmed Al Zaabi",
      authorImage: "/user3.png",
      category: "Lifestyle",
      tags: ["yas-island", "entertainment", "tourism"],
      readTime: "5 min read",
    },
    {
      id: 8,
      title: "Waterfront Living: Abu Dhabi's Most Coveted Addresses",
      excerpt:
        "Discover the most prestigious waterfront properties and communities in Abu Dhabi.",
      image: "/hero-bgg.jpg",
      date: "May 5, 2024",
      author: "Fatima Al Mazrouei",
      authorImage: "/user4.png",
      category: "Luxury Properties",
      tags: ["waterfront", "luxury", "communities"],
      readTime: "6 min read",
    },
    {
      id: 9,
      title: "Abu Dhabi Real Estate Market Report: Q2 2024",
      excerpt:
        "Comprehensive analysis of Abu Dhabi's real estate market trends, prices, and forecasts for the second quarter of 2024.",
      image: "/hero-bg.jpg",
      date: "April 28, 2024",
      author: "Mohammed Al Mansoori",
      authorImage: "/user1.png",
      category: "Market Analysis",
      tags: ["market-report", "trends", "analysis"],
      readTime: "10 min read",
    },
  ];

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
  }, [activeCategory, tagFilter]);

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = filteredBlogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

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
            currentBlogs.map((blog) => <BlogCard key={blog.id} blog={blog} />)
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
