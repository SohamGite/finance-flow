import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaGithub, FaInstagram } from "react-icons/fa";

const Footer = () => {
  const linkVariants = {
    hover: { scale: 1.1, transition: { duration: 0.3 } },
  };

  return (
    <footer className="bg-gray-900 bg-opacity-90 backdrop-blur-md text-white py-8 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Brand */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-blue-400 text-transparent bg-clip-text">
              FinanceFlow
            </h3>
            <p className="text-sm text-gray-400 mt-1">
              Empowering your financial future with AI-driven insights.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex space-x-6">
            {["Privacy Policy", "Terms of Service", "Contact Us"].map(
              (text, index) => (
                <motion.a
                  key={index}
                  href="#"
                  className="text-gray-400 hover:text-indigo-400 text-sm transition"
                  variants={linkVariants}
                  whileHover="hover"
                >
                  {text}
                </motion.a>
              )
            )}
          </div>

          {/* Social Media */}
          <div className="flex space-x-5">
            <motion.a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="text-gray-400 hover:text-blue-400 text-xl"
              variants={linkVariants}
              whileHover="hover"
            >
              <FaTwitter />
            </motion.a>
            <motion.a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="text-gray-400 hover:text-blue-500 text-xl"
              variants={linkVariants}
              whileHover="hover"
            >
              <FaLinkedin />
            </motion.a>
            <motion.a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="text-gray-400 hover:text-gray-200 text-xl"
              variants={linkVariants}
              whileHover="hover"
            >
              <FaGithub />
            </motion.a>
            <motion.a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="text-gray-400 hover:text-pink-400 text-xl"
              variants={linkVariants}
              whileHover="hover"
            >
              <FaInstagram />
            </motion.a>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-6 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} FinanceFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
