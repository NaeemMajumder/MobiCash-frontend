import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import { Link } from "react-router-dom"; // Assuming you are using React Router for navigation

const Login = () => {
  const [authMethod, setAuthMethod] = useState("email"); // Tracks selected auth method (email or phone)
  const [inputValue, setInputValue] = useState(""); // Tracks email or phone number input
  const [pinValue, setPinValue] = useState(""); // Tracks PIN input

  // Handle select change
  const handleAuthChange = (event) => {
    setAuthMethod(event.target.value);
    setInputValue(""); // Reset input value when auth method changes
  };

  // Handle form submission
  const handleLogin = (event) => {
    event.preventDefault();

    if (!isValidPhoneNumber(inputValue) && authMethod === "phone") {
      alert("Please enter a valid phone number.");
      return;
    }
    console.log(`Auth Method: ${authMethod}`);
    console.log(`Entered Value: ${inputValue}`);
    console.log(`Entered PIN: ${pinValue}`);
  };

  return (
    <div className="min-h-screen bg-[#F2F6FE] flex items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center text-[#164193]">
          Login to Your Account
        </h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="auth" className="block text-sm font-medium text-gray-700">
              Choose Login Method
            </label>
            <select
              name="auth"
              onChange={handleAuthChange}
              value={authMethod}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
          </div>

          {/* Conditionally render the input field based on the selected auth method */}
          {authMethod === "email" ? (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          ) : (
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <PhoneInput
                international
                defaultCountry="BD"
                value={inputValue}
                onChange={setInputValue}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          )}

          <div>
            <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
              PIN
            </label>
            <input
              type="password"
              name="pin"
              id="pin"
              placeholder="Enter your PIN"
              value={pinValue}
              onChange={(e) => setPinValue(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-between items-center text-sm text-gray-600">
            <Link
              to="/forgot-password"
              className="hover:text-indigo-500"
            >
              Forgot your password?
            </Link>
            <Link
              to="/register"
              className="hover:text-indigo-500"
            >
              Don't have an account? Register
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#164193] text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
