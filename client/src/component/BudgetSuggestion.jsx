import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { FaRobot, FaLightbulb } from "react-icons/fa";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const BudgetSuggestions = () => {
  const { user } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchSuggestions = async () => {
    if (!user) {
      setError("⚠️ You must be logged in to get suggestions.");
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
      setError("🚫 " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="bg-gray-900 bg-opacity-80 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-indigo-500/30 mt-8"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center space-x-3 mb-4">
        <FaRobot className="text-indigo-400 text-3xl" />
        <h3 className="text-2xl font-semibold text-white">
          Meet Your AI Budget Assistant
        </h3>
      </div>

      <p className="text-sm text-gray-400 mb-4">
        I analyze your transactions and suggest smarter ways to manage your
        money. 💰
      </p>

      {/* Button */}
      <motion.button
        onClick={fetchSuggestions}
        disabled={loading}
        className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white px-6 py-2 rounded-full hover:from-indigo-700 hover:to-blue-600 transition-all duration-300 disabled:bg-gray-500"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {loading ? "Analyzing your budget..." : "Get Smart Suggestion"}
      </motion.button>

      {/* Error */}
      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-400 mt-4 bg-red-900/30 p-2 rounded-md"
        >
          {error}
        </motion.p>
      )}

      {/* Output */}
      {!loading && suggestions && (
        <div className="mt-6 prose prose-invert max-w-none text-gray-300">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1
                  className="text-2xl font-bold text-indigo-300 mt-6"
                  {...props}
                />
              ),
              h2: ({ node, ...props }) => (
                <h2
                  className="text-xl font-semibold text-indigo-400 mt-4 border-b border-indigo-500 pb-1"
                  {...props}
                />
              ),
              h3: ({ node, ...props }) => (
                <h3
                  className="text-lg font-medium text-indigo-300 mt-3"
                  {...props}
                />
              ),
              p: ({ node, ...props }) => (
                <p className="text-gray-300 mb-2" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul
                  className="list-disc ml-6 text-gray-300 space-y-2"
                  {...props}
                />
              ),
              li: ({ node, ...props }) => (
                <li className="flex items-start gap-2">
                  <FaLightbulb className="mt-1 text-yellow-400" />
                  <span {...props} />
                </li>
              ),
              table: ({ node, ...props }) => (
                <div className="overflow-x-auto mt-4 mb-6">
                  <table
                    className="table-auto w-full border-collapse border border-gray-600 text-sm text-gray-200"
                    {...props}
                  />
                </div>
              ),
              th: ({ node, ...props }) => (
                <th
                  className="border border-gray-600 bg-gray-700 px-4 py-2 text-left"
                  {...props}
                />
              ),
              td: ({ node, ...props }) => (
                <td className="border border-gray-600 px-4 py-2" {...props} />
              ),
              code({ node, inline, className, children, ...props }) {
                return !inline ? (
                  <SyntaxHighlighter
                    style={oneDark}
                    language="bash"
                    PreTag="div"
                    className="rounded-lg p-4"
                    {...props}
                  >
                    {String(children).replace(/\n$/, "")}
                  </SyntaxHighlighter>
                ) : (
                  <code
                    className="bg-gray-700 px-1 py-0.5 rounded text-sm"
                    {...props}
                  >
                    {children}
                  </code>
                );
              },
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
