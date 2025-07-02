import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">AI Financial Advisor</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Ask a Financial Question
          </label>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="E.g., Can I afford a bike with my 5 LPA salary?"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-blue-300"
        >
          {loading ? "Processing..." : "Get Advice"}
        </button>
      </form>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {advice && (
        <div className="mt-4 p-4 bg-gray-100 rounded-md">
          <p className="text-gray-700">{advice}</p>
        </div>
      )}
    </div>
  );
};

export default Advisor;
