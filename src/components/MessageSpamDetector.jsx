import { useState } from "react";

const MessageSpamDetector = () => {
    const [message, setMessage] = useState("");
    const [result, setResult] = useState(null);

    const analyzeMessage = () => {
        if (!message.trim()) return;

        // Simple spam analysis (replace this with an ML model if needed)
        let likelihood = 0;
        let reasons = [];

        if (/free|win|prize|money|offer|click here|urgent/i.test(message)) {
            likelihood += 40;
            reasons.push("Contains common scam words (e.g., 'win', 'prize', 'urgent').");
        }
        if (/http|www|\.\w{2,}/i.test(message)) {
            likelihood += 30;
            reasons.push("Includes a suspicious link.");
        }
        if (/bank|account|password|verify|security/i.test(message)) {
            likelihood += 20;
            reasons.push("Mentions sensitive financial or security terms.");
        }
        if (message.length < 10) {
            likelihood += 10;
            reasons.push("Message is too short, could be an automated scam.");
        }

        // Cap likelihood at 100%
        likelihood = Math.min(likelihood, 100);

        setResult({ likelihood, reasons });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:mt-0 mt-10">
            <h1 className="text-3xl font-bold">🤖 Message Spam Detector</h1>
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

            {/* Analyze Button */}
            <button
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg"
                onClick={analyzeMessage}
            >
                Analyze Message
            </button>

            {/* Result Section */}
            {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md">
                    <h2 className="text-xl font-semibold">📊 Scam Likelihood: {result.likelihood}%</h2>
                    <ul className="mt-3 text-left text-gray-700 list-disc list-inside">
                        {result.reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default MessageSpamDetector;
