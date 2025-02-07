// import Footer from "./components/Footer";
// import Home from "./components/Home";
// import Navbar from "./components/Navbar";

// function App() {
//   return (
//     <div>
//       <Navbar />
//       <Home />
//       <Footer />
//     </div>
//   );
// }

// export default App;
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import NewsCarousel from "./components/NewsCarousel";
import ProfileAnalysis from "./components/ProfileAnalysis";
import MessageSpamDetector from "./components/MessageSpamDetector";
import ImageSpamDetector from "./components/ImageSpamDetection";
import Contact from "./components/Contact";
import Pricing from "./components/Pricing";

function App() {
  return (
    <>
      <Navbar /> {/* Navbar stays persistent */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news" element={<NewsCarousel />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile-analysis" element={<ProfileAnalysis />} />
        <Route path="/message-spam-detector" element={<MessageSpamDetector />} />
        <Route path="/image-spam-detector" element={<ImageSpamDetector />} />
        <Route path="/pricing" element={<Pricing />} />
      </Routes>
    </>
  );
}

export default App;
