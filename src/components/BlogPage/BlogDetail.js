import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BlogDetail.css";
import config from "../../config";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchBlogDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        // Récupérer les détails du blog
        const response = await fetch(`${config.API_URL}/blogs/${id}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();

        if (result.status === "success" && result.data) {
          // Adapter les URLs des images
          const blogData = {
            ...result.data,
            image: result.data.image.startsWith("http")
              ? result.data.image
              : `${config.API_URL.replace("/api", "")}/storage/${
                  result.data.image
                }`,
            authorImage: result.data.authorImage.startsWith("http")
              ? result.data.authorImage
              : `${config.API_URL.replace("/api", "")}/storage/${
                  result.data.authorImage
                }`,
          };
          setBlog(blogData);

          // Récupérer les articles liés
          const relatedResponse = await fetch(
            `${config.API_URL}/blogs?category=${blogData.category}&limit=2&exclude=${id}`
          );
          if (relatedResponse.ok) {
            const relatedResult = await relatedResponse.json();
            if (
              relatedResult.status === "success" &&
              Array.isArray(relatedResult.data)
            ) {
              // Adapter les URLs des images pour les articles liés
              const relatedData = relatedResult.data.map((post) => ({
                ...post,
                image: post.image.startsWith("http")
                  ? post.image
                  : `${config.API_URL.replace("/api", "")}/storage/${
                      post.image
                    }`,
              }));
              setRelatedPosts(relatedData);
            }
          }
        } else {
          throw new Error("Blog not found");
        }
      } catch (err) {
        console.error("Error fetching blog details:", err);
        setError(err.message);
        if (err.message === "Blog not found") {
          navigate("/blog");
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBlogDetails();
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="blog-detail-container loading">
        <div className="loading-spinner">
          <i className="fas fa-spinner fa-spin"></i>
          <p>Loading article...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="blog-detail-container">
        <div className="blog-error">
          <i className="fas fa-exclamation-circle"></i>
          <h2>Error Loading Article</h2>
          <p>{error}</p>
          <div className="error-actions">
            <button
              onClick={() => window.location.reload()}
              className="retry-btn"
            >
              <i className="fas fa-redo"></i> Try Again
            </button>
            <Link to="/blog" className="back-to-blogs-btn">
              <i className="fas fa-arrow-left"></i> Back to Blogs
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <div className="blog-not-found">
          <i className="fas fa-file-alt"></i>
          <h2>Blog Not Found</h2>
          <p>
            The article you are looking for does not exist or has been removed.
          </p>
          <Link to="/blog" className="back-to-blogs-btn">
            <i className="fas fa-arrow-left"></i> Back to Blogs
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="blog-detail-container">
      <div className="blog-detail-header">
        <div className="blog-detail-image">
          <img src={blog.image} alt={blog.title} />
        </div>
        <div className="blog-detail-overlay"></div>
        <div className="blog-detail-title-container">
          <div className="blog-detail-meta">
            {blog.category && (
              <span className="blog-detail-category">{blog.category}</span>
            )}
            {blog.date && <span className="blog-detail-date">{blog.date}</span>}
            {blog.readTime && (
              <span className="blog-detail-read-time">
                <i className="fa-regular fa-clock"></i> {blog.readTime}
              </span>
            )}
          </div>
          <h1 className="blog-detail-title">{blog.title || "Untitled"}</h1>
          {blog.author && (
            <div className="blog-detail-author">
              {blog.authorImage && (
                <img
                  src={blog.authorImage}
                  alt={blog.author}
                  className="author-detail-image"
                />
              )}
              <span>{blog.author}</span>
            </div>
          )}
        </div>
      </div>

      <div className="blog-detail-content-wrapper">
        <div className="blog-detail-main">
          {blog.tags && blog.tags.length > 0 && (
            <div className="blog-tags-container">
              {blog.tags.map((tag, index) => (
                <Link
                  key={index}
                  to={`/blog?tag=${tag}`}
                  className="blog-detail-tag"
                >
                  #{tag}
                </Link>
              ))}
            </div>
          )}

          {blog.content && (
            <div
              className="blog-detail-content"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            ></div>
          )}

          {blog.author && blog.authorBio && (
            <div className="blog-detail-author-bio">
              <div className="author-bio-image">
                {blog.authorImage && (
                  <img src={blog.authorImage} alt={blog.author} />
                )}
              </div>
              <div className="author-bio-content">
                <h3>About {blog.author}</h3>
                <p>{blog.authorBio}</p>
              </div>
            </div>
          )}

          <div className="blog-detail-share">
            <h3>Share This Article</h3>
            <div className="share-buttons">
              <button className="share-btn facebook">
                <i className="fa-brands fa-facebook-f"></i>
              </button>
              <button className="share-btn twitter">
                <i className="fa-brands fa-twitter"></i>
              </button>
              <button className="share-btn linkedin">
                <i className="fa-brands fa-linkedin-in"></i>
              </button>
              <button className="share-btn whatsapp">
                <i className="fa-brands fa-whatsapp"></i>
              </button>
            </div>
          </div>
        </div>

        <div className="blog-detail-sidebar">
          <div className="sidebar-section">
            <h3>Related Articles</h3>
            {relatedPosts.length > 0 ? (
              <div className="related-posts">
                {relatedPosts.map((post) => (
                  <div key={post.id} className="related-post">
                    <Link
                      to={`/blog/${post.id}`}
                      className="related-post-image"
                    >
                      <img src={post.image} alt={post.title} />
                    </Link>
                    <div className="related-post-content">
                      <Link
                        to={`/blog/${post.id}`}
                        className="related-post-title"
                      >
                        {post.title}
                      </Link>
                      <div className="related-post-date">{post.date}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>No related articles found.</p>
            )}
          </div>

          <div className="sidebar-section">
            <h3>Popular Tags</h3>
            <div className="popular-tags">
              <Link to="/blog?tag=luxury" className="popular-tag">
                Luxury
              </Link>
              <Link to="/blog?tag=investment" className="popular-tag">
                Investment
              </Link>
              <Link to="/blog?tag=abu-dhabi" className="popular-tag">
                Abu Dhabi
              </Link>
              <Link to="/blog?tag=off-plan" className="popular-tag">
                Off-Plan
              </Link>
              <Link to="/blog?tag=real-estate" className="popular-tag">
                Real Estate
              </Link>
            </div>
          </div>

          <div className="sidebar-section contact-section">
            <h3>Need More Information?</h3>
            <p>Contact our real estate experts for personalized advice.</p>
            <Link to="/contact" className="contact-btn">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      <div className="blog-detail-navigation">
        <Link to="/blog" className="back-to-blogs">
          <i className="fa-solid fa-arrow-left"></i> Back to All Articles
        </Link>
      </div>
    </div>
  );
};

export default BlogDetail;
