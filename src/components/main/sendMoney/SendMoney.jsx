import React, { useState } from "react";
import AuthProviderHook from "../../../customHooks/AuthProviderHook";
import UseAxiosSecure from "../../../customHooks/UseAxiosSecure";
import verifyPin from "../../../../utils/verifyPin";

const SendMoney = () => {
  const { userData, handleError } = AuthProviderHook();
  const axiosSecure = UseAxiosSecure();

  const [balance, setBalance] = useState(userData?.currentBalance);
  const [step, setStep] = useState(0);
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [pin, setPin] = useState("");
  const [message, setMessage] = useState("");

  // Handle Next Step
  const handleNext = async() => {
    if (step === 1 && phone.length < 10) {
      alert("❌ Please enter a phone number!");
      return;
    }

    if (step === 2) {
      let sendAmount = parseFloat(amount);
      if (isNaN(sendAmount) || sendAmount < 50) {
        alert("❌ Minimum amount to send is 50 Taka.");
        return;
      }
      if (balance < sendAmount) {
        alert("❌ Insufficient balance.");
        return;
      }
    }

    if (step === 3) {
      const res = await verifyPin(axiosSecure, userData?.email, pin).catch(handleError);
      if (!res) {
        alert("❌ Wrong PIN number.");
        return; // Stop further execution if PIN is incorrect
      }
    }

    setStep(step + 1);
  };

  // Handle Send Money
  const handleSendMoney = () => {
    let sendAmount = parseFloat(amount);
    let totalDeducted = sendAmount > 100 ? sendAmount + 5 : sendAmount;

    if (totalDeducted > balance) {
      alert("❌ Insufficient balance.");
      return;
    }

    let transactionInfo = {
      email: userData?.email,
      name: userData?.name,
      image: userData?.image,
      phoneNumber: phone,
      role: userData?.role,
      userPhoneNumber: userData?.phone,
      amountTransaction: totalDeducted,
      amountBeforeTransaction: balance
    }
    axiosSecure.post('/sendMoney', transactionInfo)
    .then(res=>{
      console.log(res.data);
    })

    setBalance(balance - totalDeducted);
    setMessage(
      `✅ Successfully sent ${sendAmount} Taka. Total deducted: ${totalDeducted} Taka.`
    );
    setStep(0);
    setPhone("");
    setAmount("");
    setPin("");
    alert("✅ Confirmed! Money Sent Successfully.");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#164193]">Send Money</h2>

        {/* Information Section */}
        <div className="mt-4 text-gray-700 text-left">
          <p>
            ✔️ Minimum send amount is <b>50 Taka</b>
          </p>
          <p>
            ✔️ If amount is <b>more than 100 Taka</b>, extra <b>5 Taka</b> will
            be deducted.
          </p>
          <p>
            ✔️ Your current balance:{" "}
            <b className="text-green-600">{balance} Taka</b>
          </p>
        </div>

        {/* Send Money Button */}
        <button
          onClick={() => setStep(1)}
          className="mt-4 w-full bg-[#164193] text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Send Money
        </button>
      </div>

      {/* Step-by-step Modal */}
      {step > 0 && (
        <div className="fixed px-2 inset-0 bg-[#F2F6FE] bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {/* Step 1: Phone Number */}
            {step === 1 && (
              <>
                <h2 className="text-lg font-bold">Enter Phone Number</h2>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter recipient's phone"
                />
                <div className="flex justify-between mt-4">
                  <button onClick={() => setStep(0)} className="text-gray-500">
                    Cancel
                  </button>
                  <button
                    onClick={handleNext}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md"
                  >
                    Next
                  </button>
                </div>
              </>
            )}

            {/* Step 2: Amount */}
            {step === 2 && (
              <>
                <h2 className="text-lg font-bold">Enter Amount</h2>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md mt-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter amount"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Your balance: <b>{balance} Taka</b>
                </p>
                {amount && (
                  <p className="text-sm text-red-500 mt-1">
                    {parseFloat(amount) > 100
                      ? `Total Deduction: ${
                          parseFloat(amount) + 5
                        } Taka (Extra 5 Taka)`
                      : `Total Deduction: ${amount} Taka`}
                  </p>
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
                <h2 className="text-lg font-bold">Confirm Transaction</h2>
                <p className="mt-2">
                  Send <b>{amount} Taka</b> to <b>{phone}</b>
                </p>
                <p className="text-red-500">
                  Total Deduction:{" "}
                  <b>
                    {parseFloat(amount) > 100 ? parseFloat(amount) + 5 : amount}{" "}
                    Taka
                  </b>
                </p>
                <p className="text-green-600">
                  Remaining Balance:{" "}
                  <b>
                    {balance -
                      (parseFloat(amount) > 100
                        ? parseFloat(amount) + 5
                        : parseFloat(amount))}{" "}
                    Taka
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
                    onClick={handleSendMoney}
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

export default SendMoney;
