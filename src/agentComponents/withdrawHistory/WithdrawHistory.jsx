import { useState } from "react";
import { FiSearch } from "react-icons/fi";

const withdrawHistoryData = [
  {
    id: 1,
    withdrawId: "WD123456",
    time: "2025-02-25 14:30",
    currentAmount: 5000,
    withdrawAmount: 1500,
    status: "Pending",
  },
  {
    id: 2,
    withdrawId: "WD654321",
    time: "2025-02-26 10:00",
    currentAmount: 3000,
    withdrawAmount: 2000,
    status: "Approved",
  },
  {
    id: 3,
    withdrawId: "WD65d4321",
    time: "2025-02-26 10:00",
    currentAmount: 4000,
    withdrawAmount: 2000,
    status: "Rejected",
  },
  // Add more demo withdrawal requests here
];

const WithdrawHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState(["2025-01-01", "2025-12-31"]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filtering Logic
  const filteredWithdrawals = withdrawHistoryData
    .filter((withdrawal) => {
      if (searchQuery) {
        return withdrawal.withdrawId.includes(searchQuery);
      }
      return true;
    })
    .filter(
      (withdrawal) =>
        new Date(withdrawal.time) >= new Date(dateRange[0]) &&
        new Date(withdrawal.time) <= new Date(dateRange[1])
    )
    .filter((withdrawal) =>
      statusFilter === "All" ? true : withdrawal.status === statusFilter
    );

  // Pagination Logic
  const totalWithdrawals = filteredWithdrawals.length;
  const indexOfLastWithdrawal = currentPage * usersPerPage;
  const indexOfFirstWithdrawal = indexOfLastWithdrawal - usersPerPage;
  const currentWithdrawals = filteredWithdrawals.slice(
    indexOfFirstWithdrawal,
    indexOfLastWithdrawal
  );

  return (
    <section className="w-full bg-[#F2F6FE] inter">
      <div className="p-6 min-h-screen width">
        <h1 className="text-3xl font-bold text-[#164193] mb-4">Agent Withdraw History</h1>
        <p className="text-lg font-semibold">Total Withdrawals: {totalWithdrawals}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Search Filter */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search by Withdraw ID"
              className="pl-10 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-2 text-gray-600" />
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

          {/* Status Filter */}
          <select
            className="p-2 border rounded-md"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

        {/* Withdrawals Table */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-[#164193] text-white">
                <th className="p-3">#</th>
                <th className="p-3">Withdraw ID</th>
                <th className="p-3">Time</th>
                <th className="p-3">Current Amount</th>
                <th className="p-3">Withdraw Amount</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentWithdrawals.map((withdrawal, index) => (
                <tr key={withdrawal.id} className="border-b text-center">
                  <td className="p-3">{indexOfFirstWithdrawal + index + 1}</td>
                  <td className="p-3">{withdrawal.withdrawId}</td>
                  <td className="p-3">{withdrawal.time}</td>
                  <td className="p-3">{withdrawal.currentAmount} &#2547;</td>
                  <td className="p-3 text-green-700 font-semibold">
                    {withdrawal.withdrawAmount} &#2547;
                  </td>
                  <td className="p-3">
                    <span
                      className={`${
                        withdrawal.status === "Pending"
                          ? "bg-yellow-500 text-white"
                          : withdrawal.status === "Approved"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } px-3 py-1 rounded-full`}
                    >
                      {withdrawal.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center">
            {[...Array(Math.ceil(totalWithdrawals / usersPerPage))].map((_, i) => (
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

export default WithdrawHistory;
