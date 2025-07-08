import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Points = () => {
  const { user } = useContext(AuthContext);
  const [points, setPoints] = useState(0);

  useEffect(() => {
    const fetchPoints = async () => {
      const token = localStorage.getItem("token");
      try {
        const response = await fetch("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();
        setPoints(data.points);
      } catch (err) {
        console.error("Error fetching points:", err);
      }
    };
    if (user) fetchPoints();
  }, [user]);

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
      <h3 className="text-xl font-semibold mb-4 text-white">Your Points</h3>
      <p className="text-2xl font-bold text-indigo-400">{points} Points</p>
      <p className="text-gray-400 text-sm mt-2">
        Earn points by adding transactions and completing challenges.
      </p>
    </motion.div>
  );
};

export default Points;
