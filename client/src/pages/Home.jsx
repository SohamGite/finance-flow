import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Home = () => {
  const features = [
    {
      title: "AI Financial Advisor",
      description:
        "Get personalized budgeting tips and investment advice powered by advanced AI.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
    },
    {
      title: "Gamification",
      description:
        "Earn points for sticking to budgets and completing financial quizzes.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M14 10l-2 1m0 0l-2-1m2 1v2.5M20 7l-2 1m2-1l-2-1m2 1v2.5M14 4l-2-1-2 1m4 6v7m-4-7v7"
          />
        </svg>
      ),
    },
    {
      title: "Social Challenges",
      description:
        "Compete with friends in Savings Sprints or share budget tips.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v2h5m-2-2a3 3 0 005.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
      ),
    },
    {
      title: "Micro-Investments",
      description:
        "Start investing with as little as ₹100 through integrated platforms.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
          />
        </svg>
      ),
    },
    {
      title: "Expense Insights",
      description:
        "AI analyzes your spending patterns to suggest savings opportunities.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2M9 19a2 2 0 01-2-2"
          />
        </svg>
      ),
    },
    {
      title: "Expert Tips",
      description:
        "Stay updated with the latest financial trends and tips from experts.",
      icon: (
        <svg
          className="w-12 h-12 text-blue-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 2v2m6.364 1.636l-1.414 1.414M20 12h-2M17.364 17.364l-1.414-1.414M12 20v2M6.636 17.364l1.414-1.414M4 12H2M6.636 6.636l1.414 1.414M12 6a6 6 0 00-6 6c0 2.485 1.5 3.5 2 4a2 2 0 002 2h4a2 2 0 002-2c.5-.5 2-1.515 2-4a6 6 0 00-6-6z"
          />
        </svg>
      ),
    },
  ];

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const heroVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Particle Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#4B0082" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: true },
            size: { value: 3, random: true },
            move: {
              enable: true,
              speed: 0.5,
              direction: "none",
              out_mode: "out",
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
          >
            Empower Your Financial Future
          </motion.h2>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-200"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            Discover AI-driven insights, gamified savings, and seamless
            micro-investments with FinanceFlow.
          </motion.p>
          <motion.div
            className="mt-8 flex justify-center gap-4"
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Link
              to="/auth"
              className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-indigo-100 transition duration-300 shadow-lg"
            >
              Get Started
            </Link>
            <Link
              to="/features"
              className="inline-block bg-transparent border-2 border-white text-white font-semibold py-3 px-8 rounded-full hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why FinanceFlow Stands Out
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-indigo-500/30"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ delay: index * 0.2 }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-300">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-gray-800 bg-opacity-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            What Our Users Say
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              className="bg-gray-700 p-6 rounded-xl shadow-lg"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
            >
              <p className="text-gray-300 italic">
                "FinanceFlow’s AI advisor helped me save ₹5000 in just one
                month!"
              </p>
              <p className="mt-4 font-semibold text-white">
                - Priya S., Bangalore
              </p>
            </motion.div>
            <motion.div
              className="bg-gray-700 p-6 rounded-xl shadow-lg"
              variants={cardVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.2 }}
            >
              <p className="text-gray-300 italic">
                "The gamified challenges make saving fun and motivating!"
              </p>
              <p className="mt-4 font-semibold text-white">
                - Arjun K., Mumbai
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-12 bg-indigo-600 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h3
            className="text-2xl md:text-3xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Ready to Transform Your Finances?
          </motion.h3>
          <Link
            to="/auth"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-8 rounded-full hover:bg-indigo-100 transition duration-300 shadow-lg"
          >
            Join FinanceFlow Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
