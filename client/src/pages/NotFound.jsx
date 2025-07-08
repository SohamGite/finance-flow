import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const NotFound = () => {
  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const buttonVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
    tap: { scale: 0.95 },
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
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

      {/* 404 Content */}
      <motion.div
        className="max-w-md w-full bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-indigo-500/30 text-center"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <h1 className="text-6xl md:text-8xl font-extrabold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold mt-4 text-white">
          Page Not Found
        </h2>
        <p className="text-gray-300 mt-4">
          Oops! It looks like this page doesn’t exist or is still under
          construction. Let’s get you back on track.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/"
              className="inline-block bg-gradient-to-r from-indigo-600 to-blue-500 text-white font-semibold py-3 px-6 rounded-full hover:from-indigo-700 hover:to-blue-600 transition duration-300"
            >
              Go to Home
            </Link>
          </motion.div>
          <motion.div
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <Link
              to="/dashboard"
              className="inline-block bg-transparent border-2 border-indigo-400 text-indigo-400 font-semibold py-3 px-6 rounded-full hover:bg-indigo-400 hover:text-white transition duration-300"
            >
              Go to Dashboard
            </Link>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
