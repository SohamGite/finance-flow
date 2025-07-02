import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";
import BudgetSuggestions from "../component/BudgetSuggestion";
// import BudgetSuggestions from "../component/BudgetSuggestions";
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

  // Redirect if not authenticated
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
      if (!response.ok) throw new Error("Failed to add transaction");
      const newTransaction = await response.json();
      setTransactions([newTransaction, ...transactions]);
      setCategory("");
      setAmount("");
      setDescription("");
    } catch (err) {
      setError(err.message);
    }
  };

  // Chart data
  const incomeTotal = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ["Income", "Expenses"],
    datasets: [
      {
        label: "Amount (₹)",
        data: [incomeTotal, expenseTotal],
        backgroundColor: ["#34D399", "#EF4444"],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Welcome, {user?.email}</h2>
          <button
            onClick={logout}
            className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded-md"
          >
            Logout
          </button>
        </div>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Add Transaction</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Type
                </label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                >
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
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
                <label className="block text-sm font-medium text-gray-700">
                  Amount
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Add Transaction
              </button>
            </form>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-4">Transaction History</h3>
            {transactions.length === 0 ? (
              <p className="text-gray-600">No transactions yet.</p>
            ) : (
              <ul className="space-y-2">
                {transactions.map((txn) => (
                  <li key={txn._id} className="border-b py-2">
                    <span className="font-medium">{txn.category}</span> (
                    {txn.type}) - ₹{txn.amount}
                    <span className="text-gray-500"> {txn.description}</span>
                  </li>
                ))}
              </ul>
            )}
            <h3 className="text-xl font-semibold mt-8 mb-4">
              Financial Summary
            </h3>
            <Bar data={chartData} options={{ responsive: true }} />
          </div>
        </div>
        <BudgetSuggestions />
        <Advisor />
        <Points />
      </div>
    </div>
  );
};

export default Dashboard;
