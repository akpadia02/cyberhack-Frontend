import React from "react";

const values = [
  {
    title: "Curiosity",
    description:
      "We learn every day through deliberate inquiry and exploration. We re-examine assumptions to be a better company, offer better products, and become better colleagues.",
  },
  {
    title: "Accountability",
    description:
      "We celebrate our successes and own our failures. Taking responsibility for our actions allows us to learn from our experiences.",
  },
  {
    title: "Bias Toward Action",
    description:
      "We know speed matters in business so we embrace quick and collaborative risk-taking. We understand that many actions are reversible and therefore we are solutions-oriented, even when facing obstacles and challenges.",
  },
  {
    title: "Challenger Mentality",
    description:
      "We don’t allow ourselves to be comfortable with our success. We are hungry to become the best and create more value for our audience.",
  },
  {
    title: "Clarity of Purpose",
    description:
      "We understand the 'why' in our work, which helps us to operate at our highest level of performance and efficiency.",
  },
];

const AboutUs = () => {
  return (
    <section className="py-12 px-6 mt-20">
      <h2 className="text-3xl font-bold text-center mb-8">How We Treat Our Work</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map((item, index) => (
          <div
            key={index}
            className="border-l-4 border-blue-500 p-6 rounded-md shadow-sm transition-all duration-300 hover:bg-blue-100"
          >
            <h3 className="text-xl font-semibold">{item.title}</h3>
            <p className="text-gray-600 mt-2">{item.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AboutUs;
