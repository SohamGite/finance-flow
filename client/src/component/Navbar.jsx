import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion } from "framer-motion";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <nav className="bg-gray-900 bg-opacity-80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
              FinanceFlow
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <motion.div whileHover="hover" variants={linkVariants}>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `text-gray-300 hover:text-indigo-400 transition duration-300 ${
                    isActive ? "font-bold text-indigo-400" : ""
                  }`
                }
              >
                Home
              </NavLink>
            </motion.div>
            {user ? (
              <>
                <motion.div whileHover="hover" variants={linkVariants}>
                  <NavLink
                    to="/dashboard"
                    className={({ isActive }) =>
                      `text-gray-300 hover:text-indigo-400 transition duration-300 ${
                        isActive ? "font-bold text-indigo-400" : ""
                      }`
                    }
                  >
                    Dashboard
                  </NavLink>
                </motion.div>
                <motion.button
                  onClick={logout}
                  className="text-gray-300 hover:text-indigo-400 transition duration-300"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Logout
                </motion.button>
              </>
            ) : (
              <motion.div whileHover="hover" variants={linkVariants}>
                <NavLink
                  to="/auth"
                  className={({ isActive }) =>
                    `text-gray-300 hover:text-indigo-400 transition duration-300 ${
                      isActive ? "font-bold text-indigo-400" : ""
                    }`
                  }
                >
                  Login/Signup
                </NavLink>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
