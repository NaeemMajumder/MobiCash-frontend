import { useState } from "react";
import { FiEye, FiSearch } from "react-icons/fi";

const transactionsData = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "+880123456789",
    transactionId: "TXN123456",
    transactionTime: "2025-02-25 14:30",
    balance: 5000,
    transactionAmount: 1500,
    role: "User",
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+8801987654321",
    transactionId: "TXN654321",
    transactionTime: "2025-02-25 15:00",
    balance: 3000,
    transactionAmount: 2000,
    role: "Agent",
    image: "https://via.placeholder.com/50",
  },
  // Add more demo transactions here
];

const AllTransactions = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchType, setSearchType] = useState("name");
  const [roleFilter, setRoleFilter] = useState("All");
  const [transactionRange, setTransactionRange] = useState([0, 10000]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filtering Logic
  const filteredTransactions = transactionsData
    .filter((transaction) => {
      if (searchQuery) {
        if (searchType === "name")
          return transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
        if (searchType === "email")
          return transaction.email.toLowerCase().includes(searchQuery.toLowerCase());
        if (searchType === "phone") return transaction.phone.includes(searchQuery);
      }
      return true;
    })
    .filter((transaction) =>
      roleFilter === "All" ? true : transaction.role === roleFilter
    )
    .filter(
      (transaction) =>
        transaction.transactionAmount >= transactionRange[0] &&
        transaction.transactionAmount <= transactionRange[1]
    );

  // Pagination Logic
  const totalTransactions = filteredTransactions.length;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentTransactions = filteredTransactions.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <section className="w-full bg-[#F2F6FE] inter">
      <div className="p-6 min-h-screen width">
        <h1 className="text-3xl font-bold text-[#164193] mb-4">Admin - User Transactions</h1>
        <p className="text-lg font-semibold">Total Transactions: {totalTransactions}</p>

        {/* Filters */}
        <div className="flex flex-wrap gap-4 mt-4">
          {/* Search Filter */}
          <div className="relative">
            <select
              className="absolute left-2 top-2 bg-transparent text-gray-600 outline-none"
              value={searchType}
              onChange={(e) => setSearchType(e.target.value)}
            >
              <option value="name">Name</option>
              <option value="email">Email</option>
              <option value="phone">Phone</option>
            </select>
            <input
              type="text"
              placeholder="Search..."
              className="pl-20 pr-4 py-2 border rounded-md"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Role Filter */}
          <select
            className="p-2 border rounded-md"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
          >
            <option value="All">All</option>
            <option value="User">Users</option>
            <option value="Agent">Agents</option>
          </select>

          {/* Transaction Amount Filter */}
          <div className="flex items-center gap-2">
            <span>Transaction:</span>
            <input
              type="number"
              className="p-2 border rounded-md w-20"
              value={transactionRange[0]}
              onChange={(e) => setTransactionRange([Number(e.target.value), transactionRange[1]])}
            />
            <span>-</span>
            <input
              type="number"
              className="p-2 border rounded-md w-20"
              value={transactionRange[1]}
              onChange={(e) => setTransactionRange([transactionRange[0], Number(e.target.value)])}
            />
          </div>
        </div>

        {/* User Transactions Table */}
        <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
          <table className="w-full border-collapse ">
            <thead>
              <tr className="bg-[#164193] text-white">
                <th className="p-3">#</th>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Transaction ID</th>
                <th className="p-3">Time</th>
                <th className="p-3">Balance</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentTransactions.map((transaction, index) => (
                <tr key={transaction.id} className="border-b text-center">
                  <td className="p-3">{indexOfFirstUser + index + 1}</td>
                  <td className="p-3">
                    <img src={transaction.image} alt="User" className="w-10 h-10 rounded-full mx-auto" />
                  </td>
                  <td className="p-3">{transaction.name}</td>
                  <td className="p-3">{transaction.email}</td>
                  <td className="p-3">{transaction.phone}</td>
                  <td className="p-3">{transaction.role}</td>
                  <td className="p-3">{transaction.transactionId}</td>
                  <td className="p-3">{transaction.transactionTime}</td>
                  <td className="p-3">{transaction.balance} &#2547;</td>
                  <td className="p-3 text-green-700 font-semibold">{transaction.transactionAmount} &#2547;</td>
                  <td className="p-3">
                    <button className="p-2 bg-blue-500 text-white rounded-md">
                      <FiEye />
                    </button>
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
                    currentPage === i + 1
                      ? "bg-[#164193] text-white"
                      : "bg-gray-300"
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

export default AllTransactions;
