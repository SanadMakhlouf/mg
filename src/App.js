import "./App.css";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import SearchSection from "./components/SearchSection";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Hero />
      <SearchSection />
    </div>
  );
}

export default App;
