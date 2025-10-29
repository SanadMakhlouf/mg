import React, { useState, useRef } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const carouselRef = useRef(null);

  const reviews = [
    {
      name: "Mehreen Khan",
      rating: 5,
      date: "4 months ago",
      text: "Had a great experience with Meridian Group and Mr. Abdullah. He was helpful, considerate, and genuinely tried his best to find a place that met my needs. Thanks to his efforts, I was able to secure a decent place to stay. Highly recommend their services!",
    },
    {
      name: "Rim Belkorchi",
      rating: 5,
      date: "1 month ago",
      text: "Highly recommend Meridian Group! I truly appreciate their professionalism, kindness and dedication. Special thanks to Abdullah for his amazing support throughout our renting process.",
    },
    {
      name: "Dana",
      rating: 5,
      date: "8 months ago",
      text: "Exceptional Service from Meridian Group! I had an amazing experience with Meridian Group while purchasing my home. From day one, their team was professional, responsive, and truly cared about finding me the perfect property.",
    },
    {
      name: "Aleksander Jóźwik",
      rating: 5,
      date: "2 months ago",
      text: "Amazing support, always patient, friendly and thoughtful. Abdullah is clearly the best agent in Abu Dhabi!",
    },
    {
      name: "Fikri Roslan",
      rating: 5,
      date: "1 year ago",
      text: "Superb agent! Really appreciate all the kindness and service provided. It does really help to move to a very good property. Recommended to anyone whom really want to find a property to stay, use this firm service. Very helpful and friendly!",
    },
    {
      name: "Erion Nako",
      rating: 5,
      date: "8 months ago",
      text: "One of the best services in Abu Dhabi, especially for the customer treatment and service delivery. All the team looks like they are born for accomodating people, to find the best environmnet of living and taking care of all details.",
    },
    {
      name: "GORKA ARANDO",
      rating: 5,
      date: "1 year ago",
      text: "I highly recommend this company for their excellent service and professional agents. A very special thank you to Mr. Abdulrahman Chaar for providing the best service and for his expert advice. His dedication and attention to detail made the entire process smooth and stress-free.",
    },
    {
      name: "sudhanshu Bhatti",
      rating: 5,
      date: "1 year ago",
      text: "I had a fantastic experience with Meridian Group while searching for my apartment in Awqaf Tower. Special thanks to Abdullah, who went above and beyond throughout the entire process. From day one, he kept me informed at every step, handling everything professionally.",
    },
    {
      name: "Tarig Tagalasfia G. Ahmed",
      rating: 5,
      date: "8 months ago",
      text: "I highly recommend Meridian Group, they are very professional and trustworthy partners. They supported me all along the process with very clear communication and professional recommendations.",
    },
    {
      name: "Zakaria Elkhazzar",
      rating: 5,
      date: "4 months ago",
      text: "Received oustanding service from Abdulrahman, highly recommend.",
    },
    {
      name: "Frosina Petrovska",
      rating: 5,
      date: "1 year ago",
      text: "Can't recommend them highly enough. From the first show around Abdulla truly went above and beyond to ensure I felt comfortable and guided through the entire process. Thank you!",
    },
    {
      name: "Hadi H",
      rating: 5,
      date: "4 months ago",
      text: "Great transaction, smooth all the way through.",
    },
    {
      name: "BENOIT QUEZEDE",
      rating: 5,
      date: "10 months ago",
      text: "Mr. Anas was very professional and helped me close the transaction very smoothly.",
    },
    {
      name: "RahmanZX",
      rating: 5,
      date: "2 years ago",
      text: "Highly recommend dealing with this specific company, great management, great services. Experienced agents which will provide you whatever property you are looking for.",
    },
    {
      name: "AYAZ ALI",
      rating: 5,
      date: "1 year ago",
      text: "Very professional and responsive throughout the process. Highly recommended.",
    },
    {
      name: "Sohail Azhar",
      rating: 5,
      date: "8 months ago",
      text: "Professional and very friendly people.",
    },
    {
      name: "Raja Abbas",
      rating: 5,
      date: "1 year ago",
      text: "Very reliable about being at work on time.",
    },
    {
      name: "Mahmood n",
      rating: 5,
      date: "1 year ago",
      text: "Good work and prompt service.",
    },
    {
      name: "Mohammed AlHaj",
      rating: 5,
      date: "1 year ago",
      text: "The best agency ever.",
    },
    {
      name: "Abdullh Almenhali",
      rating: 5,
      date: "2 months ago",
      text: "Thank you to Meridian Group for their excellent service. My dealings with Mr. Abdullah were a perfect example of good manners and ethics.",
    },
    {
      name: "elham saleh",
      rating: 5,
      date: "8 months ago",
      text: "I would like to thank Meridian Group, and especially Mr. Abdullah, for his exceptional services, warm welcome and unwavering dedication to their comfort and happiness, as well as his patience.",
    },
    {
      name: "Adhamakn Akn",
      rating: 5,
      date: "5 months ago",
      text: "The best company to deal with in real estate provides excellent services and has great experience in the real estate field.",
    },
    {
      name: "Fatima Mustafa",
      rating: 5,
      date: "1 year ago",
      text: "Thank you to Meridian Group. The team is excellent. It is one of the best real estate agencies. I wish you much success and continuous development. A company that deserves to be commended.",
    },
    {
      name: "Ahmed M",
      rating: 5,
      date: "6 months ago",
      text: "Thank you Mr. Abdullah Chaar.",
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  // Touch handlers for swipe functionality
  const handleTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextReview();
    }
    if (isRightSwipe) {
      prevReview();
    }
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <h2>
            WHAT <span className="text-gray">OUR</span>
            <br />
            <span className="text-gray">CUSTOMERS</span> SAY
          </h2>
        </div>

        <div className="reviews-center-layout">
          <div 
            className="reviews-prev-next"
            ref={carouselRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {reviews.map((review, index) => (
              <div 
                key={index} 
                className={`review-slide ${index === currentIndex ? 'active' : index < currentIndex ? 'prev' : 'next'}`}
                style={{ 
                  left: `${(index - currentIndex) * 100}%`,
                  zIndex: index === currentIndex ? 10 : index < currentIndex ? 9 - (currentIndex - index) : 11 - (index - currentIndex)
                }}
              >
                <div className="review-card">
                  <div className="review-rating">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="star filled">★</span>
                    ))}
                  </div>
                  <h3 className="review-title">
                    {review.text.split('.')[0]}
                  </h3>
                  <p className="review-text">{review.text}</p>
                  <div className="reviewer-info">
                    <div className="reviewer-avatar">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="reviewer-name">{review.name}</p>
                      <p className="review-date">{review.date}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="carousel-controls">
            <button 
              onClick={prevReview} 
              className="carousel-btn prev"
              aria-label="Previous review"
            >
              <i className="fa-solid fa-chevron-left" aria-hidden="true"></i>
            </button>
            <div className="carousel-dots">
              <span className="dot-counter" aria-live="polite" aria-atomic="true">
                {currentIndex + 1} / {reviews.length}
              </span>
            </div>
            <button 
              onClick={nextReview} 
              className="carousel-btn next"
              aria-label="Next review"
            >
              <i className="fa-solid fa-chevron-right" aria-hidden="true"></i>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
