import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { UseAgentWithdraw } from "../../customHooks/tenStackQuery/UseTenSatack";
import Loading from "../../loading/Loading";
import moment from "moment";

const WithdrawHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState(["2025-01-01", "2025-12-31"]);
  const [statusFilter, setStatusFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [agentWithdraw] = UseAgentWithdraw();
  console.log(agentWithdraw);

  if (!agentWithdraw) {
    return <Loading/>; 
  }

  // Filtering Logic
  const filteredWithdrawals = agentWithdraw
    .filter((withdrawal) => {
      if (searchQuery) {
        return withdrawal.withdrawId.includes(searchQuery);
      }
      return true;
    })
    .filter(
      (withdrawal) =>
        new Date(withdrawal.createdAt) >= new Date(dateRange[0]) &&
        new Date(withdrawal.createdAt) <= new Date(dateRange[1])
    )
    .filter((withdrawal) =>
      statusFilter === "All" ? true : withdrawal.withdrawStatus === statusFilter
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
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
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
                <tr key={withdrawal._id} className="border-b text-center">
                  <td className="p-3">{indexOfFirstWithdrawal + index + 1}</td>
                  <td className="p-3">{withdrawal.withdrawId}</td>
                  <td className="p-3">{moment(withdrawal.createdAt).format('DD/MM/YYYY, hh:mm A')}</td>
                  <td className="p-3">{withdrawal.currentRevenueBalance} &#2547;</td>
                  <td className="p-3 text-green-700 font-semibold">
                    {withdrawal.withdrawBalance} &#2547;
                  </td>
                  <td className="p-3">
                    <span
                      className={`${
                        withdrawal.withdrawStatus === "pending"
                          ? "bg-yellow-500 text-white"
                          : withdrawal.withdrawStatus === "approved"
                          ? "bg-green-500 text-white"
                          : "bg-red-500 text-white"
                      } px-3 py-1 rounded-full`}
                    >
                      {withdrawal.withdrawStatus}
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
