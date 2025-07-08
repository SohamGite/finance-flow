import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Advisor = () => {
  const { user } = useContext(AuthContext);
  const [query, setQuery] = useState("");
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/budget/advisor", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      });
      if (!response.ok) throw new Error("Failed to fetch advice");
      const data = await response.json();
      setAdvice(data.advice);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-500/30 mt-8"
      variants={cardVariants}
      initial="hidden"
      animate="visible"
    >
      <h3 className="text-xl font-semibold mb-4 text-white">
        AI Financial Advisor
      </h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">
            Ask a Financial Question
          </label>
          <motion.input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., Can I afford a bike with my 5 LPA salary?"
            className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
            whileFocus={{ scale: 1.02 }}
          />
        </div>
        <motion.button
          type="submit"
          disabled={loading}
          className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-500"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white inline-block"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            "Get Advice"
          )}
        </motion.button>
      </form>
      {error && (
        <p className="text-red-400 mt-4 bg-red-900/30 p-2 rounded-md">
          {error}
        </p>
      )}
      {advice && (
        <div className="mt-4 p-4 bg-gray-700 rounded-md">
          <p className="text-gray-300">{advice}</p>
        </div>
      )}
    </motion.div>
  );
};

export default Advisor;
