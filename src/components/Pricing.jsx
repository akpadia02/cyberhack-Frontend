import { useState } from "react";

const Pricing = () => {
    const [selectedPlan, setSelectedPlan] = useState(null);

    const plans = [
        { tokens: 10, price: "$4.99", features: ["10 Tokens", "Access to All Features"] },
        { tokens: 25, price: "$9.99", features: ["25 Tokens", "Priority Support", "Access to All Features"] },
        { tokens: 50, price: "$18.99", features: ["50 Tokens", "Premium Features", "24/7 Support"] },
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 mt-22 md:mt-10">
            <h1 className="text-4xl font-bold">💰 Pricing & Token System</h1>
            <p className="mt-4 text-gray-600 max-w-xl">
                You receive **2 free tokens per day**. Each Instagram-related functionality costs **1 token per use**.  
                Need more tokens? Purchase a plan below.
            </p>

            {/* Pricing Plans */}
            <div className="mt-6 flex flex-wrap justify-center gap-6 w-full max-w-3xl mb-4">
                {plans.map((plan, index) => (
                    <div
                        key={index}
                        className={`p-6 w-64 border rounded-lg shadow-md cursor-pointer ${
                            selectedPlan === index ? "border-blue-600" : "border-gray-300"
                        }`}
                        onClick={() => setSelectedPlan(index)}
                    >
                        <h2 className="text-2xl font-semibold">{plan.tokens} Tokens</h2>
                        <p className="text-xl text-blue-600 font-bold mt-2">{plan.price}</p>
                        <ul className="mt-4 text-gray-700 list-disc list-inside text-left">
                            {plan.features.map((feature, idx) => (
                                <li key={idx}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>

            {/* Buy Button */}
            {selectedPlan !== null && (
                <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-bold rounded-lg shadow-lg">
                    Buy {plans[selectedPlan].tokens} Tokens
                </button>
            )}
        </div>
    );
};

export default Pricing;
