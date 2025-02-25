import React, { useState } from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

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
    <div>
      <form onSubmit={handleLogin}>
        <select name="auth" onChange={handleAuthChange} value={authMethod}>
          <option value="email">Email</option>
          <option value="phone">Phone</option>
        </select>
        <br />
        <br />

        {/* Conditionally render the input field based on the selected auth method */}
        {authMethod === "email" ? (
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update email value
          />
        ) : (
          <div>
            <PhoneInput
              international
              defaultCountry="BD" // Default country
              value={inputValue} // Set phone number value
              onChange={setInputValue} // Update phone number value
            />
            <div>
              {inputValue
                ? `Phone Number: ${inputValue}`
                : "Please enter a valid phone number."}
            </div>
          </div>
        )}
        <br />
        <br />

        <input
          type="password"
          name="pin"
          id="pin"
          placeholder="Enter your PIN"
          value={pinValue} // Use separate state for PIN
          onChange={(e) => setPinValue(e.target.value)} // Update PIN value
        />
        <br />
        <br />

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
