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
    <div className="min-h-screen flex items-center justify-center bg-[#F2F6FE] px-4 py-12 sm:px-6 lg:px-8">
      <div className="flex max-w-4xl w-full bg-white p-8 rounded-xl shadow-2xl">
        {/* Left side: Image */}
        <div className="hidden lg:block w-1/2">
          <img 
            src="https://img.freepik.com/free-vector/sign-page-abstract-concept-illustration-enter-application-mobile-screen-user-login-form-website-page-interface-ui-new-profile-registration-email-account_335657-936.jpg" 
            alt="Login Illustration" 
            className="w-full h-full object-cover rounded-xl shadow-lg" 
          />
        </div>

        {/* Right side: Form */}
        <div className="w-full lg:w-1/2 ml-8 space-y-8">
          <h2 className="text-3xl font-extrabold text-center text-[#0A294A]">
            Login to Your Account
          </h2>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="auth" className="block text-sm font-medium text-gray-700">
                Choose Login Method
              </label>
              <select
                name="auth"
                onChange={handleAuthChange}
                value={authMethod}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-2"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-2"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-2" 
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
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 py-2 px-2"
              />
            </div>

            <div className="flex justify-between items-center text-sm text-gray-600">
              <Link to="/forgot-password" className="hover:text-indigo-500">
                Forgot your password?
              </Link>
              <span  >
                Don't have an account? <Link to="/register" className="text-indigo-500">Register</Link>
              </span>
            </div>

            <div>
              <button
                type="submit"
                className="w-full py-2 px-4 cursor-pointer bg-[#0A294A] text-white font-semibold rounded-md shadow-sm hover:bg-[#1a3551] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
