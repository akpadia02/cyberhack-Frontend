import { useState } from "react";

const ProfileAnalysis = () => {
    const [profileLink, setProfileLink] = useState("");
    const [analysisResult, setAnalysisResult] = useState(null);

    const handleAnalyze = async () => {
        if (!profileLink) return;
        
        // Placeholder for API call (replace with actual API request)
        setAnalysisResult({
            username: "@exampleuser",
            engagementRate: "3.5%",
            followerFollowingRatio: "1.2",
            spamLikelihood: "High",
            insights: [
                "Low engagement despite high followers",
                "Excessive hashtags in posts",
                "Frequent but generic comments",
            ],
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center md:mt-0 mt-10">
            <h1 className="text-4xl font-bold">🔍 Profile Analysis</h1>
            <p className="mt-2 text-gray-600 max-w-lg">
                Enter an Instagram or LinkedIn profile link to analyze potential spam indicators using our ML-based detection system.
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
                >
                    Analyze Profile
                </button>
            </div>
            
            {analysisResult && (
                <div className="mt-6 bg-white p-4 rounded-lg shadow-lg w-full max-w-lg text-left">
                    <h2 className="text-2xl font-semibold">Analysis Result</h2>
                    <p className="mt-2"><strong>Username:</strong> {analysisResult.username}</p>
                    <p><strong>Engagement Rate:</strong> {analysisResult.engagementRate}</p>
                    <p><strong>Follower-Following Ratio:</strong> {analysisResult.followerFollowingRatio}</p>
                    <p><strong>Spam Likelihood:</strong> <span className="text-red-600 font-bold">{analysisResult.spamLikelihood}</span></p>
                    <h3 className="mt-3 text-lg font-medium">⚠️ Key Indicators:</h3>
                    <ul className="list-disc ml-6 mt-1 text-gray-700">
                        {analysisResult.insights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default ProfileAnalysis;
