import { useState } from "react";

const ProfileAnalysis = () => {
    const [profileLink, setProfileLink] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleAnalyze = async () => {
        if (!profileLink) {
            alert("Please enter a profile link!");
            return;
        }

        setLoading(true);
        setError(null);
        setResult(null);

        try {
            const response = await fetch("https://x0ghgn5c-5000.inc1.devtunnels.ms/predict", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ profile: profileLink })
            });
            
            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError("Failed to analyze profile. Please try again.");
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
            <h1 className="text-4xl font-bold">🔍 Profile Analysis</h1>
            <p className="mt-2 text-gray-600 max-w-lg">
                Enter an Instagram or LinkedIn profile link to check for spam or fake account indicators.
            </p>
            
            <div className="mt-6 flex flex-col w-full max-w-md">
                <input
                    type="text"
                    placeholder="Paste profile link here..."
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none"
                    value={profileLink}
                    onChange={(e) => setProfileLink(e.target.value)}
                />
                <button 
                    className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg"
                    onClick={handleAnalyze}
                    disabled={loading}
                >
                    {loading ? "Analyzing..." : "Analyze Profile"}
                </button>
            </div>
            
            {error && <p className="mt-4 text-red-600">❌ {error}</p>}

            {result && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-lg text-left">
                    <h2 className="text-2xl font-semibold">Profile Status: {result.fake_score === 1 ? "🚨 Fake" : "✅ Genuine"}</h2>
                    {result.insights && (
                        <>
                            <h3 className="mt-3 text-lg font-medium">⚠️ Key Indicators:</h3>
                            <ul className="list-disc ml-6 mt-1 text-gray-700">
                                {result.insights.map((insight, index) => (
                                    <li key={index}>{insight}</li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ProfileAnalysis;
