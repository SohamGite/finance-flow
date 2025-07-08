import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

const BudgetSuggestions = () => {
  const { user } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async () => {
    if (!user) {
      setError("You must be logged in to get suggestions.");
      return;
    }
    setLoading(true);
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch(
        "http://localhost:5000/api/budget/suggestions",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) throw new Error("Failed to fetch suggestions");
      const data = await response.json();
      setSuggestions(data.suggestions);
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
        AI Budgeting Suggestions
      </h3>
      <motion.button
        onClick={fetchSuggestions}
        className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-4 py-2 rounded-full hover:from-indigo-700 hover:to-blue-600 transition duration-300 disabled:bg-gray-500"
        disabled={loading}
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
          "Get AI Suggestion"
        )}
      </motion.button>
      {error && (
        <p className="text-red-400 mt-4 bg-red-900/30 p-2 rounded-md">
          {error}
        </p>
      )}
      {!loading && suggestions && (
        <div className="prose text-gray-300 mt-4">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mt-4 text-white" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-6 text-gray-300" {...props} />
              ),
              li: ({ node, ...props }) => (
                <li className="mb-1 text-gray-300" {...props} />
              ),
              p: ({ node, ...props }) => (
                <p className="mb-2 text-gray-300" {...props} />
              ),
            }}
          >
            {suggestions}
          </ReactMarkdown>
        </div>
      )}
    </motion.div>
  );
};

export default BudgetSuggestions;
