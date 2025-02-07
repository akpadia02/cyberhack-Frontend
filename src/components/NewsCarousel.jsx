import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const newsData = [
  {
    title: "Ratan Tata's will names mystery beneficiary, leaves over ₹500 crore to him",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "Moneycontrol",
    image: "/images/news.avif",
  },
  {
    title: "Tech Industry Sees Record Growth in 2025",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "TechCrunch",
    image: "/images/news.avif",
  },
  {
    title: "Climate Change Efforts Gain Momentum",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "National Geographic",
    image: "/images/news.avif",
  },
  {
    title: "New Innovations in Electric Vehicles",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    source: "Bloomberg",
    image: "/images/news.avif",
  },
];

const NewsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % newsData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? newsData.length - 1 : prevIndex - 1
    );
  };

  // Swipe gesture handling
  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  return (
    <div {...handlers} className="max-w-7xl w-full mx-auto p-4 mt-10">
      <div className="relative flex flex-col md:flex-row md:h-[400px] rounded-lg overflow-hidden bg-white shadow-lg">
        {/* Image Section with Animation */}
        <div className="w-full md:w-1/2">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentIndex}
              src={newsData[currentIndex].image}
              alt="News"
              className="w-full h-64 md:h-full object-cover"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
        </div>

        {/* Text Section */}
        <div className="p-6 w-full flex flex-col justify-center h-max">
          <h2 className="text-2xl font-bold">{newsData[currentIndex].title}</h2>
          <p className="mt-3 text-gray-700">{newsData[currentIndex].content}</p>
          <p className="mt-4 text-sm text-gray-500">Source: {newsData[currentIndex].source}</p>
        </div>

        {/* Navigation Buttons (Hidden on Mobile) */}
        <button
          onClick={handlePrev}
          className="hidden md:flex absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white"
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="hidden md:flex absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white"
        >
          <FaChevronRight size={24} />
        </button>
      </div>
    </div>
  );
};

export default NewsCarousel;
