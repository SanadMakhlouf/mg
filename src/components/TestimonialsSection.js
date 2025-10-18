import React, { useState } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "Sarah Ahmed",
      role: "Property Owner",
      rating: 5,
      text: "Meridian Group made our property search seamless and stress-free. Their team's expertise and dedication helped us find our dream home in Abu Dhabi. Highly recommended for anyone looking to buy or sell property.",
    },
    {
      name: "Mohammed Al-Rashid",
      role: "Real Estate Investor",
      rating: 5,
      text: "Professional service and excellent market knowledge. The team guided us through the entire investment process with transparency and integrity.",
    },
    {
      name: "Fatima Hassan",
      role: "First-time Buyer",
      rating: 5,
      text: "As first-time buyers, we were nervous about the process. Meridian Group's team made everything clear and supported us every step of the way.",
    },
    {
      name: "Ahmed Khalil",
      role: "Property Developer",
      rating: 5,
      text: "Outstanding service and deep understanding of the Abu Dhabi market. Their insights and recommendations have been invaluable for our projects.",
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
              <span className="text-gray">CUSTOMERS</span> SAYS
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
