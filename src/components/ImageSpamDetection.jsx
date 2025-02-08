import { useState } from "react";
import Tesseract from "tesseract.js";

const ImageMessageSpamDetector = () => {
    const [image, setImage] = useState(null);
    const [extractedText, setExtractedText] = useState("");
    const [source, setSource] = useState("Email");
    const [context, setContext] = useState("Yes");
    const [duration, setDuration] = useState("First-time contact");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(URL.createObjectURL(file));
            extractTextFromImage(file);
        }
    };

    const extractTextFromImage = async (file) => {
        setLoading(true);
        try {
            const { data: { text } } = await Tesseract.recognize(file, "eng");
            setExtractedText(text.trim());
        } catch (error) {
            console.error("Error extracting text:", error);
        }
        setLoading(false);
    };

    const analyzeMessage = async () => {
        if (!extractedText.trim()) {
            alert("No text extracted from image!");
            return;
        }
        
        setLoading(true);
        try {
            const response = await fetch("https://cyberhack-gemini-backend.vercel.app/analyze", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: extractedText,
                    source,
                    context,
                    duration
                })
            });

            const data = await response.json();
            setResult(data.result ? {
                likelihood: data.result.scam_likelihood,
                reasons: data.result.reasons
            } : { error: "Error processing request" });
        } catch (error) {
            console.error("Error:", error);
            setResult({ error: "Server error. Please try again." });
        }
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 md:mt-20">
            <h1 className="text-3xl font-bold">🖼️ Image-Based Scam Detector</h1>
            <p className="mt-4 text-gray-600 max-w-xl">Upload an image, extract text, and analyze its scam likelihood.</p>
            
            <input type="file" accept="image/*" className="mt-4 border p-2 rounded-lg" onChange={handleImageUpload} />
            {image && <img src={image} alt="Uploaded" className="mt-4 max-w-xs rounded-lg shadow-md" />}
            
            {loading && <p className="mt-2 text-blue-600">Processing...</p>}
            {extractedText && <p className="mt-2 p-3 bg-gray-100 rounded shadow-md">📜 Extracted Text: {extractedText}</p>}
            
            {/* Additional Inputs */}
            <select className="mt-2 px-4 py-2 border rounded-lg w-full max-w-md" value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="Email">Email</option>
                <option value="SMS">SMS</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Social Media">Social Media</option>
                <option value="Phone Call">Phone Call</option>
                <option value="Other">Other (please specify)</option>
            </select>
            
            <select className="mt-2 px-4 py-2 border rounded-lg w-full max-w-md" value={context} onChange={(e) => setContext(e.target.value)}>
                <option value="Yes">Yes, I know the sender</option>
                <option value="No">No, unknown sender</option>
                <option value="Unsure">Not sure</option>
            </select>
            
            <select className="mt-2 px-4 py-2 border rounded-lg w-full max-w-md" value={duration} onChange={(e) => setDuration(e.target.value)}>
                <option value="First-time contact">First-time contact</option>
                <option value="Less than a week">Less than a week</option>
                <option value="More than a month">More than a month</option>
                <option value="Over a year">Over a year</option>
            </select>
            
            <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg" onClick={analyzeMessage} disabled={loading}>
                {loading ? "Analyzing..." : "Analyze Extracted Text"}
            </button>
            
            {result && (
                <div className="p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md mt-4 mb-5">
                    {result.error ? (
                        <p className="text-red-500">{result.error}</p>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">📊 Scam Likelihood: {result.likelihood}%</h2>
                            <ul className="mt-3 text-gray-700 list-disc list-inside">
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

export default ImageMessageSpamDetector;
