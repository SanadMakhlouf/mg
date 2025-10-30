import React, { useState } from "react";
import "./TestimonialsSection.css";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const reviews = [
    {
      name: "Mehreen Khan",
      rating: 5,
      title: "Grateful to have been recommended Meridian Group",
      text: "Had a great experience with Meridian Group and Mr. Abdullah. He was helpful, considerate, and genuinely tried his best to find a place that met my needs. Thanks to his efforts, I was able to secure a decent place to stay.",
    },
    {
      name: "Rim Belkorchi",
      rating: 5,
      title: "Excellent service and professionalism",
      text: "Highly recommend Meridian Group! I truly appreciate their professionalism, kindness and dedication. Special thanks to Abdullah for his amazing support throughout our renting process.",
    },
    {
      name: "Dana",
      rating: 5,
      title: "Exceptional Service from Meridian Group",
      text: "I had an amazing experience with Meridian Group while purchasing my home. From day one, their team was professional, responsive, and truly cared about finding me the perfect property.",
    },
    {
      name: "Aleksander Jóźwik",
      rating: 5,
      title: "Amazing support and patience",
      text: "Amazing support, always patient, friendly and thoughtful. Abdullah is clearly the best agent in Abu Dhabi!",
    },
    {
      name: "Fikri Roslan",
      rating: 5,
      title: "Superb agent and excellent service",
      text: "Superb agent! Really appreciate all the kindness and service provided. It does really help to move to a very good property. Recommended to anyone whom really want to find a property to stay, use this firm service.",
    },
    {
      name: "Erion Nako",
      rating: 5,
      title: "One of the best services in Abu Dhabi",
      text: "One of the best services in Abu Dhabi, especially for the customer treatment and service delivery. All the team looks like they are born for accomodating people, to find the best environmnet of living and taking care of all details.",
    },
    {
      name: "GORKA ARANDO",
      rating: 5,
      title: "Highly recommend this company",
      text: "I highly recommend this company for their excellent service and professional agents. A very special thank you to Mr. Abdulrahman Chaar for providing the best service and for his expert advice.",
    },
    {
      name: "sudhanshu Bhatti",
      rating: 5,
      title: "Fantastic experience with Abdullah",
      text: "I had a fantastic experience with Meridian Group while searching for my apartment in Awqaf Tower. Special thanks to Abdullah, who went above and beyond throughout the entire process.",
    },
    {
      name: "Tarig Tagalasfia G. Ahmed",
      rating: 5,
      title: "Professional and trustworthy partners",
      text: "I highly recommend Meridian Group, they are very professional and trustworthy partners. They supported me all along the process with very clear communication and professional recommendations.",
    },
    {
      name: "Zakaria Elkhazzar",
      rating: 5,
      title: "Outstanding service from Abdulrahman",
      text: "Received oustanding service from Abdulrahman, highly recommend.",
    },
    {
      name: "Frosina Petrovska",
      rating: 5,
      title: "Can't recommend them highly enough",
      text: "Can't recommend them highly enough. From the first show around Abdulla truly went above and beyond to ensure I felt comfortable and guided through the entire process.",
    },
    {
      name: "Hadi H",
      rating: 5,
      title: "Great transaction, smooth all the way",
      text: "Great transaction, smooth all the way through.",
    },
    {
      name: "BENOIT QUEZEDE",
      rating: 5,
      title: "Very professional and smooth transaction",
      text: "Mr. Anas was very professional and helped me close the transaction very smoothly.",
    },
    {
      name: "RahmanZX",
      rating: 5,
      title: "Highly recommend dealing with this company",
      text: "Highly recommend dealing with this specific company, great management, great services. Experienced agents which will provide you whatever property you are looking for.",
    },
    {
      name: "AYAZ ALI",
      rating: 5,
      title: "Very professional and responsive",
      text: "Very professional and responsive throughout the process. Highly recommended.",
    },
    {
      name: "Sohail Azhar",
      rating: 5,
      title: "Professional and very friendly people",
      text: "Professional and very friendly people.",
    },
    {
      name: "Raja Abbas",
      rating: 5,
      title: "Very reliable and punctual",
      text: "Very reliable about being at work on time.",
    },
    {
      name: "Mahmood n",
      rating: 5,
      title: "Good work and prompt service",
      text: "Good work and prompt service.",
    },
    {
      name: "Mohammed AlHaj",
      rating: 5,
      title: "The best agency ever",
      text: "The best agency ever.",
    },
    {
      name: "Abdullh Almenhali",
      rating: 5,
      title: "Excellent service and perfect manners",
      text: "Thank you to Meridian Group for their excellent service. My dealings with Mr. Abdullah were a perfect example of good manners and ethics.",
    },
    {
      name: "elham saleh",
      rating: 5,
      title: "Exceptional services and warm welcome",
      text: "I would like to thank Meridian Group, and especially Mr. Abdullah, for his exceptional services, warm welcome and unwavering dedication to their comfort and happiness, as well as his patience.",
    },
    {
      name: "Adhamakn Akn",
      rating: 5,
      title: "The best company to deal with",
      text: "The best company to deal with in real estate provides excellent services and has great experience in the real estate field.",
    },
    {
      name: "Fatima Mustafa",
      rating: 5,
      title: "One of the best real estate agencies",
      text: "Thank you to Meridian Group. The team is excellent. It is one of the best real estate agencies. I wish you much success and continuous development.",
    },
    {
      name: "Ahmed M",
      rating: 5,
      title: "Thank you Mr. Abdullah Chaar",
      text: "Thank you Mr. Abdullah Chaar.",
    }
  ];

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const getVisibleCards = () => {
    const cards = [];
    for (let i = -2; i <= 2; i++) {
      const index = (currentIndex + i + reviews.length) % reviews.length;
      cards.push({ index, position: i });
    }
    return cards;
  };

  return (
    <section className="testimonials-section">
      <div className="testimonials-container">
        <div className="testimonials-header">
          <span className="testimonials-subtitle">CUSTOMER REVIEWS</span>
          <h2>What Our Clients Say About Us</h2>
          <p className="testimonials-description">
            Discover why our clients trust Meridian Group for their real estate needs. Read genuine reviews from satisfied customers who have successfully found their dream properties in Abu Dhabi.
          </p>
        </div>

        <div className="testimonials-carousel-wrapper">
          <button className="carousel-nav-btn prev-btn" onClick={prevReview}>
            <i className="fa-solid fa-chevron-left"></i>
          </button>

          <div className="testimonials-carousel">
            {getVisibleCards().map(({ index, position }) => {
              const review = reviews[index];
              const isCenter = position === 0;

              return (
                <div
                  key={index}
                  className={`testimonial-card-carousel ${isCenter ? 'center' : ''}`}
                  style={{
                    transform: `translateX(${position * 100}%) scale(${isCenter ? 1 : 0.85})`,
                    zIndex: isCenter ? 10 : 5 - Math.abs(position),
                    opacity: isCenter ? 1 : 0.6,
                  }}
                >
                  <div className="testimonial-rating">
                    {[...Array(review.rating)].map((_, i) => (
                      <span key={i} className="star">★</span>
                    ))}
                  </div>
                  <h3 className="testimonial-title">{review.title}</h3>
                  <p className="testimonial-text">{review.text}</p>
                  <div className="testimonial-author">{review.name}</div>
                </div>
              );
            })}
          </div>

          <button className="carousel-nav-btn next-btn" onClick={nextReview}>
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
