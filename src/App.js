import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import WhyUsSection from "./components/WhyUsSection";
import LookingForSection from "./components/LookingForSection";
import LastPropertiesSection from "./components/LastPropertiesSection";
import TestimonialsSection from "./components/TestimonialsSection";
import PopularDevelopersSection from "./components/PopularDevelopersSection";
import GetInTouchSection from "./components/GetInTouchSection";

function App() {
  return (
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
    </div>
  );
}

export default App;
