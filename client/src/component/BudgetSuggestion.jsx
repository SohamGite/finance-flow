import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import ReactMarkdown from "react-markdown";

const BudgetSuggestions = () => {
  const { user } = useContext(AuthContext);
  const [suggestions, setSuggestions] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
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
    if (user) fetchSuggestions();
  }, [user]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">AI Budgeting Suggestions</h3>
      {loading ? (
        <p className="text-gray-600">Loading suggestions...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="prose text-gray-800">
          <ReactMarkdown
            components={{
              h1: ({ node, ...props }) => (
                <h1 className="text-2xl font-bold mt-4" {...props} />
              ),
              ul: ({ node, ...props }) => (
                <ul className="list-disc ml-6" {...props} />
              ),
              li: ({ node, ...props }) => <li className="mb-1" {...props} />,
              p: ({ node, ...props }) => (
                <p className="mb-2 text-gray-700" {...props} />
              ),
            }}
          >
            {suggestions}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
};

export default BudgetSuggestions;
