import React, { useState } from "react";
import AuthProviderHook from "../../customHooks/AuthProviderHook";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import verifyPin from "../../../utils/verifyPin";
import { moneyTransaction } from "../../../utils/moneyTransactions";

const CashIn = () => {
  const {userData, handleError} = AuthProviderHook();
  const axiosSecure = UseAxiosSecure();

  const [balance, setBalance] = useState(userData?.currentBalance); 
  const [step, setStep] = useState(0);
  const [cashInData, setCashInData] = useState({
    userNumber: "+880",
    amount: "",
    pin: "",
  });
  const [message, setMessage] = useState("");

  const handleNext = async() => {
    if (step === 1) {
      if (
        cashInData.userNumber.length !== 14 ||
        isNaN(cashInData.userNumber.slice(1))
      ) {
        alert("❌ Please enter a valid 11-digit user number.");
        return;
      }
    }
    if (step === 2) {
      let cashInAmount = parseFloat(cashInData.amount);
      if (isNaN(cashInAmount) || cashInAmount <= 0 || balance < cashInAmount) {
        alert("❌ Please enter a valid amount.");
        return;
      }
    }

    if (step === 3) {
      const res = await verifyPin(axiosSecure, userData?.email, cashInData.pin).catch(
        handleError
      );
      if (!res) {
        alert("❌ Wrong PIN number.");
        return;
      }
    }

    setStep(step + 1);
  };

  const handleCashIn = async() => {
    let cashInAmount = parseFloat(cashInData.amount);
    setBalance(balance - cashInAmount);
    alert(
      `✅ Cash In Successful! You have added ${cashInData.amount} Taka to your balance.`
    );
    setMessage(
      `✅ Successfully cash in to ${cashInData.userNumber} Number ${
        cashInData.amount
      } Taka. My current balance is ${balance - cashInAmount} Taka.`
    );

    cashInData.currentBalance = balance - cashInAmount;
    cashInData.amount = parseFloat(cashInData.amount);

    let cashIn = {
      email: userData?.email,
      name: userData?.name,
      image: userData?.image,
      phoneNumber: cashInData?.userNumber,
      role: userData?.role,
      userPhoneNumber: userData?.phone,
      amountTransaction: cashInData?.amount,
      amountBeforeTransaction: balance,
    };
    const res = await moneyTransaction(axiosSecure, "/cashIn", cashIn).catch(handleError);

    setStep(0);
    setCashInData({ userNumber: "+880", amount: "", pin: "" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-2xl font-bold text-[#164193]">Cash In to User</h2>
        <div className="mt-4 text-gray-700 text-left">
          <p>✔️ No extra fee will be deducted.</p>
          <p>✔️ Instant cash-in process.</p>
          <p>✔️ Your updated balance will be shown after success.</p>
          <p>
            ✔️ Your current balance:{" "}
            <b className="text-green-600">{balance} Taka</b>
          </p>
        </div>
        <button
          onClick={() => setStep(1)}
          className="cursor-pointer mt-4 w-full bg-[#164193] text-white py-2 rounded-md font-semibold hover:bg-blue-800 transition"
        >
          Cash In
        </button>
      </div>

      {step > 0 && (
        <div className="fixed px-2 inset-0 bg-[#F2F6FE] bg-opacity-40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            {step === 1 && (
              <>
                <h2 className="text-lg font-bold">Enter User Number</h2>
                <input
                  type="text"
                  value={cashInData.userNumber}
                  onChange={(e) =>
                    setCashInData({ ...cashInData, userNumber: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md mt-3"
                  placeholder="Enter user's phone number"
                  maxLength={14}
                />
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

            {step === 2 && (
              <>
                <h2 className="text-lg font-bold">Enter Amount</h2>
                <input
                  type="number"
                  value={cashInData.amount}
                  onChange={(e) =>
                    setCashInData({ ...cashInData, amount: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md mt-3"
                  placeholder="Enter amount to cash in"
                />
                <p className="text-sm text-gray-600 mt-2">
                  Current balance: <b>{balance} Taka</b>
                </p>
                <div className="text-sm text-gray-600 mt-2">
                  After transaction balance:{" "}
                  <b className="text-red-500">
                    {balance - parseFloat(cashInData.amount || 0)} Taka
                  </b>
                </div>
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

            {step === 3 && (
              <>
                <h2 className="text-lg font-bold">Enter PIN</h2>
                <input
                  type="password"
                  value={cashInData.pin}
                  onChange={(e) =>
                    setCashInData({ ...cashInData, pin: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-md mt-3"
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

            {step === 4 && (
              <>
                <h2 className="text-lg font-bold">Confirm Cash In</h2>
                <p className="mt-2">
                  Cash in <b>{cashInData.amount} Taka</b> for user{" "}
                  <b>{cashInData.userNumber}</b>
                </p>
                <p className="text-green-600">
                  Updated Balance:{" "}
                  <b>{balance - parseFloat(cashInData.amount)} Taka</b>
                </p>
                <div className="flex justify-between mt-4">
                  <button
                    onClick={() => setStep(3)}
                    className="cursor-pointer text-gray-500"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleCashIn}
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

export default CashIn;
