import { Lightbulb, CheckCircle, Rocket, Target, Flag, Users, Search } from "lucide-react";

const aboutUs = [
  {
    title: "Curiosity",
    description:
      "We learn every day through deliberate inquiry and exploration. We re-examine assumptions to be a better company, offer better products, and become better colleagues.",
    icon: Lightbulb,
  },
  {
    title: "Accountability",
    description:
      "We celebrate our successes and own our failures. Taking responsibility for our actions allows us to learn from our experiences.",
    icon: CheckCircle,
  },
  {
    title: "Bias Toward Action",
    description:
      "We know speed matters in business, so we embrace quick and collaborative risk-taking. We are solutions-oriented, even when facing challenges.",
    icon: Rocket,
  },
  {
    title: "Challenger Mentality",
    description:
      "We don’t allow ourselves to be comfortable with our success. We are hungry to become the best and create more value for our audience.",
    icon: Target,
  },
  {
    title: "Clarity of Purpose",
    description:
      "We understand the 'why' in our work, which helps us to operate at our highest level of performance and efficiency.",
    icon: Flag,
  },
  {
    title: "Collaboration",
    description:
      "We work together across teams and disciplines to drive better results. Strong collaboration fosters innovation and success.",
    icon: Users,
  },
  {
    title: "Continuous Learning",
    description:
      "We constantly seek knowledge and improvement to stay ahead. Learning and adapting are key to our long-term success.",
    icon: Search,
  },
];

const AboutUs = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6 mt-20">
      {aboutUs.map((item, index) => (
        <div
          key={index}
          className="flex flex-col items-center p-6 bg-white rounded-lg shadow-md transition-all duration-300 hover:bg-blue-200 group"
        >
          <item.icon
            size={32}
            className="text-gray-800  transition-all duration-300"
          />
          <h3 className="text-xl font-bold mt-4 transition-all duration-300">
            {item.title}
          </h3>
          <p className="text-gray-600 text-center mt-2 transition-all duration-300">
            {item.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
