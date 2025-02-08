import { useState, useEffect } from "react";
import { ArrowRightCircle } from "lucide-react";
import { useUser } from "@clerk/clerk-react";
import { db } from "../../lib/firebase";
import { collection, query, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

const QuizTrivia = () => {
    const [questions, setQuestions] = useState([]);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedOption, setSelectedOption] = useState(null);
    const [score, setScore] = useState(0);
    const [showResult, setShowResult] = useState(false);
    const [attempts, setAttempts] = useState(0);
    const [loading, setLoading] = useState(true);
    const [answerFeedback, setAnswerFeedback] = useState(null); // ✅ New state for feedback

    const { user } = useUser();
    const userId = user ? user.id : null;

    useEffect(() => {
        if (userId) {
            checkUserAttempts();
        }
    }, [userId]);

    const checkUserAttempts = async () => {
        if (!userId) return;

        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
            const data = userDoc.data();
            setAttempts(data.attempts || 0);

            if (data.attempts > 0) {
                fetchQuestions();
            }
        } else {
            await setDoc(userDocRef, { attempts: 3, stars: 0 });
            setAttempts(3);
            fetchQuestions();
        }

        setLoading(false);
    };

    const fetchQuestions = async () => {
        try {
            const q = query(collection(db, "cybersecurity_quiz"));
            const querySnapshot = await getDocs(q);
            const loadedQuestions = querySnapshot.docs.map(doc => doc.data());
            setQuestions(loadedQuestions);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
    };

    const handleNext = async () => {
        if (!userId || attempts <= 0) return;

        const userDocRef = doc(db, "users", userId);
        const userDoc = await getDoc(userDocRef);
        let userData = userDoc.exists() ? userDoc.data() : { attempts: 3, stars: 0 };

        const correctAnswer = questions[currentQuestion].answer;
        if (selectedOption === correctAnswer) {
            setScore(score + 1);
            userData.stars += 100;
            setAnswerFeedback("✅ Correct!");
        } else {
            setAnswerFeedback(`❌ Incorrect! The correct answer is: ${correctAnswer}`);
        }

        userData.attempts -= 1;
        await setDoc(userDocRef, userData, { merge: true });

        setAttempts(userData.attempts);

        // Delay moving to the next question for 2 seconds to show feedback
        setTimeout(() => {
            if (currentQuestion + 1 < questions.length && userData.attempts > 0) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedOption(null);
                setAnswerFeedback(null); // Clear feedback for the next question
            } else {
                setShowResult(true);
            }
        }, 2000);
    };

    if (loading) {
        return <p className="text-center text-lg text-gray-600">Loading...</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full text-center px-6 md:mt-10 mt-0">
            <h1 className="text-4xl font-bold text-blue-600">Quiz</h1>
            <p className="mt-2 text-gray-600">Test your knowledge with fun trivia questions!</p>
            <p className="mt-2 text-red-600">Attempts left: {attempts}</p>

            <div className="mt-6 w-full max-w-md bg-purple-200 p-6 rounded-lg shadow-lg">
                {showResult ? (
                    <div>
                        <h2 className="text-2xl font-bold text-green-700">Your Score: {score}/{questions.length}</h2>
                    </div>
                ) : attempts > 0 ? (
                    questions.length > 0 ? (
                        <div>
                            <h2 className="text-xl font-semibold text-purple-700">{questions[currentQuestion].question}</h2>
                            <div className="mt-4 flex flex-col gap-3">
                                {questions[currentQuestion].options.map((option, index) => (
                                    <button
                                        key={index}
                                        className={`w-full px-4 py-3 border rounded-lg shadow-sm ${selectedOption === option ? "bg-green-200 text-green-700" : "bg-white"}`}
                                        onClick={() => handleOptionClick(option)}
                                    >
                                        {option}
                                    </button>
                                ))}
                            </div>

                            {answerFeedback && (
                                <p className="mt-2 text-lg font-semibold text-gray-700">{answerFeedback}</p>
                            )}

                            <button
                                className="mt-4 w-full bg-black text-white font-bold py-2 rounded-lg shadow-lg flex items-center justify-center"
                                onClick={handleNext}
                                disabled={!selectedOption}
                            >
                                {currentQuestion + 1 === questions.length ? "Finish Quiz" : "Next Question"} <ArrowRightCircle className="ml-2" />
                            </button>
                        </div>
                    ) : (
                        <p className="text-red-600">No questions available.</p>
                    )
                ) : (
                    <p className="text-red-600">You have used all your attempts for today.</p>
                )}
            </div>
        </div>
    );
};

export default QuizTrivia;
