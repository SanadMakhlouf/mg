import React, { useEffect } from "react";
import Hero from "./Hero";
import SearchSection from "./SearchSection";
import WhyUsSection from "./WhyUsSection";
import LookingForSection from "./LookingForSection";
import LastPropertiesSection from "./LastPropertiesSection";
import TestimonialsSection from "./TestimonialsSection";
import PopularDevelopersSection from "./PopularDevelopersSection";
import GetInTouchSection from "./GetInTouchSection";
import MapSection from "./MapSection";
import SEO from "./SEO";
import "./Home.css";

const Home = () => {
  useEffect(() => {
    // Add scroll-triggered animations with enhanced options
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          // Optionally unobserve after animation to improve performance
          // observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    // Observe all sections for animation
    const sections = document.querySelectorAll('.home-section, .fade-scale, .slide-left, .slide-right, .stagger-children');
    sections.forEach(section => observer.observe(section));

    // Add parallax effect on scroll (subtle)
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.pageYOffset;
          const parallaxItems = document.querySelectorAll('.parallax-item');
          parallaxItems.forEach((item, index) => {
            const speed = 0.5 + (index * 0.1);
            item.style.transform = `translateY(${scrolled * speed * 0.1}px)`;
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      sections.forEach(section => observer.unobserve(section));
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Meridian Group",
    "url": "https://meridiangroup.ae",
    "description": "Premier real estate services in Abu Dhabi, UAE",
    "publisher": {
      "@type": "Organization",
      "name": "Meridian Group",
      "url": "https://meridiangroup.ae"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://meridiangroup.ae/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <SEO
        title="Meridian Group - Premier Real Estate in Abu Dhabi | Buy, Rent & Invest"
        description="Discover premium real estate opportunities in Abu Dhabi with Meridian Group. Expert property services for buying, renting, and investing in luxury apartments, villas, and off-plan projects."
        keywords="real estate Abu Dhabi, property for sale Abu Dhabi, luxury apartments Abu Dhabi, villas for rent, off-plan properties, real estate investment UAE, property management Abu Dhabi"
        url="https://meridiangroup.ae/"
        image="https://meridiangroup.ae/og-image.jpg"
        structuredData={structuredData}
      />
      <Hero />
      <SearchSection />
      <div className="container">
        <div className="home-section">
          <WhyUsSection />
        </div>
        <div className="home-section">
          <LookingForSection />
        </div>
      </div>
      <div className="home-section">
        <LastPropertiesSection />
      </div>
      <div className="home-section">
        <TestimonialsSection />
      </div>
      <div className="home-section">
        <PopularDevelopersSection />
      </div>
      <div className="home-section">
        <GetInTouchSection />
      </div>
      <div className="home-section">
        <MapSection />
      </div>
    </>
  );
};

export default Home;
