import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold">FinanceFlow</h3>
            <p className="text-sm">Empowering your financial future.</p>
          </div>
          <div className="flex space-x-6">
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-400 hover:text-white transition duration-300"
            >
              Contact Us
            </a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} FinanceFlow. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
