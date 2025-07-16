import React, { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { motion, AnimatePresence } from "framer-motion";
import { HiMenuAlt3, HiX } from "react-icons/hi";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const navLinks = [
    { label: "Home", to: "/" },
    ...(user ? [{ label: "Dashboard", to: "/dashboard" }] : []),
    ...(user ? [{ label: "Goals", to: "/goals" }] : []),
    ...(user ? [{ label: "Insights", to: "/insights" }] : []),
    ...(user ? [{ label: "Calculators", to: "/calculators" }] : []),
    ...(user ? [] : [{ label: "Login/Signup", to: "/auth" }]),
  ];

  const linkClass = ({ isActive }) =>
    `relative px-3 py-2 text-sm font-medium transition duration-300 ${
      isActive
        ? "text-indigo-400 font-bold"
        : "text-gray-300 hover:text-indigo-400"
    }`;

  return (
    <nav className="bg-gray-900 bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-2">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
              FinanceFlow
            </h1>
          </NavLink>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link, idx) => (
              <motion.div key={idx} whileHover={{ scale: 1.05 }}>
                <NavLink to={link.to} className={linkClass}>
                  {link.label}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-indigo-400 transition-all duration-300 group-hover:w-full"></span>
                </NavLink>
              </motion.div>
            ))}
            {user && (
              <motion.button
                onClick={() => {
                  logout();
                  navigate("/");
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-300 hover:text-red-400 text-sm transition"
              >
                Logout
              </motion.button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-indigo-400 focus:outline-none"
            >
              {menuOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="md:hidden bg-gray-900 bg-opacity-95"
          >
            <div className="px-4 pt-2 pb-4 space-y-2">
              {navLinks.map((link, idx) => (
                <NavLink
                  key={idx}
                  to={link.to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `block text-sm px-4 py-2 rounded transition ${
                      isActive
                        ? "text-indigo-400 font-semibold"
                        : "text-gray-300 hover:text-indigo-400"
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {user && (
                <button
                  onClick={() => {
                    logout();
                    setMenuOpen(false);
                    navigate("/");
                  }}
                  className="block w-full text-left text-gray-300 hover:text-red-400 px-4 py-2 text-sm"
                >
                  Logout
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
