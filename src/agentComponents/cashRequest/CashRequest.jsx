import { useState } from "react";
import { FiX, FiSend } from "react-icons/fi";
import AuthProviderHook from "../../customHooks/AuthProviderHook";
import UseAxiosSecure from "../../customHooks/UseAxiosSecure";
import { moneyTransaction } from "../../../utils/moneyTransactions";

const CashRequest = () => {
  const {userData, handleError} = AuthProviderHook();
  const axiosSecure = UseAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [amount, setAmount] = useState(50000);
  const [step, setStep] = useState(1);
  const agentBalance = userData?.currentBalance; 

  const handleNext = () => {
    if (amount < 50000) {
      alert("Amount must be at least 50,000!");
      return;
    }
    setStep(2);
  };

  const handleConfirm = async() => {

    let cashReqInfo = {
      email: userData?.email,
      name: userData?.name,
      image: userData?.image,
      phone: userData?.phone,
      currentBalance: agentBalance,
      cashRequestedAmount: amount,
    };
    const res = await moneyTransaction(axiosSecure, "/cashRequest", cashReqInfo).catch(handleError);
    console.log(res);

    alert(`Cash request of ৳${amount} sent successfully!`);
    setIsOpen(false);
    setStep(1);
  };

  return (
    <section className="w-full p-6 min-h-screen bg-[#F2F6FE] flex flex-col items-center">
      <h1 className="text-3xl font-bold text-[#0A294A]">Agent Cash Request</h1>
      <p className="text-lg mt-3">Current Balance: <span className="font-semibold">৳{agentBalance}</span></p>
      
      <div className="bg-white shadow-md rounded-lg p-4 mt-4 w-full max-w-lg">
        <p className="text-gray-700">⚠️ It’s recommended to send a cash request when your balance is below <span className="font-semibold">৳10,000</span>.</p>
        <p className="text-gray-700 mt-2">⏳ Requests take up to <span className="font-semibold">24 hours</span> to be approved by the admin.</p>
      </div>
      
      <button className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md flex items-center gap-2" onClick={() => setIsOpen(true)}>
        <FiSend /> Send Cash Request
      </button>
      
      {/* Modal */}
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-[#F3F4F6] bg-opacity-30 p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button className="absolute top-3 right-3 text-gray-500" onClick={() => setIsOpen(false)}>
              <FiX size={20} />
            </button>
            
            {step === 1 && (
              <div>
                <h2 className="text-xl font-bold">Enter Amount</h2>
                <input
                  type="number"
                  className="w-full mt-3 p-2 border rounded-md"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  min={50000}
                />
                <button className="mt-4 bg-blue-600 text-white w-full p-2 rounded-md" onClick={handleNext}>
                  Next
                </button>
              </div>
            )}
            
            {step === 2 && (
              <div>
                <h2 className="text-xl font-bold">Confirm Request</h2>
                <p className="mt-3">Are you sure you want to request <span className="font-semibold">৳{amount}</span>?</p>
                <div className="mt-4 flex justify-between">
                  <button className="bg-gray-400 text-white p-2 rounded-md" onClick={() => setStep(1)}>Back</button>
                  <button className="bg-green-600 text-white p-2 rounded-md" onClick={handleConfirm}>Confirm</button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CashRequest;
