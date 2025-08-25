import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import WhyUsSection from "./components/WhyUsSection";
import LookingForSection from "./components/LookingForSection";
import LastPropertiesSection from "./components/LastPropertiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PopularDevelopersSection from "./components/PopularDevelopersSection";
import GetInTouchSection from "./components/GetInTouchSection";
import MapSection from "./components/MapSection";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Hero />
        <div className="container">
          <SearchSection />
          <WhyUsSection />
          <LookingForSection />
        </div>
        <LastPropertiesSection />

        <TestimonialsSection />
        <PopularDevelopersSection />
        <GetInTouchSection />
        <MapSection />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
