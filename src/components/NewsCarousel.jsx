import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const API_KEY = "70bac416f79942228fe6e70784a86c20"; // Replace with your actual NewsAPI key
const API_URL = `https://newsapi.org/v2/everything?q=instagram%20scam&sortBy=publishedAt&apiKey=70bac416f79942228fe6e70784a86c20`;

const NewsCarousel = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await fetch(API_URL);
                const data = await response.json();
                if (data.articles) {
                    setNews(data.articles.slice(0, 10)); // Get only the latest 10 articles
                }
            } catch (error) {
                console.error("Error fetching news:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % news.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? news.length - 1 : prevIndex - 1
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
        <div {...handlers} className="max-w-7xl grid place-content-center px-4 h-screen w-full mx-auto mt-10">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="relative flex flex-col h-[80vh] md:flex-row md:h-[80vh] rounded-lg overflow-hidden bg-white shadow-lg">
                    {/* Image Section with Animation */}
                    <div className="w-full">
                        <AnimatePresence mode="wait">
                            <motion.img
                                key={currentIndex}
                                src={news[currentIndex]?.urlToImage || "/images/news-placeholder.jpg"}
                                alt="News"
                                className="w-full md:h-full object-fit"
                                initial={{ opacity: 0, x: 100 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -100 }}
                                transition={{ duration: 0.5 }}
                            />
                        </AnimatePresence>
                    </div>

                    {/* Text Section */}
                    <div className="p-6 w-full h-full flex flex-col justify-center">
                        <h2 className="text-2xl font-bold md:line-clamp-none line-clamp-2">
                            <a href={news[currentIndex]?.url} target="_blank" rel="noopener noreferrer" className="text-blue-600">
                                {news[currentIndex]?.title}
                            </a>
                        </h2>
                        <p className="mt-3 text-gray-700 md:line-clamp-none line-clamp-4">{news[currentIndex]?.description}</p>
                        <p className="mt-4 text-sm text-gray-500">Source: {news[currentIndex]?.source?.name} | 📅 {new Date(news[currentIndex]?.publishedAt).toLocaleDateString()}</p>
                    </div>

                    {/* Navigation Buttons */}
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
            )}
        </div>
    );
};

export default NewsCarousel;
