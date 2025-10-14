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
import OffPlanDetails from "./components/OffPlanPage/OffPlanDetails";
import OffPlanResale from "./components/OffPlanResalePage/OffPlanResale";
import Services from "./components/ServicesPage/Services";
import PropertyDetails from "./components/PropertyDetails/PropertyDetails";
import BlogPage from "./components/BlogPage/BlogPage";
import BlogDetail from "./components/BlogPage/BlogDetail";
import InteractiveMap from "./components/InteractiveMapPage/InteractiveMap";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <Router>
      <ScrollToTop />
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
          <Route path="/off-plan/:id" element={<OffPlanDetails />} />
          <Route path="/off-plan-resale/:id" element={<PropertyDetails />} />
          <Route
            path="/off-plan-properties-resale"
            element={<OffPlanResale />}
          />
          <Route path="/property/:id" element={<PropertyDetails />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/interactive-map" element={<InteractiveMap />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
