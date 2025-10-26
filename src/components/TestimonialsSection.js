import React, { useState } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Property Owner",
      rating: 5,
      text: "Meridian Group transformed our property journey completely. Their expert team navigated the Abu Dhabi market with incredible skill, finding us a home that exceeded all expectations. The level of dedication and professionalism is unmatched—they're the best in the business.",
    },
    {
      name: "Mohammed Al-Rashid",
      role: "Real Estate Investor",
      rating: 5,
      text: "Working with Meridian Group was a game-changer for our investment portfolio. Their deep market expertise and strategic insights helped us make confident decisions. The transparent approach and commitment to our success built genuine trust throughout the entire process.",
    },
    {
      name: "Fatima Hassan",
      role: "First-time Buyer",
      rating: 5,
      text: "As first-time buyers, we were anxious about navigating the property market. Meridian Group's team became our trusted advisors—explaining every detail, answering every question, and ensuring we made the perfect decision. Their support made all the difference.",
    },
    {
      name: "Ahmed Khalil",
      role: "Property Developer",
      rating: 5,
      text: "Exceptional partnership with Meridian Group. Their profound understanding of Abu Dhabi's real estate landscape and strategic recommendations have been instrumental in our project's success. They don't just sell properties—they create value.",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setCurrentSlide(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-left">
          <div className="testimonials-header">
            <h2>
              WHAT <span className="text-gray">OUR</span>
              <br />
              <span className="text-gray">CUSTOMERS</span> SAY
            </h2>
          </div>
          <div className="testimonials-photos">
            <div className="photo-row">
              <img src="/user1.png" alt="Customer 1" />
              <img src="/user2.png" alt="Customer 2" />
              <img src="/user3.png" alt="Customer 3" />
            </div>
            <div className="testimonial-controls">
              <button onClick={prevSlide} className="testimonial-btn prev">
                &#8249;
              </button>
              <button onClick={nextSlide} className="testimonial-btn next">
                &#8250;
              </button>
            </div>
          </div>
        </div>

        <div className="testimonials-content">
          <div className="testimonials-carousel">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`testimonial-card ${
                  index === currentSlide ? "active" : ""
                }`}
              >
                <div className="testimonial-image">
                  {/* Placeholder for user image */}
                  <img src={`/user${index + 1}.png`} alt={testimonial.name} />
                </div>
                <div className="testimonial-info">
                  <h3>{testimonial.name}</h3>
                  <p className="role">{testimonial.role}</p>
                  <div className="rating">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={
                          i < testimonial.rating ? "star filled" : "star"
                        }
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <p className="testimonial-text">{testimonial.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
