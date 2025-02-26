import { useState } from "react";
import { FaCheck, FaTimes } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { TiTickOutline } from "react-icons/ti";
import { UseAllWithdraws } from "../../customHooks/tenStackQuery/UseTenSatack";
import Loading from "../../loading/Loading";
import moment from "moment";



const AllWithdraws = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [withdrawRange, setWithdrawRange] = useState([0, 50000]);
  const [statusFilter, setStatusFilter] = useState("");
  const [dateFilter, setDateFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  const [allWithdraws] = UseAllWithdraws();
  console.log(allWithdraws);

  if (!allWithdraws) {
    return <Loading/>; // Prevent filter from running on undefined data
  }

  // Filtering Withdraws
  const filteredWithdraws = allWithdraws
    .filter(
      (user) =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phone.includes(searchQuery)
    )
    .filter(
      (user) =>
        user.withdrawBalance >= withdrawRange[0] &&
        user.withdrawBalance <= withdrawRange[1]
    )
    .filter((user) =>
      statusFilter ? user.withdrawStatus.toLowerCase() === statusFilter.toLowerCase() : true
    )
    .filter((user) =>
      dateFilter ? moment(user.createdAt).format('DD/MM/YYYY, hh:mm A').includes(dateFilter) : true
    );
    console.log(filteredWithdraws);

  // Pagination Logic
  const totalWithdraws = filteredWithdraws.length;
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentWithdraws = filteredWithdraws.slice(
    indexOfFirstUser,
    indexOfLastUser
  );

  return (
    <>
      <section className="w-full bg-[#F2F6FE] inter p-6 min-h-screen">
        <div className="width">
          <h1 className="text-3xl font-bold text-[#164193] mb-4">Admin - All Withdraws</h1>
          <p className="text-lg font-semibold">Total Withdraws: {totalWithdraws}</p>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 mt-4">
            {/* Search Filter */}
            <div className="relative">
              <FiSearch className="absolute left-3 top-3 text-gray-600" />
              <input
                type="text"
                placeholder="Search by name or phone"
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

            {/* Status Filter */}
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="p-2 border rounded-md"
              >
                <option value="">All</option>
                <option value="Approved">Approved</option>
                <option value="Pending">Pending</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>

            {/* Date Filter */}
            <div className="flex items-center gap-2">
              <span>Date:</span>
              <input
                type="date"
                className="p-2 border rounded-md"
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
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
                  <th className="p-3">Phone</th>
                  <th className="p-3">withdraw ID</th>
                  <th className="p-3">Withdraw Date</th>
                  <th className="p-3">Withdraw Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody>
                {currentWithdraws.map((user, index) => (
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
                    <td className="p-3">{user.phone}</td>
                    <td className="p-3">{user.withdrawId}</td>
                    <td className="p-3">{moment(user.createdAt).format('DD/MM/YYYY, hh:mm A')}</td>
                    <td className="p-3 font-semibold text-red-500">
                      {user.withdrawBalance} &#2547;
                    </td>
                    <td className="p-3">
                      {user.withdrawStatus === "approved" ? (
                        <span className="text-green-500 font-semibold">
                          Approved
                        </span>
                      ) : user.withdrawStatus === "pending" ? (
                        <span className="text-yellow-500 font-semibold">
                          Pending
                        </span>
                      ) : (
                        <span className="text-red-500 font-semibold">
                          Rejected
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="mt-4 flex justify-center">
              {[...Array(Math.ceil(totalWithdraws / usersPerPage))].map(
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

export default AllWithdraws;
