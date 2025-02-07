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

function App() {
  return (
    <>
      <Navbar /> {/* Navbar stays persistent */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/news" element={<NewsCarousel />} />
      </Routes>
    </>
  );
}

export default App;
