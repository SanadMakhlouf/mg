import React from "react";
import { Link } from "react-router-dom";
import "./BlogCard.css";

const BlogCard = ({ blog }) => {
  // Vérifier si blog est null ou undefined
  if (!blog) {
    return null;
  }

  const {
    id,
    title = "",
    excerpt = "",
    image = "",
    date = "",
    author = "",
    authorImage = "",
    category = "",
    tags = [],
    readTime = "",
  } = blog;

  return (
    <div className="blog-card">
      <div className="blog-card-image">
        <img src={image} alt={title} />
        {category && <div className="blog-category-tag">{category}</div>}
      </div>
      <div className="blog-card-content">
        <div className="blog-meta">
          {date && <div className="blog-date">{date}</div>}
          {readTime && (
            <div className="blog-read-time">
              <i className="fa-regular fa-clock"></i> {readTime}
            </div>
          )}
        </div>
        <h3 className="blog-title">{title}</h3>
        {excerpt && <p className="blog-excerpt">{excerpt}</p>}
        {tags && tags.length > 0 && (
          <div className="blog-tags">
            {tags.map((tag, index) => (
              <Link key={index} to={`/blog?tag=${tag}`} className="blog-tag">
                #{tag}
              </Link>
            ))}
          </div>
        )}
        <div className="blog-footer">
          {author && (
            <div className="blog-author">
              {authorImage && (
                <img src={authorImage} alt={author} className="author-image" />
              )}
              <span>{author}</span>
            </div>
          )}
          <Link to={`/blog/${id}`} className="read-more-btn">
            Read More <i className="fa-solid fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
