import React, { useState, useEffect, useContext } from "react";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Pie, Line } from "react-chartjs-2";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Insights = () => {
  const { user } = useContext(AuthContext);
  const [insights, setInsights] = useState({
    categoryBreakdown: [],
    monthlyTrends: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Particle options (copied from Goals page assumption)
  const particlesInit = async (main) => await loadFull(main);
  const particlesOptions = {
    particles: {
      number: { value: 50 },
      size: { value: 3 },
      move: { enable: true, speed: 1 },
      opacity: { value: 0.5 },
      line_linked: { enable: true, distance: 150, opacity: 0.4 },
    },
  };

  // Fetch insights data
  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const res = await api.get("/insights");
        setInsights(res.data);
      } catch (err) {
        setError("Failed to load insights");
        toast.error("Failed to load insights");
      } finally {
        setIsLoading(false);
      }
    };
    if (user) fetchInsights();
  }, [user]);

  // Prepare chart data
  const getPieChartData = (categoryBreakdown) => ({
    labels: categoryBreakdown.map((item) => item._id),
    datasets: [
      {
        label: "Spending by Category",
        data: categoryBreakdown.map((item) => item.total),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
          "#FF9F40",
          "#FF5733",
          "#C70039",
          "#900C3F",
          "#581845",
        ],
      },
    ],
  });

  const formatMonth = (year, month) => {
    const date = new Date(year, month - 1);
    return date.toLocaleString("default", { month: "short", year: "numeric" });
  };

  const getLineChartData = (monthlyTrends) => ({
    labels: monthlyTrends.map((item) =>
      formatMonth(item._id.year, item._id.month)
    ),
    datasets: [
      {
        label: "Monthly Expenses",
        data: monthlyTrends.map((item) => item.total),
        borderColor: "#36A2EB",
        backgroundColor: "rgba(54, 162, 235, 0.2)",
        fill: true,
      },
    ],
  });

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: { position: "right" },
      tooltip: {
        callbacks: { label: (context) => `${context.label}: ₹${context.raw}` },
      },
    },
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: { callbacks: { label: (context) => `₹${context.raw}` } },
    },
    scales: {
      x: { title: { display: true, text: "Month" } },
      y: { title: { display: true, text: "Expenses (₹)" } },
    },
  };

  const totalExpenses = insights.categoryBreakdown.reduce(
    (sum, item) => sum + item.total,
    0
  );

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  if (isLoading)
    return <div className="text-center text-white">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white relative">
      <Particles
        init={particlesInit}
        options={particlesOptions}
        className="absolute inset-0"
      />
      <div className="relative z-10 max-w-7xl mx-auto p-6">
        <div className="mb-8 text-center bg-gradient-to-r from-indigo-500 to-purple-600 p-6 rounded-xl shadow-lg">
          <h1 className="text-4xl font-bold">Spending Insights</h1>
          <p className="mt-2 text-lg">Understand your spending patterns</p>
          <p className="mt-4 text-2xl">
            Total Expenses: ₹{totalExpenses.toLocaleString()}
          </p>
        </div>

        {insights.categoryBreakdown.length === 0 &&
        insights.monthlyTrends.length === 0 ? (
          <div className="text-center">
            <p>No expense data available. Start by adding some transactions!</p>
            <a href="/dashboard" className="text-blue-500 hover:underline">
              Go to Dashboard
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-500/30"
            >
              <h3 className="text-xl font-semibold mb-4">
                Spending by Category
              </h3>
              <div style={{ height: "300px" }}>
                <Pie
                  data={getPieChartData(insights.categoryBreakdown)}
                  options={pieOptions}
                />
              </div>
            </motion.div>

            <motion.div
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-500/30"
            >
              <h3 className="text-xl font-semibold mb-4">
                Monthly Spending Trends
              </h3>
              <div style={{ height: "300px" }}>
                <Line
                  data={getLineChartData(insights.monthlyTrends)}
                  options={lineOptions}
                />
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Insights;
