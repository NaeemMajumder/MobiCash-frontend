import React from "react";

const Footer = () => {
  return (
    <footer className="bg-[#F2F6FE] text-black py-10">
      <div className="width px-6">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo & Name */}
          <div className="flex items-center space-x-3">
            <img
              src="/images/logo.png" // Replace with your actual logo path
              alt="Logo"
              className="w-12 h-12 object-contain rounded-full"
            />
            <h2 className="text-2xl gradient-text font-bold">MobiCash</h2>
          </div>

          {/* Navigation Links */}
          <div className="mt-6 md:mt-0 flex flex-wrap justify-center md:justify-start gap-6">
            <a href="#" className="hover:text-gray-300 transition">
              Home
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              About Us
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              Services
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              Contact
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-400 my-6"></div>

        {/* Social Media & Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a href="#" className="hover:text-gray-300 transition">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="hover:text-gray-300 transition">
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>

          {/* Copyright */}
          <p className="mt-4 md:mt-0 text-sm text-gray-600">
            © {new Date().getFullYear()} MobiCash. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
