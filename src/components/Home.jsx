import { useState } from "react";

const Home = () => {
    const [email, setEmail] = useState("");

    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full text-center px-4">
            <h1 className="text-5xl font-bold">
                Detect Fake Profiles. <span className="text-blue-600">Instantly.</span>
            </h1>
            <p className="mt-4 text-gray-600 max-w-xl">
                Our app analyzes Instagram profiles, detecting spam accounts with real-time machine learning insights.
            </p>

            {/* Feature Buttons (Centered on Mobile) */}
            <div className="mt-6 flex flex-wrap justify-center gap-3 w-full max-w-sm">
                <button className="w-60 px-4 py-3 bg-purple-200 text-purple-700 rounded-lg font-medium shadow-sm">
                    🔍 Profile Analysis
                </button>
                <button className="w-60 px-1 py-3 bg-green-200 text-green-700 rounded-lg font-medium shadow-sm">
                    🤖 Message Spam Detection
                </button>
            </div>

            {/* 
            Email Input & CTA */}
            <div className="mt-6 flex flex-col items-center w-full max-w-md hidden md:block">
                <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full px-4 py-3 border rounded-lg shadow-sm focus:outline-none"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button className="mt-4 px-6 py-3 bg-black text-white font-bold rounded-lg shadow-lg">
                    Start Free Trial
                </button>
            </div>
            <p className="mt-3 text-gray-500 text-sm hidden md:block max-w-xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia earum dolorum officiis nemo aspernatur iusto iste expedita dolore ullam accusamus, tempore rerum officia labore optio alias exercitationem fugiat accusantium? Nostrum.</p>
        </div>
    );
};

export default Home;
