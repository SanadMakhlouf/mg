import React, { useState } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const testimonials = [
    {
      name: "FULL NAME",
      role: "LOREM IPSUM DOLOR SIT",
      rating: 4,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud. Ut enim ad minim veniam, quis nostrud ut enim ad minim veniam, quis nostrud ut enim ad minim veniam, quis nostrud",
    },
    {
      name: "FULL NAME",
      role: "ROLE OR SOMETHING",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "FULL NAME",
      role: "ROLE OR SOMETHING",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    },
    {
      name: "FULL NAME",
      role: "ROLE OR SOMETHING",
      rating: 5,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
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
