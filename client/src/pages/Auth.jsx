import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const { login, signup, loading } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const action = isLogin ? login : signup;
    const result = await action(isLogin ? email : name, email, password);
    if (result.success) {
      window.location.href = "/dashboard";
    } else {
      setError(result.error);
    }
  };

  const particlesInit = async (main) => {
    await loadFull(main);
  };

  const formVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const errorVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.3 } },
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative">
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

      {/* Form Card */}
      <motion.div
        className="max-w-md w-full space-y-8 bg-gray-800 bg-opacity-80 backdrop-blur-md p-8 rounded-xl shadow-lg border border-indigo-500/30"
        variants={formVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-white">
            {isLogin ? "Welcome Back" : "Join FinanceFlow"}
          </h2>
          <p className="mt-2 text-gray-300">
            {isLogin
              ? "Sign in to manage your finances"
              : "Create an account to start your financial journey"}
          </p>
        </div>

        {error && (
          <motion.div
            className="text-red-400 text-center text-sm bg-red-900/30 p-2 rounded-md"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
          >
            {error}
          </motion.div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {!isLogin && (
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-300"
              >
                Name
              </label>
              <motion.input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required={!isLogin}
                disabled={loading}
                className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:opacity-50 transition duration-300"
                whileFocus={{ scale: 1.02 }}
              />
            </div>
          )}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-300"
            >
              Email Address
            </label>
            <motion.input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:opacity-50 transition duration-300"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <motion.input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="mt-1 block w-full px-4 py-3 bg-gray-700 border border-indigo-500/50 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-indigo-400 disabled:opacity-50 transition duration-300"
              whileFocus={{ scale: 1.02 }}
            />
          </div>
          <div>
            <motion.button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-blue-500 hover:from-indigo-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? (
                <svg
                  className="animate-spin h-5 w-5 text-white inline-block"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                  />
                </svg>
              ) : isLogin ? (
                "Sign In"
              ) : (
                "Sign Up"
              )}
            </motion.button>
          </div>
        </form>
        <div className="text-center">
          <motion.button
            onClick={() => setIsLogin(!isLogin)}
            className="text-indigo-400 hover:text-indigo-300 font-medium transition duration-300"
            disabled={loading}
            whileHover={{ scale: 1.1 }}
          >
            {isLogin
              ? "Need an account? Sign up"
              : "Already have an account? Sign in"}
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Auth;
