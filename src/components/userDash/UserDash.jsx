import { FiSend, FiClock, FiDollarSign, FiArrowDownCircle } from "react-icons/fi";
import AuthProviderHook from "../../customHooks/AuthProviderHook";

const UserDash = () => {
  const lastTransaction = {
    amount: 3000,
    date: "2025-02-25 14:30",
    transactionId: "TXN789456",
  };

  let {userData} = AuthProviderHook();

  return (
    <section className="w-full p-6 flex flex-col items-center">
      <h1 className="text-3xl font-bold text-blue-700 mt-20">User Dashboard</h1>
      
      <div className="grid gap-6 mt-6 w-full max-w-4xl grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {/* Current Balance */}
        <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
          <FiDollarSign className="text-blue-600 text-4xl" />
          <p className="text-gray-700 text-lg mt-2">Current Balance</p>
          <p className="text-2xl font-bold text-green-600">৳{userData?.currentBalance}</p>
        </div>

        {/* Total Sent Money */}
        <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
          <FiSend className="text-orange-500 text-4xl" />
          <p className="text-gray-700 text-lg mt-2">Total Sent Money</p>
          <p className="text-2xl font-bold text-red-600">৳{userData?.totalSendMoney}</p>
        </div>

        {/* Total Cashout Amount */}
        <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
          <FiArrowDownCircle className="text-teal-600 text-4xl" />
          <p className="text-gray-700 text-lg mt-2">Total Cashout</p>
          <p className="text-2xl font-bold text-blue-600">৳{userData?.totalCashOut}</p>
        </div>

        {/* Last Transaction */}
        <div className="bg-white p-6 shadow-md rounded-lg flex flex-col items-center">
          <FiClock className="text-purple-600 text-4xl" />
          <p className="text-gray-700 text-lg mt-2">Last Transaction</p>
          <p className="text-md">Amount: <span className="font-semibold">৳{lastTransaction.amount}</span></p>
          <p className="text-sm">Date: {lastTransaction.date}</p>
          <p className="text-sm">TXN: {lastTransaction.transactionId}</p>
        </div>
      </div>
    </section>
  );
};

export default UserDash;