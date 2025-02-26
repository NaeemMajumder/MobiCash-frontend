import { useState } from "react";
import { FaBan, FaCheck, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";

const withdrawRequests = [
  {
    id: 1,
    name: "Agent John",
    email: "john.agent@example.com",
    phone: "+880123456789",
    currentBalance: 5000,
    withdrawAmount: 2000,
    image: "https://via.placeholder.com/50",
  },
  {
    id: 2,
    name: "Agent Jane",
    email: "jane.agent@example.com",
    phone: "+8801987654321",
    currentBalance: 3000,
    withdrawAmount: 1500,
    image: "https://via.placeholder.com/50",
  },
];

const WithdrawRequest = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [withdrawRange, setWithdrawRange] = useState([0, 5000]);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filtering Withdraw Requests
  const filteredRequests = withdrawRequests
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
    )
    .filter(
      (user) =>
        user.withdrawAmount >= withdrawRange[0] &&
        user.withdrawAmount <= withdrawRange[1]
    );
    

  // Pagination Logic
  const totalRequests = filteredRequests.length;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredRequests.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  return (
    <>
      <section className="w-full bg-[#F2F6FE] inter p-6 min-h-screen">
        <div className=" width">
          <h1 className="text-3xl font-bold text-[#164193] mb-4 ">
            Admin - Withdraw Requests
          </h1>
          <p className="text-lg font-semibold">
            Total Requests: {totalRequests}
          </p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Search Filter */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Search by name, email, phone..."
                className="pl-10 pr-4 py-2 border rounded-md"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            {/* Withdraw Amount Range Filter */}
            <div className="flex items-center gap-2">
              <span>Withdraw Amount:</span>
              <input
                type="number"
                className="p-2 border rounded-md w-20"
                value={withdrawRange[0]}
                onChange={(e) =>
                  setWithdrawRange([Number(e.target.value), withdrawRange[1]])
                }
              />
              <span>-</span>
              <input
                type="number"
                className="p-2 border rounded-md w-20"
                value={withdrawRange[1]}
                onChange={(e) =>
                  setWithdrawRange([withdrawRange[0], Number(e.target.value)])
                }
              />
            </div>
          </div>

          {/* Table */}
          <div className="mt-6 bg-white shadow-lg rounded-lg p-4 overflow-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#164193] text-white">
                  <th className="p-3">#</th>
                  <th className="p-3">Image</th>
                  <th className="p-3">Name</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Current Balance</th>
                  <th className="p-3">Withdraw Amount</th>
                  <th className="p-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr key={user.id} className="border-b text-center">
                    <td className="p-3">{indexOfFirstUser + index + 1}</td>
                    <td className="p-3">
                      <img
                        src={user.image}
                        alt="Agent"
                        className="w-10 h-10 rounded-full mx-auto"
                      />
                    </td>
                    <td className="p-3">{user.name}</td>
                    <td className="p-3">{user.email}</td>
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.currentBalance} &#2547;</td>
                    <td className="p-3 font-semibold text-red-500">
                      {user.withdrawAmount} &#2547;
                    </td>
                    <td className="p-3 flex justify-center gap-2">
                      <button className="cursor-pointer p-2 bg-green-500 text-white rounded-md">
                        <TiTickOutline />
                      </button>
                      <button className="cursor-pointer p-2 bg-red-500 text-white rounded-md">
                        <FaBan />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              {[...Array(Math.ceil(totalRequests / usersPerPage))].map(
                (_, i) => (
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
                )
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WithdrawRequest;
