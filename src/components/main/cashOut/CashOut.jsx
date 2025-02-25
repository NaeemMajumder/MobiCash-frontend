import React, { useState } from "react";

const CashOut = () => {
  const [balance, setBalance] = useState(1000); // Example user balance
  const [step, setStep] = useState(0); // Modal steps (0 = closed, 1 = agent number, 2 = amount, 3 = PIN, 4 = confirmation)
  const [agentNumber, setAgentNumber] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  // Handle Next Step
  const handleNext = () => {
    if (step === 1 && (agentNumber.length < 10 || isNaN(agentNumber))) {
      alert("❌ Please enter a valid 11-digit agent number.");
      return;
    }

    if (step === 2) {
      let cashOutAmount = parseFloat(amount);
      if (isNaN(cashOutAmount) || cashOutAmount <= 0) {
        alert("❌ Please enter a valid amount.");
        return;
      }

      let totalDeducted = cashOutAmount * 1.015; // 1.5% fee added
      if (totalDeducted > balance) {
        alert("❌ Insufficient balance.");
        return;
      }
    }

    setStep(step + 1);
  };

  // Handle Cash Out
  const handleCashOut = () => {
    let cashOutAmount = parseFloat(amount);
    let youGetAmount = cashOutAmount - (cashOutAmount*(1.50/100)); // 1.5% deduction

    let cashOut = {
      email:'demo@gmail.com',
      agentNumber,
      cashOutAmount,
      agentTake: cashOutAmount*(1/100),
      adminTake: cashOutAmount*(0.50/100),
      currentBalance: balance-cashOutAmount,
    }

    console.log(cashOut);


    setBalance(balance - cashOutAmount);
    setMessage(
      `✅ Successfully cashed out ${cashOutAmount} Taka. You will get: ${youGetAmount.toFixed(
        2
      )} Taka.`
    );
    setStep(0);
    setAgentNumber("");
    setAmount("");
    setPin("");
    alert("✅ Cash Out Successful!");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#164193]">Cash Out</h2>

        {/* Information Section */}
        <div className="mt-4 text-gray-700 text-left">
          <p>
            ✔️ You can cash out through an <b>authorized agent</b>.
          </p>
          <p>
            ✔️ A <b>1.5% transaction fee</b> will be charged.
          </p>
          <p>
            ✔️ <b>1% for agent</b> & <b>0.5% for admin</b>.
          </p>
          <p>
            ✔️ Your current balance:{" "}
            <b className="text-green-600">{balance} Taka</b>
          </p>
        </div>

        {/* Cash Out Button */}
        <button
          onClick={() => setStep(1)}
          className="mt-4 w-full bg-[#164193] text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Cash Out
        </button>
      </div>

      {/* Step-by-step Modal */}
      {step > 0 && (
        <div className="fixed px-2 inset-0 bg-[#F2F6FE] bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* Step 1: Agent Number */}
            {step === 1 && (
              <>
                <h2 className="text-lg font-bold">Enter Agent Number</h2>
                <div className="flex items-center border rounded-md mt-3 focus-within:ring-2 focus-within:ring-blue-500">
                  <span className="px-3 py-2 bg-gray-200 text-gray-700 rounded-l-md">
                    +880
                  </span>
                  <input
                    type="text"
                    value={agentNumber}
                    onChange={(e) => setAgentNumber(e.target.value)}
                    className="w-full px-4 py-2 focus:outline-none"
                    placeholder="Enter agent's phone number"
                    maxLength={10} // Restricting input to 10 digits after +880
                  />
                </div>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(0)}
                    className="cursor-pointer text-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Amount */}
            {step === 2 && (
              <>
                <h2 className="text-lg font-bold">Enter Withdraw Amount</h2>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount to withdraw"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Your balance: <b>{balance} Taka</b>
                </p>
                {amount && (
                  <>
                  <p className="text-sm text-red-500 mt-1">
                    Transaction Fee: 1.5% <br />
                    <b className="text-green-500">
                      You Will Get: {(parseFloat(amount) - (parseFloat(amount)*(1.5/100))).toFixed(2)}{" "}
                      Taka
                    </b>
                  </p>                
                  </>

                )}
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(1)}
                    className="cursor-pointer text-gray-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Enter PIN */}
            {step === 3 && (
              <>
                <h2 className="text-lg font-bold">Enter PIN</h2>
                <input
                  type="password"
                  value={pin}
                  onChange={(e) => setPin(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your PIN"
                />
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(2)}
                    className="cursor-pointer text-gray-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleNext}
                    className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 4: Confirmation */}
            {step === 4 && (
              <>
                <h2 className="text-lg font-bold">Confirm Cash Out</h2>
                <p className="mt-2">
                  Withdraw <b>{amount} Taka</b> via agent <b>{agentNumber}</b>
                </p>
                <p className="text-red-500">
                  Total Deduction:{" "}
                  <b>{(parseFloat(amount)).toFixed(2)} Taka</b>
                </p>
                <p className="text-green-600">
                  Remaining Balance:{" "}
                  <b>
                    {(balance - parseFloat(amount)).toFixed(2)} Taka
                  </b>
                </p>
                <p className="text-green-600">
                  You Will Get:{" "}
                  <b>
                    {(parseFloat(amount) - (parseFloat(amount)*(1.5/100))).toFixed(2)} Taka
                  </b>
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="cursor-pointer text-gray-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCashOut}
                    className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-md"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {message && (
        <p className="mt-4 text-center font-medium text-green-500">{message}</p>
      )}
    </div>
  );
};

export default CashOut;
