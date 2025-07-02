import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

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

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mt-8">
      <h3 className="text-xl font-semibold mb-4">Your Points</h3>
      <p className="text-gray-600">You have {points} points!</p>
      <p className="text-gray-500 text-sm">
        Earn points by adding transactions and completing challenges.
      </p>
    </div>
  );
};

export default Points;
