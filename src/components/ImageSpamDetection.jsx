import { useState } from "react";

const ImageSpamDetector = () => {
    const [image, setImage] = useState(null);
    const [result, setResult] = useState(null);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
        }
    };

    const analyzeImage = () => {
        // Placeholder result (to be replaced with actual logic)
        setResult({
            likelihood: 72, // Example percentage
            reasons: [
                "Contains a suspicious URL.",
                "Mentions giveaway-related terms.",
                "Possible impersonation attempt."
            ],
            username: "@scam_alert",
            url: "https://fakepromo.com"
        });
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
            <h1 className="text-3xl font-bold">📸 Image Spam Detector</h1>
            <p className="mt-4 text-gray-600 max-w-xl">
                Upload an image to detect potential spam content.
            </p>

            {/* Upload Image */}
            <input
                type="file"
                accept="image/*"
                className="mt-4 border p-2 rounded-lg"
                onChange={handleImageUpload}
            />

            {/* Preview Image */}
            {image && <img src={image} alt="Uploaded" className="mt-4 max-w-xs rounded-lg shadow-md" />}

            {/* Analyze Button */}
            <button
                className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg"
                onClick={analyzeImage}
            >
                Analyze Image
            </button>

            {/* Result Section */}
            {result && (
                <div className="mt-6 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md text-left mb-10">
                    <h2 className="text-xl font-semibold">📊 Spam Likelihood: {result.likelihood}%</h2>
                    <ul className="mt-3 text-gray-700 list-disc list-inside">
                        {result.reasons.map((reason, index) => (
                            <li key={index}>{reason}</li>
                        ))}
                    </ul>
                    {result.username && <p className="mt-3">📌 **Detected Username:** {result.username}</p>}
                    {result.url && (
                        <p className="mt-1">
                            🔗 **Extracted URL:** <a href={result.url} className="text-blue-600 underline">{result.url}</a>
                        </p>
                    )}
                </div>
            )}
        </div>
    );
};

export default ImageSpamDetector;
