import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-teal-400 text-transparent bg-clip-text">
              FinanceFlow
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `text-gray-700 hover:text-blue-500 transition duration-300 ${
                  isActive ? "font-bold text-blue-500" : ""
                }`
              }
            >
              Home
            </NavLink>
            {user ? (
              <>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-gray-700 hover:text-blue-500 transition duration-300 ${
                      isActive ? "font-bold text-blue-500" : ""
                    }`
                  }
                >
                  Dashboard
                </NavLink>
                <button
                  onClick={logout}
                  className="text-gray-700 hover:text-blue-500 transition duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/auth"
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-500 transition duration-300 ${
                    isActive ? "font-bold text-blue-500" : ""
                  }`
                }
              >
                Login/Signup
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
