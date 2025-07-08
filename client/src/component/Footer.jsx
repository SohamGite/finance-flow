import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-gray-900 bg-opacity-80 backdrop-blur-md text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold bg-gradient-to-r from-indigo-600 to-blue-500 text-transparent bg-clip-text">
              FinanceFlow
            </h3>
            <p className="text-sm text-gray-300">
              Empowering your financial future with AI-driven insights.
            </p>
          </div>
          <div className="flex space-x-6">
            <motion.a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition duration-300"
              variants={linkVariants}
              whileHover="hover"
            >
              Privacy Policy
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition duration-300"
              variants={linkVariants}
              whileHover="hover"
            >
              Terms of Service
            </motion.a>
            <motion.a
              href="#"
              className="text-gray-400 hover:text-indigo-400 transition duration-300"
              variants={linkVariants}
              whileHover="hover"
            >
              Contact Us
            </motion.a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} FinanceFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
