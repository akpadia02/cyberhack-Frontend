import { useState } from "react";

const MessageSpamDetector = () => {
    const [message, setMessage] = useState("");
    const [source, setSource] = useState("Email");
    const [context, setContext] = useState("Yes");
    const [duration, setDuration] = useState("First-time contact");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const analyzeMessage = async () => {
        if (!message.trim()) {
            alert("Please enter a message!");
            return;
        }

        setLoading(true);
        try {
            const response = await fetch("https://cyberhack-gemini-backend.vercel.app/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message, source, context, duration })
            });

            const data = await response.json();
            if (data.result) {
                setResult({
                    likelihood: data.result.scam_likelihood,
                    reasons: data.result.reasons
                });
            } else {
                setResult({ error: "Error processing request" });
            }
        } catch (error) {
            console.error("Error:", error);
            setResult({ error: "Server error. Please try again." });
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:mt-0 mt-10">
            <h1 className="text-3xl font-bold md:mt-10 mt-2">🚨 Scam Message Detector</h1>
            <p className="mt-4 text-gray-600 max-w-xl">
                Enter a message to analyze its scam likelihood and potential risks.
            </p>

            {/* Message Input */}
            <textarea
                className="mt-4 px-4 py-2 border rounded-lg shadow-sm w-full max-w-md"
                rows="4"
                placeholder="Enter message here..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
            />

            {/* Source Selection */}
            <select className="mt-2 px-4 py-2 border rounded-lg shadow-sm w-full max-w-md"
                value={source}
                onChange={(e) => setSource(e.target.value)}
            >
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Social Media">Social Media</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Other">Other (please specify)</option>
            </select>

            {/* Context Selection */}
            <select className="mt-2 px-4 py-2 border rounded-lg shadow-sm w-full max-w-md"
                value={context}
                onChange={(e) => setContext(e.target.value)}
            >
                <option value="Yes">Yes, I know the sender</option>
                <option value="No">No, unknown sender</option>
                <option value="Unsure">Not sure</option>
            </select>

            {/* Duration Selection */}
            <select className="mt-2 px-4 py-2 border rounded-lg shadow-sm w-full max-w-md"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
            >
                <option value="First-time contact">First-time contact</option>
                <option value="Less than a week">Less than a week</option>
                <option value="More than a month">More than a month</option>
                <option value="Over a year">Over a year</option>
            </select>

            {/* Analyze Button */}
            <button
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg hover:bg-blue-700 transition duration-200"
                onClick={analyzeMessage}
                disabled={loading}
            >
                {loading ? "Analyzing..." : "Analyze Message"}
            </button>

            {/* Result Section */}
            {result && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md ">
                    {result.error ? (
                        <p className="text-red-500">{result.error}</p>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">📊 Scam Likelihood: {result.likelihood}%</h2>
                            <ul className="mt-3 text-left text-gray-700 list-disc list-inside">
                                {result.reasons.map((reason, index) => (
                                    <li key={index}>{reason}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default MessageSpamDetector;
