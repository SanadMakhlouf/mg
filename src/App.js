import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Buy from "./components/BuyPage/Buy";
import Rent from "./components/RentPage/Rent";
import Contact from "./components/ContactPage/Contact";
import About from "./components/AboutPage/About";
import ListYour from "./components/ListYourPage/ListYour";
import ReadyProjects from "./components/ReadyProjectsPage/ReadyProjects";
import OffPlan from "./components/OffPlanPage/OffPlan";
import Services from "./components/ServicesPage/Services";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/buy" element={<Buy />} />
          <Route path="/rent" element={<Rent />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/list-your-property" element={<ListYour />} />
          <Route path="/ready-projects" element={<ReadyProjects />} />
          <Route path="/off-plan-properties" element={<OffPlan />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
