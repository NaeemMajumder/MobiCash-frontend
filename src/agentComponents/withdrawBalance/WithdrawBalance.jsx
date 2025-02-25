import React, { useState } from "react";

const WithdrawBalance = () => {
  const [balance, setBalance] = useState(1000); // Example agent balance
  const [step, setStep] = useState(0);
  const [withdrawData, setWithdrawData] = useState({ phone: "+880", amount: "", pin: "" });
  const [isRequestSent, setIsRequestSent] = useState(false);

  const handleNext = () => {
    if (step === 1) {
      // Validate phone number
      if (!/^(\+8801[3-9][0-9]{8})$/.test(withdrawData.phone)) {
        alert("❌ Please enter a valid Bangladeshi phone number (e.g., +8801XXXXXXXXX).");
        return;
      }
    }
    if (step === 2) {
      // Validate withdrawal amount
      let withdrawAmount = parseFloat(withdrawData.amount);
      if (isNaN(withdrawAmount) || withdrawAmount <= 0 || withdrawAmount > balance) {
        alert("❌ Please enter a valid withdrawal amount within your balance.");
        return;
      }
    }
    setStep(step + 1);
  };

  const handleWithdraw = () => {
    let withdrawAmount = parseFloat(withdrawData.amount);
    setIsRequestSent(true);  
    setStep(0); 

    withdrawData.email = "agent@gmail.com";
    withdrawData.balance = balance;
    withdrawData.amount = parseFloat(withdrawData.amount);
    console.log(withdrawData);

    setWithdrawData({ phone: "+880", amount: "", pin: "" });  
    alert(`✅ Withdrawal of ${withdrawData.amount} Taka has been successfully requested.`);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#164193]">Agent Withdraw</h2>
        <div className="mt-4 text-gray-700 text-left">
          <p>✔️ Your request will be reviewed by the admin.</p>
          <p>✔️ No extra fee will be deducted.</p>
          <p>✔️ You will be notified after approval.</p>
        </div>
        <button
          onClick={() => setStep(1)}
          className="mt-4 w-full bg-[#164193] text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Start Withdraw
        </button>
      </div>

      {step > 0 && !isRequestSent && (
        <div className="fixed px-2 inset-0 bg-[#F2F6FE] bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            
            {step === 1 && (
              <>
                <h2 className="text-lg font-bold">Enter Your Phone Number</h2>
                <input
                  type="text"
                  value={withdrawData.phone}
                  onChange={(e) => setWithdrawData({ ...withdrawData, phone: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md mt-3"
                  placeholder="Enter phone number"
                />
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(0)} className="text-gray-500">Cancel</button>
                  <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <h2 className="text-lg font-bold">Enter Withdraw Amount</h2>
                <input
                  type="number"
                  value={withdrawData.amount}
                  onChange={(e) => setWithdrawData({ ...withdrawData, amount: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md mt-3"
                  placeholder="Enter amount"
                />
                <p className="text-sm text-gray-600 mt-2">Total Balance: <b>{balance} Taka</b></p>
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(1)} className="text-gray-500">Back</button>
                  <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </>
            )}

            {step === 3 && (
              <>
                <h2 className="text-lg font-bold">Enter Your PIN</h2>
                <input
                  type="password"
                  value={withdrawData.pin}
                  onChange={(e) => setWithdrawData({ ...withdrawData, pin: e.target.value })}
                  className="w-full px-4 py-2 border rounded-md mt-3"
                  placeholder="Enter PIN"
                />
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(2)} className="text-gray-500">Back</button>
                  <button onClick={handleNext} className="bg-blue-600 text-white px-4 py-2 rounded-md">Next</button>
                </div>
              </>
            )}

            {step === 4 && (
              <>
                <h2 className="text-lg font-bold">Confirm Withdraw</h2>
                <p className="mt-2">Withdraw <b>{withdrawData.amount} Taka</b> for <b>{withdrawData.phone}</b></p>
                <div className="text-green-600 mt-2">Updated Balance will be: <b>{balance - parseFloat(withdrawData.amount)} Taka</b></div>
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(3)} className="text-gray-500">Back</button>
                  <button onClick={handleWithdraw} className="bg-green-600 text-white px-4 py-2 rounded-md">Confirm</button>
                </div>
              </>
            )}

          </div>
        </div>
      )}

      {isRequestSent && (
        <div className="fixed px-2 inset-0 bg-[#F2F6FE] bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
            <h2 className="text-lg font-bold">Withdraw Request Sent</h2>
            <p className="mt-2">Your withdrawal request has been sent to the admin for approval.</p>
            <p className="text-green-600 mt-2">We will notify you once the request is approved.</p>
            <button onClick={() => setIsRequestSent(false)} className="bg-blue-600 text-white px-4 py-2 rounded-md mt-4">
              OK
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default WithdrawBalance;
