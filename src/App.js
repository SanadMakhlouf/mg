import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";
import WhyUsSection from "./components/WhyUsSection";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <SearchSection />
      <WhyUsSection />
    </div>
  );
}

export default App;
