import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useSwipeable } from "react-swipeable";

const API_KEY = "oKuUFvWInqWTXxgnVSQ4ZVg0FqPhut6TXndlpKrJ"; // Replace with your QuizAPI key
const API_URL = `https://quizapi.io/api/v1/questions?apiKey=${API_KEY}`;

const CyberSecurityQuiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [loading, setLoading] = useState(true);
  const [points, setPoints] = useState(Math.floor(Math.random() * 401) + 100);
  const [claimed, setClaimed] = useState(false);

  const giftCards = [
    { name: "Amazon Gift Card", cost: 300 },
    { name: "Google Play Gift Card", cost: 200 },
    { name: "Steam Wallet Code", cost: 500 },
  ];

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuiz();
  }, []);

  const handleAnswer = (answer, correctAnswer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);
  };

  const handleNext = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prevIndex) => (prevIndex + 1) % questions.length);
  };

  const handlePrev = () => {
    setSelectedAnswer(null);
    setIsCorrect(null);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? questions.length - 1 : prevIndex - 1
    );
  };

  const handleClaimReward = () => {
    setClaimed(true);
  };

  const handlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventScrollOnSwipe: true,
    trackMouse: true,
  });

  if (loading) return <p className="text-center mt-5 text-xl">Loading quiz...</p>;

  return (
    <div {...handlers} className="max-w-4xl mx-auto p-6 mt-20">
      <div className="relative bg-white shadow-lg rounded-lg p-6">
        <AnimatePresence mode="wait">
          {questions.length > 0 && (
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <h2 className="text-xl font-bold mb-4">
                {questions[currentIndex]?.question}
              </h2>
              <div className="grid grid-cols-1 gap-3">
                {Object.entries(questions[currentIndex]?.answers)
                  .filter(([_, value]) => value !== null)
                  .map(([key, value]) => (
                    <button
                      key={key}
                      onClick={() =>
                        handleAnswer(
                          value,
                          questions[currentIndex]?.correct_answers[key + "_correct"] === "true"
                        )
                      }
                      className={`p-3 rounded-lg text-left ${
                        selectedAnswer === value
                          ? isCorrect
                            ? "bg-green-500 text-white"
                            : "bg-red-500 text-white"
                          : "bg-gray-200 hover:bg-gray-300"
                      }`}
                    >
                      {value}
                    </button>
                  ))}
              </div>
              {selectedAnswer !== null && (
                <p className="mt-3 text-lg font-semibold">
                  {isCorrect ? "✅ Correct!" : "❌ Incorrect!"}
                </p>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white"
        >
          <FaChevronLeft size={24} />
        </button>

        <button
          onClick={handleNext}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-gray-800 p-3 rounded-full text-white"
        >
          <FaChevronRight size={24} />
        </button>
      </div>

      {/* Jump to Rewards Button */}
      <button
        onClick={() => document.getElementById("rewards-section").scrollIntoView({ behavior: "smooth" })}
        className="mt-6 p-3 w-full bg-purple-600 text-white rounded-lg hover:bg-purple-700"
      >
        Jump to Claim Reward
      </button>

      {/* Rewards Section */}
      <div id="rewards-section" className="mt-10 bg-gray-100 p-6 rounded-lg shadow-lg">
        <h3 className="text-xl font-bold">Your Points: {points}</h3>
        <h4 className="text-lg mt-4 font-semibold">Available Gift Cards:</h4>
        <ul className="mt-2">
          {giftCards.map((gift, index) => (
            <li key={index} className="p-3 border-b last:border-b-0">
              {gift.name} - {gift.cost} Points
            </li>
          ))}
        </ul>
        <button
          onClick={handleClaimReward}
          disabled={claimed}
          className={`mt-4 p-3 w-full rounded-lg text-white ${claimed ? "bg-gray-500" : "bg-blue-600 hover:bg-blue-700"}`}
        >
          {claimed ? "Reward Claimed" : "Claim Reward"}
        </button>
      </div>
    </div>
  );
};

export default CyberSecurityQuiz;
  