import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import WhyUsSection from "./components/WhyUsSection";
import LookingForSection from "./components/LookingForSection";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <SearchSection />
      <WhyUsSection />
      <LookingForSection />
    </div>
  );
}

export default App;
