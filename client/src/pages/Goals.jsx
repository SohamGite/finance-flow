import React, { useState, useEffect, useContext } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { AuthContext } from "../context/AuthContext";
import api from "../utils/api"; // Axios instance for API calls

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Goals = () => {
  const { user } = useContext(AuthContext);
  const [goals, setGoals] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    targetAmount: "",
    deadline: "",
    category: "Savings",
  });
  const [updateData, setUpdateData] = useState({});

  // Particle background initialization
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
  };

  // Fetch goals
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const res = await api.get("/goals");
        setGoals(res.data);
      } catch (error) {
        toast.error("Failed to fetch goals");
      }
    };
    if (user) fetchGoals();
  }, [user]);

  // Handle form input changes
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle progress update input
  const handleUpdateChange = (id, value) => {
    setUpdateData({ ...updateData, [id]: value });
  };

  // Create a new goal
  const handleCreateGoal = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post("/goals", formData);
      setGoals([res.data, ...goals]);
      setFormData({
        title: "",
        targetAmount: "",
        deadline: "",
        category: "Savings",
      });
      toast.success("Goal created successfully!");
    } catch (error) {
      toast.error("Failed to create goal");
    }
  };

  // Update goal progress
  const handleUpdateGoal = async (id) => {
    try {
      const res = await api.put(`/goals/${id}`, {
        currentAmount: updateData[id] || 0,
      });
      setGoals(goals.map((goal) => (goal._id === id ? res.data : goal)));
      toast.success("Goal updated successfully!");
    } catch (error) {
      toast.error("Failed to update goal");
    }
  };

  // Delete a goal
  const handleDeleteGoal = async (id) => {
    try {
      await api.delete(`/goals/${id}`);
      setGoals(goals.filter((goal) => goal._id !== id));
      toast.success("Goal deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete goal");
    }
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

      {/* Goals Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-500 py-24 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            className="text-4xl md:text-6xl font-extrabold tracking-tight text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Set and Track Your Financial Goals
          </motion.h2>
          <motion.p
            className="mt-4 text-lg md:text-xl text-gray-200 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Plan for your future with clear goals and track your progress
            effortlessly.
          </motion.p>
        </div>
      </section>

      {/* Create Goal Form */}
      <section className="py-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg border border-indigo-500/30"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <h3 className="text-2xl font-bold mb-4">Create a New Goal</h3>
            <form onSubmit={handleCreateGoal} className="space-y-4">
              <div>
                <label className="block text-gray-300">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Target Amount (₹)</label>
                <input
                  type="number"
                  name="targetAmount"
                  value={formData.targetAmount}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                  min="0"
                />
              </div>
              <div>
                <label className="block text-gray-300">Deadline</label>
                <input
                  type="date"
                  name="deadline"
                  value={formData.deadline}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-300">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded bg-gray-700 text-white"
                >
                  <option value="Savings">Savings</option>
                  <option value="Debt">Debt</option>
                  <option value="Investment">Investment</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white py-2 px-4 rounded-full hover:bg-indigo-700 transition duration-300"
              >
                Create Goal
              </button>
            </form>
          </motion.div>
        </div>
      </section>

      {goals.length > 0 ? (
        <section className="py-16 relative z-10">
          {/* Goals List */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Your Goals
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {goals.map((goal, index) => (
                <motion.div
                  key={goal._id}
                  className="bg-gray-800 bg-opacity-80 backdrop-blur-md p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-indigo-500/30"
                  variants={cardVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ delay: index * 0.2 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <h4 className="text-xl font-semibold mb-2">{goal.title}</h4>
                  <p className="text-gray-300">Category: {goal.category}</p>
                  <p className="text-gray-300">Target: ₹{goal.targetAmount}</p>
                  <p className="text-gray-300">
                    Current: ₹{goal.currentAmount}
                  </p>
                  <p className="text-gray-300">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                  <div className="mt-4">
                    <Bar
                      data={{
                        labels: ["Progress"],
                        datasets: [
                          {
                            label: "Current Amount",
                            data: [
                              (goal.currentAmount / goal.targetAmount) * 100,
                            ],
                            backgroundColor: "#36A2EB",
                          },
                          {
                            label: "Target Amount",
                            data: [100],
                            backgroundColor: "#FF6384",
                          },
                        ],
                      }}
                      options={{
                        indexAxis: "y",
                        scales: {
                          x: {
                            max: 100,
                            ticks: { callback: (value) => `${value}%` },
                          },
                        },
                        plugins: {
                          legend: { display: false },
                          title: { display: true, text: "Goal Progress" },
                        },
                      }}
                    />
                  </div>
                  <div className="mt-4">
                    <input
                      type="number"
                      placeholder="Update Amount"
                      value={updateData[goal._id] || ""}
                      onChange={(e) =>
                        handleUpdateChange(goal._id, e.target.value)
                      }
                      className="w-full p-2 rounded bg-gray-700 text-white mb-2"
                      min="0"
                    />
                    <button
                      onClick={() => handleUpdateGoal(goal._id)}
                      className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 transition duration-300 mr-2"
                    >
                      Update Progress
                    </button>
                    <button
                      onClick={() => handleDeleteGoal(goal._id)}
                      className="bg-red-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition duration-300"
                    >
                      Delete Goal
                    </button>
                  </div>
                  <div className="mt-4">
                    <p className="text-gray-300">Milestones Achieved:</p>
                    <ul className="list-disc pl-5">
                      {goal.milestones.map((milestone) => (
                        <li
                          key={milestone.percentage}
                          className={
                            milestone.achieved
                              ? "text-green-400"
                              : "text-gray-400"
                          }
                        >
                          {milestone.percentage}%{" "}
                          {milestone.achieved ? "(100 points awarded)" : ""}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      ) : (
        <div className="text-center pb-1">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
            No Goals found. Start by creating one!
          </h3>
        </div>
      )}
    </div>
  );
};

export default Goals;
