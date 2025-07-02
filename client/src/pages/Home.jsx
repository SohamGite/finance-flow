import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const features = [
    {
      title: "AI Financial Advisor",
      description:
        "Get personalized budgeting tips and investment advice powered by advanced AI.",
      icon: "🤖",
    },
    {
      title: "Gamification",
      description:
        "Earn points for sticking to budgets and completing financial quizzes. Redeem for rewards!",
      icon: "🎮",
    },
    {
      title: "Social Challenges",
      description:
        "Compete with friends in Savings Sprints or share budget tips in our community.",
      icon: "🏆",
    },
    {
      title: "Micro-Investments",
      description:
        "Start investing with as little as ₹100 through platforms like Zerodha or Groww.",
      icon: "📈",
    },
    {
      title: "Expense Insights",
      description:
        "AI analyzes your spending patterns and suggests ways to save more.",
      icon: "📊",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Master Your Finances with FinanceFlow
          </h2>
          <p className="text-lg md:text-xl mb-8">
            Take control of your money with AI-powered insights, gamified
            savings, and micro-investments.
          </p>
          <Link
            to="/auth"
            className="inline-block bg-white text-blue-500 font-semibold py-3 px-6 rounded-lg hover:bg-gray-100 transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose FinanceFlow?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
