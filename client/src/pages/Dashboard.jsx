import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import BudgetSuggestions from "../component/BudgetSuggestion";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Advisor from "../component/Advisor";
import Points from "../component/Points";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user, logout, loading } = useContext(AuthContext);
  const [transactions, setTransactions] = useState([]);
  const [type, setType] = useState("income");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [showHistory, setShowHistory] = useState(false); // New state for toggle

  if (!loading && !user) {
    return <Navigate to="/auth" />;
  }

  useEffect(() => {
    const fetchTransactions = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/transactions", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) throw new Error("Failed to fetch transactions");
        const data = await response.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (user) fetchTransactions();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const token = localStorage.getItem("token");
    try {
      const response = await fetch("http://localhost:5000/api/transactions", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          type,
          category,
          amount: Number(amount),
          description,
        }),
      });
      const result = await response.json();
      if (!response.ok) {
        console.log(
          "Response status:",
          response.status,
          "Response body:",
          result
        );
        throw new Error(result.msg || "Failed to add transaction");
      }
      setTransactions((prev) => [result, ...prev]);
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  };

  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expenses", "Savings"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [incomeTotal, expenseTotal, incomeTotal - expenseTotal],
        backgroundColor: ["#60A5FA", "#EF4444", "#34D399"],
      },
    ],
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
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
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="flex justify-between items-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold">
            Welcome, {user?.name}
          </h2>
          {/* <motion.button
            onClick={logout}
            className="text-white bg-gradient-to-r from-red-500 to-red-600 py-2 px-6 rounded-full hover:from-red-600 hover:to-red-700 transition duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Logout
          </motion.button> */}
        </motion.div>
        {error && (
          <motion.div
            className="text-red-400 text-center mb-4 bg-red-900/30 p-2 rounded-md"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <motion.div
            className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-500/30"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-xl font-semibold mb-4 text-white">
              Add Transaction
            </h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                  <option value="">Select Category</option>
                  <option value="Salary">Salary</option>
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400"
                />
              </div>
              <motion.button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-indigo-600 to-blue-500 text-white rounded-md hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Add Transaction
              </motion.button>
            </form>
          </motion.div>
          <motion.div
            className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-500/30 max-h-[600px] overflow-y-auto"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
          >
            <div className="flex justify-center gap-4 mb-4">
              <motion.button
                onClick={() => setShowHistory(false)}
                className={`py-2 px-4 rounded-full transition duration-300 ${
                  !showHistory
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Financial Summary
              </motion.button>
              <motion.button
                onClick={() => setShowHistory(true)}
                className={`py-2 px-4 rounded-full transition duration-300 ${
                  showHistory
                    ? "bg-gradient-to-r from-indigo-600 to-blue-500 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Transaction History
              </motion.button>
            </div>
            <motion.div
              key={showHistory ? "history" : "summary"}
              variants={contentVariants}
              initial="hidden"
              animate="visible"
            >
              {showHistory ? (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Transaction History
                  </h3>
                  {transactions.length === 0 ? (
                    <p className="text-gray-400">No transactions yet.</p>
                  ) : (
                    <ul className="space-y-2">
                      {transactions.map((txn) => (
                        <motion.li
                          key={txn._id}
                          className="border-b border-gray-700 py-2 text-gray-300"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="font-medium">{txn.category}</span> (
                          {txn.type}) - ₹{txn.amount}
                          <span className="text-gray-500">
                            {" "}
                            {txn.description}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  )}
                </>
              ) : (
                <>
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Financial Summary
                  </h3>
                  <Bar data={chartData} options={{ responsive: true }} />
                </>
              )}
            </motion.div>
          </motion.div>
        </div>
        <BudgetSuggestions />
        <Advisor />
        <Points />
      </div>
    </div>
  );
};

export default Dashboard;
