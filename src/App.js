import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import WhyUsSection from "./components/WhyUsSection";
import LookingForSection from "./components/LookingForSection";
import LastPropertiesSection from "./components/LastPropertiesSection";

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
    </div>
  );
}

export default App;
