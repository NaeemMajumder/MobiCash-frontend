import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const userTransactionsData = [
  {
    id: 1,
    phone: "+880123456789",
    transactionId: "TXN123456",
    transactionTime: "2025-02-25 14:30",
    transactionAmount: 1500,
  },
  {
    id: 2,
    phone: "+8801987654321",
    transactionId: "TXN654321",
    transactionTime: "2025-02-25 15:00",
    transactionAmount: 2000,
  },
  // Add more demo transactions here
];

const MyTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [amountRange, setAmountRange] = useState([0, 10000]);
  const [dateRange, setDateRange] = useState(["2025-01-01", "2025-12-31"]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filtering Logic
  const filteredTransactions = userTransactionsData
    .filter((transaction) => {
      if (searchQuery) {
        return transaction.phone.includes(searchQuery);
      }
      return true;
    })
    .filter(
      (transaction) =>
        transaction.transactionAmount >= amountRange[0] &&
        transaction.transactionAmount <= amountRange[1]
    )
    .filter(
      (transaction) =>
        new Date(transaction.transactionTime) >= new Date(dateRange[0]) &&
        new Date(transaction.transactionTime) <= new Date(dateRange[1])
    );

  // Pagination Logic
  const totalTransactions = filteredTransactions.length;
  const indexOfLastTransaction = currentPage * usersPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - usersPerPage;
  const currentTransactions = filteredTransactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );

  return (
    <section className="w-full bg-[#F2F6FE] inter">
      <div className="p-6 min-h-screen width">
        <h1 className="text-3xl font-bold text-[#164193] mb-4">User Transactions</h1>
        <p className="text-lg font-semibold">Total Transactions: {totalTransactions}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Search Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Phone Number"
              className="pl-10 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2 text-gray-600" />
          </div>

          {/* Amount Filter */}
          <div className="flex items-center gap-2">
            <span>Amount:</span>
            <input
              type="number"
              className="p-2 border rounded-md w-20"
              value={amountRange[0]}
              onChange={(e) => setAmountRange([Number(e.target.value), amountRange[1]])}
            />
            <span>-</span>
            <input
              type="number"
              className="p-2 border rounded-md w-20"
              value={amountRange[1]}
              onChange={(e) => setAmountRange([amountRange[0], Number(e.target.value)])}
            />
          </div>

          {/* Date Filter */}
          <div className="flex items-center gap-2">
            <span>Date:</span>
            <input
              type="date"
              className="p-2 border rounded-md"
              value={dateRange[0]}
              onChange={(e) => setDateRange([e.target.value, dateRange[1]])}
            />
            <span>-</span>
            <input
              type="date"
              className="p-2 border rounded-md"
              value={dateRange[1]}
              onChange={(e) => setDateRange([dateRange[0], e.target.value])}
            />
          </div>
        </div>

        {/* User Transactions Table */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-[#164193] text-white">
                <th className="p-3">#</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Time</th>
                <th className="p-3">Amount</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b text-center">
                  <td className="p-3">{indexOfFirstTransaction + index + 1}</td>
                  <td className="p-3">{transaction.phone}</td>
                  <td className="p-3">{transaction.transactionId}</td>
                  <td className="p-3">{transaction.transactionTime}</td>
                  <td className="p-3 text-green-700 font-semibold">
                    {transaction.transactionAmount} &#2547;
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {[...Array(Math.ceil(totalTransactions / usersPerPage))].map((_, i) => (
              <button
                key={i}
                className={`p-2 mx-1 rounded-md ${
                  currentPage === i + 1 ? "bg-[#164193] text-white" : "bg-gray-300"
                }`}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyTransactions;
