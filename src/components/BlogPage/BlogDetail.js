import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import "./BlogDetail.css";

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [relatedPosts, setRelatedPosts] = useState([]);

  // Mock blog data - in a real application, this would come from an API
  const mockBlogs = [
    {
      id: "1",
      title: "Top 10 Luxury Villas in Abu Dhabi",
      content: `
        <p>Abu Dhabi, the capital of the United Arab Emirates, is renowned for its opulent lifestyle and luxurious real estate offerings. The city's skyline is dotted with architectural marvels that redefine luxury living, and its residential villas are no exception.</p>
        
        <p>In this article, we explore the top 10 luxury villas in Abu Dhabi that exemplify the pinnacle of sophisticated living. These properties combine stunning architecture, premium amenities, and breathtaking locations to create unparalleled living experiences.</p>
        
        <h2>1. Al Gurm Resort Villas</h2>
        
        <p>Nestled within a natural mangrove forest, Al Gurm Resort Villas offer a unique blend of luxury and nature. These exclusive waterfront properties feature private beaches, spacious interiors with high ceilings, and panoramic views of the Arabian Gulf.</p>
        
        <h2>2. Saadiyat Beach Villas</h2>
        
        <p>Located on the pristine shores of Saadiyat Island, these villas provide direct access to the island's renowned white sandy beaches. The properties feature contemporary designs, infinity pools, and are in close proximity to cultural landmarks like the Louvre Abu Dhabi.</p>
        
        <h2>3. Nurai Island Villas</h2>
        
        <p>For the ultimate in exclusive living, Nurai Island offers private villas on a boutique island just off the coast of Abu Dhabi. These properties come with their own beaches, infinity pools, and unobstructed sea views, all while being just a short boat ride from the mainland.</p>
        
        <h2>4. Yas Acres Villas</h2>
        
        <p>Set against the backdrop of Yas Island's entertainment district, Yas Acres villas combine luxury with convenience. These properties feature modern designs, smart home technology, and access to world-class golf courses and entertainment venues.</p>
        
        <h2>5. Hidd Al Saadiyat Villas</h2>
        
        <p>This exclusive beachfront community offers villas with direct beach access and views of the Arabian Gulf. The properties feature spacious layouts, private pools, and are designed to maximize natural light and sea views.</p>
        
        <p>The remaining villas on our list continue to showcase Abu Dhabi's commitment to luxury living, each offering unique features and amenities that cater to the most discerning homeowners.</p>
        
        <p>Whether you're looking for a permanent residence or an investment opportunity, these luxury villas represent the cream of Abu Dhabi's real estate market, promising not just homes but lifestyles defined by comfort, exclusivity, and prestige.</p>
      `,
      image: "/hero-bg.jpg",
      date: "June 15, 2024",
      author: "Mohammed Al Mansoori",
      authorImage: "/user1.png",
      authorBio:
        "Mohammed is a luxury real estate specialist with over 15 years of experience in Abu Dhabi's premium property market. He has helped numerous high-net-worth individuals find their dream homes.",
      category: "Luxury Properties",
      tags: ["luxury", "villas", "abu-dhabi", "sheikh-zayed"],
      readTime: "5 min read",
    },
    {
      id: "2",
      title: "Investment Opportunities in Al Reem Island",
      content: `
        <p>Al Reem Island has emerged as one of Abu Dhabi's most promising investment destinations, offering a unique blend of modern urban living and strategic location advantages. This natural island, located just 600 meters from Abu Dhabi's northeastern coast, has transformed into a thriving residential and commercial hub.</p>
        
        <h2>Why Al Reem Island?</h2>
        
        <p>Al Reem Island's appeal to investors stems from several key factors that position it as a prime location for real estate investment:</p>
        
        <ul>
          <li><strong>Strategic Location:</strong> Just minutes away from downtown Abu Dhabi and well-connected to major highways</li>
          <li><strong>Freehold Status:</strong> One of the few areas in Abu Dhabi where foreign nationals can own property outright</li>
          <li><strong>Modern Infrastructure:</strong> State-of-the-art facilities, including schools, hospitals, and retail centers</li>
          <li><strong>Waterfront Living:</strong> Many properties offer stunning sea views and marina access</li>
        </ul>
        
        <h2>Current Market Trends</h2>
        
        <p>The real estate market on Al Reem Island has shown remarkable resilience and growth potential. Recent data indicates:</p>
        
        <ul>
          <li>Average rental yields between 7-9%, higher than many other areas in Abu Dhabi</li>
          <li>Property value appreciation of approximately 5-7% annually over the past three years</li>
          <li>Increasing demand for both residential and commercial spaces</li>
        </ul>
        
        <h2>Investment Options</h2>
        
        <h3>1. Residential Properties</h3>
        
        <p>From luxury apartments in high-rise towers to exclusive penthouses, Al Reem Island offers diverse residential investment opportunities. Properties with sea views and those in newer developments typically command premium prices and higher rental returns.</p>
        
        <h3>2. Commercial Spaces</h3>
        
        <p>Office spaces and retail units present attractive investment options, particularly in mixed-use developments. The growing business community on the island ensures steady demand for commercial properties.</p>
        
        <h3>3. Off-Plan Investments</h3>
        
        <p>Several new developments are underway on Al Reem Island, offering investors the chance to purchase properties at pre-construction prices, potentially yielding significant returns upon completion.</p>
        
        <h2>Future Outlook</h2>
        
        <p>The future looks promising for Al Reem Island investments, with several factors pointing to continued growth:</p>
        
        <ul>
          <li>Ongoing infrastructure improvements and new amenities being added</li>
          <li>Abu Dhabi's economic diversification efforts attracting more businesses and residents</li>
          <li>Limited new supply in prime locations, helping to maintain property values</li>
        </ul>
        
        <p>For investors looking to enter Abu Dhabi's real estate market, Al Reem Island presents a compelling opportunity with its blend of lifestyle benefits and investment potential. As with any investment, thorough research and professional guidance are recommended to maximize returns and mitigate risks.</p>
      `,
      image: "/hero-bg2.jpg",
      date: "June 10, 2024",
      author: "Sarah Al Hashimi",
      authorImage: "/user2.png",
      authorBio:
        "Sarah is a real estate investment analyst specializing in Abu Dhabi's emerging markets. She holds an MBA in Finance and has been featured in several regional financial publications.",
      category: "Investment",
      tags: ["investment", "al-reem-island", "real-estate"],
      readTime: "7 min read",
    },
    {
      id: "3",
      title: "Guide to Off-Plan Properties in Abu Dhabi",
      content: `
        <p>Off-plan property investment has become increasingly popular in Abu Dhabi's real estate market. This comprehensive guide explores the benefits, risks, and essential considerations for investors looking to purchase properties before their completion.</p>
        
        <h2>Understanding Off-Plan Properties</h2>
        
        <p>Off-plan properties refer to real estate that is purchased directly from developers before or during construction. Buyers typically make their purchase decision based on floor plans, 3D renderings, and model units rather than a finished product.</p>
        
        <h2>Advantages of Off-Plan Investments</h2>
        
        <h3>1. Lower Initial Prices</h3>
        
        <p>One of the most attractive aspects of off-plan properties is their competitive pricing. Developers often offer these properties at 10-30% below market value to attract early investors and secure funding for construction.</p>
        
        <h3>2. Flexible Payment Plans</h3>
        
        <p>Off-plan purchases typically come with developer-backed payment plans that allow investors to spread their payments over the construction period. Some plans may even extend beyond completion, with only a small percentage required as a down payment.</p>
        
        <h3>3. Capital Appreciation</h3>
        
        <p>By the time construction is completed, property values may have increased significantly, allowing investors to realize substantial capital gains even before taking possession of the property.</p>
        
        <h3>4. Customization Options</h3>
        
        <p>Early buyers often have the opportunity to customize certain aspects of their property, from layout modifications to finish selections, creating a more personalized space.</p>
        
        <h2>Potential Risks and Mitigation Strategies</h2>
        
        <h3>1. Construction Delays</h3>
        
        <p>Delays in construction timelines are common in real estate development. To mitigate this risk, investors should:</p>
        <ul>
          <li>Research the developer's track record for completing projects on schedule</li>
          <li>Ensure the contract includes compensation clauses for significant delays</li>
          <li>Understand the legal framework protecting buyers in case of extreme delays</li>
        </ul>
        
        <h3>2. Quality Concerns</h3>
        
        <p>Since buyers cannot inspect the actual property before purchase, there's a risk that the finished product may not meet expectations. Investors can protect themselves by:</p>
        <ul>
          <li>Visiting other completed projects by the same developer</li>
          <li>Ensuring the contract specifies quality standards and materials</li>
          <li>Including a snagging period in the contract to address defects</li>
        </ul>
        
        <h3>3. Market Fluctuations</h3>
        
        <p>The property market may change between purchase and completion. To minimize exposure to market risks:</p>
        <ul>
          <li>Research market trends and future development plans for the area</li>
          <li>Consider properties in established or rapidly developing locations</li>
          <li>Have a clear exit strategy or long-term plan for the property</li>
        </ul>
        
        <h2>Legal Protections in Abu Dhabi</h2>
        
        <p>Abu Dhabi has implemented robust regulations to protect off-plan property buyers, including:</p>
        <ul>
          <li>Escrow account requirements for developer funds</li>
          <li>Mandatory registration of all off-plan sales</li>
          <li>Clear guidelines for contract cancellations and refunds</li>
        </ul>
        
        <h2>Making an Informed Decision</h2>
        
        <p>Before investing in off-plan properties in Abu Dhabi, potential buyers should:</p>
        <ul>
          <li>Thoroughly research the developer's reputation and financial stability</li>
          <li>Understand all terms and conditions in the purchase agreement</li>
          <li>Consider consulting with a real estate attorney specializing in UAE property law</li>
          <li>Visit the construction site and surrounding area to assess location benefits</li>
        </ul>
        
        <p>Off-plan property investment in Abu Dhabi can be highly rewarding when approached with careful consideration and due diligence. By understanding both the opportunities and challenges, investors can make informed decisions that align with their financial goals and risk tolerance.</p>
      `,
      image: "/test.jpg",
      date: "June 5, 2024",
      author: "Ahmed Al Zaabi",
      authorImage: "/user3.png",
      authorBio:
        "Ahmed is a property law expert and consultant with extensive experience in Abu Dhabi's off-plan property market. He regularly advises international investors on navigating the UAE's real estate regulations.",
      category: "Off-Plan",
      tags: ["off-plan", "investment", "guide"],
      readTime: "8 min read",
    },
  ];

  useEffect(() => {
    // Simulate API call to fetch blog details
    setLoading(true);
    setTimeout(() => {
      const foundBlog = mockBlogs.find((b) => b.id === id);
      if (foundBlog) {
        setBlog(foundBlog);

        // Find related posts based on tags
        const related = mockBlogs
          .filter(
            (b) =>
              b.id !== id && b.tags.some((tag) => foundBlog.tags.includes(tag))
          )
          .slice(0, 2);

        setRelatedPosts(related);
      } else {
        // If blog not found, redirect to blog list
        navigate("/blog");
      }
      setLoading(false);
    }, 500);
  }, [id, navigate]);

  if (loading) {
    return (
      <div className="blog-detail-container loading">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="blog-detail-container">
        <div className="blog-not-found">
          <h2>Blog Not Found</h2>
          <p>
            The article you are looking for does not exist or has been removed.
          </p>
          <Link to="/blog" className="back-to-blogs-btn">
            Back to Blogs
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
            <span className="blog-detail-category">{blog.category}</span>
            <span className="blog-detail-date">{blog.date}</span>
            <span className="blog-detail-read-time">
              <i className="fa-regular fa-clock"></i> {blog.readTime}
            </span>
          </div>
          <h1 className="blog-detail-title">{blog.title}</h1>
          <div className="blog-detail-author">
            <img
              src={blog.authorImage}
              alt={blog.author}
              className="author-detail-image"
            />
            <span>{blog.author}</span>
          </div>
        </div>
      </div>

      <div className="blog-detail-content-wrapper">
        <div className="blog-detail-main">
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

          <div
            className="blog-detail-content"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          ></div>

          <div className="blog-detail-author-bio">
            <div className="author-bio-image">
              <img src={blog.authorImage} alt={blog.author} />
            </div>
            <div className="author-bio-content">
              <h3>About {blog.author}</h3>
              <p>{blog.authorBio}</p>
            </div>
          </div>

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
